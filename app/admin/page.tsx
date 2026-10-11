'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Download, Upload, Pencil, Trash2, ImagePlus, Globe, Loader2, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const ADMIN_PASSWORD = 'gradivus2026';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  created_at: string;
}

export default function AdminPage() {
  const { lang, changeLanguage, t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('website');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Check login session (localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem('gradivus_auth') === 'true';
    setIsAuthenticated(authStatus);
    if (authStatus) fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch dari Next.js API Routes (Supabase)
  async function fetchPortfolio() {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      toast.error(t.admin.toasts.fetchError);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem('gradivus_auth', 'true');
      setIsAuthenticated(true);
      fetchPortfolio();
      toast.success(t.admin.toasts.loginSuccess);
    } else {
      toast.error(t.admin.toasts.loginFailed);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gradivus_auth');
    setIsAuthenticated(false);
    toast.success(t.admin.toasts.logoutSuccess);
  };

  const openAddDialog = () => {
    setEditItem(null);
    setTitle('');
    setCategory('website');
    setDescription('');
    setImageUrl('');
    setDemoUrl('');
    setIsFormOpen(true);
  };

  const openEditDialog = (item: PortfolioItem) => {
    setEditItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setImageUrl(item.imageUrl || '');
    setDemoUrl(item.demoUrl || '');
    setIsFormOpen(true);
  };

  // Upload file gambar langsung ke storage Supabase
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(lang === 'en' ? 'Please upload an image file (PNG/JPG/WEBP)' : 'Harap pilih file gambar (PNG/JPG/WEBP)');
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
        toast.success(lang === 'en' ? 'Image uploaded successfully!' : 'Gambar berhasil diunggah!');
      } else {
        toast.error(lang === 'en' ? 'Failed to upload image' : 'Gagal mengunggah gambar');
      }
    } catch {
      toast.error(t.admin.toasts.networkError);
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit CRUD (Create & Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, category, description, imageUrl, demoUrl };
    
    try {
      const method = editItem ? 'PUT' : 'POST';
      const body = editItem ? { id: editItem.id, ...payload } : payload;

      const res = await fetch('/api/portfolio', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        toast.success(editItem ? t.admin.toasts.updateSuccess : t.admin.toasts.addSuccess);
        setIsFormOpen(false);
        fetchPortfolio();
      } else {
        toast.error(t.admin.toasts.saveFailed);
      }
    } catch {
      toast.error(t.admin.toasts.networkError);
    }
  };

  // DELETE operation
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/portfolio?id=${deleteId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success(t.admin.toasts.deleteSuccess);
        setIsDeleteOpen(false);
        fetchPortfolio();
      } else {
        toast.error(t.admin.toasts.deleteFailed);
      }
    } catch {
      toast.error(t.admin.toasts.networkError);
    }
  };

  // Backup/Export data
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gradivus-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast.success(t.admin.toasts.backupSuccess);
  };

  // Restore/Import data
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      
      if (!Array.isArray(parsed)) throw new Error();

      let successCount = 0;
      for (const item of parsed) {
        const { id, created_at, ...cleanItem } = item;
        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cleanItem)
        });
        if (res.ok) successCount++;
      }

      toast.success(t.admin.toasts.importSuccess.replace('{successCount}', String(successCount)));
      fetchPortfolio();
    } catch {
      toast.error(t.admin.toasts.importFailed);
    }
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-6 relative text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-purple/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="absolute top-6 right-6 z-10">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1 gap-1">
            <button
              onClick={() => changeLanguage('id')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                lang === 'id' ? 'bg-accent-purple text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                lang === 'en' ? 'bg-accent-purple text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="w-full max-w-sm bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center z-10">
          <div className="flex justify-center mb-6">
            <Image src="/gradiuscode.svg" alt="Gradivus" width={130} height={32} className="brightness-125" />
          </div>

          <h1 className="text-xl font-heading font-bold mb-2 text-white">{t.admin.loginTitle}</h1>
          <p className="text-xs text-zinc-400 mb-6">Masuk untuk mengelola portofolio & database</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder={t.admin.loginPlaceholder}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none text-sm transition-all"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-accent-purple hover:bg-accent-purple-hover text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-accent-purple/20 cursor-pointer"
            >
              {t.admin.loginButton}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Image src="/gradiuscode.svg" alt="Gradivus Code" width={110} height={28} className="brightness-125" />
          <div className="flex gap-4 items-center">
            <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-full p-1 gap-1 h-8">
              <button
                onClick={() => changeLanguage('id')}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  lang === 'id' ? 'bg-accent-purple text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-accent-purple text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="/portfolio"
              target="_blank"
              className="px-4 py-1.5 rounded-full border border-accent-purple/40 bg-accent-purple/10 hover:bg-accent-purple/20 text-xs font-semibold text-accent-purple transition-all flex items-center"
            >
              Portofolio ↗
            </a>
            <a
              href="/"
              target="_blank"
              className="px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-white transition-all flex items-center"
            >
              {t.admin.viewWeb}
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full bg-red-950/40 border border-red-800/50 hover:bg-red-900/50 text-red-300 text-xs font-semibold transition-all cursor-pointer"
            >
              {t.admin.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-purple">{items.length}</div>
            <div className="text-xs text-zinc-400 mt-1">{t.admin.totalPortfolio}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-teal">
              {items.filter(i => i.category === 'website').length}
            </div>
            <div className="text-xs text-zinc-400 mt-1">{t.admin.categoryWebsite}</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-purple">
              {items.filter(i => i.category === 'branding').length}
            </div>
            <div className="text-xs text-zinc-400 mt-1">{t.admin.categoryBranding}</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-heading font-bold text-white">{t.admin.manageTitle}</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={openAddDialog}
              className="px-6 py-2.5 bg-accent-purple hover:bg-accent-purple-hover text-white font-semibold rounded-full text-xs transition-all shadow-md cursor-pointer"
            >
              {t.admin.addBtn}
            </button>
            <button
              onClick={handleExport}
              className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold rounded-full transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t.admin.exportBtn}
            </button>
            <label className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold rounded-full transition-all cursor-pointer inline-flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {t.admin.importBtn}
              <input type="file" onChange={handleImport} accept=".json" className="hidden" />
            </label>
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500 animate-pulse">{t.admin.loadingDb}</div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-2xl">
            {t.admin.emptyDb}
          </div>
        ) : (
          <div className="w-full overflow-x-auto border border-zinc-800 bg-zinc-900/80 rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  <th className="p-4">{t.admin.thProject}</th>
                  <th className="p-4">{t.admin.thCategory}</th>
                  <th className="p-4">Link Website</th>
                  <th className="p-4">{t.admin.thDate}</th>
                  <th className="p-4 text-right">{t.admin.thAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-4 font-medium text-white">{item.title}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-accent-teal">
                      {item.category === 'website' ? t.admin.categoryWebsite : t.admin.categoryBranding}
                    </td>
                    <td className="p-4 text-xs">
                      {item.demoUrl ? (
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-teal hover:underline inline-flex items-center gap-1.5"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>{item.demoUrl.replace(/^https?:\/\//, '')}</span>
                        </a>
                      ) : (
                        <span className="text-zinc-500">-</span>
                      )}
                    </td>
                    <td className="p-4 text-zinc-400">{new Date(item.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID')}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditDialog(item)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        {t.admin.btnEdit}
                      </button>
                      <button
                        onClick={() => { setDeleteId(item.id); setIsDeleteOpen(true); }}
                        className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/50 text-red-300 text-xs rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {t.admin.btnDelete}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      {/* --- CRUD DIALOG FORM --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 z-10 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-heading font-bold mb-6 text-white">{editItem ? t.admin.formEditTitle : t.admin.formAddTitle}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-zinc-300">{t.admin.formLabelTitle}</label>
                <input
                  type="text"
                  value={title}
                  placeholder="Contoh: Website Restoran Kayu Manis"
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-accent-purple outline-none text-sm transition-all text-white placeholder-zinc-500"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-zinc-300">{t.admin.formLabelCategory}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-accent-purple outline-none text-sm transition-all text-white"
                >
                  <option value="website">{t.admin.categoryWebsite}</option>
                  <option value="branding">{t.admin.categoryBranding}</option>
                </select>
              </div>

              {/* Link Website Eksternal */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-zinc-300">
                  {lang === 'en' ? 'Website URL (Optional)' : 'Link Website Klien (Opsional)'}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={demoUrl}
                    placeholder="https://client-website.com"
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-accent-purple outline-none text-sm transition-all text-white placeholder-zinc-500"
                  />
                  <Globe className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  {lang === 'en'
                    ? 'Optional. Used for direct external link button and automatic screenshot if image is not uploaded.'
                    : 'Opsional. Digunakan untuk tombol kunjungi web di tab baru dan screenshot otomatis jika gambar tidak diupload.'}
                </p>
              </div>

              {/* Upload Gambar Langsung (File Picker) */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-zinc-300">
                  {lang === 'en' ? 'Upload Image / Screenshot (Optional)' : 'Upload Gambar / Screenshot (Opsional)'}
                </label>
                <p className="text-[11px] text-zinc-400 mb-2 leading-relaxed">
                  {lang === 'en'
                    ? 'Recommended size: 16:9 or 4:3 (e.g. 800×600 px). If left empty, a live screenshot of the website URL above will be automatically captured!'
                    : 'Rekomendasi ukuran: rasio 16:9 atau 4:3 (contoh: 800×600 atau 1200×800 px). Jika dikosongkan, screenshot live dari Link Website di atas akan otomatis diambil!'}
                </p>
                
                {imageUrl ? (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 mb-2 group">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer shadow-md"
                      title="Hapus gambar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-zinc-800 hover:border-accent-purple rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all bg-zinc-950/50 hover:bg-zinc-950 group">
                    {uploadingImage ? (
                      <div className="flex items-center gap-2 text-xs text-accent-purple">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengunggah gambar ke storage...</span>
                      </div>
                    ) : (
                      <>
                        <ImagePlus className="w-7 h-7 text-zinc-500 group-hover:text-accent-purple mb-2 transition-colors" />
                        <span className="text-xs font-semibold text-zinc-300 group-hover:text-white">Pilih file gambar dari komputer/HP</span>
                        <span className="text-[10px] text-zinc-500 mt-0.5">Rasio 16:9 atau 4:3 otomatis di-crop rapi</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2 text-zinc-300">{t.admin.formLabelDesc}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan fitur atau konsep singkat proyek ini..."
                  className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-accent-purple outline-none text-sm transition-all resize-none text-white placeholder-zinc-500"
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2 border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-xs transition-all cursor-pointer"
                >
                  {t.admin.formBtnCancel}
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-6 py-2 bg-accent-purple hover:bg-accent-purple-hover text-white font-semibold rounded-full text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {t.admin.formBtnSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE DIALOG --- */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-sm p-6 z-10 shadow-2xl text-center text-white max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-heading font-bold mb-4 text-white">{t.admin.confirmDeleteTitle}</h3>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              {t.admin.confirmDeleteDesc}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-5 py-2 border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-xs transition-all cursor-pointer"
              >
                {t.admin.formBtnCancel}
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full text-xs transition-all cursor-pointer shadow-md"
              >
                {t.admin.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

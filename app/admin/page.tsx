'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Download, Upload, Pencil, Trash2 } from 'lucide-react';
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

      // Unggah massal via API
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
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6 relative">
        {/* Absolute Language Switcher on Login Page */}
        <div className="absolute top-6 right-6">
          <div className="flex items-center bg-black/50 border border-zinc-800 rounded-full p-1 gap-1">
            <button
              onClick={() => changeLanguage('id')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                lang === 'id' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                lang === 'en' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="w-full max-w-sm bg-bg-card border border-border rounded-2xl p-8 shadow-xl text-center">
          <Image src="/gradiuscode.svg" alt="Gradivus" width={140} height={36} className="mx-auto mb-8" />
          <h1 className="text-xl font-heading font-bold mb-6">{t.admin.loginTitle}</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder={t.admin.loginPlaceholder}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all text-white"
              required
            />
            <button type="submit" className="btn-primary w-full py-3 cursor-pointer">
              {t.admin.loginButton}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-border bg-bg-secondary py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Image src="/gradiuscode.svg" alt="Gradivus Code" width={110} height={28} />
          <div className="flex gap-4 items-center">
            {/* Inline Language Switcher inside Admin Dashboard Header */}
            <div className="flex items-center bg-black/50 border border-zinc-800 rounded-full p-1 gap-1 h-8">
              <button
                onClick={() => changeLanguage('id')}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  lang === 'id' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <a href="/" target="_blank" className="btn-secondary px-5 py-2 text-xs flex items-center">
              {t.admin.viewWeb}
            </a>
            <button onClick={handleLogout} className="px-5 py-2 rounded-full bg-border hover:bg-bg-card-hover text-xs font-semibold transition-all cursor-pointer">
              {t.admin.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-border p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-purple">{items.length}</div>
            <div className="text-xs text-text-secondary mt-1">{t.admin.totalPortfolio}</div>
          </div>
          <div className="bg-bg-card border border-border p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-teal">
              {items.filter(i => i.category === 'website').length}
            </div>
            <div className="text-xs text-text-secondary mt-1">{t.admin.categoryWebsite}</div>
          </div>
          <div className="bg-bg-card border border-border p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-purple">
              {items.filter(i => i.category === 'branding').length}
            </div>
            <div className="text-xs text-text-secondary mt-1">{t.admin.categoryBranding}</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-heading font-bold">{t.admin.manageTitle}</h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={openAddDialog} className="btn-primary px-6 py-2.5 text-xs cursor-pointer">
              {t.admin.addBtn}
            </button>
            <button onClick={handleExport} className="px-5 py-2.5 bg-bg-card border border-border hover:border-white text-xs font-semibold rounded-full transition-all cursor-pointer inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t.admin.exportBtn}
            </button>
            <label className="px-5 py-2.5 bg-bg-card border border-border hover:border-white text-xs font-semibold rounded-full transition-all cursor-pointer inline-flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {t.admin.importBtn}
              <input type="file" onChange={handleImport} accept=".json" className="hidden" />
            </label>
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="py-20 text-center text-text-secondary animate-pulse">{t.admin.loadingDb}</div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-text-secondary bg-bg-card border border-border rounded-2xl">
            {t.admin.emptyDb}
          </div>
        ) : (
          <div className="w-full overflow-x-auto border border-border bg-bg-card rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-bg-secondary/50 text-xs text-text-secondary uppercase tracking-widest font-semibold">
                  <th className="p-4">{t.admin.thProject}</th>
                  <th className="p-4">{t.admin.thCategory}</th>
                  <th className="p-4">{t.admin.thDate}</th>
                  <th className="p-4 text-right">{t.admin.thAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-accent-teal">
                      {item.category === 'website' ? t.admin.categoryWebsite : t.admin.categoryBranding}
                    </td>
                    <td className="p-4">{new Date(item.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID')}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditDialog(item)} className="px-3 py-1.5 bg-bg-secondary hover:bg-border text-xs rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5">
                        <Pencil className="w-3.5 h-3.5" />
                        {t.admin.btnEdit}
                      </button>
                      <button onClick={() => { setDeleteId(item.id); setIsDeleteOpen(true); }} className="px-3 py-1.5 bg-red-950/30 hover:bg-red-900/40 text-error text-xs rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5">
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          <div className="relative bg-bg-card border border-border rounded-2xl w-full max-w-lg p-6 sm:p-8 z-10 shadow-xl text-white max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-heading font-bold mb-6">{editItem ? t.admin.formEditTitle : t.admin.formAddTitle}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">{t.admin.formLabelTitle}</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all text-white" required />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">{t.admin.formLabelCategory}</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all text-white">
                  <option value="website">{t.admin.categoryWebsite}</option>
                  <option value="branding">{t.admin.categoryBranding}</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">{t.admin.formLabelDesc}</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all resize-none text-white" rows={3} required />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">{t.admin.formLabelImage}</label>
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all text-white" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">{t.admin.formLabelDemo}</label>
                <input type="url" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} className="px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2 border border-border rounded-full text-xs hover:bg-bg-secondary transition-all cursor-pointer">
                  {t.admin.formBtnCancel}
                </button>
                <button type="submit" className="px-6 py-2 bg-accent-purple text-white font-semibold rounded-full text-xs hover:opacity-90 transition-all cursor-pointer">
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsDeleteOpen(false)} />
          <div className="relative bg-bg-card border border-border rounded-2xl w-full max-w-sm p-6 z-10 shadow-xl text-center text-white max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-heading font-bold mb-4">{t.admin.confirmDeleteTitle}</h3>
            <p className="text-xs text-text-secondary mb-6 leading-relaxed">
              {t.admin.confirmDeleteDesc}
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="px-5 py-2 border border-border rounded-full text-xs hover:bg-bg-secondary transition-all cursor-pointer">
                {t.admin.formBtnCancel}
              </button>
              <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full text-xs transition-all cursor-pointer">
                {t.admin.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

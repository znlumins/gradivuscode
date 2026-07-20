# PRD-011: Admin Panel & Supabase CRUD Integration

## Deskripsi
Halaman dashboard admin kustom yang diletakkan di `/admin` (route: `app/admin/page.js`). Digunakan pemilik bisnis untuk mengelola portofolio secara dinamis melalui koneksi database cloud **Supabase**. Halaman ini terproteksi password login, mendukung export/import data JSON, dan menggunakan modal dialog untuk form CRUD.

## Acceptance Criteria

- [ ] Halaman dibuat di `app/admin/page.js` sebagai Client Component (`'use client'`)
- [ ] Tag `<meta name="robots" content="noindex, nofollow" />` disematkan via Next.js metadata untuk mencegah perayapan mesin pencari Google
- [ ] Login Form: Meminta password login statis (`gradivus2026`). Proteksi state memblokir akses ke dashboard jika belum authenticated
- [ ] Dashboard Header: Tombol log out dan link eksternal pintasan ke halaman depan (`index.html` / "/")
- [ ] Dashboard Stats: Menampilkan jumlah total portofolio, portofolio website, dan portofolio branding secara akurat
- [ ] Form CRUD Modal: Satu modal dialog reusable untuk membuat data baru (POST) dan memperbarui data (PUT)
- [ ] Delete Dialog: Konfirmasi dialog pop-up sebelum memicu hapus data portofolio dari Supabase (DELETE)
- [ ] Toast Notifications: Menampilkan status konfirmasi visual setelah aksi simpan, update, hapus, export, dan import data berhasil
- [ ] Export JSON: Mengunduh backup seluruh isi database portofolio ke komputer lokal berformat berkas JSON
- [ ] Import JSON: Mengunggah berkas JSON backup untuk menimpa/memperbarui data portofolio Supabase secara massal
- [ ] Tata letak responsive table: Overflow horizontal di mobile agar web layout tidak pecah

## Database Schema (Supabase Table: `portfolio`)

Tabel bernama `portfolio` di database Supabase wajib memiliki kolom berikut:

| Column | Type | Default | Deskripsi |
|---|---|---|---|
| **id** | uuid | `gen_random_uuid()` | Primary Key (unik) |
| **title** | text | - | Judul proyek |
| **category** | text | - | Kategori: `website` atau `branding` |
| **description** | text | - | Deskripsi portofolio |
| **imageUrl** | text | - | URL link hosting gambar |
| **demoUrl** | text | NULL | URL link demo situs |
| **created_at** | timestamp with time zone | `now()` | Tanggal pembuatan |

---

## Kode: `app/admin/page.js`

```jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

const ADMIN_PASSWORD = 'gradivus2026';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

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
      toast.error('Gagal mengambil data dari database.');
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem('gradivus_auth', 'true');
      setIsAuthenticated(true);
      fetchPortfolio();
      toast.success('Login berhasil!');
    } else {
      toast.error('Password salah!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gradivus_auth');
    setIsAuthenticated(false);
    toast.success('Log out berhasil.');
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

  const openEditDialog = (item) => {
    setEditItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setImageUrl(item.imageUrl || '');
    setDemoUrl(item.demoUrl || '');
    setIsFormOpen(true);
  };

  // Submit CRUD (Create & Update)
  const handleSave = async (e) => {
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
        toast.success(editItem ? 'Portofolio berhasil diupdate!' : 'Portofolio berhasil ditambahkan!');
        setIsFormOpen(false);
        fetchPortfolio();
      } else {
        toast.error('Gagal menyimpan data ke database.');
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.');
    }
  };

  // DELETE operation
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/portfolio?id=${deleteId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('Portofolio berhasil dihapus!');
        setIsDeleteOpen(false);
        fetchPortfolio();
      } else {
        toast.error('Gagal menghapus data.');
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.');
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
    toast.success('Backup JSON terdownload.');
  };

  // Restore/Import data
  const handleImport = async (e) => {
    const file = e.target.files[0];
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

      toast.success(`${successCount} items berhasil di-import!`);
      fetchPortfolio();
    } catch {
      toast.error('Gagal meng-import file. Pastikan format JSON valid.');
    }
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-bg-card border border-border rounded-3xl p-8 shadow-xl text-center">
          <Image src="/logo/gradiuscode.svg" alt="Gradivus" width={140} height={36} className="mx-auto mb-8" />
          <h1 className="text-xl font-heading font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Masukkan password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all"
              required
            />
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-accent-purple to-accent-teal text-white font-bold rounded-full transition-all">
              Masuk
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
          <Image src="/logo/gradiuscode.svg" alt="Gradivus Code" width={110} height={28} />
          <div className="flex gap-4">
            <a href="/" target="_blank" className="px-5 py-2 rounded-full border border-border text-xs hover:border-white transition-all">
              Lihat Web
            </a>
            <button onClick={handleLogout} className="px-5 py-2 rounded-full bg-border hover:bg-bg-card-hover text-xs font-semibold transition-all">
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-border p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-purple">{items.length}</div>
            <div className="text-xs text-text-secondary mt-1">Total Portofolio</div>
          </div>
          <div className="bg-bg-card border border-border p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-teal">
              {items.filter(i => i.category === 'website').length}
            </div>
            <div className="text-xs text-text-secondary mt-1">Website</div>
          </div>
          <div className="bg-bg-card border border-border p-6 rounded-2xl">
            <div className="text-3xl font-heading font-bold text-accent-purple">
              {items.filter(i => i.category === 'branding').length}
            </div>
            <div className="text-xs text-text-secondary mt-1">Desain & Branding</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-heading font-bold">Kelola Portofolio</h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={openAddDialog} className="px-6 py-2.5 bg-gradient-to-r from-accent-purple to-accent-teal text-white text-xs font-bold rounded-full transition-all">
              + Tambah Portofolio
            </button>
            <button onClick={handleExport} className="px-5 py-2.5 bg-bg-card border border-border hover:border-white text-xs font-semibold rounded-full transition-all">
              📥 Export Backup
            </button>
            <label className="px-5 py-2.5 bg-bg-card border border-border hover:border-white text-xs font-semibold rounded-full transition-all cursor-pointer">
              📤 Import Restore
              <input type="file" onChange={handleImport} accept=".json" className="hidden" />
            </label>
          </div>
        </div>

        {/* Data Table */}
        {loading ? (
          <div className="py-20 text-center text-text-secondary animate-pulse">Memuat data database Supabase...</div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-text-secondary bg-bg-card border border-border rounded-2xl">
            Belum ada data portofolio.
          </div>
        ) : (
          <div className="w-full overflow-x-auto border border-border bg-bg-card rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-bg-secondary/50 text-xs text-text-secondary uppercase tracking-widest font-semibold">
                  <th className="p-4">Nama Proyek</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Tanggal Buat</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium">{item.title}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-accent-teal">{item.category}</td>
                    <td className="p-4">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditDialog(item)} className="px-3 py-1.5 bg-bg-secondary hover:bg-border text-xs rounded-lg transition-colors">
                        ✏️ Edit
                      </button>
                      <button onClick={() => { setDeleteId(item.id); setIsDeleteOpen(true); }} className="px-3 py-1.5 bg-red-950/30 hover:bg-red-900/40 text-red-400 text-xs rounded-lg transition-colors">
                        🗑️ Hapus
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
        <div className="fixed inset-0 z-modal flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setIsFormOpen(false)} />
          <div className="relative bg-bg-card border border-border rounded-2xl w-full max-w-lg p-8 z-10 m-4 shadow-xl">
            <h3 className="text-xl font-heading font-bold mb-6">{editItem ? 'Edit Portofolio' : 'Tambah Portofolio'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-2">Judul Proyek</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-2 rounded-lg bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all" required />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-2">Kategori</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 rounded-lg bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all">
                  <option value="website">Website</option>
                  <option value="branding">Desain & Branding</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-2">Deskripsi</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="px-4 py-2 rounded-lg bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all resize-none" rows="3" required />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-2">URL Gambar (Imgur/Postimages)</label>
                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="px-4 py-2 rounded-lg bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all" required />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-2">URL Demo Link (Opsional)</label>
                <input type="url" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} className="px-4 py-2 rounded-lg bg-bg-primary border border-border focus:border-accent-purple outline-none text-sm transition-all" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2 border border-border rounded-lg text-xs hover:bg-bg-secondary transition-all">
                  Batal
                </button>
                <button type="submit" className="px-6 py-2 bg-accent-purple text-white font-semibold rounded-lg text-xs hover:opacity-90 transition-all">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE DIALOG --- */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setIsDeleteOpen(false)} />
          <div className="relative bg-bg-card border border-border rounded-2xl w-full max-w-sm p-6 z-10 m-4 shadow-xl text-center">
            <h3 className="text-lg font-heading font-bold mb-4">Hapus Portofolio</h3>
            <p className="text-xs text-text-secondary mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus proyek portofolio ini dari database? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="px-5 py-2 border border-border rounded-lg text-xs hover:bg-bg-secondary transition-all">
                Batal
              </button>
              <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs transition-all">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
```

## QA Checklist

- [ ] Route admin `/admin` diakses pertama kali memblokir dashboard dan menampilkan login screen
- [ ] Mengetik password salah memicu error toast warning "Password salah!"
- [ ] Memasukkan password `gradivus2026` sukses mengarahkan ke halaman dashboard utama
- [ ] Tombol logout membuang status autentikasi di localStorage dan memicu reload ke halaman login screen
- [ ] Dashboard stats menampilkan data perhitungan real-time portofolio dari Supabase secara akurat
- [ ] CRUD Dialog memproses data baru (POST) dan update (PUT) sukses terkirim ke server API routes
- [ ] Klik hapus item memicu show confirmation modal dialog
- [ ] Mengklik "Hapus" sukses memicu query DELETE dan memperbarui data dashboard
- [ ] Notifikasi status toast berhasil memunculkan pesan sesuai trigger event aksi
- [ ] Tombol export men-download file JSON dengan benar
- [ ] Memilih import file JSON memicu trigger push data massal ke database Supabase
- [ ] Tabel portofolio mendukung responsivitas overflow horizontal scroll pada device layar kecil
- [ ] robots noindex disematkan pada page admin ini

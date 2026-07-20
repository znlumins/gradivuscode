# Pattern: Feedback (Snackbar & Error Dialog)

Proyek ini menggunakan **sonner** untuk toast/snackbar (dengan tema dark premium) dan komponen kustom **ErrorDialog** untuk modal dialog error yang bersifat memblokir.

## Keputusan Arsitektural

**Snackbar (toast) untuk success/info** — imperative API, tidak menggunakan state lokal:
- Auto-dismiss, stack otomatis, non-blocking.
- Satu mount global di layout utama `app/layout.js` via `<Toaster />`.
- Panggil `toast.success('...')` / `toast.error('...')` / `toast.info('...')` / `toast.warning('...')` dari mana saja.

**ErrorDialog untuk error aksi (submit, delete, save)** — blocking:
- User harus melakukan aksi menutup (acknowledge) terlebih dahulu sebelum melanjutkan — mengurangi risiko pesan error diabaikan.
- Form/delete dialog tetap terbuka agar user tidak kehilangan data yang sudah diketik ➡️ user bisa mencoba kembali setelah menutup error dialog.
- Di-render sebagai sibling di dalam form/modal dialog.

**Inline `<Alert>` (Custom CSS/Tailwind Alert)** hanya untuk page-level load error (misalnya fetch portofolio gagal pada saat pemuatan awal).

---

## Snackbar

### Mount (sudah di-set up)

Di layout utama `app/layout.js`, kita me-mount `<Toaster />` secara global:

```jsx
// app/layout.js
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
```

### Call API

```jsx
import { toast } from 'sonner';

// Success
toast.success('Portofolio berhasil disimpan!');
toast.success('Data berhasil dihapus');

// Info
toast.info('Perubahan disimpan sebagai draft');

// Warning
toast.warning('Data formulir belum lengkap');

// Error (minor — untuk error ringan non-critical)
toast.error('Gagal menyalin tautan');

// Plain default (dark background)
toast('Teks disalin ke clipboard');

// Dengan description
toast.success('Berhasil', { description: 'Website UMKM berhasil disimpan ke database' });
```

Auto-dismiss 4 detik secara default. Posisi di kanan bawah (`bottom-right`).

### Untuk success/info ➡️ **selalu** pakai toast

```jsx
// ❌ Salah — menggunakan state lokal + Alert inline di atas list/form
const [feedback, setFeedback] = useState({ type: 'success', message: 'Tersimpan' });
{feedback && <div className="alert-success">{feedback.message}</div>}

// ✅ Benar — imperative, tanpa state lokal
toast.success('Perubahan berhasil disimpan!');
```

### Untuk error aksi ➡️ **ErrorDialog**, bukan `toast.error`

Error dari aksi kirim formulir/simpan portofolio/hapus data membutuhkan perhatian pengguna. Gunakan komponen `<ErrorDialog>`.

`toast.error` hanya boleh digunakan untuk error ringan (misal gagal copy link, gagal download).

---

## ErrorDialog

### Import & State

```jsx
import { useState } from 'react';
import ErrorDialog from '@/components/ErrorDialog';

const [errorMsg, setErrorMsg] = useState(null);
```

### Pattern di Form Dialog

Gunakan React Fragment untuk me-render `ErrorDialog` sebagai sibling (bukan child) dari modal utama agar styling portal tidak bentrok:

```jsx
return (
  <>
    {/* Modal Form Portofolio */}
    <div className={`fixed inset-0 z-modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-bg-card border border-border rounded-2xl p-8">
        <h3 className="text-xl font-heading font-bold mb-6">Tambah Portofolio</h3>
        
        <form onSubmit={onSave} className="space-y-4">
          {/* Form fields — Dilarang menampilkan alert error inline di sini */}
          
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">Batal</button>
            <button type="submit" className="btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>

    {/* Sibling Error Dialog */}
    <ErrorDialog
      open={!!errorMsg}
      message={errorMsg}
      onClose={() => setErrorMsg(null)}
    />
  </>
);
```

### onSubmit Handler

```jsx
const onSave = async (e) => {
  e.preventDefault();
  setErrorMsg(null);
  setSubmitting(true);
  
  try {
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      onSaved(); // Memicu toast.success di parent + close modal
    } else {
      setErrorMsg('Gagal menyimpan ke database Supabase. Periksa jaringan Anda.');
    }
  } catch (err) {
    setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
  } finally {
    setSubmitting(false);
  }
};
```

### Pattern di Confirm Delete Dialog

Sama persis, letakkan `<ErrorDialog>` sebagai sibling dari dialog konfirmasi hapus:

```jsx
return (
  <>
    {/* Modal Hapus */}
    {isDeleteOpen && (
      <div className="fixed inset-0 z-modal flex items-center justify-center">
        <div className="bg-bg-card border border-border p-6 rounded-2xl text-center">
          <h3 className="text-lg font-bold mb-4">Hapus Item?</h3>
          <p className="text-xs text-text-secondary mb-6">Tindakan ini tidak bisa dibatalkan.</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary">Batal</button>
            <button onClick={onConfirm} className="bg-red-600 text-white rounded-lg px-4 py-2">Hapus</button>
          </div>
        </div>
      </div>
    )}

    <ErrorDialog open={!!errorMsg} message={errorMsg} onClose={() => setErrorMsg(null)} />
  </>
);
```

### Cleanup on Close

Reset state `errorMsg` saat modal ditutup agar state lama tidak terbawa saat modal dibuka kembali:

```javascript
useEffect(() => {
  if (!isOpen) setErrorMsg(null);
}, [isOpen]);
```

---

## End-to-End Flow Contoh

```jsx
// Parent View (app/admin/page.js)
const handleSaved = () => {
  fetchPortfolio();
  setIsFormOpen(false);
  toast.success('Portofolio berhasil ditambahkan!'); // ← Toast sukses di tingkat parent
};

// Form Dialog (components/FormDialog.js)
const onSave = async (e) => {
  e.preventDefault();
  try {
    const res = await savePortfolio(data);
    if (res.ok) {
      onSaved();
    } else {
      setErrorMsg('Koneksi Supabase terputus.'); // ← Error dialog di tingkat modal
    }
  } catch (err) {
    setErrorMsg(err.message);
  }
};
```

---

## Kapan Pakai Apa (Quick Ref)

| Kondisi | Penanganan |
|---|---|
| Simpan/Update/Delete **Sukses** | `toast.success(...)` |
| Draft Disimpan / Aksi Ringan **Sukses** | `toast.success(...)` |
| Simpan/Update/Delete **Gagal** (Critical Action) | `<ErrorDialog>` di samping modal form |
| Copy link/teks ke clipboard **Gagal** | `toast.error(...)` |
| Fetch data utama gagal pada pemuatan awal | Tampilkan alert box inline / empty state di halaman |
| Form Validation Error | Tampilkan teks error merah di bawah kolom input masing-masing |

---

## Error Message Source

- Error dari Backend (Supabase/API Route): Ambil dari parameter `err.message` atau `res.statusText`.
- Teks fallback standar: `'Gagal menyimpan perubahan. Silakan coba kembali.'`
- i18n translation: Gunakan dictionary helper (lihat [i18n.md](i18n.md)) jika multi-bahasa aktif.

---

## Komponen

| File / Modul | Peran |
|---|---|
| `sonner` | Library snackbar/toast pihak ketiga. |
| `components/ErrorDialog.js` | Modal dialog blocking kustom dengan border merah dan tombol Tutup. |

---

## Sonner Features Lain

```javascript
// Dismiss/Tutup toast spesifik
const id = toast.loading('Mengunggah gambar...');
setTimeout(() => toast.dismiss(id), 2000);

// Tutup semua toast
toast.dismiss();

// Promise Helper (Otomatis ganti ikon dari loading ke sukses/error)
toast.promise(uploadImageFile(), {
  loading: 'Mengunggah gambar ke Supabase...',
  success: 'Gambar berhasil diunggah!',
  error: 'Gagal mengunggah gambar.',
});
```

---

## Jangan

- ❌ Menggunakan state `feedback` lokal + banner alert di atas form ➡️ Ganti dengan `toast.success`.
- ❌ Menampilkan banner error inline (`bg-red-500`) di dalam Modal Form ➡️ Gunakan `<ErrorDialog>` sibling.
- ❌ Meletakkan `<ErrorDialog>` di dalam komponen `<Dialog>` secara bersarang (nested) ➡️ Letakkan sejajar sebagai sibling.
- ❌ Menggunakan `toast.error` untuk kegagalan critical (seperti DB write fail) ➡️ Wajib pakai `<ErrorDialog>` agar user sadar terjadi error.
- ❌ Membiarkan input form ter-reset saat simpan gagal ➡️ Data input harus tetap utuh agar user bisa memperbaikinya.
- ❌ Memasang library toast kustom lain di sub-komponen ➡️ Gunakan satu provider `sonner` di layout utama.
- ❌ Menggunakan native browser `alert()` ➡️ Semua harus menggunakan Custom UI.
- ❌ Mount `<Snackbar />` ulang di layout atau feature — sudah global di `app.tsx`

# React Form Fields & Input State

Next.js/React menggunakan metode **Controlled Inputs** untuk mengelola data formulir. Setiap field input diikat ke sebuah state React dan divalidasi sebelum dikirim ke API / WhatsApp.

## 1. Komponen Form Kontak (`components/ContactForm.js`)

Form kontak pada landing page mengirimkan data langsung ke aplikasi WhatsApp setelah divalidasi.

```jsx
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [pkg, setPkg] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Nama lengkap wajib diisi';
    if (!business.trim()) tempErrors.business = 'Nama usaha/brand wajib diisi';
    if (!pkg) tempErrors.pkg = 'Silakan pilih paket';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Build format pesan WhatsApp
    const message = [
      'Halo Gradivus Code!',
      '',
      `Saya *${name}* dari *${business}*.`,
      `Saya tertarik memesan paket: *${pkg}*.`,
      notes.trim() ? `Catatan tambahan:\n_${notes.trim()}_` : '',
      '',
      'Mohon informasi lebih lanjut. Terima kasih!'
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/6281358939283?text=${encodeURIComponent(message)}`;
    
    // Redirect ke WhatsApp tab baru
    window.open(waUrl, '_blank');
    
    // Show success feedback
    setSuccess(true);
    setName('');
    setBusiness('');
    setPkg('');
    setNotes('');

    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-bg-primary">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="text-3xl font-heading font-bold text-center mb-8">Hubungi Kami</h2>

        {success ? (
          <div className="text-center p-8 bg-bg-card border border-accent-teal rounded-2xl animate-fade-in">
            <span className="text-4xl">✓</span>
            <h3 className="text-xl font-bold mt-4 text-accent-teal">Pesan Terkirim!</h3>
            <p className="text-sm text-text-secondary mt-2">WhatsApp akan otomatis terbuka. Kami akan menghubungi Anda kembali.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Input Nama */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2" htmlFor="contact-name">Nama Lengkap</label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                }}
                placeholder="Masukkan nama Anda"
                className={`px-4 py-3 rounded-lg bg-bg-secondary border outline-none transition-all ${
                  errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border focus:border-accent-purple'
                }`}
              />
              {errors.name && <span className="text-xs text-red-500 mt-2">{errors.name}</span>}
            </div>

            {/* Input Nama Usaha */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2" htmlFor="contact-business">Nama Usaha/Brand</label>
              <input
                id="contact-business"
                type="text"
                value={business}
                onChange={(e) => {
                  setBusiness(e.target.value);
                  if (errors.business) setErrors(prev => ({ ...prev, business: null }));
                }}
                placeholder="Nama usaha Anda"
                className={`px-4 py-3 rounded-lg bg-bg-secondary border outline-none transition-all ${
                  errors.business ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border focus:border-accent-purple'
                }`}
              />
              {errors.business && <span className="text-xs text-red-500 mt-2">{errors.business}</span>}
            </div>

            {/* Select Jenis Paket */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2" htmlFor="contact-pkg">Pilihan Paket</label>
              <select
                id="contact-pkg"
                value={pkg}
                onChange={(e) => {
                  setPkg(e.target.value);
                  if (errors.pkg) setErrors(prev => ({ ...prev, pkg: null }));
                }}
                className={`px-4 py-3 rounded-lg bg-bg-secondary border outline-none transition-all ${
                  errors.pkg ? 'border-red-500' : 'border-border focus:border-accent-purple'
                }`}
              >
                <option value="">Pilih paket</option>
                <option value="Rintisan (Rp 1.500.000)">Rintisan — Rp 1.500.000</option>
                <option value="Tumbuh (Rp 2.800.000)">Tumbuh — Rp 2.800.000</option>
                <option value="Mapan (Rp 4.500.000)">Mapan — Rp 4.500.000</option>
                <option value="Belum Tahu">Belum Tahu</option>
              </select>
              {errors.pkg && <span className="text-xs text-red-500 mt-2">{errors.pkg}</span>}
            </div>

            {/* Textarea Catatan */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2" htmlFor="contact-notes">Catatan Tambahan (Opsional)</label>
              <textarea
                id="contact-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ceritakan tentang kebutuhan bisnis Anda..."
                rows="4"
                className="px-4 py-3 rounded-lg bg-bg-secondary border border-border focus:border-accent-purple outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-accent-purple to-accent-teal hover:shadow-lg hover:shadow-accent-purple/20 text-white font-bold rounded-full transition-all"
            >
              Kirim Pemesanan via WhatsApp
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
```

## Rules

1.  **Controlled Component:** Gunakan `value` yang diikat ke state React dan `onChange` handler pada setiap form input.
2.  **Native HTML Form Protection (`noValidate`):** Matikan default validation browser dan tangani semuanya via custom state validation React untuk UX yang lebih halus.
3.  **Visual Error State:** Ubah border input menjadi merah (`border-red-500`) dan berikan feedback teks tepat di bawah input field yang salah.
4.  **Auto-Clear Error:** Segera hapus pesan error begitu pengguna mulai mengetik ulang di input field tersebut.
5.  **Disabled submit/loading state:** Jika memicu submit ke API (seperti pada form tambah portofolio di admin panel), tambahkan disabled state pada button selama memproses query.

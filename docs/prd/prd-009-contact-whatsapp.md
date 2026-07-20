# PRD-009: Contact Form & WhatsApp Redirect Component

## Deskripsi
Komponen form pengiriman pesanan landing page. Formulir mengumpulkan nama lengkap, nama usaha, paket pilihan, dan catatan tambahan, divalidasi di sisi client, lalu mengalihkan pengguna ke aplikasi WhatsApp dengan string pesan pesanan otomatis. Menyertakan detail kontak agensi di bagian sidebar.

## Acceptance Criteria

- [ ] Komponen dibuat di `components/ContactForm.js` sebagai Client Component (`'use client'`)
- [ ] State management mengelola 4 input fields: Nama (required), Usaha (required), Paket (select, required), Catatan (optional)
- [ ] Validasi sisi client (client-side validation) dengan pesan error inline yang dinamis di bawah kolom input
- [ ] Submit Form: Memvalidasi input -> menyusun template teks pesanan -> encode string teks -> membuka tab baru ke `https://wa.me/`
- [ ] Setelah pengalihan sukses, sembunyikan form dan tampilkan halaman sukses (*success feedback panel*) selama 5 detik sebelum me-reset data form
- [ ] Tambahan tombol CTA sekunder untuk pengiriman via email (`mailto:`)
- [ ] Sidebar detail kontak: Tautan nomor WhatsApp, Email, Instagram, dan LinkedIn Gradivus Code

## Kode: `components/ContactForm.js`

```jsx
'use client';

import { useState } from 'react';
import { CONTACT_INFO } from '@/lib/constants'; // Atau import dari path constants kustom

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

    // Format Pesan WhatsApp
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
    
    // Tampilkan sukses panel & reset form
    setSuccess(true);
    setName('');
    setBusiness('');
    setPkg('');
    setNotes('');

    // Sembunyikan sukses panel setelah 5 detik
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-bg-primary border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-4">
            Mulai Proyek Anda
          </h2>
          <p className="text-text-secondary">Hubungi kami melalui form di bawah untuk konsultasi.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Column 1 & 2: Form Wrapper */}
          <div className="lg:col-span-2 bg-bg-card border border-border rounded-3xl p-8 shadow-md">
            {success ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-accent-teal/10 text-accent-teal text-3xl font-bold flex items-center justify-center rounded-full mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-2">
                  Pemesanan Berhasil!
                </h3>
                <p className="text-sm text-text-secondary">
                  Aplikasi WhatsApp akan otomatis terbuka. Kami akan segera menghubungi Anda kembali.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Nama */}
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
                    className={`px-4 py-3 rounded-xl bg-bg-primary border outline-none transition-all ${
                      errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border focus:border-accent-purple'
                    }`}
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-2">{errors.name}</span>}
                </div>

                {/* Nama Usaha */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2" htmlFor="contact-business">Nama Usaha / Brand</label>
                  <input
                    id="contact-business"
                    type="text"
                    value={business}
                    onChange={(e) => {
                      setBusiness(e.target.value);
                      if (errors.business) setErrors(prev => ({ ...prev, business: null }));
                    }}
                    placeholder="Masukkan nama usaha Anda"
                    className={`px-4 py-3 rounded-xl bg-bg-primary border outline-none transition-all ${
                      errors.business ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border focus:border-accent-purple'
                    }`}
                  />
                  {errors.business && <span className="text-xs text-red-500 mt-2">{errors.business}</span>}
                </div>

                {/* Select Paket */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2" htmlFor="contact-package">Pilih Paket Layanan</label>
                  <select
                    id="contact-package"
                    value={pkg}
                    onChange={(e) => {
                      setPkg(e.target.value);
                      if (errors.pkg) setErrors(prev => ({ ...prev, pkg: null }));
                    }}
                    className={`px-4 py-3.5 rounded-xl bg-bg-primary border outline-none transition-all ${
                      errors.pkg ? 'border-red-500' : 'border-border focus:border-accent-purple'
                    }`}
                  >
                    <option value="">Pilih paket</option>
                    <option value="Rintisan (Rp 1.500.000)">Rintisan — Rp 1.500.000</option>
                    <option value="Tumbuh (Rp 2.800.000)">Tumbuh — Rp 2.800.000</option>
                    <option value="Mapan (Rp 4.500.000)">Mapan — Rp 4.500.000</option>
                    <option value="Belum Tahu">Belum Tahu / Kustom</option>
                  </select>
                  {errors.pkg && <span className="text-xs text-red-500 mt-2">{errors.pkg}</span>}
                </div>

                {/* Catatan */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-2" htmlFor="contact-notes">Catatan Tambahan (Opsional)</label>
                  <textarea
                    id="contact-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tulis detail kebutuhan kustom Anda di sini..."
                    rows="4"
                    className="px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-accent-purple to-accent-teal hover:shadow-lg text-white font-bold rounded-full transition-all"
                  >
                    Kirim Pemesanan via WhatsApp
                  </button>
                  <a 
                    href="mailto:daffaahmadalattas@gmail.com"
                    className="w-full py-3.5 border border-border hover:border-accent-purple text-text-primary font-semibold rounded-full transition-all block text-center text-sm"
                  >
                    📧 Kirim via Email
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Column 3: Contact Sidebar Info */}
          <div className="bg-bg-card border border-border rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-heading font-bold mb-4">Info Kontak</h3>
            
            <div className="flex gap-4 items-start">
              <span className="text-xl">📱</span>
              <div>
                <p className="text-xs text-text-muted">WhatsApp</p>
                <a href="https://wa.me/6281358939283" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent-teal transition-colors">
                  0813-5893-9283
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-xl">📧</span>
              <div>
                <p className="text-xs text-text-muted">Email</p>
                <a href="mailto:daffaahmadalattas@gmail.com" className="text-sm font-medium hover:text-accent-teal transition-colors">
                  daffaahmadalattas@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-xl">📸</span>
              <div>
                <p className="text-xs text-text-muted">Instagram</p>
                <a href="https://www.instagram.com/dfaahm/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent-teal transition-colors">
                  @dfaahm
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-xl">💼</span>
              <div>
                <p className="text-xs text-text-muted">LinkedIn</p>
                <a href="https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent-teal transition-colors">
                  Daffa Ahmad Al Attas
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
```

## QA Checklist

- [ ] Form dimuat dengan 4 input fields yang bersih
- [ ] Mengklik submit tanpa mengisi field required memicu error text merah inline
- [ ] Form tidak ter-submit (tidak reload) saat terdapat validasi yang gagal
- [ ] Mengisi input divalidasi sukses dan membuka tab baru mengarah ke WhatsApp API
- [ ] String pesan teks WhatsApp ter-encode dengan aman dan memuat info rekap pemesanan lengkap
- [ ] Form tersembunyi dan digantikan oleh Success Panel setelah submit berhasil
- [ ] Form di-reset otomatis dan dimuat ulang setelah 5 detik penayangan Success Panel
- [ ] Sidebar info kontak terhubung dengan URL eksternal yang benar (WA, Email, IG, LinkedIn)
- [ ] Mobile: Layar formulir ter-render 1 kolom secara vertikal

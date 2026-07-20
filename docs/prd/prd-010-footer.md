# PRD-010: Footer Component

## Deskripsi
Komponen `Footer` statis yang diletakkan di dasar halaman. Berisi 3 kolom: Informasi Brand & Tagline, Navigasi Quick Links, serta Tautan Kontak Sosial Media. Dilengkapi bagian copyright bar di paling bawah.

## Acceptance Criteria

- [ ] Komponen dibuat di `components/Footer.js` sebagai Server Component (default) untuk performa optimal
- [ ] Logo brand dimuat di kolom kiri (menggunakan `next/image` dengan lebar tetap 120px)
- [ ] Tagline brand tercantum dengan jelas di bawah logo
- [ ] Kolom tengah: Tautan Quick Links navigasi satu halaman scroll ke section target (`#services`, `#portfolio`, `#calculator`, `#faq`, `#contact`)
- [ ] Kolom kanan: Tautan kontak sosial media (WhatsApp, Email, Instagram, LinkedIn) Gradivus Code
- [ ] Bagian bawah footer: Hak cipta copyright dinamis tahun 2026 Gradivus Code & "Dibuat dengan ❤️ di Indonesia"
- [ ] Hover effect: Tautan menu berubah warna menjadi warna accent hover
- [ ] Grid responsive layout: 1 kolom di mobile, 3 kolom di desktop

## Kode: `components/Footer.js`

```jsx
import Image from 'next/image';

const QUICK_LINKS = [
  { label: 'Layanan', href: '#services' },
  { label: 'Portofolio', href: '#portfolio' },
  { label: 'Estimasi Harga', href: '#calculator' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#contact' },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-bg-secondary border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Image 
              src="/logo/gradiuscode.svg" 
              alt="Gradivus Code" 
              width={120} 
              height={31} 
              loading="lazy"
            />
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              Solusi digital premium untuk UMKM Indonesia. Membuat website Anda cepat, estetis, dan profesional.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold font-heading text-text-primary">Quick Links</h4>
            <nav className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-accent-teal transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Social & Contact Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold font-heading text-text-primary">Hubungi Kami</h4>
            <div className="flex flex-col gap-2.5">
              <a href="https://wa.me/6281358939283" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-teal transition-colors">
                📱 0813-5893-9283
              </a>
              <a href="mailto:daffaahmadalattas@gmail.com" className="text-sm text-text-secondary hover:text-accent-teal transition-colors">
                📧 daffaahmadalattas@gmail.com
              </a>
              <a href="https://www.instagram.com/dfaahm/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-teal transition-colors">
                📸 @dfaahm
              </a>
              <a href="https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-teal transition-colors">
                💼 Daffa Ahmad Al Attas
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© 2026 Gradivus Code. All rights reserved.</p>
          <p className="flex items-center gap-1">Dibuat dengan <span className="text-red-500 animate-pulse">❤️</span> di Indonesia</p>
        </div>

      </div>
    </footer>
  );
}
```

## QA Checklist

- [ ] Logo brand `gradiuscode.svg` ter-render di footer menggunakan `next/image`
- [ ] Tagline brand tercantum dengan benar
- [ ] Link Quick Links dan sosial media eksternal terhubung secara tepat
- [ ] Klik Quick Links memicu navigasi smooth scroll ke target section ID di satu halaman
- [ ] copyright teks tahun 2026 Gradivus Code muncul
- [ ] Hover effect tautan warna hover accent teal berjalan lancar
- [ ] Grid responsive layout footer terdistribusi dengan benar (1 col mobile, 3 col desktop)

# PRD-004: Hero Section Component

## Deskripsi
Section pertama landing page yang memikat pengunjung. Dilengkapi headline persuasif, subheadline, dual CTA, data sosial proof (stats row), dan ilustrasi laptop mockup interaktif yang estetik di desktop.

## Acceptance Criteria

- [ ] Komponen dibuat di `components/Hero.js` sebagai Server Component (default) untuk performa optimal
- [ ] Headline utama: "Bikin Usahamu Naik Kelas dengan Website Estetis & Super Cepat"
- [ ] Text gradient or accent warna pada kata "Naik Kelas"
- [ ] Subheadline yang ringkas, menyakinkan, dan persuasif
- [ ] Tombol CTA Utama: "Lihat Paket Harga" (smooth scroll ke `#services`)
- [ ] Tombol CTA Kedua: "Konsultasi Gratis via WhatsApp" (link ke tab baru WhatsApp)
- [ ] Animasi gradient background bergerak halus di belakang layar (CSS keyframes)
- [ ] Stats Row: 3 baris angka bukti sosial (50+ Proyek Selesai, 100% Klien Puas, 90+ Skor PageSpeed)
- [ ] Laptop mockup visual menggunakan CSS styling modern (mencegah load asset gambar besar)
- [ ] Grid responsive layout: 2 kolom di desktop, stacked centered di mobile

## Kode: `components/Hero.js`

```jsx
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-[-50%] bg-gradient-to-tr from-accent-purple/15 via-bg-primary to-accent-teal/5 animate-gradient-shift z-[-1]" />
      
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col text-center lg:text-left animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
            Bikin Usahamu <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal">Naik Kelas</span> dengan Website Estetis & Super Cepat
          </h1>
          <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Paket lengkap Landing Page + Branding untuk UMKM Indonesia. Desain premium, performa ringan, harga mulai <span className="text-white font-semibold">Rp 1,5 juta</span>. Tanpa biaya bulanan tersembunyi.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <a href="#services" className="btn-primary text-base px-8 py-3.5">
              Lihat Paket Harga
            </a>
            <a 
              href="https://wa.me/6281358939283?text=Halo%20Gradivus%20Code,%20saya%20tertarik%20konsultasi%20pembuatan%20website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary text-base px-8 py-3.5"
            >
              💬 Konsultasi Gratis
            </a>
          </div>

          {/* Social Proof Stats */}
          <div className="flex gap-8 justify-center lg:justify-start">
            <div>
              <div className="text-3xl font-heading font-bold text-accent-purple">50+</div>
              <div className="text-xs text-text-muted mt-1">Proyek Selesai</div>
            </div>
            <div className="w-[1px] bg-border self-stretch" />
            <div>
              <div className="text-3xl font-heading font-bold text-accent-teal">100%</div>
              <div className="text-xs text-text-muted mt-1">Klien Puas</div>
            </div>
            <div className="w-[1px] bg-border self-stretch" />
            <div>
              <div className="text-3xl font-heading font-bold text-accent-purple">90+</div>
              <div className="text-xs text-text-muted mt-1">Skor PageSpeed</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual CSS Mockup (Desktop Only) */}
        <div className="hidden lg:block animate-fade-in delay-200">
          <div className="relative group perspective-1000">
            {/* Screen Box */}
            <div className="bg-bg-card border border-border rounded-2xl p-4 shadow-glow rotate-y-[-6deg] rotate-x-[3deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out">
              {/* Header Bar */}
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="w-2/3 h-3 bg-bg-primary rounded-full ml-4" />
              </div>
              {/* Dummy page content wireframe */}
              <div className="space-y-3">
                <div className="h-32 bg-gradient-to-tr from-accent-purple/10 to-accent-teal/5 rounded-xl w-full" />
                <div className="h-4 bg-bg-card-hover rounded-full w-full" />
                <div className="h-4 bg-bg-card-hover rounded-full w-5/6" />
                <div className="h-4 bg-bg-card-hover rounded-full w-2/3" />
                <div className="flex gap-3 pt-2">
                  <div className="h-8 bg-accent-purple/20 rounded-full w-24" />
                  <div className="h-8 bg-bg-card-hover rounded-full w-32" />
                </div>
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

- [ ] Teks h1 besar, responsive, dan memiliki aksen text-gradient pada kata "Naik Kelas"
- [ ] Latar belakang memiliki transisi warna gradient halus yang bergerak konstan
- [ ] Tombol CTA Utama bergulir mulus (smooth scroll) ke section `#services`
- [ ] Tombol CTA Kedua membuka tab baru WhatsApp
- [ ] Stats Row menampilkan 3 data point secara horizontal (di desktop)
- [ ] Mockup laptop CSS tampil rapi di desktop dan tersembunyi di mobile
- [ ] Animasi masuk halaman (fade-in) berjalan halus saat web pertama kali di-load
- [ ] Jarak padding atas cukup sehingga content tidak menabrak Navbar sticky

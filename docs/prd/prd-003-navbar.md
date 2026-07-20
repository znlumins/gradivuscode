# PRD-003: Navbar & Header Component

## Deskripsi
Komponen `Navbar` sticky di bagian atas landing page. Berwarna transparan di bagian atas, dan otomatis memicu efek blur backdrop saat di-scroll ke bawah > 50px. Menyertakan navigasi satu halaman scroll dan tombol drawer menu hamburger yang responsif di mobile.

## Acceptance Criteria

- [ ] Komponen dibuat di `components/Navbar.js` sebagai Client Component (`'use client'`)
- [ ] Logo brand di kiri link ke `#hero` (menggunakan `next/image` dengan properti `priority`)
- [ ] 5 Navigasi link: Layanan, Portofolio, Harga, FAQ, Kontak
- [ ] CTA "Konsultasi Gratis" link langsung ke WhatsApp di kanan
- [ ] Saat halaman di-scroll > 50px, background berubah menjadi semi-transparan dengan efek blur (`backdrop-blur-md`)
- [ ] Klik link navigasi memicu smooth scroll ke target section ID dengan memperhitungkan tinggi navbar
- [ ] Active Link Highlight: Kategori menu yang aktif ter-highlight (Intersection Observer)
- [ ] Hamburger Menu di mobile (< 768px): drawer meluncur dari kanan, hamburger bar berubah menjadi X, body tidak bisa di-scroll ketika drawer aktif
- [ ] Keyboard accessible (focus ring & tab navigation aktif)

## Kode: `components/Navbar.js`

```jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Layanan', href: '#services' },
  { label: 'Portofolio', href: '#portfolio' },
  { label: 'Harga', href: '#calculator' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  // Handle scroll blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Active Link Highlight (Intersection Observer)
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px', // Trigger ketika section berada di tengah layar
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const target = document.querySelector(href);
    if (!target) return;

    const navbarHeight = 80; // 80px height
    const targetPosition = target.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-navbar transition-all duration-300 h-20 flex items-center ${
        scrolled 
          ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="relative z-[110]">
            <Image 
              src="/logo/gradiuscode.svg" 
              alt="Gradivus Code" 
              width={140} 
              height={36} 
              priority
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-8 items-center" aria-label="Navigasi desktop">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`text-sm font-medium transition-colors hover:text-white relative py-2 ${
                  activeSection === item.href ? 'text-white font-semibold' : 'text-text-secondary'
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-purple to-accent-teal rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/6281358939283" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary px-6 py-2.5 text-xs"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[110] p-2 flex flex-col justify-between h-9 w-10 border border-border rounded-lg bg-bg-card/50"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className={`h-[2px] w-full bg-white rounded transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <div className={`h-[2px] w-full bg-white rounded transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`h-[2px] w-full bg-white rounded transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>

          {/* Mobile Navigation Drawer */}
          <div className={`fixed inset-y-0 right-0 w-[280px] bg-bg-secondary border-l border-border p-12 pt-28 flex flex-col gap-8 transition-transform duration-300 z-[105] md:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`text-lg font-medium transition-colors ${
                  activeSection === item.href ? 'text-accent-teal font-semibold' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="https://wa.me/6281358939283" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full text-center mt-4 py-3"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Overlay Background */}
          {isOpen && (
            <div 
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100] md:hidden animate-fade-in"
            />
          )}

        </div>
      </header>
    </>
  );
}
```

## QA Checklist

- [ ] Navbar transparan saat halaman berada di paling atas
- [ ] Scroll kebawah > 50px memunculkan backdrop blur dan background semi-transparan
- [ ] Klik link navigasi memicu scroll halus (smooth scroll) ke section yang tepat
- [ ] Indikator garis bawah aktif berpindah sesuai section yang sedang dibaca di layar
- [ ] Mobile: Klik hamburger button membuka drawer navigasi dari kanan
- [ ] Mobile: Hamburger button bertransformasi animasi menjadi ikon X
- [ ] Mobile: Mengklik area gelap (overlay) di luar drawer akan menutup drawer navigasi
- [ ] Mobile: Layar utama di belakang drawer terkunci (body tidak bisa di-scroll) saat drawer aktif
- [ ] Tombol CTA mengarahkan ke tab baru WhatsApp
- [ ] Semua elemen navigasi mendukung keyboard Tab focus

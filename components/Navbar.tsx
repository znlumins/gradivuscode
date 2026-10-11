'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const { lang, changeLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(isHome ? '#hero' : pathname);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const NAV_ITEMS = [
    { label: t.nav.services, href: isHome ? '#services' : '/#services', isRoute: false, hash: '#services' },
    { label: t.nav.portfolio, href: '/portfolio', isRoute: true, hash: '/portfolio' },
    { label: t.nav.calculator, href: isHome ? '#calculator' : '/#calculator', isRoute: false, hash: '#calculator' },
    { label: t.nav.faq, href: isHome ? '#faq' : '/#faq', isRoute: false, hash: '#faq' },
    { label: t.nav.contact, href: isHome ? '#contact' : '/#contact', isRoute: false, hash: '#contact' },
  ];

  // Jank-free Scroll Sentinel Observer (no window scroll listeners to prevent lagging)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => {
      observer.unobserve(sentinel);
    };
  }, []);

  // Handle Active Link Highlight (Intersection Observer on home, pathname on other pages)
  useEffect(() => {
    if (!isHome) {
      setActiveSection(pathname);
      return;
    }

    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
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
  }, [isHome, pathname]);

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    if (isHome && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const navbarHeight = 80;
      const targetPosition = (target as HTMLElement).offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Programmatic Scroll Sentinel Element */}
      <div ref={sentinelRef} className="absolute top-0 left-0 w-1 h-1 pointer-events-none" />

      <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-navbar transition-all duration-500 rounded-full border h-16 flex items-center px-6 ${
        scrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md shadow-card border-zinc-800'
          : 'bg-[#09090b]/80 backdrop-blur-[2px] border-zinc-800/40'
      }`}>
        <div className="w-full flex items-center justify-between">

          {/* Logo */}
          {isHome ? (
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="relative z-[110] flex items-center">
              <Image
                src="/gradiuscode.svg"
                alt="Gradivus Code"
                width={100}
                height={26}
                priority
                className="brightness-125"
              />
            </a>
          ) : (
            <Link href="/" onClick={() => setIsOpen(false)} className="relative z-[110] flex items-center">
              <Image
                src="/gradiuscode.svg"
                alt="Gradivus Code"
                width={100}
                height={26}
                priority
                className="brightness-125"
              />
            </Link>
          )}

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-8 items-center" aria-label="Navigasi desktop">
            {NAV_ITEMS.map((item) => {
              const isActive = item.isRoute
                ? pathname === item.href
                : isHome && activeSection === item.hash;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-white relative py-2 ${
                      isActive ? 'text-accent-purple' : 'text-zinc-100'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-purple rounded-full animate-fade-in" />
                    )}
                  </Link>
                );
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-white relative py-2 ${
                    isActive ? 'text-accent-purple' : 'text-zinc-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-purple rounded-full animate-fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Row: Switch Lang + CTA */}
          <div className="hidden md:flex items-center gap-6">
            {/* Simple Inline Language Switcher */}
            <div className="flex items-center bg-black/50 border border-zinc-800 rounded-full p-1 gap-1">
              <button
                onClick={() => changeLanguage('id')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  lang === 'id' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  lang === 'en' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="https://wa.me/6281358939283"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2 text-xs font-medium"
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[110] h-10 w-10 border border-zinc-800 rounded-full bg-black/60 flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="relative w-5 h-5 flex flex-col justify-center items-center">
              <span className={`h-[2px] w-5 bg-white rounded transition-all duration-300 absolute ${isOpen ? 'rotate-45' : '-translate-y-[6px]'}`} />
              <span className={`h-[2px] w-5 bg-white rounded transition-all duration-300 absolute ${isOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`h-[2px] w-5 bg-white rounded transition-all duration-300 absolute ${isOpen ? '-rotate-45' : 'translate-y-[6px]'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer - sibling of header to escape translate containing block */}
      <div className={`fixed inset-y-0 right-0 w-[260px] bg-[#0f0f13]/95 backdrop-blur-2xl border-l border-zinc-800 p-8 pt-24 flex flex-col gap-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-[105] md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.isRoute
            ? pathname === item.href
            : isHome && activeSection === item.hash;

          if (item.isRoute) {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`text-lg font-medium transition-colors ${
                isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          );
        })}

        {/* Mobile Lang switcher */}
        <div className="flex items-center bg-black/50 border border-zinc-800 rounded-full p-1 gap-1 w-fit mx-auto mt-2">
          <button
            onClick={() => changeLanguage('id')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              lang === 'id' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            ID
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              lang === 'en' ? 'bg-accent-purple text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>

        <a
          href="https://wa.me/6281358939283"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center mt-4 py-3 text-sm font-semibold"
        >
          {t.nav.cta}
        </a>
      </div>

      {/* Mobile Overlay Background - sibling of header to escape translate containing block */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] md:hidden animate-fade-in"
        />
      )}
    </>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { Phone, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const QUICK_LINKS = [
    { labelKey: 'services' as const, href: isHome ? '#services' : '/#services', isRoute: false },
    { labelKey: 'portfolio' as const, href: '/portfolio', isRoute: true },
    { labelKey: 'calculator' as const, href: isHome ? '#calculator' : '/#calculator', isRoute: false },
    { labelKey: 'faq' as const, href: isHome ? '#faq' : '/#faq', isRoute: false },
    { labelKey: 'contact' as const, href: isHome ? '#contact' : '/#contact', isRoute: false },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const navbarHeight = 80;
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer id="footer" className="bg-bg-primary border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            {isHome ? (
              <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')}>
                <Image
                  src="/gradiuscode.svg"
                  alt="Gradivus Code"
                  width={120}
                  height={31}
                  loading="lazy"
                  className="brightness-0"
                />
              </a>
            ) : (
              <Link href="/">
                <Image
                  src="/gradiuscode.svg"
                  alt="Gradivus Code"
                  width={120}
                  height={31}
                  loading="lazy"
                  className="brightness-0"
                />
              </Link>
            )}
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-medium font-heading text-text-primary">{t.footer.quickLinks}</h4>
            <nav className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => {
                if (link.isRoute) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-accent-teal transition-colors w-fit"
                    >
                      {t.nav[link.labelKey]}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-text-secondary hover:text-accent-teal transition-colors w-fit"
                  >
                    {t.nav[link.labelKey]}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Column 3: Social & Contact Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-medium font-heading text-text-primary">{t.footer.contactUs}</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/6281358939283" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-text-secondary hover:text-accent-teal transition-colors inline-flex items-center gap-2 w-fit group"
              >
                <Phone className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>0813-5893-9283</span>
              </a>
              <a 
                href="mailto:daffaahmadalattas@gmail.com" 
                className="text-sm text-text-secondary hover:text-accent-teal transition-colors inline-flex items-center gap-2 w-fit group"
              >
                <Mail className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>daffaahmadalattas@gmail.com</span>
              </a>
              <a 
                href="https://www.instagram.com/dfaahm/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-text-secondary hover:text-accent-teal transition-colors inline-flex items-center gap-2 w-fit group"
              >
                <FaInstagram className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>@dfaahm</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-text-secondary hover:text-accent-teal transition-colors inline-flex items-center gap-2 w-fit group"
              >
                <FaLinkedin className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Daffa Ahmad Al Attas</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-xs text-text-muted">
          <p>{t.footer.copyright}</p>
        </div>

      </div>
    </footer>
  );
}

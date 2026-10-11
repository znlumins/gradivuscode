'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Globe, Palette, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function PortfolioTeaser() {
  const { lang, t } = useLanguage();

  const isId = lang === 'id';

  const previewItems = [
    {
      title: isId ? 'Website Kedai Kopi Nusantara' : 'Nusantara Coffee Shop Website',
      category: isId ? 'Website Bisnis' : 'Business Website',
      icon: Globe,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
    },
    {
      title: isId ? 'Landing Page Klinik Kecantikan' : 'Aesthetic Clinic Landing Page',
      category: isId ? 'One-Page Web' : 'One-Page Web',
      icon: Sparkles,
      color: 'from-accent-purple/20 to-pink-500/20 text-accent-purple',
    },
    {
      title: isId ? 'Identitas Visual Toko Roti' : 'Artisan Bakery Visual Identity',
      category: isId ? 'Branding & Logo' : 'Branding & Logo',
      icon: Palette,
      color: 'from-accent-teal/20 to-emerald-500/20 text-accent-teal',
    },
  ];

  return (
    <section className="py-20 bg-bg-primary border-t border-border relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isId ? 'Karya Kami' : 'Our Work'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-text-primary">
              {t.portfolio.heading}
            </h2>
            <p className="text-text-secondary text-sm md:text-base mt-2 max-w-xl">
              {t.portfolio.subtitle}
            </p>
          </div>

          <Link
            href="/portfolio"
            className="btn-primary inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 text-sm font-semibold group whitespace-nowrap"
          >
            <span>{isId ? 'Lihat Semua Portofolio' : 'View All Portfolios'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Interactive Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href="/portfolio"
                className="group p-6 rounded-3xl bg-bg-card border border-border hover:border-accent-purple/50 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-48"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="p-2 rounded-full bg-white/5 text-text-muted group-hover:text-accent-purple group-hover:bg-accent-purple/10 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-teal">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-text-primary group-hover:text-accent-purple transition-colors mt-1">
                    {item.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

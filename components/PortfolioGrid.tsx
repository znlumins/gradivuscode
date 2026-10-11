'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Lightbox, { PortfolioItem } from './Lightbox';

const PLACEHOLDERS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Website Kedai Kopi Nusantara',
    category: 'website',
    description: 'Landing page modern untuk kedai kopi lokal dengan tema warm, elegan, dan pemesanan WhatsApp terintegrasi.',
    imageUrl: '',
    demoUrl: 'https://gradivuscode.vercel.app',
  },
  {
    id: 'p2',
    title: 'Branding Toko Roti Artisan',
    category: 'branding',
    description: 'Desain logo, kartu nama, dan banner media sosial untuk toko roti premium.',
    imageUrl: '',
  },
  {
    id: 'p3',
    title: 'Landing Page Klinik Kecantikan',
    category: 'website',
    description: 'One-page website dengan booking konsultasi online dan galeri katalog layanan.',
    imageUrl: '',
    demoUrl: 'https://gradivuscode.vercel.app',
  },
  {
    id: 'p4',
    title: 'Identitas Visual Warung Spesial Sambal',
    category: 'branding',
    description: 'Identitas visual lengkap: logo, daftar menu digital, dan packaging ramah lingkungan.',
    imageUrl: '',
  },
  {
    id: 'p5',
    title: 'Katalog Online Brand Fashion',
    category: 'website',
    description: 'Website multi-page dengan katalog produk interaktif, fitur filter, dan checkout via WhatsApp.',
    imageUrl: '',
    demoUrl: 'https://gradivuscode.vercel.app',
  },
  {
    id: 'p6',
    title: 'Desain Banner Kampanye Instagram',
    category: 'branding',
    description: 'Set 12 template banner Instagram feed & story untuk brand minuman kekinian.',
    imageUrl: '',
  },
];

export default function PortfolioGrid() {
  const { t } = useLanguage();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'website' | 'branding'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setItems(data);
          } else {
            setItems(PLACEHOLDERS);
          }
        } else {
          setItems(PLACEHOLDERS);
        }
      } catch {
        setItems(PLACEHOLDERS);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  const filteredItems = filter === 'all'
    ? items
    : items.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="pb-24 pt-4 md:pt-8 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-text-primary mb-4">
            {t.portfolio.heading}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-12 justify-center overflow-x-auto pb-2">
          {(['all', 'website', 'branding'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-accent-purple border-accent-purple text-white shadow-lg shadow-accent-purple/20'
                  : 'bg-bg-card border-border text-text-secondary hover:text-text-primary hover:border-zinc-400 hover:bg-zinc-100'
              }`}
            >
              {cat === 'all'
                ? t.portfolio.filterAll
                : cat === 'website'
                ? t.portfolio.filterWebsite
                : t.portfolio.filterBranding}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-bg-card border border-border rounded-3xl overflow-hidden aspect-[4/3] animate-pulse"
              />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-bg-card border border-border rounded-3xl max-w-lg mx-auto">
            <p className="text-text-secondary text-sm">{t.portfolio.emptyText}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group flex flex-col bg-bg-card border border-border rounded-3xl overflow-hidden cursor-pointer hover:border-accent-purple/50 hover:shadow-card-hover transition-all duration-300"
              >
                {/* Image / Screenshot Container */}
                <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden border-b border-border">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    />
                  ) : item.demoUrl ? (
                    <Image
                      src={`/api/screenshot?url=${encodeURIComponent(item.demoUrl)}`}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-bg-card via-accent-purple/10 to-accent-teal/10 flex items-center justify-center text-text-secondary text-xs uppercase tracking-widest font-semibold p-4 text-center">
                      <Globe className="w-8 h-8 text-accent-teal/60 mb-1" />
                    </div>
                  )}

                </div>

                {/* Permanent Clean Content Underneath (No Hover Hiding) */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-text-primary group-hover:text-accent-purple transition-colors mb-1.5 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.demoUrl && (
                    <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-text-muted">
                      <span className="truncate max-w-[200px] text-accent-teal font-medium">
                        {item.demoUrl.replace(/^https?:\/\//, '')}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-purple transition-colors" />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal Lightbox */}
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </section>
  );
}

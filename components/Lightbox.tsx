'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, X, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  created_at?: string;
}

interface LightboxProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  const { t } = useLanguage();

  // Escape key handler and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Sumber gambar: prioritas gambar manual -> fallback screenshot statis dari link web
  const imageSource = item.imageUrl
    ? item.imageUrl
    : item.demoUrl
    ? `/api/screenshot?url=${encodeURIComponent(item.demoUrl)}`
    : null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Bar Controls */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-bg-secondary/60">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-teal/15 text-accent-teal">
              {item.category === 'website' ? t.portfolio.filterWebsite : t.portfolio.filterBranding}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-all cursor-pointer"
            aria-label={t.portfolio.closeModal}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Window: Pure Static Image / Static Screenshot (No Iframe, Super Lightweight) */}
        <div className="relative w-full aspect-video sm:aspect-[16/10] bg-zinc-950 overflow-hidden shrink-0">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={item.title}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 1000px"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-text-secondary text-sm font-semibold tracking-wider uppercase p-6 text-center">
              <Globe className="w-8 h-8 text-accent-teal mb-2" />
              <span>{item.title}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-primary">
              {item.title}
            </h3>

            {item.demoUrl && (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold shrink-0"
              >
                <span>{t.portfolio.viewDemo}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

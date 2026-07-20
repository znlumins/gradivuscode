'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { MessageCircle } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative pt-40 pb-20 md:min-h-[100dvh] md:flex md:items-center md:justify-center md:pt-24 md:pb-16 overflow-hidden bg-bg-primary">
      
      {/* Grid Pattern Background for B2B tech feel */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      
      {/* Subtle linear glow centered in B2B Emerald Green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-purple/10 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center z-10 animate-fade-in">
        
        {/* Value Prop Headline - Uses font-medium for clean B2B look instead of font-bold */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight tracking-tight mb-6 max-w-3xl">
          {t.hero.titleBefore}<span className="text-accent-purple">{t.hero.titleHighlight}</span>{t.hero.titleAfter}
        </h1>
        
        {/* Subtitle description */}
        <p className="text-base md:text-lg text-text-secondary mb-8 md:mb-10 max-w-2xl leading-relaxed">
          {t.hero.subtitle}
        </p>
        
        {/* Action Row buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center w-full max-w-xs md:max-w-none md:w-auto mx-auto">
          <a href="#services" className="btn-primary text-base px-8 py-3.5 text-center">
            {t.hero.ctaPrice}
          </a>
          <a 
            href={`https://wa.me/6281358939283?text=${encodeURIComponent(t.hero.waTemplate)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary text-base px-8 py-3.5 inline-flex items-center justify-center gap-2 text-center"
          >
            <MessageCircle className="w-5 h-5" />
            {t.hero.ctaConsult}
          </a>
        </div>

      </div>
    </section>
  );
}

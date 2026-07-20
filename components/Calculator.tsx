'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export const CALC_PRICING = {
  website: {
    'landing-page': { label: 'Landing Page (1 Halaman)', price: 800000 },
    'website-umkm': { label: 'Website UMKM (3 Halaman)', price: 2000000 },
    'katalog-interaktif': { label: 'Katalog Interaktif', price: 3000000 },
  },
  branding: {
    'tidak-perlu': { label: 'Tidak Perlu', price: 0 },
    'logo-saja': { label: 'Desain Logo Saja', price: 500000 },
    'branding-lengkap': { label: 'Paket Branding Lengkap', price: 1200000 },
  },
  addons: {
    'google-maps': { label: 'Setup Google Maps', price: 150000 },
    'copywriting': { label: 'Copywriting Premium', price: 300000 },
    'analytics': { label: 'Integrasi Analytics', price: 200000 },
  }
};

// Custom Hook untuk Animasi Angka
function useCounter(targetValue: number, duration = 400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = count;
    const end = parseInt(String(targetValue), 10);
    if (start === end) return;

    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      const currentVal = Math.round(start + (end - start) * eased);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue]);

  return count;
}

export default function Calculator() {
  const { lang, t } = useLanguage();
  const [website, setWebsite] = useState('landing-page');
  const [branding, setBranding] = useState('tidak-perlu');
  const [addons, setAddons] = useState<string[]>([]);
  const [total, setTotal] = useState(800000);
  const [isVisible, setIsVisible] = useState(false);

  // Monitor visibility of the calculator section to trigger the mobile sticky summary bar
  useEffect(() => {
    const section = document.getElementById('calculator');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);

  // Hitung total harga setiap kali ada perubahan state pilihan
  useEffect(() => {
    let sum = CALC_PRICING.website[website as keyof typeof CALC_PRICING.website].price;
    sum += CALC_PRICING.branding[branding as keyof typeof CALC_PRICING.branding].price;

    addons.forEach((addon) => {
      sum += CALC_PRICING.addons[addon as keyof typeof CALC_PRICING.addons].price;
    });

    setTotal(sum);
  }, [website, branding, addons]);

  const handleAddonChange = (addonKey: string) => {
    setAddons((prev) =>
      prev.includes(addonKey)
        ? prev.filter((a) => a !== addonKey)
        : [...prev, addonKey]
    );
  };

  const animatedTotal = useCounter(total);

  // Generate WA Message
  const buildWaUrl = () => {
    const websiteLabel = t.calculator.pricingLabels.website[website as keyof typeof CALC_PRICING.website];
    const brandingLabel = t.calculator.pricingLabels.branding[branding as keyof typeof CALC_PRICING.branding];
    const addonLabels = addons.map((a) => t.calculator.pricingLabels.addons[a as keyof typeof CALC_PRICING.addons]);

    const formattedTotal = lang === 'en'
      ? total.toLocaleString('en-US')
      : total.toLocaleString('id-ID');

    let addonsText = '';
    if (addons.length > 0) {
      addonsText = lang === 'en'
        ? `- *Add-ons:* ${addonLabels.join(', ')}\n`
        : `- *Fitur Tambahan:* ${addonLabels.join(', ')}\n`;
    }

    const message = t.calculator.waTemplate
      .replace('{website}', websiteLabel)
      .replace('{branding}', brandingLabel)
      .replace('{addons}', addonsText)
      .replace('{total}', formattedTotal);

    return `https://wa.me/6281358939283?text=${encodeURIComponent(message)}`;
  };

  const formatPrice = (price: number) => {
    const formatted = lang === 'en'
      ? price.toLocaleString('en-US')
      : price.toLocaleString('id-ID');
    return `${lang === 'en' ? 'IDR' : 'Rp'} ${formatted}`;
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-bg-primary border-t border-border relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-text-primary mb-4">
            {t.calculator.heading}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">{t.calculator.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Column 1 & 2: Form Inputs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Website Type */}
            <fieldset>
              <legend className="text-lg font-heading font-medium mb-4">{t.calculator.step1}</legend>
              <div className="space-y-3">
                {Object.entries(CALC_PRICING.website).map(([key, opt]) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all ${website === key
                      ? 'border-accent-purple bg-accent-purple/5'
                      : 'border-border bg-bg-card hover:border-border-hover'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="website-type"
                        value={key}
                        checked={website === key}
                        onChange={() => setWebsite(key)}
                        className="w-4 h-4 accent-accent-purple"
                      />
                      <span className="text-sm font-medium">{t.calculator.pricingLabels.website[key as keyof typeof t.calculator.pricingLabels.website]}</span>
                    </div>
                    <span className="text-sm font-medium text-accent-teal">{formatPrice(opt.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Kebutuhan Branding */}
            <fieldset>
              <legend className="text-lg font-heading font-medium mb-4">{t.calculator.step2}</legend>
              <div className="space-y-3">
                {Object.entries(CALC_PRICING.branding).map(([key, opt]) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all ${branding === key
                      ? 'border-accent-purple bg-accent-purple/5'
                      : 'border-border bg-bg-card hover:border-border-hover'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="branding-type"
                        value={key}
                        checked={branding === key}
                        onChange={() => setBranding(key)}
                        className="w-4 h-4 accent-accent-purple"
                      />
                      <span className="text-sm font-medium">{t.calculator.pricingLabels.branding[key as keyof typeof t.calculator.pricingLabels.branding]}</span>
                    </div>
                    <span className="text-sm font-medium text-accent-teal">{formatPrice(opt.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Fitur Tambahan */}
            <fieldset>
              <legend className="text-lg font-heading font-medium mb-4">{t.calculator.step3}</legend>
              <div className="space-y-3">
                {Object.entries(CALC_PRICING.addons).map(([key, opt]) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all ${addons.includes(key)
                      ? 'border-accent-purple bg-accent-purple/5'
                      : 'border-border bg-bg-card hover:border-border-hover'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addons.includes(key)}
                        onChange={() => handleAddonChange(key)}
                        className="w-4 h-4 accent-accent-purple rounded"
                      />
                      <span className="text-sm font-medium">{t.calculator.pricingLabels.addons[key as keyof typeof t.calculator.pricingLabels.addons]}</span>
                    </div>
                    <span className="text-sm font-medium text-accent-teal">+ {formatPrice(opt.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Column 3: Sticky Result Card */}
          <div className="hidden lg:block lg:sticky lg:top-28">
            <div className="bg-bg-card border border-border rounded-2xl p-8 text-center shadow-lg shadow-black/40">
              <h3 className="text-text-secondary text-sm font-semibold uppercase tracking-wider mb-2">{t.calculator.estimateLabel}</h3>
              <div className="text-4xl font-heading font-medium text-accent-purple mb-6">
                {formatPrice(animatedTotal)}
              </div>

              {/* Summary Lists */}
              <div className="text-left bg-bg-primary/50 border border-border rounded-xl p-4 mb-8 text-xs text-text-secondary space-y-2">
                <p>• {t.calculator.pricingLabels.website[website as keyof typeof t.calculator.pricingLabels.website]}</p>
                {branding !== 'tidak-perlu' && <p>• {t.calculator.pricingLabels.branding[branding as keyof typeof t.calculator.pricingLabels.branding]}</p>}
                {addons.map((addon) => (
                  <p key={addon}>• {t.calculator.pricingLabels.addons[addon as keyof typeof t.calculator.pricingLabels.addons]}</p>
                ))}
              </div>

              <a
                href={buildWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-4 block text-center"
              >
                {t.calculator.ctaWhatsapp}
              </a>
              <p className="text-text-muted text-[10px] mt-4 leading-normal">
                {t.calculator.disclaimer}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Sticky Bottom Summary Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-navbar bg-[#09090b]/95 backdrop-blur-md border-t border-zinc-800 p-4 flex items-center justify-between transition-all duration-300 lg:hidden shadow-[0_-8px_30px_rgb(0,0,0,0.12)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-text-secondary uppercase font-semibold tracking-wider">{t.calculator.estimateLabel}</span>
          <span className="text-xl font-heading font-medium text-accent-purple">{formatPrice(total)}</span>
        </div>
        <a
          href={buildWaUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-2.5 px-6 text-xs font-semibold"
        >
          {t.calculator.ctaWhatsapp}
        </a>
      </div>
    </section>
  );
}

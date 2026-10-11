'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Check } from 'lucide-react';

interface ServicePackage {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  desc: string;
  features: string[];
  badge: string | null;
}

export default function Services() {
  const { lang, t } = useLanguage();

  const packagesData: ServicePackage[] = [
    {
      id: 'starter',
      name: t.services.packages.starter.name,
      price: 900000,
      priceDisplay: lang === 'en' ? 'IDR 900K' : 'Rp 900 Ribu',
      desc: t.services.packages.starter.desc,
      features: t.services.packages.starter.features,
      badge: null,
    },
    {
      id: 'pro',
      name: t.services.packages.pro.name,
      price: 2399000,
      priceDisplay: lang === 'en' ? 'IDR 2.399M' : 'Rp 2.399 Jt',
      desc: t.services.packages.pro.desc,
      features: t.services.packages.pro.features,
      badge: t.services.badgePopular,
    },
    {
      id: 'enterprise',
      name: t.services.packages.enterprise.name,
      price: 4699000,
      priceDisplay: lang === 'en' ? 'IDR 4.699M' : 'Rp 4.699 Jt',
      desc: t.services.packages.enterprise.desc,
      features: t.services.packages.enterprise.features,
      badge: null,
    },
  ];

  return (
    <section id="services" className="py-24 bg-bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-text-primary mb-4">
            {t.services.heading}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packagesData.map((pkg) => {
            const isHighlighted = pkg.badge !== null;
            const formattedTotal = lang === 'en'
              ? pkg.price.toLocaleString('en-US')
              : pkg.price.toLocaleString('id-ID');

            const waMessage = t.services.waTemplate
              .replace('{pkgName}', pkg.name)
              .replace('{pkgPrice}', formattedTotal);
            const waUrl = `https://wa.me/6281358939283?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between bg-bg-card border rounded-3xl p-8 relative transition-all duration-300 ${
                  isHighlighted
                    ? 'border-accent-purple shadow-glow scale-100 lg:scale-[1.03]'
                    : 'border-border'
                }`}
              >
                {/* Badge Rekomendasi */}
                {isHighlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-purple text-bg-primary text-[10px] font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    {pkg.badge}
                  </span>
                )}

                {/* Card Top */}
                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-2">{pkg.name}</h3>
                  <div className="text-3xl sm:text-4xl font-bold font-heading text-accent-teal mb-3">
                    {pkg.priceDisplay}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6 border-b border-border pb-4">
                    {pkg.desc}
                  </p>

                  <div className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-4">
                    {lang === 'en' ? 'Benefits included:' : 'Benefit yang didapatkan:'}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="text-xs sm:text-sm flex items-start gap-3 text-text-primary">
                        <span className="p-1 rounded-full bg-accent-teal/15 text-accent-teal mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button CTA */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-full text-center text-sm font-semibold transition-all shadow-md ${
                    isHighlighted ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {t.services.ctaOrder} {pkg.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

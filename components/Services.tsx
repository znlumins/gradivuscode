'use client';

import { useLanguage } from '@/lib/LanguageContext';

interface ServiceFeature {
  text: string;
  included: boolean;
}

interface ServiceFeature {
  text: string;
  included: boolean;
}

interface ServicePackage {
  id: string;
  name: string;
  price: number;
  desc: string;
  features: ServiceFeature[];
  badge: string | null;
}

export default function Services() {
  const { lang, t } = useLanguage();

  const packagesData: ServicePackage[] = [
    {
      id: 'startup',
      name: 'Startup',
      price: 3499000,
      desc: t.services.packages.startup.desc,
      features: [
        { text: t.services.packages.startup.features[0], included: true },
        { text: t.services.packages.startup.features[1], included: true },
        { text: t.services.packages.startup.features[2], included: true },
        { text: t.services.packages.startup.features[3], included: true },
        { text: t.services.packages.startup.features[4], included: true },
        { text: t.services.packages.startup.features[5], included: false },
        { text: t.services.packages.startup.features[6], included: false },
        { text: t.services.packages.startup.features[7], included: false }
      ],
      badge: null
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 6999000,
      desc: t.services.packages.professional.desc,
      features: [
        { text: t.services.packages.professional.features[0], included: true },
        { text: t.services.packages.professional.features[1], included: true },
        { text: t.services.packages.professional.features[2], included: true },
        { text: t.services.packages.professional.features[3], included: true },
        { text: t.services.packages.professional.features[4], included: true },
        { text: t.services.packages.professional.features[5], included: true },
        { text: t.services.packages.professional.features[6], included: true },
        { text: t.services.packages.professional.features[7], included: false }
      ],
      badge: t.services.badgePopular || 'Popular'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 14999000,
      desc: t.services.packages.enterprise.desc,
      features: [
        { text: t.services.packages.enterprise.features[0], included: true },
        { text: t.services.packages.enterprise.features[1], included: true },
        { text: t.services.packages.enterprise.features[2], included: true },
        { text: t.services.packages.enterprise.features[3], included: true },
        { text: t.services.packages.enterprise.features[4], included: true },
        { text: t.services.packages.enterprise.features[5], included: true },
        { text: t.services.packages.enterprise.features[6], included: true },
        { text: t.services.packages.enterprise.features[7], included: true }
      ],
      badge: null
    }
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
            const rawFormattedPrice = lang === 'en'
              ? pkg.price.toLocaleString('en-US')
              : pkg.price.toLocaleString('id-ID');

            // Format WhatsApp Message
            const waMessage = t.services.waTemplate
              .replace('{pkgName}', pkg.name)
              .replace('{pkgPrice}', rawFormattedPrice);
            const waUrl = `https://wa.me/6281358939283?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between bg-bg-card border rounded-2xl p-8 relative transition-all duration-300 ${isHighlighted
                    ? 'border-accent-purple shadow-glow scale-100 lg:scale-[1.03]'
                    : 'border-border'
                  }`}
              >
                {/* Badge Populer */}
                {isHighlighted && (
                  <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-accent-purple text-bg-primary text-[10px] font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    {pkg.badge}
                  </span>
                )}

                {/* Card Top */}
                <div>
                  <h3 className="text-2xl font-heading font-medium mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-medium font-heading text-accent-teal mb-2">
                    {lang === 'en' ? 'IDR' : 'Rp'} {rawFormattedPrice}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-8">{pkg.desc}</p>

                  {/* Feature Checklist */}
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`text-sm flex items-start gap-3 ${feature.included ? 'text-text-primary' : 'text-text-muted line-through'
                          }`}
                      >
                        <span className={`text-base font-bold select-none ${feature.included ? 'text-accent-teal' : 'text-text-muted'}`}>
                          {feature.included ? '✓' : '✕'}
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button CTA */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-full text-center text-sm font-medium transition-all shadow-md ${isHighlighted
                      ? 'btn-primary'
                      : 'btn-secondary'
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

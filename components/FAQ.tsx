'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-bg-primary border-t border-border">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-4">
            {t.faq.heading}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">{t.faq.subtitle}</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2">
          {t.faq.items.map((item, i) => {
            const isOpen = activeIndex === i;

            return (
              <div
                key={i}
                className="border-b border-border transition-colors duration-300 hover:border-accent-purple/35"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full py-6 flex justify-between items-center text-left text-base md:text-lg font-medium text-text-primary hover:text-accent-purple outline-none transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-btn-${i}`}
                >
                  <span className="pr-4">{item.question}</span>
                  <span className={`text-xl font-medium text-accent-purple transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
                    }`}>
                    +
                  </span>
                </button>

                {/* Expandable Panel */}
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

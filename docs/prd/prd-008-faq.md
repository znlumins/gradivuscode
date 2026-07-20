# PRD-008: FAQ Accordion Component

## Deskripsi
Komponen FAQ yang memuat 8 pertanyaan umum (accordion) di landing page. Pengguna dapat mengklik judul pertanyaan untuk menampilkan jawaban secara horizontal slide-down. Hanya diperbolehkan satu accordion yang terbuka dalam waktu bersamaan.

## Acceptance Criteria

- [ ] Komponen dibuat di `components/FAQ.js` sebagai Client Component (`'use client'`)
- [ ] Memuat 8 daftar pertanyaan & jawaban lengkap dari array konstanta `FAQ_ITEMS` (di-import dari constants)
- [ ] Klik baris pertanyaan akan membuka/menutup accordion (menggunakan transisi CSS height yang halus)
- [ ] Accordion Mode: Hanya 1 baris FAQ yang boleh terbuka sekaligus (membuka baris baru otomatis menutup baris sebelumnya)
- [ ] Baris ikon penunjuk `+` berputar (rotate) menjadi `×` saat accordion terbuka
- [ ] Keyboard accessible (bisa di-Tab dan ditoggle menggunakan tombol Space/Enter)
- [ ] ARIA tags lengkap untuk aksesibilitas (`aria-expanded`, `aria-controls`, `role="region"`)

## Kode: `components/FAQ.js`

```jsx
'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from './Calculator'; // Atau import dari constants file kustom

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-bg-secondary border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-text-secondary">Jawaban singkat untuk hal-hal yang sering ditanyakan klien.</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
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
                  <span className={`text-xl font-bold text-accent-purple transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                
                {/* Expandable Panel */}
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
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
```

## QA Checklist

- [ ] 8 Pertanyaan FAQ ter-render dengan urutan yang tepat
- [ ] Mengklik baris pertanyaan membuka panel jawaban dengan transisi slide-down
- [ ] Membuka satu pertanyaan otomatis menutup pertanyaan lain yang sedang terbuka
- [ ] Ikon `+` di kanan berputar 45 derajat (membentuk `×`) saat panel aktif
- [ ] Keyboard Tab: Dapat memfokuskan tombol pertanyaan dan membukanya menggunakan Enter/Space
- [ ] Atribut ARIA `aria-expanded` berubah menjadi `true` di DOM element saat FAQ terbuka
- [ ] Teks jawaban terbaca jelas dengan warna abu-abu sekunder (`text-text-secondary`)
- [ ] Panel tertutup rapat (`max-h-0`, `opacity-0`) saat tidak aktif untuk mencegah kebocoran tinggi layout

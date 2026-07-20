# Komponen Baru (Component Module)

Landing page Gradivus Code menggunakan arsitektur **Single Page Application (SPA) one-page scroll** berbasis komponen modular React di Next.js.

## Membuat Komponen Baru

Setiap section di landing page harus didefinisikan sebagai komponen terpisah di dalam direktori `components/`.

### Pola Dasar Komponen (Server Component — Default)

Untuk komponen statis yang tidak memerlukan user interaction (baik untuk SEO), buat sebagai Server Component:

```jsx
// components/Services.js
import Image from 'next/image';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-4">
            Layanan & Harga
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Pilih paket yang sesuai dengan skala bisnis Anda saat ini.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card list */}
        </div>
      </div>
    </section>
  );
}
```

### Pola Dasar Komponen (Client Component)

Jika komponen memerlukan interaktivitas (seperti hooks, event handlers, click events), tambahkan direktif `'use client'` di baris paling atas:

```jsx
'use client';

import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-6">
        {/* Accordion List */}
      </div>
    </section>
  );
}
```

## Memanggil Komponen di Halaman Utama (`app/page.js`)

Semua komponen dirakit di landing page utama `app/page.js`:

```jsx
// app/page.js
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Calculator from '@/components/Calculator';
import PortfolioGrid from '@/components/PortfolioGrid';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Calculator />
        <PortfolioGrid />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
```

## Checklist Komponen Baru

- [ ] Letakkan file baru di dalam direktori `components/`
- [ ] Beri nama file menggunakan huruf kapital di awal (PascalCase), contoh: `PortfolioGrid.js`
- [ ] Tentukan apakah server component (default) atau client component (tambah `'use client'`)
- [ ] Bungkus konten dengan `<section id="...">` menggunakan `id` unik yang sesuai dengan target nav link
- [ ] Gunakan Tailwind CSS utility classes untuk styling
- [ ] Import dan panggil di `app/page.js`
- [ ] Verifikasi mobile responsive menggunakan prefix `sm:`, `md:`, `lg:`

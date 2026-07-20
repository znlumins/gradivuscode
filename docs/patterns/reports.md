# SEO & Performance Optimization

Panduan optimasi SEO dan performa menggunakan fitur bawaan Next.js. Target skor Lighthouse **90+** di seluruh kategori.

## 1. Next.js Metadata API

Gunakan Metadata API di file `app/layout.js` atau `app/page.js` untuk mengelola tag meta `<title>`, `<meta name="description">`, Open Graph, dan Twitter Cards.

```javascript
// app/layout.js

export const metadata = {
  metadataBase: new URL('https://gradivuscode.com'),
  title: {
    default: 'Gradivus Code — Jasa Pembuatan Landing Page & Branding UMKM',
    template: '%s | Gradivus Code'
  },
  description: 'Gradivus Code menyediakan jasa pembuatan landing page estetis dan super cepat untuk UMKM. Paket lengkap termasuk branding, mulai Rp 1,5 juta. Hosting gratis!',
  keywords: ['jasa landing page', 'branding UMKM', 'website murah', 'desain logo', 'Gradivus Code', 'jasa website UMKM'],
  authors: [{ name: 'Gradivus Code' }],
  creator: 'Gradivus Code',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://gradivuscode.com',
    title: 'Gradivus Code — Landing Page Premium untuk UMKM',
    description: 'Paket lengkap website + branding untuk UMKM mulai Rp 1,5 juta. Desain premium, performa ringan, hosting gratis.',
    siteName: 'Gradivus Code',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gradivus Code — Jasa Pembuatan Landing Page & Branding UMKM',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gradivus Code — Landing Page Premium untuk UMKM',
    description: 'Paket lengkap website + branding untuk UMKM mulai Rp 1,5 juta.',
    images: ['/images/og-image.jpg'],
  },
};
```

---

## 2. Structured Data (JSON-LD)

Bantu mesin pencari Google memahami jenis bisnis jasa dan daftar harga produk Anda dengan memasukkan Schema Markup berbentuk JSON-LD di dalam layout utama.

```jsx
// app/layout.js

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Gradivus Code",
    "description": "Jasa pembuatan landing page estetis dan branding untuk UMKM Indonesia",
    "url": "https://gradivuscode.com",
    "logo": "https://gradivuscode.com/logo/gradiuscode.svg",
    "email": "daffaahmadalattas@gmail.com",
    "telephone": "+6281358939283",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID"
    },
    "priceRange": "Rp 1.500.000 - Rp 4.500.000",
    "sameAs": [
      "https://www.instagram.com/dfaahm/",
      "https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Paket Rintisan",
        "price": "1500000",
        "priceCurrency": "IDR"
      },
      {
        "@type": "Offer",
        "name": "Paket Tumbuh",
        "price": "2800000",
        "priceCurrency": "IDR"
      },
      {
        "@type": "Offer",
        "name": "Paket Mapan",
        "price": "4500000",
        "priceCurrency": "IDR"
      }
    ]
  };

  return (
    <html lang="id">
      <body>
        {/* Inject JSON-LD to head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

---

## 3. Font Loading Optimization

Next.js secara default mengoptimasi Google Fonts secara lokal menggunakan `next/font/google`. Ini sepenuhnya mengeliminasi waktu render font yang lambat (FOIT) dan download external request tambahan.

Di `app/layout.js`:
```jsx
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
```

Di `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
};
```

---

## 4. Next.js Image Optimization Checklist

- [ ] Semua portofolio gambar di-serve menggunakan `<Image>` dari `next/image`.
- [ ] Berikan parameter `sizes` agar Next.js memotong ukuran gambar secara otomatis di HP.
- [ ] Tambahkan properti `priority` pada logo navbar dan banner di atas fold (hero section).
- [ ] Batasi domain gambar eksternal di `next.config.js` untuk keamanan.

## Rules

1.  **Satu `<h1>` saja:** Pastikan hanya ada satu tag `<h1>` per halaman (diletakkan di hero section).
2.  **Meta Description limit:** Jaga panjang meta description di kisaran 120-160 karakter agar tidak terpotong di Google search.
3.  **Local font import:** Gunakan `next/font/google` — dilarang keras men-load font via `@import` di CSS atau `<link>` manual ke Google API.
4.  **no-index for admin:** Tambahkan tag robot `noindex, nofollow` khusus pada halaman admin `/admin/page.js` dengan menulis metadata di halaman tersebut:
    ```js
    export const metadata = {
      robots: {
        index: false,
        follow: false,
      }
    };
    ```

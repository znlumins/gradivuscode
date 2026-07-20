# Conventions

Aturan main dan standar koding dalam pengembangan website Gradivus Code menggunakan **Next.js (App Router)** dan **Tailwind CSS**.

## Stack & Tools

- **Framework:** Next.js 14+ (App Router, JavaScript/ES6+)
- **CSS Engine:** Tailwind CSS (Utility-first styling)
- **Database / Auth:** Supabase (Cloud Postgres, client-side SDK)
- **Deployment:** Vercel (Gratis edge hosting)
- **Icon Library:** Inline SVG atau React Lucide Icons (jika di-import secara modular)

## Folder Structure (Next.js App Router)

```
gradivus-code/
├── app/
│   ├── layout.js             # Shell utama: navbar, footer, metadata SEO, global CSS
│   ├── page.js               # Landing page utama (One-page scroll component)
│   ├── globals.css           # Tailwind directives & global style overrides
│   ├── admin/
│   │   └── page.js           # Halaman admin CRUD portofolio (Client Component)
│   └── api/
│       └── portfolio/
│           └── route.js       # Route handler (API endpoint CRUD Supabase)
├── components/               # Komponen React yang reusable
│   ├── Navbar.js
│   ├── Hero.js
│   ├── Services.js
│   ├── Calculator.js
│   ├── PortfolioGrid.js
│   ├── Lightbox.js
│   ├── FAQ.js
│   ├── ContactForm.js
│   └── Footer.js
├── lib/
│   └── supabase.js           # Client SDK konfigurasi & inisialisasi Supabase
├── public/                   # Aset statis (akses via root: /logo/...)
│   ├── logo/
│   │   └── gradiuscode.svg   # Logo Gradivus Code
│   └── images/
├── tailwind.config.js        # Kustomisasi design tokens (warna, font, spacing)
├── package.json
└── jsconfig.json
```

---

## Core Conventions

### 1. React Components (Server vs Client)
- Secara default, seluruh komponen di folder `app/` adalah **Server Components** (sangat baik untuk SEO & performa).
- Gunakan direktif `'use client'` di baris paling atas untuk komponen interaktif yang membutuhkan hooks React (`useState`, `useEffect`, event listeners):
  - `Calculator.js`
  - `ContactForm.js`
  - `Navbar.js` (untuk hamburger toggle)
  - `Lightbox.js`
  - `FAQ.js`
  - `admin/page.js`

### 2. Styling — Tailwind CSS
- **Utility-First:** Hindari menulis CSS manual. Gunakan utility classes bawaan Tailwind.
- **Theme Consistency:** Semua warna kustom (`bg-primary`, `text-accent-purple`), font, border-radius harus dikustomisasi di `tailwind.config.js`. Jangan menulis warna hex keras di class:
  ```jsx
  // ✅ Benar: Menggunakan config token
  <button className="bg-accent-purple hover:scale-105 rounded-xl px-6 py-2 transition-all">
  
  // ❌ Salah: Hex keras & radius px keras
  <button className="bg-[#6c63ff] rounded-[12px] px-[24px] py-[8px]">
  ```
- **Responsive Layout:** Gunakan prefix responsive standard Tailwind (`sm:`, `md:`, `lg:`):
  ```jsx
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  ```

### 3. State Management & Hooks
- Gunakan React `useState` untuk menyimpan input form, total harga, kategori filter, dan status modal (buka/tutup).
- Gunakan `useEffect` saat fetching data dari API lokal atau menginisialisasi client-side data.

### 4. API & Data Layer (Supabase)
- **Supabase Client:** Konfigurasikan file client di `lib/supabase.js` menggunakan environment variables:
  ```js
  import { createClient } from '@supabase/supabase-js';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  ```
- **Next.js API routes:** Semua CRUD untuk portofolio di admin panel harus memicu call ke `/api/portfolio` menggunakan `fetch` di Client Component.

### 5. SEO (Metadata API)
- Jangan gunakan `<head>` tag manual untuk memasukkan meta data. Gunakan Next.js Metadata API di `layout.js` atau `page.js`:
  ```js
  export const metadata = {
    title: 'Gradivus Code — Jasa Pembuatan Landing Page & Branding UMKM',
    description: 'Paket lengkap website dan branding mulai Rp 1,5 juta...',
    openGraph: {
      title: 'Gradivus Code — Landing Page Premium untuk UMKM',
      images: ['/images/og-image.jpg'],
    }
  };
  ```

### 6. Aset Gambar & Ikon
- Gunakan komponen `<Image>` dari `next/image` untuk performa (webp conversion, lazy load, layout shift protection):
  ```jsx
  import Image from 'next/image';
  <Image src="/logo/gradiuscode.svg" alt="Gradivus Code" width={140} height={36} priority />
  ```
- Gunakan emoji atau SVG inline untuk ikon agar performa web tetap maksimal tanpa library ikon eksternal yang besar.
- Untuk gambar dummy, gunakan `https://picsum.photos/400/300`.

---

## Never Do

- ❌ Menggunakan `var` — gunakan `const` atau `let`.
- ❌ Manipulasi DOM langsung (seperti `document.getElementById`) — gunakan React State / Refs.
- ❌ Hardcode API keys di kode — selalu gunakan file `.env.local` (yang di-ignore di `.gitignore`).
- ❌ Inline custom CSS style (`style={{ backgroundColor: '#6c63ff' }}`) — gunakan Tailwind class utility.
- ❌ Menulis logika manipulasi database langsung di client components — gunakan API Route Handlers `/api/portfolio` atau Supabase SDK.
- ❌ Melupakan `alt` tag pada komponen `<Image>`.

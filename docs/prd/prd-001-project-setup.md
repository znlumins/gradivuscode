# PRD-001: Project Setup & Next.js Boilerplate

## Deskripsi
Setup awal proyek Gradivus Code: inisialisasi framework Next.js 14+ menggunakan App Router, setup ESLint, integrasi Tailwind CSS, pembuatan layout dasar, dan instalasi Supabase client SDK.

## Acceptance Criteria

- [ ] Proyek berhasil di-scaffold menggunakan perintah `npx create-next-app`
- [ ] Folder App Router (`app/`) ter-setup dengan benar
- [ ] Tailwind CSS terintegrasi dan file `app/globals.css` memiliki direktif Tailwind
- [ ] Google Fonts (Inter & Space Grotesk) di-import via `next/font/google` di `app/layout.js`
- [ ] File `app/page.js` bersih dan memanggil semua boilerplate component section (Hero, Services, Calculator, dll)
- [ ] SDK Client Supabase (`@supabase/supabase-js`) terinstall
- [ ] File konfigurasi `.env.local` terisi dan di-ignore oleh Git
- [ ] Next.js dev server berjalan di port 3000 tanpa compile error

## Langkah Scaffold Proyek

Jalankan perintah ini di terminal root direktori:

```bash
# Inisialisasi Next.js app
npx create-next-app@latest gradivus-code --js --tailwind --app --eslint --src-dir no --import-alias "@/*"

# Masuk ke direktori
cd gradivus-code

# Install SDK client Supabase
npm install @supabase/supabase-js
```

---

## Kode: `app/layout.js` (Boilerplate Layout Utama)

```jsx
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

// Optimasi Font Google
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

export const metadata = {
  title: 'Gradivus Code — Jasa Pembuatan Landing Page & Branding UMKM',
  description: 'Gradivus Code menyediakan jasa pembuatan landing page estetis dan super cepat untuk UMKM. Paket lengkap termasuk branding, mulai Rp 1,5 juta.',
  icons: {
    icon: '/logo/gradiuscode.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-body bg-bg-primary text-text-primary min-h-screen selection:bg-accent-purple/30">
        {children}
      </body>
    </html>
  );
}
```

---

## Kode: `app/globals.css` (Tailwind Directives)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg-primary: #0a0a0f;
    --color-bg-secondary: #12121a;
    --color-bg-card: #1a1a2e;
    
    --color-border: #2a2a3e;
    --color-text-primary: #f0f0f5;
    --color-text-secondary: #a0a0b5;
    --color-text-muted: #6b6b80;
    
    --color-accent-purple: #6c63ff;
    --color-accent-teal: #00d4aa;
  }
}

/* Custom global overrides */
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}

/* Skip link (aksesibilitas) */
.skip-link {
  @apply absolute left-1/2 -translate-x-1/2 -top-full bg-accent-purple text-white px-4 py-2 rounded-b-lg z-[9999] transition-all focus:top-0;
}
```

---

## Kode: `app/page.js` (Boilerplate Main Page)

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
      <a href="#hero" className="skip-link">Langsung ke konten utama</a>
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

## QA Checklist

- [ ] Folder `app/` dan file `layout.js`, `page.js`, `globals.css` berhasil dibuat
- [ ] Dev server berjalan via `npm run dev` dan bisa diakses di http://localhost:3000
- [ ] Google Fonts (Inter dan Space Grotesk) termuat secara lokal di browser
- [ ] Tailwind CSS classes dapat diaplikasikan dan langsung ter-compile
- [ ] Favicon logo `gradiuscode.svg` tampil di tab browser
- [ ] Tidak ada warning/error pada terminal compilation maupun browser console
- [ ] `@supabase/supabase-js` terdaftar di file `package.json`

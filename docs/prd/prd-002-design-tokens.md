# PRD-002: Design Tokens & Tailwind Configuration

## Deskripsi
Mendefinisikan seluruh design system dalam file kustomisasi Tailwind (`tailwind.config.js`). File ini menjadi **satu sumber kebenaran** untuk warna kustom, typography, spacing, radius, dan shadows. Theme: **dark premium** dengan aksen ungu + teal.

## Acceptance Criteria

- [ ] File `tailwind.config.js` dikustomisasi untuk mendaftarkan design tokens Gradivus Code
- [ ] Skema warna `bg-primary`, `bg-secondary`, `bg-card`, `accent-purple`, `accent-teal`, `text-primary`, `text-secondary`, dan `border` terdaftar
- [ ] Font family `heading` (Space Grotesk) dan `body` (Inter) dikonfigurasikan
- [ ] Border radius kustom (`radius-sm`, `radius-md`, `radius-lg`) didaftarkan
- [ ] Shadows (shadow-card, shadow-card-hover, shadow-glow) ditambahkan
- [ ] Global utility classes untuk button (primary, secondary) terdefinisi di `globals.css`
- [ ] Seluruh kustomisasi styling dipanggil menggunakan Tailwind utility classes (tidak ada inline styles atau custom CSS properties manual di component)

## Kode: `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0f',
          secondary: '#12121a',
          card: '#1a1a2e',
          'card-hover': '#22223a',
        },
        accent: {
          purple: '#6c63ff',
          'purple-hover': '#5a52e0',
          teal: '#00d4aa',
          'teal-hover': '#00b894',
        },
        text: {
          primary: '#f0f0f5',
          secondary: '#a0a0b5',
          muted: '#6b6b80',
        },
        border: '#2a2a3e',
        'border-hover': '#3a3a52',
        success: '#00d4aa',
        warning: '#ffb347',
        error: '#ff6b6b',
      },
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(108, 99, 255, 0.08)',
        'card-hover': '0 8px 40px rgba(108, 99, 255, 0.15)',
        glow: '0 0 30px rgba(108, 99, 255, 0.2)',
      },
      zIndex: {
        dropdown: '50',
        navbar: '100',
        modal: '1000',
        toast: '2000',
      }
    },
  },
  plugins: [],
}
```

---

## Tambahan di `app/globals.css` (Button Classes)

Daftarkan reusable components button menggunakan `@layer components` agar kode JSX bersih:

```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-body text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer;
  }
  
  .btn-primary {
    @apply btn bg-gradient-to-r from-accent-purple to-accent-teal text-white shadow-[0_4px_16px_rgba(108,99,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(108,99,255,0.4)];
  }

  .btn-secondary {
    @apply btn bg-transparent text-text-primary border border-border hover:border-accent-purple hover:text-accent-purple;
  }

  .btn-full {
    @apply w-full;
  }
  
  .btn-lg {
    @apply px-10 py-4 text-base;
  }
}
```

## QA Checklist

- [ ] `tailwind.config.js` di-update tanpa memicu build failure saat running `npm run dev`
- [ ] Class `bg-bg-primary` mewarnai latar belakang menjadi `#0a0a0f`
- [ ] Class `font-heading` menampilkan font kustom Space Grotesk
- [ ] Class `btn-primary` menampilkan tombol gradient ungu-teal dengan elevation shadow
- [ ] Hover effect pada button primary memberikan elevasi dan glow shadow bertambah besar
- [ ] Preflight / Tailwind base styling berjalan mulus
- [ ] Tidak ada custom hex code di file CSS lainnya — semua dipanggil via Tailwind tokens
- [ ] `prefers-reduced-motion` didukung secara default oleh utility classes Tailwind transitions

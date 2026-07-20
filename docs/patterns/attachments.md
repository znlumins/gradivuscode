# Image & Asset Handling

Panduan penanganan file gambar dan optimasi aset visual menggunakan fitur bawaan Next.js (`next/image`).

## Format Gambar Wajib

Selalu gunakan **WebP** untuk seluruh gambar portofolio (kecuali logo utama dalam format **SVG**).

---

## Next.js `<Image>` Component

Gunakan komponen `<Image>` dari Next.js untuk mencegah Cumulative Layout Shift (CLS), merender responsive images, dan melakukan auto-webP conversion.

### 1. Logo Statis (Di Navbar & Footer)

Untuk gambar berukuran tetap yang selalu berada di atas fold, wajib diberikan properti `priority` agar langsung dimuat (preload).

```jsx
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="fixed w-full top-0 z-50 bg-bg-primary/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero">
          <Image 
            src="/logo/gradiuscode.svg" 
            alt="Gradivus Code" 
            width={140} 
            height={36} 
            priority
          />
        </a>
        {/* ... Nav links */}
      </div>
    </header>
  );
}
```

### 2. Gambar Portofolio Dinamis (Di bawah fold)

Gunakan properti `fill` agar rasio gambar fleksibel mengikuti container-nya (gunakan pembungkus `relative aspect-[4/3]`).

```jsx
import Image from 'next/image';

export default function PortfolioItem({ title, imageUrl }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-bg-card border border-border">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-bg-card to-accent-purple/20 flex items-center justify-center text-text-muted">
            No Image
          </div>
        )}
      </div>
    </article>
  );
}
```

---

## Konfigurasi Domain Gambar Eksternal (`next.config.js`)

Jika Admin Panel mengizinkan pengunggahan URL gambar eksternal (seperti dari Imgur, Cloudinary, Postimages, dll.), konfigurasikan domain gambar di file `next.config.js` Anda:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'postimages.org',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
  },
};

module.exports = nextConfig;
```

---

## Placeholder Gradient untuk Fallback

Jika gambar dari data Supabase gagal dimuat (atau URL kosong), tampilkan background gradient Tailwind CSS:

```jsx
export function ImagePlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-tr from-bg-card via-accent-purple/10 to-accent-teal/10 flex items-center justify-center text-text-secondary text-xs uppercase tracking-widest">
      Gradivus Preview
    </div>
  );
}
```

## Rules

1.  **Selalu Tentukan Width/Height:** Kecuali jika menggunakan `fill` (di mana parent container wajib memiliki class `relative`).
2.  **Gunakan Properti `sizes`:** Wajib menambahkan `sizes` pada image dengan properti `fill` agar Next.js men-serve file berukuran kecil pada perangkat mobile.
3.  **Preload Hero Assets:** Selalu berikan properti `priority` pada gambar/banner hero atau logo navbar.
4.  **No base64 storage:** Jangan menyimpan data base64 gambar di database. Gunakan URL CDN gambar.

# Grid Layouts & Pricing Tables

Panduan menyusun grid portofolio filterable, pricing tables, dan tabel data admin panel menggunakan utility classes CSS Grid dan Flexbox dari Tailwind CSS.

## 1. Portfolio Grid & Category Filter

Penerapan layout Grid responsive pada galeri portofolio lengkap dengan interaksi tombol filter berbasis state React.

```jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PortfolioSection({ initialItems }) {
  const [category, setCategory] = useState('all');

  const filteredItems = category === 'all' 
    ? initialItems 
    : initialItems.filter(item => item.category === category);

  return (
    <section id="portfolio" className="py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
          {['all', 'website', 'branding'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                category === cat
                  ? 'bg-accent-purple border-accent-purple text-white shadow-lg shadow-accent-purple/20'
                  : 'bg-transparent border-border text-text-secondary hover:border-accent-purple'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat === 'website' ? 'Website' : 'Desain & Branding'}
            </button>
          ))}
        </div>

        {/* Portfolio Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article 
              key={item.id}
              className="group bg-bg-card border border-border hover:border-accent-purple/50 rounded-2xl overflow-hidden hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src={item.imageUrl || '/images/placeholder.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-accent-teal uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/70 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 2. Pricing Table (Services Card)

Layout kartu harga pricing card menggunakan Flexbox untuk mengatur keseimbangan tinggi tombol CTA (selalu berada di dasar kartu meskipun deskripsi berbeda panjang).

```jsx
export default function PricingGrid({ packages }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      {packages.map((pkg) => (
        <div 
          key={pkg.id}
          className={`flex flex-col justify-between bg-bg-card border rounded-2xl p-8 relative hover:translate-y-[-6px] hover:shadow-xl transition-all duration-300 ${
            pkg.badge ? 'border-accent-purple shadow-lg shadow-accent-purple/5' : 'border-border'
          }`}
        >
          {pkg.badge && (
            <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent-purple to-accent-teal text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
              {pkg.badge}
            </span>
          )}

          <div>
            <h3 className="text-xl font-bold font-heading mb-2">{pkg.name}</h3>
            <div className="text-3xl font-bold text-accent-teal mb-2">
              Rp {pkg.price.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-text-muted mb-6">{pkg.desc}</p>
            
            <ul className="space-y-4 mb-8">
              {pkg.features.map((feature, i) => (
                <li 
                  key={i} 
                  className={`text-sm flex items-start gap-3 ${
                    feature.included ? 'text-text-primary' : 'text-text-muted line-through'
                  }`}
                >
                  <span className={feature.included ? 'text-accent-teal' : 'text-text-muted'}>
                    {feature.included ? '✓' : '✕'}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>

          <a 
            href={`https://wa.me/6281358939283?text=Halo%20Gradivus%20Code,%20saya%20tertarik%20paket%20${pkg.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 rounded-full text-center text-sm font-semibold transition-all ${
              pkg.badge 
                ? 'bg-gradient-to-r from-accent-purple to-accent-teal text-white shadow-lg' 
                : 'bg-transparent border border-border text-text-primary hover:border-accent-purple hover:text-accent-purple'
            }`}
          >
            Pesan Sekarang
          </a>
        </div>
      ))}
    </div>
  );
}
```

---

## 3. Admin Panel Data Table

Tabel daftar portofolio di Admin Panel teroptimasi untuk responsivitas (menggunakan container dengan overflow scrolling pada layar mobile).

```jsx
export function AdminTable({ items, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto border border-border rounded-xl bg-bg-card">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-border bg-bg-secondary text-text-secondary text-xs uppercase tracking-widest font-semibold">
            <th className="p-4">Judul Proyek</th>
            <th className="p-4">Kategori</th>
            <th className="p-4">Tanggal Dibuat</th>
            <th className="p-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-bg-primary/50 transition-colors">
              <td className="p-4 font-medium">{item.title}</td>
              <td className="p-4 uppercase text-xs font-semibold text-accent-teal">{item.category}</td>
              <td className="p-4">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
              <td className="p-4 text-right space-x-2">
                <button 
                  onClick={() => onEdit(item)}
                  className="px-3 py-1 bg-bg-secondary hover:bg-border text-text-primary rounded-lg transition-colors"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="px-3 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-500 rounded-lg transition-colors"
                >
                  🗑️ Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Rules

1.  **Mobile First Grid:** Selalu tentukan kolom default mobile (`grid-cols-1`) terlebih dahulu, kemudian atur kolom tablet/desktop (`md:grid-cols-2 lg:grid-cols-3`).
2.  **Flex Grow for Button Alignment:** Gunakan flex layout vertikal (`flex flex-col justify-between`) agar tinggi pricing cards selalu seragam dan tombol CTA selaras secara horizontal di dasar kolom.
3.  **Table responsiveness:** Pembungkus tabel HTML wajib memiliki class `overflow-x-auto` agar tata letak web tidak rusak (*break layout*) saat diakses lewat HP berlayar kecil.
4.  **Aspect Ratio:** Gunakan aspect ratio Tailwind (`aspect-[4/3]` atau `aspect-video`) pada pembungkus gambar agar ukuran grid portofolio seragam tanpa distorsi visual.

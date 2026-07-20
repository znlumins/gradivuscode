# PRD-007: Portfolio Showcase & Lightbox Component

## Deskripsi
Komponen grid portofolio responsive yang menampilkan karya terbaik Gradivus Code. Data di-fetch secara dinamis dari database **Supabase** (atau menampilkan 6 item placeholder jika kosong). Menyertakan filter kategori dan modal lightbox interaktif.

## Acceptance Criteria

- [ ] Komponen dibuat di `components/PortfolioGrid.js` sebagai Client Component (`'use client'`)
- [ ] Data di-fetch dari endpoint API internal `/api/portfolio` (GET)
- [ ] Menyediakan skeleton loader (`SkeletonCard`) saat proses loading data berlangsung
- [ ] Jika data Supabase kosong, tampilkan 6 item default data placeholder
- [ ] Tombol Filter Kategori: Semua, Website, Desain & Branding. Mengubah filter memicu re-render visual dengan animasi transisi yang halus
- [ ] Efek Hover Card: Gambar membesar (`scale-105`) dan memunculkan overlay informasi judul & kategori
- [ ] Klik Card: Membuka dialog lightbox (`components/Lightbox.js`) yang menampilkan gambar penuh, deskripsi detail, kategori, dan tombol CTA "Lihat Demo"
- [ ] Lightbox mendukung penutupan via tombol close, tombol Escape, dan klik di luar area modal (backdrop overlay click)
- [ ] Scroll Lock: Mengunci scroll window utama (`overflow: hidden`) saat lightbox terbuka
- [ ] Empty State: Menampilkan visual empty state jika hasil pencarian/filter bernilai kosong

## Kode: `components/PortfolioGrid.js`

```jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import { SkeletonCard } from '@/docs/patterns/user-feedback'; // Path kustom helper

const PLACEHOLDERS = [
  { id: 'p1', title: 'Website Kedai Kopi Nusantara', category: 'website', description: 'Landing page modern untuk kedai kopi lokal dengan tema warm dan cozy.', imageUrl: '', demoUrl: '' },
  { id: 'p2', title: 'Branding Toko Roti Artisan', category: 'branding', description: 'Desain logo, kartu nama, dan banner media sosial untuk toko roti premium.', imageUrl: '', demoUrl: '' },
  { id: 'p3', title: 'Landing Page Salon Kecantikan', category: 'website', description: 'One-page website dengan booking online dan galeri layanan.', imageUrl: '', demoUrl: '' },
  { id: 'p4', title: 'Logo & Branding Warung Makan', category: 'branding', description: 'Identitas visual lengkap: logo, menu, papan nama, dan packaging.', imageUrl: '', demoUrl: '' },
  { id: 'p5', title: 'Katalog Online Toko Fashion', category: 'website', description: 'Website multi-page dengan katalog produk interaktif dan WhatsApp order.', imageUrl: '', demoUrl: '' },
  { id: 'p6', title: 'Desain Banner Social Media', category: 'branding', description: 'Set 12 template banner Instagram untuk brand minuman kekinian.', imageUrl: '', demoUrl: '' },
];

export default function PortfolioGrid() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch dari Supabase API
  useEffect(() => {
    async function getPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          setItems(data.length > 0 ? data : PLACEHOLDERS);
        } else {
          setItems(PLACEHOLDERS);
        }
      } catch (err) {
        setItems(PLACEHOLDERS);
      } finally {
        setLoading(false);
      }
    }
    getPortfolio();
  }, []);

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter((i) => i.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-4">
            Karya Kami
          </h2>
          <p className="text-text-secondary">Koleksi desain dan website terbaik yang telah kami kerjakan.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-12 justify-center overflow-x-auto pb-2">
          {['all', 'website', 'branding'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition-all ${
                filter === cat
                  ? 'bg-accent-purple border-accent-purple text-white shadow-lg shadow-accent-purple/20'
                  : 'bg-transparent border-border text-text-secondary hover:border-accent-purple'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat === 'website' ? 'Website' : 'Desain & Branding'}
            </button>
          ))}
        </div>

        {/* Portfolio Grid / Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-bg-card border border-border rounded-2xl aspect-[4/3] animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-bg-card border border-border rounded-2xl max-w-lg mx-auto">
            <p className="text-text-secondary">Portofolio kosong untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-border cursor-pointer hover:border-accent-purple/50 transition-all duration-300"
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-bg-card via-accent-purple/10 to-accent-teal/5 flex items-center justify-center text-text-secondary text-xs uppercase tracking-widest">
                    Gradivus Preview
                  </div>
                )}
                
                {/* Info Overlay (Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-opacity duration-300">
                  <span className="text-[10px] font-bold text-accent-teal uppercase tracking-widest mb-2">
                    {item.category === 'website' ? 'Website' : 'Desain & Branding'}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/70 line-clamp-2">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Render Lightbox Modal */}
        {selectedItem && (
          <Lightbox 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}

      </div>
    </section>
  );
}
```

## QA Checklist

- [ ] Project fetching API routes berhasil mengembalikan status data dari database Supabase
- [ ] Skeleton loading cards muncul sebelum data portofolio dirender
- [ ] Jika database kosong, list 6 placeholders default dimuat
- [ ] Tombol filter mengubah tampilan portofolio ke kategori yang sesuai secara instan
- [ ] Transisi hover zoom (`scale-105`) gambar dan text overlay muncul di layar desktop
- [ ] Klik item membuka lightbox modal dengan informasi detail proyek yang tepat
- [ ] Lightbox bisa ditutup dengan menekan tombol X, tombol Escape, dan mengklik di luar area gambar
- [ ] Scroll layar utama terkunci saat lightbox aktif
- [ ] Tampilan responsif grid: 1 col mobile, 2 col tablet, 3 col desktop

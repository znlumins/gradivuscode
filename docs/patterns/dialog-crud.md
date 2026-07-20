# React Modals & Dialog State Patterns

Dalam Next.js & React, modal/dialog dikendalikan menggunakan state boolean. Elemen modal di-render secara kondisional berdasarkan state tersebut.

## Lightbox Modal (Landing Page — Portofolio)

Komponen Lightbox modal dipicu dari komponen `PortfolioGrid`. Saat item portofolio diklik, state data portofolio diatur, dan modal ditampilkan.

### Komponen Lightbox (`components/Lightbox.js`)

```jsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Lightbox({ item, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll behind modal
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* Overlay Background */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative max-w-4xl max-h-[90vh] bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl z-10 m-4 flex flex-col md:flex-row scale-100 transition-transform duration-300">
        
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
          onClick={onClose}
          aria-label="Tutup"
        >
          ✕
        </button>

        {/* Media Container */}
        <div className="relative w-full md:w-2/3 aspect-video md:aspect-auto md:h-[600px] bg-black">
          {item.imageUrl ? (
            <Image 
              src={item.imageUrl} 
              alt={item.title} 
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-bg-card to-accent-purple text-text-muted">
              Preview tidak tersedia
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className="p-8 w-full md:w-1/3 flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-accent-purple text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
              {item.category === 'website' ? 'Website' : 'Desain & Branding'}
            </span>
            <h3 className="text-2xl font-heading font-bold mb-4">{item.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">{item.description}</p>
          </div>

          {item.demoUrl && (
            <a 
              href={item.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn bg-gradient-to-r from-accent-purple to-accent-teal text-white w-full py-3 rounded-full text-center font-semibold shadow-lg hover:translate-y-[-2px] transition-all"
            >
              Lihat Demo Website →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## CRUD Modal Dialog (Admin Panel)

Admin panel menggunakan tag HTML native `<dialog>` dengan ref atau rendering kondisional React untuk membuat form modal dialog.

### Implementasi Form Dialog di `app/admin/page.js`

```jsx
'use client';

import { useState } from 'react';

export default function AdminDialog({ isOpen, item, onClose, onSave }) {
  const [title, setTitle] = useState(item?.title || '');
  const [category, setCategory] = useState(item?.category || 'website');
  const [description, setDescription] = useState(item?.description || '');
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || '');
  const [demoUrl, setDemoUrl] = useState(item?.demoUrl || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: item?.id, // undefined jika membuat baru
      title,
      category,
      description,
      imageUrl,
      demoUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Backdrop overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Dialog container */}
      <div className="relative bg-bg-card border border-border rounded-xl w-full max-w-lg p-8 z-10 m-4 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-heading font-bold">
            {item ? 'Edit Portofolio' : 'Tambah Portofolio'}
          </h3>
          <button className="text-text-muted hover:text-white text-2xl" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Judul Proyek</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full px-4 py-2 rounded-lg bg-bg-primary border border-border focus:border-accent-purple outline-none transition-colors"
              required 
            />
          </div>
          
          {/* ... Input fields lainnya */}

          <div className="flex justify-end gap-4 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 rounded-lg border border-border hover:bg-bg-primary"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 rounded-lg bg-accent-purple hover:bg-accent-purple-hover text-white font-semibold"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

## Rules

1.  **Conditional Rendering:** Tutup modal dengan tidak me-render komponen (`{isOpen && <Modal />}`) atau mengembalikan `null` jika parameter state bernilai false.
2.  **Scroll Lock:** Kunci scroll halaman utama dengan memanipulasi `document.body.style.overflow = 'hidden'` di dalam react lifecycle `useEffect` modal.
3.  **Escape Key Support:** Wajib menambahkan key listener Escape untuk menutup modal.
4.  **Overlay Backdrop Click:** Klik pada area gelap latar belakang wajib memicu trigger `onClose()`.
5.  **Aksesibilitas (A11y):** Berikan atribut `role="dialog"` dan `aria-modal="true"`.

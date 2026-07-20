# PRD-006: Kalkulator Harga Interaktif Component

## Deskripsi
Fitur kalkulator interaktif untuk memberikan estimasi biaya pembuatan website & branding secara transparan dan dinamis. Pengguna memilih tipe website, kebutuhan branding, dan addon tambahan untuk melihat total harga yang langsung diperbarui secara *real-time*.

## Acceptance Criteria

- [ ] Komponen dibuat di `components/Calculator.js` sebagai Client Component (`'use client'`)
- [ ] Menggunakan React State untuk memantau opsi terpilih: `websiteType` (radio), `brandingType` (radio), dan `addons` (checkboxes/array)
- [ ] Total harga diperbarui secara *real-time* saat opsi diubah dengan Counter Animasi (menggunakan custom hook `useAnimatedCounter`)
- [ ] Menampilkan panel ringkasan (summary panel) item terpilih secara dinamis
- [ ] Tombol CTA utama: "Pesan Sekarang via WhatsApp" mengarah ke WhatsApp dengan menyertakan teks rekapitulasi pilihan + total estimasi harga
- [ ] Pilihan default awal: Landing Page + Tanpa Branding = Rp 800.000
- [ ] Layout dua kolom desktop: formulir pilihan di kiri, dan visual estimasi harga (sticky panel) di kanan

## Skema Harga (Constants)

```javascript
export const CALC_PRICING = {
  website: {
    'landing-page': { label: 'Landing Page (1 Halaman)', price: 800000 },
    'website-umkm': { label: 'Website UMKM (3 Halaman)', price: 2000000 },
    'katalog-interaktif': { label: 'Katalog Interaktif', price: 3000000 },
  },
  branding: {
    'tidak-perlu': { label: 'Tidak Perlu', price: 0 },
    'logo-saja': { label: 'Desain Logo Saja', price: 500000 },
    'branding-lengkap': { label: 'Paket Branding Lengkap', price: 1200000 },
  },
  addons: {
    'google-maps': { label: 'Setup Google Maps', price: 150000 },
    'copywriting': { label: 'Copywriting Premium', price: 300000 },
    'analytics': { label: 'Integrasi Analytics', price: 200000 },
  }
};
```

---

## Kode: `components/Calculator.js`

```jsx
'use client';

import { useState, useEffect } from 'react';
import { useAnimatedCounter } from '@/docs/patterns/animations-transitions'; // Path hook kustom

export const SERVICE_PACKAGES = []; // di-export jika diperlukan oleh Services.js

export const CALC_PRICING = {
  website: {
    'landing-page': { label: 'Landing Page (1 Halaman)', price: 800000 },
    'website-umkm': { label: 'Website UMKM (3 Halaman)', price: 2000000 },
    'katalog-interaktif': { label: 'Katalog Interaktif', price: 3000000 },
  },
  branding: {
    'tidak-perlu': { label: 'Tidak Perlu', price: 0 },
    'logo-saja': { label: 'Desain Logo Saja', price: 500000 },
    'branding-lengkap': { label: 'Paket Branding Lengkap', price: 1200000 },
  },
  addons: {
    'google-maps': { label: 'Setup Google Maps', price: 150000 },
    'copywriting': { label: 'Copywriting Premium', price: 300000 },
    'analytics': { label: 'Integrasi Analytics', price: 200000 },
  }
};

// Custom Hook untuk Animasi Angka
function useCounter(targetValue, duration = 400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = count;
    const end = parseInt(targetValue, 10);
    if (start === end) return;

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      const currentVal = Math.round(start + (end - start) * eased);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [targetValue]);

  return count;
}

export default function Calculator() {
  const [website, setWebsite] = useState('landing-page');
  const [branding, setBranding] = useState('tidak-perlu');
  const [addons, setAddons] = useState([]);
  const [total, setTotal] = useState(800000);

  // Hitung total harga setiap kali ada perubahan state pilihan
  useEffect(() => {
    let sum = CALC_PRICING.website[website].price;
    sum += CALC_PRICING.branding[branding].price;
    
    addons.forEach((addon) => {
      sum += CALC_PRICING.addons[addon].price;
    });

    setTotal(sum);
  }, [website, branding, addons]);

  const handleAddonChange = (addonKey) => {
    setAddons((prev) => 
      prev.includes(addonKey) 
        ? prev.filter((a) => a !== addonKey) 
        : [...prev, addonKey]
    );
  };

  const animatedTotal = useCounter(total);

  // Generate WA Message
  const buildWaUrl = () => {
    const addonLabels = addons.map((a) => CALC_PRICING.addons[a].label);
    const message = [
      'Halo Gradivus Code, saya tertarik memesan jasa kustom:',
      '',
      `- *Website:* ${CALC_PRICING.website[website].label}`,
      `- *Branding:* ${CALC_PRICING.branding[branding].label}`,
      addons.length > 0 ? `- *Fitur Tambahan:* ${addonLabels.join(', ')}` : '',
      `- *Estimasi Total:* *Rp ${total.toLocaleString('id-ID')}*`,
      '',
      'Mohon info lebih lanjut untuk konsultasi. Terima kasih!'
    ].filter(Boolean).join('\n');

    return `https://wa.me/6281358939283?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="calculator" className="py-24 bg-bg-primary border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-4">
            Kalkulator Biaya
          </h2>
          <p className="text-text-secondary">Pilih layanan kustom Anda dan lihat estimasi biaya secara real-time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Column 1 & 2: Form Inputs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Website Type */}
            <fieldset>
              <legend className="text-lg font-heading font-bold mb-4">1. Jenis Website</legend>
              <div className="space-y-3">
                {Object.entries(CALC_PRICING.website).map(([key, opt]) => (
                  <label 
                    key={key} 
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      website === key 
                        ? 'border-accent-purple bg-accent-purple/5' 
                        : 'border-border bg-bg-card hover:border-border-hover'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="website-type" 
                        value={key} 
                        checked={website === key}
                        onChange={() => setWebsite(key)}
                        className="w-4 h-4 accent-accent-purple"
                      />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                    <span className="text-sm font-bold text-accent-teal">Rp {opt.price.toLocaleString('id-ID')}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Kebutuhan Branding */}
            <fieldset>
              <legend className="text-lg font-heading font-bold mb-4">2. Kebutuhan Branding</legend>
              <div className="space-y-3">
                {Object.entries(CALC_PRICING.branding).map(([key, opt]) => (
                  <label 
                    key={key} 
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      branding === key 
                        ? 'border-accent-purple bg-accent-purple/5' 
                        : 'border-border bg-bg-card hover:border-border-hover'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="branding-type" 
                        value={key} 
                        checked={branding === key}
                        onChange={() => setBranding(key)}
                        className="w-4 h-4 accent-accent-purple"
                      />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                    <span className="text-sm font-bold text-accent-teal">Rp {opt.price.toLocaleString('id-ID')}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Fitur Tambahan */}
            <fieldset>
              <legend className="text-lg font-heading font-bold mb-4">3. Fitur Tambahan (Add-ons)</legend>
              <div className="space-y-3">
                {Object.entries(CALC_PRICING.addons).map(([key, opt]) => (
                  <label 
                    key={key} 
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      addons.includes(key) 
                        ? 'border-accent-purple bg-accent-purple/5' 
                        : 'border-border bg-bg-card hover:border-border-hover'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={addons.includes(key)}
                        onChange={() => handleAddonChange(key)}
                        className="w-4 h-4 accent-accent-purple rounded"
                      />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                    <span className="text-sm font-bold text-accent-teal">+ Rp {opt.price.toLocaleString('id-ID')}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Column 3: Sticky Result Card */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-bg-card border border-border rounded-3xl p-8 text-center shadow-lg shadow-black/40">
              <h3 className="text-text-secondary text-sm font-semibold uppercase tracking-wider mb-2">Estimasi Total</h3>
              <div className="text-4xl font-heading font-bold text-accent-purple mb-6">
                Rp {animatedTotal.toLocaleString('id-ID')}
              </div>
              
              {/* Summary Lists */}
              <div className="text-left bg-bg-primary/50 border border-border rounded-xl p-4 mb-8 text-xs text-text-secondary space-y-2">
                <p>• {CALC_PRICING.website[website].label}</p>
                {branding !== 'tidak-perlu' && <p>• {CALC_PRICING.branding[branding].label}</p>}
                {addons.map((addon) => (
                  <p key={addon}>• Addon: {CALC_PRICING.addons[addon].label}</p>
                ))}
              </div>

              <a 
                href={buildWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-gradient-to-r from-accent-purple to-accent-teal hover:opacity-90 text-white font-bold rounded-full transition-all block text-center"
              >
                Pesan via WhatsApp
              </a>
              <p className="text-text-muted text-[10px] mt-4 leading-normal">
                * Estimasi ini bersifat sementara. Rincian final akan ditentukan setelah sesi konsultasi gratis.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
```

## QA Checklist

- [ ] Default kalkulator menampilkan total Rp 800.000 saat pertama dimuat
- [ ] Mengubah radio website type ke "Website UMKM" mengubah total ke Rp 2.000.000
- [ ] Memilih Branding Lengkap menambahkan biaya sebesar Rp 1.200.000 ke total
- [ ] Memilih beberapa add-on sekaligus (maps & copywriting) menambahkan total dengan akumulasi yang tepat
- [ ] Efek counter berjalan mulus (angka bergulir naik/turun, bukan langsung melompat)
- [ ] Panel ringkasan (summary) di bawah total bertambah / berkurang sesuai opsi yang dicentang
- [ ] Tombol CTA mengarah ke link WhatsApp di tab baru
- [ ] Isi pesan WhatsApp terisi lengkap sesuai rekapitulasi pilihan dan total nominal estimasi yang benar
- [ ] Mobile: Layar estimasi total terdorong ke paling bawah secara vertikal mengikuti alur scroll

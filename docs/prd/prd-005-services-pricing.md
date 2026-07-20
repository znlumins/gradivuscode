# PRD-005: Services & Pricing Cards Component

## Deskripsi
Section yang menampilkan 3 pilihan paket utama (Rintisan, Tumbuh, Mapan) dalam bentuk pricing cards. Card tengah (Tumbuh) harus di-highlight secara visual sebagai produk yang paling direkomendasikan ("Populer").

## Acceptance Criteria

- [ ] Komponen dibuat di `components/Services.js` sebagai Server Component (default)
- [ ] Data paket di-map dari array konstanta `SERVICE_PACKAGES` (di-import dari file constants)
- [ ] 3 Paket terkelola dengan harga yang tepat:
  - Rintisan: Rp 1.500.000
  - Tumbuh: Rp 2.800.000
  - Mapan: Rp 4.500.000
- [ ] Paket Tumbuh di-highlight: Border gradient, banner badge "Populer", dan berukuran sedikit lebih besar di layar desktop
- [ ] Fitur list di dalam card: Tanda centang hijau (✓) untuk fitur yang termasuk, dan tanda silang (✕) abu-abu coret untuk fitur yang tidak termasuk
- [ ] Setiap card memiliki tombol CTA "Pesan Sekarang" yang mengarah ke link chat WhatsApp dengan template pesan otomatis sesuai paket yang dipilih
- [ ] Hover Effect: Elevasi kartu ke atas (`hover:-translate-y-2`) dan penambahan bayangan shadow glow
- [ ] Responsive Layout: 1 kolom di mobile, 3 kolom di desktop

## Kode: `components/Services.js`

```jsx
import { SERVICE_PACKAGES } from './Calculator'; // Atau import dari constants file kustom

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-teal mb-4">
            Layanan & Harga
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan skala bisnis Anda saat ini. Semua paket include hosting gratis.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.map((pkg) => {
            const isHighlighted = pkg.badge !== null;
            
            // Format WhatsApp Message
            const waMessage = `Halo Gradivus Code, saya tertarik memesan paket *${pkg.name}* (Rp ${pkg.price.toLocaleString('id-ID')}). Mohon info kelanjutannya.`;
            const waUrl = `https://wa.me/6281358939283?text=${encodeURIComponent(waMessage)}`;

            return (
              <div 
                key={pkg.id}
                className={`flex flex-col justify-between bg-bg-card border rounded-3xl p-8 relative hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 ${
                  isHighlighted 
                    ? 'border-accent-purple shadow-glow scale-100 lg:scale-[1.03]' 
                    : 'border-border'
                }`}
              >
                {/* Badge Populer */}
                {isHighlighted && (
                  <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent-purple to-accent-teal text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    {pkg.badge}
                  </span>
                )}

                {/* Card Top */}
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold font-heading text-accent-teal mb-2">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-8">{pkg.desc}</p>
                  
                  {/* Feature Checklist */}
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li 
                        key={i}
                        className={`text-sm flex items-start gap-3 ${
                          feature.included ? 'text-text-primary' : 'text-text-muted line-through'
                        }`}
                      >
                        <span className={`text-base font-bold select-none ${feature.included ? 'text-accent-teal' : 'text-text-muted'}`}>
                          {feature.included ? '✓' : '✕'}
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button CTA */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4.5 rounded-full text-center text-sm font-bold transition-all shadow-md ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-accent-purple to-accent-teal text-white hover:opacity-90'
                      : 'bg-transparent border border-border text-text-primary hover:border-accent-purple hover:text-accent-purple'
                  }`}
                >
                  Pesan Paket {pkg.name}
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
```

## QA Checklist

- [ ] pricing cards terdistribusi secara horizontal 3 kolom (di desktop)
- [ ] Card Tumbuh tampil mencolok: border ungu, bayangan menyala (glow), dan memiliki badge "Populer"
- [ ] Angka harga paket sesuai: Rintisan 1.5jt, Tumbuh 2.8jt, Mapan 4.5jt
- [ ] Checklist fitur tampil dengan warna centang hijau (✓) dan silang abu-abu coret (✕) yang presisi
- [ ] Mengklik "Pesan Paket" membuka tab baru WhatsApp
- [ ] Teks template pesan WhatsApp ter-encode dengan aman dan memuat nama paket serta nominal harga yang tepat
- [ ] Hover effect menaikkan kartu secara responsif
- [ ] Tampilan mobile tersusun tegak 1 kolom dengan rapi

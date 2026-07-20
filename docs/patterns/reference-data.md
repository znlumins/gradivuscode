# Data Constants & Configuration

Semua data statis (seperti daftar harga, konten FAQ, paket layanan, dan kontak media sosial) disimpan di dalam file JavaScript terpusat di direktori kustom atau langsung di import untuk rendering visual.

## 1. Konstanta Kontak & Sosial Media (`lib/constants.js` atau sejenis)

Gunakan satu file konfigurasi terpusat untuk menyimpan semua data kontak yang dibagikan di landing page dan footer.

```javascript
// lib/constants.js

export const CONTACT_INFO = {
  whatsapp: '6281358939283',
  whatsappDisplay: '0813-5893-9283',
  email: 'daffaahmadalattas@gmail.com',
  instagram: 'https://www.instagram.com/dfaahm/',
  instagramHandle: '@dfaahm',
  linkedin: 'https://www.linkedin.com/in/daffa-ahmad-al-attas-824294322/',
  linkedinName: 'Daffa Ahmad Al Attas',
  brandName: 'Gradivus Code',
  tagline: 'Solusi digital premium untuk UMKM Indonesia',
  year: 2026,
};
```

---

## 2. Konstanta Harga Kalkulator (`components/Calculator.js`)

Simpan skema harga kalkulator di bagian atas file komponen untuk mempermudah pemeliharaan data:

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

## 3. Konstanta Paket Layanan (`components/Services.js`)

Daftar paket layanan untuk pricing cards di landing page:

```javascript
export const SERVICE_PACKAGES = [
  {
    id: 'rintisan',
    name: 'Rintisan',
    price: 1500000,
    badge: null,
    desc: 'Untuk UMKM yang baru mulai go digital',
    features: [
      { text: 'Landing Page 1 halaman', included: true },
      { text: 'Setup Domain', included: true },
      { text: 'Copywriting Dasar', included: true },
      { text: 'Link WhatsApp', included: true },
      { text: 'Desain Logo', included: false },
      { text: 'Google Maps', included: false },
      { text: 'Analytics', included: false },
      { text: 'Katalog Interaktif', included: false },
    ],
  },
  {
    id: 'tumbuh',
    name: 'Tumbuh',
    price: 2800000,
    badge: 'Populer',
    desc: 'Paket terlengkap untuk branding profesional',
    features: [
      { text: 'Landing Page 1 halaman', included: true },
      { text: 'Setup Domain', included: true },
      { text: 'Copywriting Dasar', included: true },
      { text: 'Link WhatsApp', included: true },
      { text: 'Desain Logo + 3 Banner', included: true },
      { text: 'Google Maps', included: true },
      { text: 'Analytics', included: true },
      { text: 'Katalog Interaktif', included: false },
    ],
  },
  {
    id: 'mapan',
    name: 'Mapan',
    price: 4500000,
    badge: null,
    desc: 'Solusi lengkap untuk UMKM yang serius berkembang',
    features: [
      { text: 'Multi-page (3 halaman)', included: true },
      { text: 'Setup Domain', included: true },
      { text: 'Copywriting Premium', included: true },
      { text: 'Link WhatsApp', included: true },
      { text: 'Visual Branding Lengkap', included: true },
      { text: 'Google Maps', included: true },
      { text: 'Analytics', included: true },
      { text: 'Katalog Interaktif', included: true },
      { text: 'Panduan Manajemen Konten', included: true },
    ],
  },
];
```

---

## 4. Konstanta Pertanyaan FAQ (`components/FAQ.js`)

```javascript
export const FAQ_ITEMS = [
  {
    question: 'Berapa lama pengerjaan?',
    answer: 'Landing page 1 halaman selesai dalam 3-5 hari kerja. Website multi-page 7-14 hari kerja, tergantung kompleksitas.',
  },
  {
    question: 'Apakah dapat domain gratis?',
    answer: 'Setup domain termasuk dalam semua paket. Anda hanya membayar biaya sewa domain tahunan (mulai Rp 120.000/tahun untuk .com).',
  },
  {
    question: 'Apakah ada biaya bulanan?',
    answer: 'Tidak ada! Website di-hosting secara gratis di server Vercel. Anda hanya perlu membayar sewa domain tahunan.',
  },
  {
    question: 'Bisa request revisi?',
    answer: 'Setiap paket mendapat 2x revisi gratis. Revisi tambahan Rp 100.000/revisi.',
  },
  {
    question: 'Bagaimana cara pembayaran?',
    answer: 'Pembayaran via transfer bank (BCA/BRI/Mandiri) atau e-wallet (GoPay/OVO/Dana). DP 50% di awal, pelunasan setelah website selesai.',
  },
  {
    question: 'Apakah website saya bisa diedit sendiri?',
    answer: 'Paket Mapan sudah termasuk panduan manajemen konten. Untuk paket lain, kami sediakan layanan maintenance dengan biaya terpisah.',
  },
  {
    question: 'Apakah website mobile-friendly?',
    answer: '100% responsive. Semua website kami dioptimasi untuk tampil sempurna di HP, tablet, dan desktop.',
  },
  {
    question: 'Bagaimana jika saya belum punya logo?',
    answer: 'Pilih paket Tumbuh atau Mapan yang sudah termasuk desain logo profesional. Atau tambahkan add-on Desain Logo via kalkulator harga kami.',
  },
];
```

## Rules

1.  **Constants, Not State:** Aset statis ini tidak boleh dimasukkan ke dalam React state (`useState`) karena tidak akan pernah bermutasi. Gunakan plain JS objects/arrays.
2.  **No hardcoded text in UI JSX:** Map array konstan di dalam JSX untuk meminimalkan rendering boilerplate.
3.  **Single Source of Truth:** Gunakan file `lib/constants.js` untuk data global yang di-reuse di beberapa tempat (misalnya, nomor WhatsApp yang di-import di navbar, kalkulator, form, dan footer).
4.  **Format Rupiah Helper:** Buat helper function terpusat untuk memformat angka Rupiah:
    ```js
    export const formatRupiah = (num) => 'Rp ' + num.toLocaleString('id-ID');
    ```

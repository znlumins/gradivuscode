# Gradivus Code — Landing Page & Admin Panel

Gradivus Code adalah platform landing page interaktif yang dirancang untuk memasarkan jasa pembuatan website estetis dan branding UMKM. Proyek ini dilengkapi dengan fitur estimasi harga (kalkulator biaya), formulir pemesanan terintegrasi WhatsApp, serta Admin Portal terproteksi untuk mengelola portofolio proyek secara langsung.

Proyek ini telah dimigrasikan sepenuhnya ke **TypeScript** dan dioptimalkan agar sepenuhnya responsif pada resolusi mobile serta mendukung multi-bahasa (**Indonesian & English**).

---

## 🚀 Fitur Utama

1. **Bilingual Localization (ID & EN)**
   - Menggunakan React Context API (`lib/LanguageContext.tsx`) untuk membagikan status bahasa aktif di seluruh elemen halaman secara real-time.
   - Kunci terjemahan statis didefinisikan secara rapi di dalam `lib/dictionaries.ts`.
   - Preferensi bahasa disimpan ke dalam `localStorage` pengguna agar tetap bertahan saat halaman dimuat ulang.

2. **Kalkulator Estimasi Biaya (Mobile Sticky Summary)**
   - Kalkulator biaya interaktif yang secara dinamis menjumlahkan harga berdasarkan tipe landing page, paket branding, dan add-on yang dipilih.
   - **Optimasi Mobile**: Menggunakan `IntersectionObserver` untuk mendeteksi visibilitas kalkulator dan memunculkan bar ringkasan biaya mengambang (sticky bottom bar) di bagian bawah layar handphone (`lg:hidden`). Pengguna mobile dapat memantau harga dan memesan via WhatsApp secara instan tanpa perlu scroll ke bawah halaman.

3. **Formulir Pemesanan (Custom Dropdown Selector)**
   - Formulir kontak pemesanan terintegrasi dengan template pesan WhatsApp.
   - **Custom Dropdown**: Menggantikan elemen `<select>` bawaan browser dengan custom dropdown UI yang terintegrasi dengan tema gelap-terang website. Menggunakan Lucide `ChevronDown` yang ditempatkan secara proporsional (`right-4 absolute`) untuk mencegah ikon menempel ke tepi border. Dilengkapi dengan event listener *click-outside* untuk menutup daftar pilihan otomatis.

4. **Laci Navigasi Mobile Bebas Glitch**
   - Laci menu mobile (`Navbar.tsx`) diposisikan sebagai sibling (bukan child) dari elemen `<header>` di dalam DOM. Hal ini memecahkan batasan CSS *containing block* akibat efek `transform: translate(-50%)` pada header desktop, sehingga laci navigasi mobile & overlay hitam dapat dirender dengan tinggi penuh 100% viewport (`fixed inset-y-0 right-0`) tanpa terpotong.

5. **Admin Dashboard Terproteksi (CRUD & Supabase)**
   - Halaman admin kustom terintegrasi dengan database **Supabase** untuk menambah, mengedit, dan menghapus data portofolio proyek.
   - Dilengkapi fitur ekspor data cadangan (Backup JSON) dan impor data (Import JSON).
   - **Desain Responsif**: Dialog formulir edit dan dialog konfirmasi hapus dilengkapi batasan tinggi layar (`max-h-[90vh]`) serta scroll bar vertikal (`overflow-y-auto`) agar tidak terpotong saat keyboard virtual HP terbuka.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Database / API Layer**: [Supabase JS Client](https://supabase.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan PostCSS
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Notifikasi**: [Sonner](https://emilkowal.ski/ui/sonner)

---

## 📂 Struktur Proyek

```text
├── .agents/             # Konfigurasi skill dan aturan AI asisten
├── app/
│   ├── admin/           # Halaman Dashboard Admin Portal
│   ├── globals.css      # Custom styling & token warna Tailwind v4
│   ├── layout.tsx       # Root layout, metadata, dan konfigurasi font
│   ├── page.tsx         # Halaman Landing Page Utama
│   └── icon.svg         # Ikon aplikasi
├── components/
│   ├── Navbar.tsx       # Navigasi header & menu mobile drawer
│   ├── Hero.tsx         # Hero section & CTA Utama
│   ├── Services.tsx     # Daftar paket layanan & harga
│   ├── Calculator.tsx   # Estimasi harga kalkulator & mobile sticky bar
│   ├── ContactForm.tsx  # Formulir kontak & custom dropdown
│   ├── FAQ.tsx          # Accordion tanya-jawab responsif
│   └── ErrorDialog.tsx  # Dialog pop-up notifikasi error database
├── docs/                # Kumpulan PRD (Product Requirement Documents)
├── lib/
│   ├── LanguageContext.tsx  # Context provider status bahasa (ID/EN)
│   ├── dictionaries.ts      # Kamus terjemahan bahasa
│   └── supabase.ts          # Inisialisasi koneksi klien Supabase
├── tasks/               # Catatan pengerjaan (todo list & lessons learned)
└── public/              # Aset statis gambar dan logo SVG
```

---

## 🔧 Panduan Memulai (Getting Started)

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 18+) di komputer Anda.

### 2. Kloning Repositori
```bash
git clone https://github.com/znlumins/gradivuscode.git
cd gradivuscode
```

### 3. Konfigurasi Environment Variables
Buat berkas `.env.local` di direktori utama proyek dan tambahkan kredensial koneksi Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Instalasi Dependensi
```bash
npm install
```

### 5. Jalankan Server Pengembangan
Jalankan server lokal untuk melihat perubahan secara real-time:
```bash
npm run dev
```
Buka browser Anda dan akses [http://localhost:3000](http://localhost:3000).

### 6. Build Produksi
Untuk mengompilasi dan mengoptimalkan aplikasi sebelum dideploy:
```bash
npm run build
npm run start
```
Aplikasi akan secara otomatis terkompilasi sebagai static pages yang berkinerja tinggi.

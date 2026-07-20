# Analisis Bisnis & Product Requirement Document (PRD)
## Jasa One-Stop Landing Page + Branding Paket UMKM

Dokumen ini berisi analisis bisnis mendalam serta PRD teknis yang dirancang secara modular dan sederhana agar dapat dengan mudah dikerjakan oleh **junior developer** atau **AI agent berbiaya rendah** (seperti model Flash/Lite).

---

# BAGIAN 1: Analisis Bisnis Mendalam (Deep Business Analysis)

### 1. Lanskap Pasar & Masalah UMKM
Banyak UMKM di Indonesia (kuliner, fashion, jasa kecantikan, retail lokal) ingin melakukan digitalisasi, namun menghadapi kendala berikut:
* **Fragmentasi Vendor:** Mereka harus menyewa desainer logo terpisah, fotografer terpisah, desainer UI terpisah, dan programmer web terpisah. Hal ini melelahkan dan mahal.
* **Harga Agensi Terlalu Tinggi:** Agensi software/desain profesional mematok tarif puluhan juta, sementara UMKM hanya memiliki anggaran berkisar antara Rp 1.500.000 s/d Rp 4.000.000.
* **Website Template Murahan tapi Lambat:** Jasa pembuatan web murah yang ada saat ini sering kali menggunakan template WordPress berat yang lambat diakses dari HP (padahal 90%+ pelanggan UMKM mengakses lewat handphone).

### 2. Solusi & Value Proposition Anda
Memadukan keahlian **SMK Multimedia** dan **D3 Teknologi Informasi** untuk menawarkan paket **"Terima Beres"** dengan harga terjangkau namun hasil premium:
* **Kecepatan Website Ekstrim (D3 IT):** Landing page dibangun menggunakan teknologi framework modern (Next.js) yang sangat ringan dan teroptimasi SEO.
* **Estetika Premium (SMK Multimedia):** Klien tidak hanya mendapatkan website kosong, tapi sudah termasuk paket desain logo dasar, aset ilustrasi, pemilihan palet warna yang harmonis, dan *copywriting* penjualan dasar.
* **Zero Maintenance Cost:** Menggunakan serverless hosting gratis (Vercel) sehingga UMKM tidak perlu membayar biaya sewa server bulanan yang mahal. Klien hanya perlu membayar domain (.com / .id) tahunan.

### 3. Paket Jasa yang Ditawarkan
1. **Paket Rintisan (Basic):** Landing Page 1 Halaman + Setup Domain + Copywriting Dasar + Link WhatsApp.
2. **Paket Tumbuh (Standard):** Landing Page 1 Halaman + Paket Visual Branding (Desain Logo Baru, 3 Aset Grafis Banner) + Integrasi Google Maps + Analitik Pengunjung.
3. **Paket Mapan (Premium):** Multi-page Website (Hingga 3 halaman: Home, Portofolio/Menu, Kontak) + Paket Visual Lengkap + Fitur Pemesanan/Katalog Produk Interaktif + Panduan Manajemen Konten.

---

# BAGIAN 2: Product Requirement Document (PRD)
**Nama Proyek:** Agency Portfolio & Interactive Lead Generator — **Gradivus Code**  
**Tujuan Website:** Menjadi etalase profesional bisnis jasa Anda, menampilkan portofolio multimedia, dan menangkap calon klien secara otomatis melalui kalkulator harga dan integrasi WhatsApp.  
**PRD Detail:** Lihat folder [docs/prd/](docs/prd/) untuk 12 PRD yang siap dikerjakan junior developer.

---

## 1. Arsitektur & Teknologi (Next.js & Supabase Stack)
Untuk menekan biaya pengembangan, mempermudah deployment, dan menjaga kualitas performa premium:

* **Framework Frontend:** **Next.js 14+ (App Router)** menggunakan JavaScript (React) dan Tailwind CSS untuk kemudahan utility styling.
* **Database & Auth (Backend):** **Supabase (Free Tier)**. PostgreSQL serverless yang menyimpan data portofolio secara dinamis, sehingga Admin Panel dapat diakses dari mana saja secara global.
* **Form Handling:** 
  * **WhatsApp API Redirect:** Mengubah data formulir dan kalkulator menjadi pesan teks WhatsApp ter-encode.
  * **Formspree / Web3Forms (Opsional):** Integrasi email.
* **Hosting:** **Vercel** (Gratis selamanya, terintegrasi otomatis dengan Git repository untuk Next.js).

---

## 2. Kebutuhan Fitur (Features Requirements)

### Fitur 1: Hero Section & Value Proposition
* **Deskripsi:** Bagian atas web yang langsung memikat pengunjung.
* **Spesifikasi:**
  * Judul utama yang menjual (Contoh: "Bikin Usahamu Naik Kelas dengan Landing Page Estetis & Super Cepat").
  * Sub-judul penjelas paket gabungan Multimedia + IT.
  * Tombol CTA (Call to Action) yang kontras menuju kalkulator harga/kontak.
  * Latar belakang interaktif yang ringan (misalnya, gradasi warna yang bergerak lambat).

### Fitur 2: Portofolio Filterable (Multimedia & Web)
* **Deskripsi:** Menampilkan karya desain (Multimedia) dan website (IT) yang pernah dikerjakan.
* **Spesifikasi:**
  * Tombol filter kategori: "Semua", "Desain & Branding", "Website".
  * Grid gambar portofolio yang responsif (2 kolom di mobile, 3 kolom di desktop).
  * Efek hover yang memperlihatkan judul proyek dan deskripsi singkat.
  * Fitur lightbox (jika gambar diklik, akan membesar tanpa pindah halaman).

### Fitur 3: Kalkulator Harga Interaktif (Fitur Unggulan)
* **Deskripsi:** Fitur interaktif yang membedakan web Anda dengan kompetitor. Calon klien bisa memilih kebutuhan mereka dan melihat estimasi harga secara real-time.
* **Spesifikasi:**
  * **Input Pilihan:**
    * Jenis Website: [Landing Page (1 Halaman)] / [Website UMKM (3 Halaman)] / [Katalog Interaktif].
    * Kebutuhan Branding: [Tidak Perlu] / [Desain Logo Saja] / [Paket Branding Lengkap].
    * Keperluan Tambahan: [Setup Google Maps] / [Copywriting Premium] / [Integrasi Analytics].
  * **Output:** Harga estimasi dihitung otomatis dan dinamis berdasarkan kombinasi pilihan di atas.
  * **Tombol Aksi:** "Pesan Sekarang lewat WhatsApp" yang akan merangkum semua pilihan klien menjadi teks template chat.

### Fitur 4: Formulir Pemesanan terintegrasi WhatsApp
* **Deskripsi:** Memproses pesanan dari kalkulator harga ke WhatsApp pemilik bisnis.
* **Spesifikasi:**
  * Form berisi: Nama, Nama Usaha, Jenis Paket, dan Catatan Tambahan.
  * Saat tombol kirim diklik, JavaScript akan memformat teks menjadi URL WhatsApp:
    `https://wa.me/6281358939283?text=Halo%20Gradivus%20Code,%20saya%20[Nama]%20tertarik%20memesan%20[Paket]%20untuk%20usaha%20[NamaUsaha]...`
  * Otomatis membuka tab baru/aplikasi WhatsApp dengan pesan yang sudah terisi.

---

## 3. Struktur Halaman & Layout (Wireframe Sederhana)
Semua fitur digabungkan dalam format **Single Page Application (One-Page Scroll)** untuk menyederhanakan navigasi dan pengembangan:

1. **Header / Navbar:** Logo, Link Navigasi (Portofolio, Paket Harga, Hubungi Kami), tombol CTA.
2. **Hero Section:** Headline + Visual ilustrasi representatif.
3. **Services & Pricing Packages:** Kartu harga paket Rintisan, Tumbuh, dan Mapan.
4. **Interactive Estimator (Kalkulator Harga):** Section interaktif.
5. **Portfolio Showcase:** Grid portofolio dengan filter kategori.
6. **FAQ Section:** Akordeon tanya-jawab interaktif (misal: "Berapa lama pengerjaan?", "Apakah dapat domain gratis?").
7. **Footer:** Hak cipta, link media sosial (Instagram, LinkedIn), dan kontak cepat.
8. **Admin Panel (admin.html):** Halaman terpisah untuk pemilik bisnis mengelola portofolio (CRUD via localStorage) tanpa coding.

---

## 4. Panduan Implementasi untuk Junior/Agent (Step-by-Step)

Untuk memastikan pengembang junior atau AI agent murah tidak melakukan kesalahan, kerjakan dengan urutan berikut:

### Langkah 1: Setup Proyek & Struktur Folder
```text
/
├── index.html          # File HTML utama
├── css/
│   └── styles.css      # Custom styling tambahan
├── js/
│   └── script.js       # Logika kalkulator harga dan redirect WA
└── assets/
    ├── images/         # File gambar portofolio & logo
    └── icons/          # Ikon (SVG atau link FontAwesome)
```

### Langkah 2: Kode HTML & Struktur Halaman
Gunakan semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`) dengan class Tailwind CSS langsung pada elemen untuk mempercepat styling tanpa banyak menulis CSS manual.

### Langkah 3: Menulis Logika JavaScript (Kalkulator Harga & Form WA)
Tulis fungsi JavaScript sederhana:
1. `calculatePrice()`: Membaca nilai dari checkbox/radio button pilihan, mengalikannya dengan tarif masing-masing, dan memperbarui teks total harga di layar.
2. `sendToWhatsApp()`: Mengambil nilai dari input form, men-encode teks (`encodeURIComponent`), dan mengarahkan browser ke tautan WhatsApp API.

### Langkah 4: Optimasi Performa & Aksesibilitas
* Kompres semua gambar portofolio menggunakan format `.webp` agar website memuat kurang dari 2 detik.
* Pastikan layout responsif (tampilan mobile harus rapi karena calon klien UMKM sering membuka web via HP).
* Pasang meta tag dasar untuk SEO (Title, Description, Open Graph untuk pratinjau chat WA).

---

## 5. Rencana Verifikasi & Testing
1. **Fungsionalitas Kalkulator:** Cek apakah harga berubah dengan benar saat kombinasi pilihan diganti.
2. **Pengiriman Form:** Pastikan saat tombol kirim diklik, tautan WhatsApp terbuka dengan format pesan yang rapi dan benar.
3. **Uji Kecepatan:** Jalankan web di Google PageSpeed Insights (target skor minimal 90 untuk performa mobile).
4. **Responsivitas:** Uji tampilan di resolusi HP (360px) hingga layar Desktop (1920px).

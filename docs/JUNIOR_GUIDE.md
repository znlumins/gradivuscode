# 🚀 Panduan Onboarding Developer: Next.js Proyek Gradivus Code

Selamat datang di **Gradivus Code**! Dokumen ini dirancang khusus untuk memandu developer baru (dan asisten AI) melakukan inisialisasi, koding, dan deployment proyek website Gradivus Code menggunakan stack modern **Next.js + Tailwind CSS + Supabase**.

---

## 📌 1. Langkah Inisialisasi Proyek

Untuk memulai dari awal, ikuti perintah scaffold berikut pada terminal workspace Anda:

```bash
# 1. Jalankan CLI inisialisasi Next.js
# Pilih konfigurasi default: JavaScript, Tailwind CSS, App Router, ESLint, src/ directory (No)
npx create-next-app@latest gradivus-code --js --tailwind --app --eslint --src-dir no --import-alias "@/*"

# 2. Masuk ke direktori proyek
cd gradivus-code

# 3. Install Supabase Client SDK untuk database
npm install @supabase/supabase-js
```

---

## ⚙️ 2. Konfigurasi Environment Variables

Buat file `.env.local` di root direktori untuk menyimpan konfigurasi Supabase (dapatkan keys di dashboard [Supabase](https://supabase.com/)):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **PENTING**: Jangan pernah melakukan commit file `.env.local` ke git repository. File ini secara default sudah masuk di daftar `.gitignore` bawaan Next.js.

---

## 📁 3. Arsitektur File Next.js

Berikut adalah struktur file utama setelah inisialisasi dan integrasi Gradivus Code:

```text
gradivus-code/
├── app/
│   ├── layout.js             # Main shell: Font import, Navbar, Footer, globals.css
│   ├── page.js               # Landing page utama (One-page scroll)
│   ├── globals.css           # Tailwind directives & base styling
│   ├── admin/
│   │   └── page.js           # Panel Admin CRUD (Client Component)
│   └── api/
│       └── portfolio/
│           └── route.js       # API Route untuk komunikasi dengan database Supabase
├── components/               # Komponen visual modular
│   ├── Navbar.js             # Client component (hamburger state)
│   ├── Hero.js               # Server component (SEO optimisasi)
│   ├── Services.js           # Server component (pricing list)
│   ├── Calculator.js         # Client component (state kalkulasi harga)
│   ├── PortfolioGrid.js      # Client component (Supabase fetching & category filter)
│   ├── Lightbox.js           # Client component (modal detail)
│   ├── FAQ.js                # Client component (state active accordion)
│   ├── ContactForm.js        # Client component (form submission)
│   └── Footer.js             # Footer statis
├── lib/
│   └── supabase.js           # Inisialisasi SDK client Supabase
└── public/                   # Media statis (diakses via "/logo/gradiuscode.svg")
```

---

## 📐 4. Aturan Alur Koding Komponen

### Server Component vs Client Component
1.  **Server Component (Default):** Digunakan untuk data statis yang ramah SEO (seperti `Hero.js`, `Services.js`, `Footer.js`).
2.  **Client Component:** Tambahkan deklarasi `'use client'` di baris pertama file jika komponen Anda:
    - Menggunakan hooks (`useState`, `useEffect`, `useRef`).
    - Menggunakan event handling (`onClick`, `onSubmit`, `onChange`).
    - Contoh: `Calculator.js`, `ContactForm.js`, `FAQ.js`, `admin/page.js`.

### Integrasi Image Next.js
Gunakan `next/image` sebagai pengganti `<img>` standar untuk optimasi otomatis:

```jsx
import Image from 'next/image';

// ✅ Tepat: menentukan width & height untuk rasio CLS
<Image 
  src="/logo/gradiuscode.svg" 
  alt="Gradivus Code" 
  width={140} 
  height={36} 
  priority 
/>
```

---

## 🛠️ 5. Perintah Pengembangan & Deploy

### Development Lokal
Jalankan server lokal dev mode:

```bash
# Menjalankan local server
npm run dev
# Buka http://localhost:3000 di browser
```

### Production Build Check
Sebelum melakukan deploy, pastikan tidak ada build error dengan menjalankan build lokal:

```bash
# Compile proyek ke mode production
npm run build

# Menjalankan build hasil compile secara lokal
npm run start
```

### Deploy ke Vercel (Rekomendasi)
Cara termudah adalah menghubungkan repo GitHub Anda langsung ke akun [Vercel](https://vercel.com/):
1.  Push proyek ke GitHub repo Anda.
2.  Login ke Vercel dashboard, pilih **Import Project**.
3.  Masukkan Environment Variables (`NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`) di tab setting sebelum deploy.
4.  Klik **Deploy** — Vercel akan mengotomatisasi build dan deploy setiap kali Anda melakukan git push.

---

## 📋 6. Alur Kerja yang Disarankan

```text
1. Jalankan `npx create-next-app` untuk inisialisasi folder awal.
2. Update `tailwind.config.js` dengan design tokens (PRD-002).
3. Setup `app/globals.css` dengan Tailwind directives.
4. Hubungkan database Supabase dan isikan env vars ke .env.local.
5. Kerjakan PRD secara urut (003 s/d 011).
6. Lakukan build lokal `npm run build` untuk memverifikasi tidak ada error compilation.
7. Hubungkan repository ke Vercel untuk deployment otomatis.
```

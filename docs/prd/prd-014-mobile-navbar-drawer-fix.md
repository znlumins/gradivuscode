# PRD-014: Mobile Navigation Drawer Containing Block Layout Fix

## Deskripsi
Ketika website diuji pada simulator mobile, laci navigasi mobile (Mobile Navigation Drawer) dan overlay background mengalami malfungsi tata letak (layout glitch). Laci drawer tidak menempati tinggi layar penuh di sebelah kanan (fullscreen right drawer), melainkan terpotong dan elemen-elemen di dalamnya (seperti switch bahasa dan tombol CTA) melayang tidak sejajar di tengah layar.

## Root Cause Analysis (Analisis Penyebab)
- Elemen `<header>` memiliki CSS Transform (`-translate-x-1/2`) untuk menengahkan posisi navbar pill di layar desktop/mobile.
- Dalam spesifikasi CSS, elemen yang memiliki properti `transform` akan menjadi **containing block** (blok pembatas baru) bagi seluruh elemen keturunannya yang menggunakan posisi `fixed`.
- Karena laci navigasi (`fixed inset-y-0 right-0`) diletakkan di dalam elemen `<header>`, posisinya tidak lagi relatif terhadap viewport layar HP, melainkan terikat di dalam dimensi koordinat elemen `<header>`. Hal ini merusak seluruh penataan layout mobile.

## Acceptance Criteria

### 1. Relokasi Struktur DOM Drawer & Overlay
- [ ] Laci navigasi mobile (`div` dengan class drawer) harus dipindahkan keluar dari elemen `<header>` agar menjadi sibling (saudara sejajar) dan bukan anak dari `<header>`.
- [ ] Overlay background (`div` dengan class overlay) harus dipindahkan keluar dari elemen `<header>` agar dapat menutupi seluruh layar secara penuh (`fixed inset-0`).

### 2. Konsistensi Fungsionalitas & State
- [ ] Memastikan pemindahan drawer tidak merusak link scroll navigasi smooth (`handleLinkClick`).
- [ ] Hamburger button tetap memicu buka-tutup drawer (`isOpen` state) secara sempurna.
- [ ] Mengklik overlay background tetap menutup drawer.
- [ ] Memastikan laci menu mobile ter-render rapi setinggi layar penuh (`h-full` / `inset-y-0`) dengan lebar `w-[260px]` di sisi kanan layar.

---

## Verifikasi & Uji Coba (QA Checklist)
- [ ] Drawer mobile menutup/membuka secara mulus dengan transisi dari kanan layar.
- [ ] Seluruh tautan menu di dalam laci navigasi mobile sejajar vertikal secara rapi.
- [ ] Switch bahasa `ID` / `EN` berada di dalam laci navigasi dan tidak melayang di tengah konten halaman utama.
- [ ] Laci navigasi menempati tinggi penuh layar perangkat mobile (100% viewport height) pada simulator browser.
- [ ] Menjalankan build produksi `npm run build` lokal sukses tanpa error.

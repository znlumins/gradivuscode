# PRD-012: Performance & SEO Optimization Checklist

## Deskripsi
Optimasi performa bundle Next.js, penanganan dynamic import, optimasi loading gambar (`next/image`), audit metadata SEO kustom, dan setup JSON-LD structured data. Menargetkan skor audit Lighthouse **90+** di seluruh kategori.

## Acceptance Criteria

- [ ] Meta tags global di-setup menggunakan Metadata API di layout utama (`app/layout.js`)
- [ ] Meta tags robots `noindex, nofollow` disematkan pada halaman `/admin`
- [ ] Schema Markup JSON-LD `ProfessionalService` ter-inject dengan aman di layout utama
- [ ] Google Fonts ter-load menggunakan system helper `next/font/google` di file layout utama
- [ ] Semua media gambar di landing page menggunakan component `<Image>` Next.js
- [ ] Menambahkan domain gambar eksternal di config file `next.config.js`
- [ ] Menjalankan kompilasi build produksi `npm run build` lokal sukses tanpa error
- [ ] Target skor audit Lighthouse:
  - Performance: ≥ 90
  - Accessibility: ≥ 90
  - Best Practices: ≥ 90
  - SEO: ≥ 90

## Next.js Build & Compilation Test

Sebelum deploy ke hosting Vercel, jalankan kompilasi build lokal untuk memastikan tidak ada broken syntax atau TypeScript error:

```bash
# Menjalankan build lokal
npm run build
```

Hasil build log harus menunjukkan output routes statis (SSG) bertanda `○` (static) atau `●` (SSG/ISR) tanpa status warning:

```text
Route (app)                              Size     First Load JS
┌  /                                     24 kB          102 kB
├  /admin                                42 kB          120 kB
└  /api/portfolio                        0 B              0 kB
+ First Load JS shared by all            78 kB
```

---

## Optimasi Performance Checklist

- [ ] Properti `sizes` di-set pada gambar portofolio `<Image fill sizes="..." />` agar Next.js membatasi resolusi gambar di mobile phone.
- [ ] Logo navbar di-set properti `priority` agar langsung dimuat (LCP optimization).
- [ ] Link eksternal `target="_blank"` wajib ditambahkan `rel="noopener noreferrer"` untuk keamanan.
- [ ] Tidak ada warning `console.log` tersisa pada build code produksi.
- [ ] Menambahkan dynamic loading (`next/dynamic`) pada dialog Lightbox jika ukurannya terlalu besar untuk membagi ukuran file JS utama (code splitting).

---

## Verifikasi Akhir (Lighthouse Audit)

Jalankan test audit menggunakan Chrome DevTools Lighthouse atau PageSpeed Insights dengan target:

| Category | Target Score |
|---|---|
| **Performance** | ≥ 90 |
| **Accessibility** | ≥ 90 |
| **Best Practices** | ≥ 90 |
| **SEO** | ≥ 90 |

## QA Checklist

- [ ] Kode sumber HTML memuat tag `<title>`, `<meta name="description">` dan Open Graph yang lengkap
- [ ] Schema markup JSON-LD tervalidasi sukses di schema validator Google
- [ ] Gambar di bawah fold memiliki loading attribute `lazy` bawaan dari Next.js
- [ ] Skor LCP (Largest Contentful Paint) di bawah 2.5 detik pada audit mobile
- [ ] Skor CLS (Cumulative Layout Shift) bernilai 0 (tidak ada layout bergeser saat fonts/images ter-load)
- [ ] Deploy ke Vercel sukses tanpa build failure

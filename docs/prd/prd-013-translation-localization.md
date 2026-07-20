# PRD-013: Bilingual Translation & Localization

## Deskripsi
Dokumen ini mendefinisikan persyaratan untuk mengimplementasikan lokalisasi penuh dua bahasa (Bahasa Indonesia & English) pada seluruh elemen website yang saat ini masih hardcoded dalam Bahasa Indonesia. Lokalisasi ini mencakup konten statis halaman, daftar/deskripsi paket layanan, opsi input kalkulator biaya, formulir kontak, pesan error, WhatsApp link template, dan seluruh fungsionalitas Admin Panel.

## Acceptance Criteria

### 1. General & Layout
- [ ] Tag skip-link "Langsung ke konten utama" pada `app/page.tsx` harus diterjemahkan secara dinamis menggunakan `useLanguage` (`t.nav.skipToContent` / `t.nav.skipLink`).
- [ ] Atribut aksibilitas seperti `aria-label="Navigasi desktop"` pada `components/Navbar.tsx` harus menggunakan lokalisasi bahasa.
- [ ] Layout global mendeteksi perubahan bahasa secara real-time dan menyimpan status pilihan ke `localStorage` (sesuai standard `i18n.md`).

### 2. Services & Pricing Section
- [ ] Deskripsi paket (Startup, Professional, Enterprise) dan daftar fiturnya (features checklist) tidak boleh hardcoded dalam bahasa Indonesia di `components/Services.tsx`.
- [ ] Harga paket diformat secara dinamis berdasarkan bahasa terpilih:
  - Mode **ID**: Format Rupiah (contoh: `Rp 3.499.000` menggunakan locale `id-ID`).
  - Mode **EN**: Format USD/IDR Internasional (contoh: `IDR 3,499,000` atau `Rp 3,499,000` menggunakan locale `en-US` dengan format desimal internasional).
- [ ] Pesan order WhatsApp (`waMessage`) yang dibuat saat mengklik CTA paket harus diterjemahkan secara dinamis sesuai bahasa terpilih:
  - **ID**: `Halo Gradivus Code, saya tertarik memesan paket [Nama Paket] (Rp [Harga]). Mohon info kelanjutannya.`
  - **EN**: `Hello Gradivus Code, I am interested in ordering the [Nama Paket] package (IDR [Harga]). Please let me know the next steps.`

### 3. Price Calculator Section
- [ ] Opsi input pada kalkulator biaya (Jenis Website, Kebutuhan Branding, Fitur Tambahan) di `components/Calculator.tsx` harus diterjemahkan ke bahasa English saat mode `EN` aktif.
- [ ] Pesan ringkasan kalkulator biaya yang dikirim via WhatsApp harus diterjemahkan secara penuh:
  - **ID**: Teks ringkasan dalam Bahasa Indonesia.
  - **EN**: Teks ringkasan dalam Bahasa English (contoh: `Hello Gradivus Code, I am interested in ordering custom services...`).
- [ ] Format harga estimasi total dan detail addon di dalam sticky card harus menyesuaikan format locale (`id-ID` atau `en-US`).

### 4. Contact Form Section
- [ ] Dropdown select options untuk pilihan paket pada `components/ContactForm.tsx` harus disesuaikan format mata uangnya (`Rp 3.499.000` vs `IDR 3,499,000`) dan teks fallback-nya (`Belum Tahu` vs `Undecided / Custom`).
- [ ] Template pesan pesanan WhatsApp dari form kontak harus diterjemahkan secara dinamis sesuai bahasa terpilih.

### 5. Error Dialog & Toasts
- [ ] Komponen `components/ErrorDialog.tsx` harus menggunakan `useLanguage` untuk melokalisasi teks judul ("Aksi Gagal" / "Action Failed"), pesan error default, dan tombol aksi ("Tutup & Perbaiki" / "Close & Fix").
- [ ] Semua pesan toast di Admin Panel (`app/admin/page.tsx`) harus didaftarkan di dalam dictionaries terpusat dan dilokalisasi.

### 6. Admin Panel
- [ ] Dashboard admin (`app/admin/page.tsx`) harus mendukung lokalisasi bahasa (mengikuti preferensi bahasa yang disimpan di `localStorage` atau menyediakan language switcher).
- [ ] Seluruh antarmuka admin panel (stat cards, tabel kelola portofolio, form dialog CRUD, dan modal konfirmasi hapus) harus diterjemahkan ke bahasa English saat mode `EN` aktif.

---

## Spesifikasi Dictionaries (`lib/dictionaries.ts`)

Struktur dictionary diperluas untuk mencakup skema berikut pada key `id` dan `en`:

```typescript
export interface Dictionary {
  // ... keys yang sudah ada (hero, nav, dll)
  general: {
    skipLink: string;
    ariaNav: string;
  };
  services: {
    heading: string;
    subtitle: string;
    badgePopular: string;
    ctaOrder: string;
    packages: {
      startup: {
        desc: string;
        features: string[];
      };
      professional: {
        desc: string;
        features: string[];
      };
      enterprise: {
        desc: string;
        features: string[];
      };
    };
    waTemplate: string; // Template pesan WhatsApp
  };
  calculator: {
    heading: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    estimateLabel: string;
    ctaWhatsapp: string;
    disclaimer: string;
    pricingLabels: {
      website: Record<string, string>;
      branding: Record<string, string>;
      addons: Record<string, string>;
    };
    waTemplate: string; // Template WhatsApp Calculator
  };
  contact: {
    // ... keys yang sudah ada
    // ditambah template WhatsApp form kontak
    waTemplate: string;
  };
  errorDialog: {
    title: string;
    defaultMessage: string;
    buttonText: string;
  };
  admin: {
    loginTitle: string;
    loginPlaceholder: string;
    loginButton: string;
    viewWeb: string;
    logout: string;
    totalPortfolio: string;
    categoryWebsite: string;
    categoryBranding: string;
    manageTitle: string;
    addBtn: string;
    exportBtn: string;
    importBtn: string;
    thProject: string;
    thCategory: string;
    thDate: string;
    thAction: string;
    btnEdit: string;
    btnDelete: string;
    loadingDb: string;
    emptyDb: string;
    formAddTitle: string;
    formEditTitle: string;
    formLabelTitle: string;
    formLabelCategory: string;
    formLabelDesc: string;
    formLabelImage: string;
    formLabelDemo: string;
    formBtnCancel: string;
    formBtnSave: string;
    confirmDeleteTitle: string;
    confirmDeleteDesc: string;
    confirmDeleteBtn: string;
    toasts: {
      fetchError: string;
      loginSuccess: string;
      loginFailed: string;
      logoutSuccess: string;
      updateSuccess: string;
      addSuccess: string;
      saveFailed: string;
      networkError: string;
      deleteSuccess: string;
      deleteFailed: string;
      backupSuccess: string;
      importSuccess: string;
      importFailed: string;
    };
  };
}
```

---

## Rencana Verifikasi & Uji Coba (QA Checklist)
- [ ] Semua menu navigasi dan skip-link berganti bahasa secara sinkron saat language toggle di navbar diklik.
- [ ] Di halaman depan (Services, Calculator, Contact Form), data teks dan format mata uang (`Rp` vs `IDR`) beradaptasi secara dinamis tanpa ada sisa teks bahasa Indonesia ketika mode `EN` aktif.
- [ ] Pesan teks yang di-encode ke link WhatsApp tervalidasi dalam bahasa English ketika user mengorder dalam mode `EN`.
- [ ] Halaman Admin Panel `/admin` beradaptasi dengan bahasa terpilih (sesuai status penyimpanan `localStorage` dari landing page).
- [ ] Seluruh fungsionalitas CRUD di Admin Panel berjalan normal di kedua bahasa tanpa memicu error build Next.js.

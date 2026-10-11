export type Language = 'id' | 'en';

export interface Dictionary {
  general: {
    skipLink: string;
    ariaNav: string;
  };
  hero: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    subtitleMobile: string;
    ctaPrice: string;
    ctaConsult: string;
    statProject: string;
    statSatisfaction: string;
    statSpeed: string;
    waTemplate: string;
  };
  nav: {
    services: string;
    portfolio: string;
    calculator: string;
    faq: string;
    contact: string;
    cta: string;
  };
  services: {
    heading: string;
    subtitle: string;
    badgePopular: string;
    ctaOrder: string;
    packages: {
      starter: {
        name: string;
        desc: string;
        features: string[];
      };
      pro: {
        name: string;
        desc: string;
        features: string[];
      };
      enterprise: {
        name: string;
        desc: string;
        features: string[];
      };
    };
    waTemplate: string;
  };
  portfolio: {
    heading: string;
    subtitle: string;
    filterAll: string;
    filterWebsite: string;
    filterBranding: string;
    emptyText: string;
    viewDemo: string;
    closeModal: string;
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
    waTemplate: string;
  };
  faq: {
    heading: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  contact: {
    heading: string;
    subtitle: string;
    labelName: string;
    labelBusiness: string;
    labelPackage: string;
    labelNotes: string;
    placeholderName: string;
    placeholderBusiness: string;
    placeholderPackage: string;
    placeholderNotes: string;
    ctaWhatsapp: string;
    ctaEmail: string;
    successTitle: string;
    successMessage: string;
    sidebarTitle: string;
    errorName: string;
    errorBusiness: string;
    errorPackage: string;
    optionUndecided: string;
    packages: {
      starter: string;
      pro: string;
      enterprise: string;
    };
    waTemplate: string;
  };
  errorDialog: {
    title: string;
    defaultMessage: string;
    buttonText: string;
  };
  footer: {
    quickLinks: string;
    contactUs: string;
    brandDesc: string;
    madeWith: string;
    copyright: string;
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
      validJsonError: string;
    };
  };
}

export const dictionaries: Record<Language, Dictionary> = {
  id: {
    general: {
      skipLink: 'Langsung ke konten utama',
      ariaNav: 'Navigasi desktop',
    },
    hero: {
      titleBefore: 'Jasa Pembuatan Website ',
      titleHighlight: 'Go Global',
      titleAfter: ' untuk Bisnis Anda',
      subtitle: 'Tingkatkan kepercayaan bisnis Anda di mata luar negeri & gaet pasar internasional dengan website estetis dan super cepat.',
      subtitleMobile: 'Tingkatkan kepercayaan bisnis Anda & gaet pasar internasional.',
      ctaPrice: 'Lihat Paket Harga',
      ctaConsult: 'Konsultasi Gratis',
      statProject: 'Proyek Selesai',
      statSatisfaction: 'Klien Puas',
      statSpeed: 'Skor PageSpeed',
      waTemplate: 'Halo Gradivus Code, saya tertarik konsultasi jasa pembuatan website Go Global.',
    },
    nav: {
      services: 'Layanan',
      portfolio: 'Portofolio',
      calculator: 'Harga',
      faq: 'FAQ',
      contact: 'Kontak',
      cta: 'Konsultasi Gratis',
    },
    services: {
      heading: 'Layanan & Paket Harga',
      subtitle: 'Tingkatkan kepercayaan bisnis Anda di mata luar negeri & gaet pasar internasional.',
      badgePopular: 'Rekomendasi',
      ctaOrder: 'Pilih Paket',
      packages: {
        starter: {
          name: 'Starter',
          desc: 'Untuk usaha rintisan yang ingin kehadiran online profesional dan terpercaya.',
          features: [
            'Free domain .com + hosting 1 Tahun',
            'Hingga 5 halaman (Home, About, Service, Contact, Gallery/Catalog)',
            'Desain Premium',
            'SEO On Page Basic',
            'Responsif Mobile + Tablet',
            'Garansi Revisi 3x',
            'Support Maintenance 1 Bulan',
          ],
        },
        pro: {
          name: 'Pro',
          desc: 'Untuk bisnis berkembang yang membutuhkan konversi penjualan dan eksposur maksimal.',
          features: [
            'All benefit Starter',
            'Hingga 15 halaman custom',
            'Blog/Artikel (CMS)',
            'SEO + Google Analytics',
            'Google Maps embed + formulir',
            'Integrasi Media Sosial',
            'Garansi Revisi 5x',
            'Support Maintenance 2 Bulan',
          ],
        },
        enterprise: {
          name: 'Enterprise',
          desc: 'Untuk skala besar dan korporat dengan kebutuhan fitur lengkap dan performa ekstrem.',
          features: [
            'All benefit Pro',
            'Hingga 45 halaman custom',
            'Multi Bahasa',
            'Admin Panel',
            'Performance + SEO Audit',
            'Source code',
            'Garansi Revisi 10x',
            'Support Maintenance 4 Bulan',
          ],
        },
      },
      waTemplate: 'Halo Gradivus Code, saya tertarik memesan paket *{pkgName}* (Rp {pkgPrice}). Mohon info kelanjutannya.',
    },
    portfolio: {
      heading: 'Karya & Portofolio',
      subtitle: 'Koleksi website dan desain visual terbaik yang telah kami kembangkan.',
      filterAll: 'Semua',
      filterWebsite: 'Website',
      filterBranding: 'Desain & Branding',
      emptyText: 'Belum ada portofolio untuk kategori ini.',
      viewDemo: 'Lihat Demo Langsung',
      closeModal: 'Tutup',
    },
    calculator: {
      heading: 'Kalkulator Biaya',
      subtitle: 'Pilih layanan kustom Anda dan lihat estimasi biaya secara real-time.',
      step1: '1. Paket Website Dasar',
      step2: '2. Kebutuhan Branding',
      step3: '3. Fitur Tambahan (Add-ons)',
      estimateLabel: 'Estimasi Total',
      ctaWhatsapp: 'Pesan via WhatsApp',
      disclaimer: '* Estimasi ini bersifat perkiraan. Rincian final akan ditentukan setelah sesi konsultasi gratis.',
      pricingLabels: {
        website: {
          starter: 'Paket Starter (Hingga 5 Halaman)',
          pro: 'Paket Pro (Hingga 15 Halaman + CMS)',
          enterprise: 'Paket Enterprise (Hingga 45 Halaman + Multi Bahasa)',
        },
        branding: {
          'tidak-perlu': 'Tidak Perlu Branding',
          'logo-saja': 'Desain Logo Saja',
          'branding-lengkap': 'Paket Branding Lengkap',
        },
        addons: {
          multilingual: 'Dukungan Multi Bahasa Ekstra',
          analytics: 'Setup Google Analytics & Pixel',
          seoAudit: 'Audit SEO & Performance Mendalam',
        },
      },
      waTemplate: 'Halo Gradivus Code, saya tertarik memesan jasa kustom:\n\n- *Paket Website:* {website}\n- *Branding:* {branding}\n{addons}- *Estimasi Total:* *Rp {total}*\n\nMohon info lebih lanjut untuk konsultasi. Terima kasih!',
    },
    faq: {
      heading: 'Pertanyaan Umum',
      subtitle: 'Jawaban singkat untuk hal-hal yang sering ditanyakan klien.',
      items: [
        {
          question: 'Berapa lama proses pengerjaan website?',
          answer: 'Proses pengerjaan berkisar antara 3 s/d 14 hari kerja tergantung paket yang dipilih. Paket Starter rata-rata selesai dalam 3-5 hari kerja.',
        },
        {
          question: 'Apakah harga di atas sudah termasuk domain dan hosting?',
          answer: 'Ya! Semua paket sudah termasuk free domain (.com) dan hosting 1 tahun pertama.',
        },
        {
          question: 'Apakah ada admin panel untuk mengedit isi website?',
          answer: 'Ya! Paket Pro dilengkapi Blog/Artikel CMS dan Paket Enterprise dilengkapi Custom Admin Panel untuk mengelola konten dan portofolio.',
        },
        {
          question: 'Bagaimana alur pengerjaan dan pembayarannya?',
          answer: 'Alurnya: Konsultasi kebutuhan gratis → DP 50% → Proses Desain & Development → Review & Revisi sesuai kuota garansi → Pelunasan → Website Live & Serah Terima.',
        },
        {
          question: 'Apakah website ini responsif dan cepat diakses dari HP?',
          answer: 'Pasti! Kami membangun website menggunakan teknologi Next.js modern yang sangat responsif di perangkat mobile/tablet dan memiliki skor PageSpeed tinggi.',
        },
        {
          question: 'Apakah Gradivus Code melayani jasa custom di luar paket?',
          answer: 'Tentu saja! Hubungi kami melalui formulir kontak atau WhatsApp untuk konsultasi sistem kustom (web app, portal pemesanan, integrasi API, dll).',
        },
      ],
    },
    contact: {
      heading: 'Mulai Proyek Anda',
      subtitle: 'Hubungi kami melalui form di bawah untuk konsultasi gratis.',
      labelName: 'Nama Lengkap',
      labelBusiness: 'Nama Usaha / Brand',
      labelPackage: 'Pilih Paket Layanan',
      labelNotes: 'Catatan Tambahan (Opsional)',
      placeholderName: 'Masukkan nama Anda',
      placeholderBusiness: 'Masukkan nama usaha Anda',
      placeholderPackage: 'Pilih paket',
      placeholderNotes: 'Tulis detail kebutuhan kustom Anda di sini...',
      ctaWhatsapp: 'Kirim Pemesanan via WhatsApp',
      ctaEmail: 'Kirim via Email',
      successTitle: 'Pemesanan Berhasil!',
      successMessage: 'Aplikasi WhatsApp akan otomatis terbuka. Kami akan segera menghubungi Anda kembali.',
      sidebarTitle: 'Info Kontak',
      errorName: 'Nama lengkap wajib diisi',
      errorBusiness: 'Nama usaha/brand wajib diisi',
      errorPackage: 'Silakan pilih paket',
      optionUndecided: 'Belum Tahu / Kustom',
      packages: {
        starter: 'Starter (Rp 900.000)',
        pro: 'Pro (Rp 2.399.000)',
        enterprise: 'Enterprise (Rp 4.699.000)',
      },
      waTemplate: 'Halo Gradivus Code!\n\nSaya *{name}* dari *{business}*.\nSaya tertarik memesan paket: *{pkg}*.\n{notes}\nMohon informasi lebih lanjut. Terima kasih!',
    },
    errorDialog: {
      title: 'Aksi Gagal',
      defaultMessage: 'Terjadi kesalahan sistem saat menghubungi database. Silakan coba beberapa saat lagi.',
      buttonText: 'Tutup & Perbaiki',
    },
    footer: {
      quickLinks: 'Menu Cepat',
      contactUs: 'Hubungi Kami',
      brandDesc: 'Solusi digital premium untuk UMKM & Bisnis Go Global. Desain berkelas, performa super cepat, dan profesional.',
      madeWith: 'Dibuat dengan',
      copyright: '© 2026 Gradivus Code. All rights reserved.',
    },
    admin: {
      loginTitle: 'Admin Login',
      loginPlaceholder: 'Masukkan password',
      loginButton: 'Masuk',
      viewWeb: 'Lihat Web',
      logout: 'Keluar',
      totalPortfolio: 'Total Portofolio',
      categoryWebsite: 'Website',
      categoryBranding: 'Desain & Branding',
      manageTitle: 'Kelola Portofolio',
      addBtn: '+ Tambah Portofolio',
      exportBtn: 'Export Backup',
      importBtn: 'Import Restore',
      thProject: 'Nama Proyek',
      thCategory: 'Kategori',
      thDate: 'Tanggal Buat',
      thAction: 'Aksi',
      btnEdit: 'Edit',
      btnDelete: 'Hapus',
      loadingDb: 'Memuat data database...',
      emptyDb: 'Belum ada data portofolio.',
      formAddTitle: 'Tambah Portofolio',
      formEditTitle: 'Edit Portofolio',
      formLabelTitle: 'Judul Proyek',
      formLabelCategory: 'Kategori',
      formLabelDesc: 'Deskripsi',
      formLabelImage: 'URL Gambar (Imgur/Postimages)',
      formLabelDemo: 'URL Demo Link (Opsional)',
      formBtnCancel: 'Batal',
      formBtnSave: 'Simpan',
      confirmDeleteTitle: 'Hapus Portofolio',
      confirmDeleteDesc: 'Apakah Anda yakin ingin menghapus proyek portofolio ini dari database? Tindakan ini tidak dapat dibatalkan.',
      confirmDeleteBtn: 'Hapus',
      toasts: {
        fetchError: 'Gagal mengambil data dari database.',
        loginSuccess: 'Login berhasil!',
        loginFailed: 'Password salah!',
        logoutSuccess: 'Log out berhasil.',
        updateSuccess: 'Portofolio berhasil diupdate!',
        addSuccess: 'Portofolio berhasil ditambahkan!',
        saveFailed: 'Gagal menyimpan data ke database.',
        networkError: 'Terjadi kesalahan jaringan.',
        deleteSuccess: 'Portofolio berhasil dihapus!',
        deleteFailed: 'Gagal menghapus data.',
        backupSuccess: 'Backup JSON terdownload.',
        importSuccess: '{successCount} items berhasil di-import!',
        importFailed: 'Gagal meng-import file. Pastikan format JSON valid.',
        validJsonError: 'Gagal meng-import file. Pastikan format JSON valid.',
      },
    },
  },
  en: {
    general: {
      skipLink: 'Skip to main content',
      ariaNav: 'Desktop navigation',
    },
    hero: {
      titleBefore: 'Build Global-Ready ',
      titleHighlight: 'Websites',
      titleAfter: ' for Your Business',
      subtitle: 'Enhance your international credibility and capture global markets with aesthetic, lightning-fast websites.',
      subtitleMobile: 'Enhance international credibility and capture global markets.',
      ctaPrice: 'View Packages',
      ctaConsult: 'Free Consultation',
      statProject: 'Projects Completed',
      statSatisfaction: 'Client Satisfaction',
      statSpeed: 'PageSpeed Score',
      waTemplate: 'Hello Gradivus Code, I am interested in consulting about Go Global website development.',
    },
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      calculator: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'Free Consult',
    },
    services: {
      heading: 'Services & Pricing Packages',
      subtitle: 'Enhance your business credibility globally & reach international markets.',
      badgePopular: 'Recommended',
      ctaOrder: 'Choose Package',
      packages: {
        starter: {
          name: 'Starter',
          desc: 'For early startups seeking a fast and reliable professional online presence.',
          features: [
            'Free domain .com + hosting 1 Year',
            'Up to 5 custom pages (Home, About, Service, Contact, Gallery/Catalog)',
            'Premium Design',
            'Basic On-Page SEO',
            'Mobile + Tablet Responsive',
            '3x Revision Guarantee',
            '1 Month Maintenance Support',
          ],
        },
        pro: {
          name: 'Pro',
          desc: 'For growing businesses requiring high conversions and maximum exposure.',
          features: [
            'All benefit Starter',
            'Up to 15 custom pages',
            'Blog/Articles (CMS)',
            'SEO + Google Analytics',
            'Google Maps embed + form',
            'Social Media Integration',
            '5x Revision Guarantee',
            '2 Months Maintenance Support',
          ],
        },
        enterprise: {
          name: 'Enterprise',
          desc: 'For large scale enterprises requiring complete custom features and extreme performance.',
          features: [
            'All benefit Pro',
            'Up to 45 custom pages',
            'Multi Language',
            'Admin Panel',
            'Performance + SEO Audit',
            'Source code',
            '10x Revision Guarantee',
            '4 Months Maintenance Support',
          ],
        },
      },
      waTemplate: 'Hello Gradivus Code, I am interested in ordering the *{pkgName}* package (IDR {pkgPrice}). Please provide details.',
    },
    portfolio: {
      heading: 'Our Work & Portfolio',
      subtitle: 'A showcase of premier websites and visual identities we have crafted.',
      filterAll: 'All',
      filterWebsite: 'Website',
      filterBranding: 'Design & Branding',
      emptyText: 'No portfolio items found for this category.',
      viewDemo: 'View Live Demo',
      closeModal: 'Close',
    },
    calculator: {
      heading: 'Cost Calculator',
      subtitle: 'Select your customized services and view real-time estimates.',
      step1: '1. Base Website Package',
      step2: '2. Branding Needs',
      step3: '3. Additional Features (Add-ons)',
      estimateLabel: 'Estimated Total',
      ctaWhatsapp: 'Order via WhatsApp',
      disclaimer: '* This estimate is an approximation. The final invoice will be settled after the free consultation.',
      pricingLabels: {
        website: {
          starter: 'Starter Package (Up to 5 Pages)',
          pro: 'Pro Package (Up to 15 Pages + CMS)',
          enterprise: 'Enterprise Package (Up to 45 Pages + Multi-Language)',
        },
        branding: {
          'tidak-perlu': 'No Branding Needed',
          'logo-saja': 'Logo Design Only',
          'branding-lengkap': 'Complete Branding Suite',
        },
        addons: {
          multilingual: 'Extra Multi-Language Setup',
          analytics: 'Google Analytics & Pixel Integration',
          seoAudit: 'In-Depth SEO & Performance Audit',
        },
      },
      waTemplate: 'Hello Gradivus Code, I am interested in ordering custom services:\n\n- *Website Package:* {website}\n- *Branding:* {branding}\n{addons}- *Estimated Total:* *IDR {total}*\n\nPlease advise on the next consultation steps. Thank you!',
    },
    faq: {
      heading: 'Frequently Asked Questions',
      subtitle: 'Clear answers to common questions asked by our clients.',
      items: [
        {
          question: 'How long does website development take?',
          answer: 'Development typically ranges from 3 to 14 business days depending on the chosen package. The Starter package is completed in 3-5 business days on average.',
        },
        {
          question: 'Are domain and hosting included in the price?',
          answer: 'Yes! All packages include a free .com domain and 1 year of hosting.',
        },
        {
          question: 'Can I edit the website content myself via an Admin Panel?',
          answer: 'Yes! The Pro package includes Blog/Article CMS, and the Enterprise package includes a Custom Admin Panel to manage your content and portfolio.',
        },
        {
          question: 'What is the workflow and payment process?',
          answer: 'Workflow: Free requirement consultation → 50% down payment → Design & Development → Review & Revisions → Final balance payment → Live handover.',
        },
        {
          question: 'Is the website responsive and fast on mobile devices?',
          answer: 'Absolutely! We use modern Next.js architecture to guarantee high mobile responsiveness and optimal PageSpeed scores.',
        },
        {
          question: 'Do you offer custom web solutions outside packages?',
          answer: 'Yes! Reach out via WhatsApp or the contact form to discuss custom portals, booking systems, or integrations.',
        },
      ],
    },
    contact: {
      heading: 'Start Your Project',
      subtitle: 'Contact us through the form below for a free consultation.',
      labelName: 'Full Name',
      labelBusiness: 'Business / Brand Name',
      labelPackage: 'Select Service Package',
      labelNotes: 'Additional Notes (Optional)',
      placeholderName: 'Enter your name',
      placeholderBusiness: 'Enter your business name',
      placeholderPackage: 'Choose a package',
      placeholderNotes: 'Write your custom requirements here...',
      ctaWhatsapp: 'Send Order via WhatsApp',
      ctaEmail: 'Send via Email',
      successTitle: 'Order Submitted!',
      successMessage: 'WhatsApp will open automatically. We will contact you shortly.',
      sidebarTitle: 'Contact Info',
      errorName: 'Full name is required',
      errorBusiness: 'Business name is required',
      errorPackage: 'Please select a package',
      optionUndecided: 'Undecided / Custom',
      packages: {
        starter: 'Starter (IDR 900,000)',
        pro: 'Pro (IDR 2,399,000)',
        enterprise: 'Enterprise (IDR 4,699,000)',
      },
      waTemplate: 'Hello Gradivus Code!\n\nI am *{name}* from *{business}*.\nI am interested in ordering package: *{pkg}*.\n{notes}\nPlease provide more information. Thank you!',
    },
    errorDialog: {
      title: 'Action Failed',
      defaultMessage: 'A system error occurred while contacting the database. Please try again later.',
      buttonText: 'Close & Fix',
    },
    footer: {
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      brandDesc: 'Premium digital solutions for Businesses Going Global. Elegant design, blazing performance, and utmost professionalism.',
      madeWith: 'Made with',
      copyright: '© 2026 Gradivus Code. All rights reserved.',
    },
    admin: {
      loginTitle: 'Admin Login',
      loginPlaceholder: 'Enter password',
      loginButton: 'Login',
      viewWeb: 'View Web',
      logout: 'Logout',
      totalPortfolio: 'Total Portfolio',
      categoryWebsite: 'Website',
      categoryBranding: 'Design & Branding',
      manageTitle: 'Manage Portfolio',
      addBtn: '+ Add Portfolio',
      exportBtn: 'Export Backup',
      importBtn: 'Import Restore',
      thProject: 'Project Title',
      thCategory: 'Category',
      thDate: 'Created At',
      thAction: 'Action',
      btnEdit: 'Edit',
      btnDelete: 'Delete',
      loadingDb: 'Loading database data...',
      emptyDb: 'No portfolio data yet.',
      formAddTitle: 'Add Portfolio',
      formEditTitle: 'Edit Portfolio',
      formLabelTitle: 'Project Title',
      formLabelCategory: 'Category',
      formLabelDesc: 'Description',
      formLabelImage: 'Image URL (Imgur/Postimages)',
      formLabelDemo: 'Demo URL Link (Optional)',
      formBtnCancel: 'Cancel',
      formBtnSave: 'Save',
      confirmDeleteTitle: 'Delete Portfolio',
      confirmDeleteDesc: 'Are you sure you want to delete this portfolio project from the database? This action cannot be undone.',
      confirmDeleteBtn: 'Delete',
      toasts: {
        fetchError: 'Failed to fetch data from database.',
        loginSuccess: 'Login successful!',
        loginFailed: 'Incorrect password!',
        logoutSuccess: 'Logged out successfully.',
        updateSuccess: 'Portfolio updated successfully!',
        addSuccess: 'Portfolio added successfully!',
        saveFailed: 'Failed to save data to database.',
        networkError: 'A network error occurred.',
        deleteSuccess: 'Portfolio deleted successfully!',
        deleteFailed: 'Failed to delete data.',
        backupSuccess: 'JSON backup downloaded.',
        importSuccess: '{successCount} items successfully imported!',
        importFailed: 'Failed to import file. Make sure the JSON format is valid.',
        validJsonError: 'Failed to import file. Make sure the JSON format is valid.',
      },
    },
  },
};

export const DICTIONARIES = dictionaries;

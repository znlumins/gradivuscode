// lib/dictionaries.ts

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
    installmentLabel: string;
    minContractNote: string;
    emailContinuationNote: string;
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
    waTemplate: string;
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
      startup: string;
      professional: string;
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

export const DICTIONARIES: Record<string, Dictionary> = {
  id: {
    general: {
      skipLink: 'Langsung ke konten utama',
      ariaNav: 'Navigasi desktop',
    },
    hero: {
      titleBefore: 'Bikin Usahamu ',
      titleHighlight: 'Naik Kelas',
      titleAfter: ' dengan Website Estetis & Super Cepat',
      subtitle: 'Paket lengkap Landing Page + Branding untuk UMKM Indonesia. Desain premium, performa ringan, kontrak mulai Rp 599.000/bulan · 6 bulan.',
      subtitleMobile: 'Desain premium, performa super cepat, kontrak mulai Rp 599.000/bulan.',
      ctaPrice: 'Lihat Paket Harga',
      ctaConsult: 'Konsultasi Gratis',
      statProject: 'Proyek Selesai',
      statSatisfaction: 'Klien Puas',
      statSpeed: 'Skor PageSpeed',
      waTemplate: 'Halo Gradivus Code, saya tertarik konsultasi pembuatan website B2B perusahaan',
    },
    nav: {
      services: 'Layanan',
      calculator: 'Harga',
      faq: 'FAQ',
      contact: 'Kontak',
      cta: 'Konsultasi Gratis',
    },
    services: {
      heading: 'Layanan & Harga',
      subtitle: 'Pilih paket yang sesuai dengan kebutuhan dan skala bisnis Anda saat ini. Semua paket include hosting website gratis selamanya.',
      badgePopular: 'Populer',
      ctaOrder: 'Pesan Paket',
      installmentLabel: 'Kontrak 6 Bulan',
      minContractNote: '* Kontrak 6 bulan',
      emailContinuationNote: 'Email hosting gratis di tahun pertama. Lanjutan opsional mulai {price}/bulan setelahnya.',
      packages: {
        startup: {
          desc: 'Untuk bisnis baru/UMKM skala awal yang membutuhkan kehadiran online profesional cepat.',
          features: [
            '1 Halaman Landing Page (Desain Bersih)',
            'Performa Kecepatan LCP < 1.2s',
            'Integrasi HubSpot/WhatsApp',
            'Setup SEO Standar',
            'Email Hosting (2 Slot)',
            'Jaminan Uptime SLA',
            'Database Kustom & Panel Admin',
            'Prioritas Pemeliharaan 24/7',
          ],
        },
        professional: {
          desc: 'Paket ideal untuk perusahaan berkembang yang memerlukan konversi tinggi & integrasi data.',
          features: [
            '5-8 Halaman (Next.js Multi-page)',
            'Performa Kecepatan LCP < 0.8s',
            'Integrasi penuh CRM & analitik',
            'SEO Tingkat Lanjut & Schema markup',
            'Email Hosting (5 Slot)',
            'SLA Uptime 99.9%',
            'Admin Panel & Database CMS',
            'Prioritas Pemeliharaan 24/7',
          ],
        },
        enterprise: {
          desc: 'Sistem web performa ekstrem untuk kebutuhan integrasi mendalam dan infrastruktur khusus.',
          features: [
            'Halaman Tanpa Batas (Next.js/Edge)',
            'Performa Kecepatan LCP < 0.5s',
            'Integrasi Kustom Salesforce/SAP',
            'SEO Enterprise & Lokalisasi',
            'Email Hosting Korporat',
            'SLA Uptime 99.99% (Dukungan prioritas)',
            'Integrasi Headless CMS Tingkat Lanjut',
            'Full Source Code & Dukungan Khusus 24/7',
          ],
        },
      },
      waTemplate: 'Halo Gradivus Code, saya tertarik memesan paket *{pkgName}* (kontrak Rp {pkgMonthly}/bulan x 6, total Rp {pkgPrice}). Mohon info kelanjutannya.',
    },
    calculator: {
      heading: 'Kalkulator Biaya',
      subtitle: 'Pilih layanan kustom Anda dan lihat estimasi biaya secara real-time.',
      step1: '1. Jenis Website',
      step2: '2. Kebutuhan Branding',
      step3: '3. Fitur Tambahan (Add-ons)',
      estimateLabel: 'Estimasi Total',
      ctaWhatsapp: 'Pesan via WhatsApp',
      disclaimer: '* Estimasi ini bersifat sementara. Rincian final akan ditentukan setelah sesi konsultasi gratis.',
      pricingLabels: {
        website: {
          'landing-page': 'Landing Page (1 Halaman)',
          'website-umkm': 'Website UMKM (3 Halaman)',
          'katalog-interaktif': 'Katalog Interaktif',
        },
        branding: {
          'tidak-perlu': 'Tidak Perlu',
          'logo-saja': 'Desain Logo Saja',
          'branding-lengkap': 'Paket Branding Lengkap',
        },
        addons: {
          'google-maps': 'Setup Google Maps',
          'copywriting': 'Copywriting Premium',
          'analytics': 'Integrasi Analytics',
        },
      },
      waTemplate: 'Halo Gradivus Code, saya tertarik memesan jasa kustom:\n\n- *Website:* {website}\n- *Branding:* {branding}\n{addons}- *Estimasi Total:* *Rp {total}*\n\nMohon info lebih lanjut untuk konsultasi. Terima kasih!',
    },
    faq: {
      heading: 'Pertanyaan Umum',
      subtitle: 'Jawaban singkat untuk hal-hal yang sering ditanyakan klien.',
      items: [
        {
          question: 'Berapa lama proses pengerjaan website?',
          answer: 'Proses pengerjaan berkisar antara 5 s/d 14 hari kerja tergantung kompleksitas fitur dan antrean proyek. Paket Rintisan biasanya selesai dalam 5 hari.',
        },
        {
          question: 'Apakah harga di atas sudah termasuk domain dan hosting?',
          answer: 'Ya! Semua paket sudah termasuk biaya domain (.com / .id) untuk tahun pertama dan hosting gratis selamanya di Vercel.',
        },
        {
          question: 'Apakah ada biaya bulanan yang harus dibayar?',
          answer: 'Harga paket dengan kontrak 6 bulan sampai lunas — setelah itu tidak ada tagihan wajib lagi (bukan langganan seumur hidup). Hosting website-nya sendiri gratis selamanya di server cloud serverless Vercel. Anda hanya perlu membayar sewa domain tahunan (mulai Rp 120.000/tahun) langsung ke registrar.',
        },
        {
          question: 'Apakah email hosting-nya gratis selamanya?',
          answer: 'Email hosting termasuk gratis di tahun pertama. Setelah itu, Anda bisa lanjut berlangganan email hosting melalui kami secara opsional (mulai Rp 149.000/bulan untuk paket Startup, minimal kontrak 6 bulan), atau kelola sendiri pakai provider email lain dengan domain Anda — tanpa paksaan.',
        },
        {
          question: 'Apakah saya bisa mengedit isi website sendiri?',
          answer: 'Tentu saja! Kami menyediakan panduan admin tertulis dan video serta dashboard admin panel kustom bagi pemesan paket Tumbuh & Mapan untuk menambah portfolio.',
        },
        {
          question: 'Bagaimana alur pengerjaan dan pembayarannya?',
          answer: 'Alurnya: Konsultasi gratis → DP 30-50% dari total paket → Proses Desain & Coding → Review & Revisi → sisa tagihan dengan kontrak 6 bulan → Website Live & Serah Terima penuh setelah lunas.',
        },
        {
          question: 'Apa maksud "minimal kontrak 6 bulan" di harga paket?',
          answer: 'Itu berlaku untuk kontrak harga paket, bukan langganan rutin. Begitu Anda memilih skema kontrak, Anda berkomitmen menyelesaikan seluruh 6 bulan pembayaran sampai lunas (tidak bisa berhenti di tengah jalan) — setelah itu tidak ada tagihan lagi. Ini terpisah dari "minimal kontrak 6 bulan" pada lanjutan email hosting opsional (mulai tahun kedua), yang hanya berlaku jika Anda memilih lanjut berlangganan email lewat kami.',
        },
        {
          question: 'Apakah website ini responsif dan cepat diakses dari HP?',
          answer: 'Ya! Kami menggunakan framework Next.js 14+ dan Tailwind CSS untuk menjamin website memiliki LCP (Largest Contentful Paint) sangat cepat dan mobile-friendly.',
        },
        {
          question: 'Bagaimana jika domain saya sudah lewat dari 1 tahun?',
          answer: 'Untuk perpanjangan domain, biaya tahun berikutnya diserahkan langsung ke klien (mulai dari Rp 120.000/tahun). Kami akan membantu proses perpanjangannya gratis.',
        },
        {
          question: 'Apakah Gradivus Code melayani jasa custom di luar paket?',
          answer: 'Ya! Hubungi kami via formulir kontak atau WhatsApp untuk mendiskusikan kebutuhan kustom Anda (misal e-commerce, portal booking, dll).',
        },
      ],
    },
    contact: {
      heading: 'Mulai Proyek Anda',
      subtitle: 'Hubungi kami melalui form di bawah untuk konsultasi.',
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
        startup: 'Startup (mulai Rp 599.000/bulan)',
        professional: 'Professional (mulai Rp 1.199.000/bulan)',
        enterprise: 'Enterprise (mulai Rp 2.599.000/bulan)',
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
      brandDesc: 'Solusi digital premium untuk UMKM Indonesia. Membuat website Anda cepat, estetis, dan profesional.',
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
      titleBefore: 'Scale Up Your Business with ',
      titleHighlight: 'Aesthetic',
      titleAfter: ' & Super Fast Websites',
      subtitle: 'Complete Landing Page + Branding package for Indonesian SMEs. Premium design, lightweight performance, 6-month contract from IDR 599,000/month.',
      subtitleMobile: 'Premium design, fast performance, 6-month contract from IDR 599,000/month.',
      ctaPrice: 'View Packages',
      ctaConsult: 'Free Consultation',
      statProject: 'Projects Completed',
      statSatisfaction: 'Client Satisfaction',
      statSpeed: 'PageSpeed Score',
      waTemplate: 'Hello Gradivus Code, I am interested in consulting about B2B company website development',
    },
    nav: {
      services: 'Services',
      calculator: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'Free Consult',
    },
    services: {
      heading: 'Services & Pricing',
      subtitle: 'Choose the package that fits your business needs and scale. All packages include free website hosting forever.',
      badgePopular: 'Popular',
      ctaOrder: 'Order Package',
      installmentLabel: '6-Month Contract',
      minContractNote: '* Minimum 6-month contract',
      emailContinuationNote: 'Email hosting free for the first year. Optional continuation from {price}/month after that.',
      packages: {
        startup: {
          desc: 'For new businesses/early-stage SMEs needing a fast, professional online presence.',
          features: [
            '1 Page Landing Page (Clean Design)',
            'LCP Speed Performance < 1.2s',
            'HubSpot/WhatsApp Integration',
            'Standard SEO Setup',
            'Email Hosting (2 Slots)',
            'SLA Uptime Guarantee',
            'Custom Database & Admin Panel',
            '24/7 Priority Maintenance',
          ],
        },
        professional: {
          desc: 'Ideal package for growing businesses requiring high conversion & data integration.',
          features: [
            '5-8 Pages (Next.js Multi-page)',
            'LCP Speed Performance < 0.8s',
            'Full CRM & analytics integration',
            'Advanced SEO & Schema markup',
            'Email Hosting (5 Slots)',
            'SLA Uptime 99.9%',
            'Admin Panel & Database CMS',
            '24/7 Priority Maintenance',
          ],
        },
        enterprise: {
          desc: 'Extreme performance web systems for deep integration needs and custom infrastructure.',
          features: [
            'Unlimited Pages (Next.js/Edge)',
            'LCP Speed Performance < 0.5s',
            'Custom Salesforce/SAP Integrations',
            'Enterprise SEO & Localization',
            'Corporate Email Hosting',
            'SLA Uptime 99.99% (Priority support)',
            'Advanced Headless CMS Integration',
            'Full Source Code & 24/7 Dedicated Support',
          ],
        },
      },
      waTemplate: 'Hello Gradivus Code, I am interested in ordering the *{pkgName}* package (6-month contract, IDR {pkgMonthly}/month, total IDR {pkgPrice}). Please let me know the next steps.',
    },
    calculator: {
      heading: 'Cost Calculator',
      subtitle: 'Select your custom services and see the estimated cost in real-time.',
      step1: '1. Website Type',
      step2: '2. Branding Needs',
      step3: '3. Add-ons',
      estimateLabel: 'Estimated Total',
      ctaWhatsapp: 'Order via WhatsApp',
      disclaimer: '* This estimate is tentative. Final details will be determined after a free consultation session.',
      pricingLabels: {
        website: {
          'landing-page': 'Landing Page (1 Page)',
          'website-umkm': 'SME Website (3 Pages)',
          'katalog-interaktif': 'Interactive Catalog',
        },
        branding: {
          'tidak-perlu': 'None',
          'logo-saja': 'Logo Design Only',
          'branding-lengkap': 'Complete Branding Package',
        },
        addons: {
          'google-maps': 'Google Maps Setup',
          'copywriting': 'Premium Copywriting',
          'analytics': 'Analytics Integration',
        },
      },
      waTemplate: 'Hello Gradivus Code, I am interested in ordering custom services:\n\n- *Website:* {website}\n- *Branding:* {branding}\n{addons}- *Estimated Total:* *IDR {total}*\n\nPlease provide more information for consultation. Thank you!',
    },
    faq: {
      heading: 'FAQ',
      subtitle: 'Quick answers to frequently asked questions.',
      items: [
        {
          question: 'How long does it take to build a website?',
          answer: 'The process takes between 5 to 14 business days depending on feature complexity and project queue. The Starter package usually completes in 5 days.',
        },
        {
          question: 'Does the price include domain and hosting?',
          answer: 'Yes! All packages include domain (.com / .id) for the first year and free hosting forever on Vercel.',
        },
        {
          question: 'Are there any monthly fees?',
          answer: 'Package prices use a 6-month contract plan — after that, there\'s no more required billing (this is not a lifetime subscription). Website hosting itself stays free forever on Vercel\'s serverless cloud. You only need to pay for annual domain renewal (starting from IDR 120,000/year) directly to the registrar.',
        },
        {
          question: 'Is email hosting free forever?',
          answer: 'Email hosting is free for the first year. After that, you can optionally continue email hosting through us (starting from IDR 149,000/month for the Startup package, minimum 6-month contract), or manage it yourself with another email provider using your own domain — no obligation.',
        },
        {
          question: 'Can I edit the website content myself?',
          answer: 'Of course! We provide written and video admin guides, plus a custom admin panel for Growth & Established package subscribers to manage their portfolio.',
        },
        {
          question: 'What is the workflow and payment process?',
          answer: 'The flow: Free consultation → 30-50% down payment of the total package → Design & Coding → Review & Revision → remaining balance paid over a 6-month contract → Website goes live & full handover once paid off.',
        },
        {
          question: 'What does "minimum 6-month contract" mean on the package price?',
          answer: 'That refers to the package\'s contract plan, not a recurring subscription. Once you choose the contract option, you commit to completing all 6 monthly payments until it\'s paid off (it can\'t be stopped partway) — after that there\'s no more billing. This is separate from the "minimum 6-month contract" on the optional email hosting continuation (starting year two), which only applies if you choose to continue email hosting through us.',
        },
        {
          question: 'Is the website responsive and fast on mobile?',
          answer: 'Yes! We use the Next.js 14+ framework and Tailwind CSS to ensure very fast LCP (Largest Contentful Paint) and mobile-friendly websites.',
        },
        {
          question: 'What happens after the first year of domain?',
          answer: 'Domain renewal fees for subsequent years are handled directly by the client (starting from IDR 120,000/year). We will help with the renewal process for free.',
        },
        {
          question: 'Does Gradivus Code offer custom services outside packages?',
          answer: 'Yes! Contact us via the contact form or WhatsApp to discuss your custom needs (e.g., e-commerce, booking portal, etc.).',
        },
      ],
    },
    contact: {
      heading: 'Start Your Project',
      subtitle: 'Contact us through the form below for a consultation.',
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
        startup: 'Startup (from IDR 599,000/month)',
        professional: 'Professional (from IDR 1,199,000/month)',
        enterprise: 'Enterprise (from IDR 2,599,000/month)',
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
      brandDesc: 'Premium digital solutions for Indonesian SMEs. Making your website fast, aesthetic, and professional.',
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

# Gradivus Code — Documentation

Dokumen ini menjelaskan standar, pattern, dan PRD yang digunakan di proyek website **Gradivus Code** menggunakan arsitektur modern Next.js.

## Tentang Proyek

**Gradivus Code** adalah website portfolio & lead generator untuk bisnis jasa pembuatan landing page + branding paket UMKM. Website ini berfungsi sebagai:
- Etalase profesional (portofolio karya)
- Kalkulator harga interaktif
- Lead capture otomatis via WhatsApp
- Admin Panel terproteksi untuk CRUD portofolio secara real-time

**Tech Stack:** Next.js 14+ (App Router) + React + Tailwind CSS + Supabase (PostgreSQL) + Vercel Hosting.

## Quick Reference

- **[CONVENTIONS.md](CONVENTIONS.md)** — aturan koding, struktur folder Next.js, dan standar Tailwind CSS.
- **[JUNIOR_GUIDE.md](JUNIOR_GUIDE.md)** — panduan onboarding developer baru (`create-next-app` & Vercel deploy).

## Deep Dives (React/Next.js/Tailwind Patterns)

Baca pattern yang sesuai dengan komponen yang sedang dikerjakan:

| Topik | File | Deskripsi |
|---|---|---|
| Komponen Next.js | [patterns/component-module.md](patterns/component-module.md) | Cara menyusun folder dan menulis komponen React baru |
| Modal & Dialog | [patterns/modals-dialogs.md](patterns/modals-dialogs.md) | Pola Modal interaktif berbasis React State |
| Data Layer (Supabase) | [patterns/api-layer.md](patterns/api-layer.md) | Koneksi Supabase client & Next.js API Routes (Route Handlers) |
| React Form Validation | [patterns/form-handling.md](patterns/form-handling.md) | State-driven form inputs & validasi client-side |
| Animasi Tailwind CSS | [patterns/animations-transitions.md](patterns/animations-transitions.md) | Setup transisi, hover, dan counter menggunakan Tailwind |
| Image Optimization | [patterns/image-assets.md](patterns/image-assets.md) | Optimasi format, lazy load, & layout shift dengan `next/image` |
| Data Constants | [patterns/constants-config.md](patterns/constants-config.md) | Struktur JSON constants untuk list harga, paket, dan FAQ |
| User Feedback & Skeletons | [patterns/user-feedback.md](patterns/user-feedback.md) | Loading skeleton, empty state, dan toast notifications (`sonner`/`toast`) |
| Next.js SEO & Metadata | [patterns/seo-performance.md](patterns/seo-performance.md) | Implementasi Metadata API (`generateMetadata`) dan JSON-LD |
| Responsive Layouts | [patterns/grid-layouts.md](patterns/grid-layouts.md) | Layout pricing cards & filterable portfolio grid dengan Tailwind Grid |
| Internationalization & Copy | [patterns/i18n.md](patterns/i18n.md) | Panduan fitur multi-bahasa (ID & EN), copywriting brand voice, dan template pesan WhatsApp |

## PRD (Product Requirements)

Kerjakan PRD secara berurutan (001 → 012):

| No | PRD | Scope |
|---|---|---|
| 001 | [Project Setup](prd/prd-001-project-setup.md) | Inisialisasi Next.js app & Layout global |
| 002 | [Design Tokens](prd/prd-002-design-tokens.md) | Konfigurasi `tailwind.config.js` |
| 003 | [Navbar & Header](prd/prd-003-navbar.md) | Sticky nav, mobile drawer, & Active scroll spy |
| 004 | [Hero Section](prd/prd-004-hero-section.md) | Headline copy, dual CTA, & animated background |
| 005 | [Services & Pricing](prd/prd-005-services-pricing.md) | Pricing cards generator |
| 006 | [Price Calculator](prd/prd-006-price-calculator.md) | Kalkulator interaktif React State |
| 007 | [Portfolio](prd/prd-007-portfolio.md) | Supabase fetch, category filter, & Lightbox modal |
| 008 | [FAQ](prd/prd-008-faq.md) | Accordion component |
| 009 | [Contact + WhatsApp](prd/prd-009-contact-whatsapp.md) | Form submission & WA template builder |
| 010 | [Footer](prd/prd-010-footer.md) | Footer component & social links |
| 011 | [Admin Panel](prd/prd-011-admin-panel.md) | Halaman admin terproteksi & CRUD portofolio Supabase |
| 012 | [Performance & SEO](prd/prd-012-performance-seo.md) | Optimasi bundle, images check, & Lighthouse targets |

## Canonical Reference

Semua token styling terpusat di file kustomisasi Tailwind `tailwind.config.js` dan CSS global `app/globals.css`.

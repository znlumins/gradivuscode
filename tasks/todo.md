# TODO List - Admin Panel Portfolio CRUD & Pricing Alignment

## Checklist

- [x] Configure Supabase MCP and Agent Skills
- [x] Fetch project credentials and verify Supabase connection via MCP
- [x] Apply database migration for `portfolio` table with RLS enabled
- [x] Create `.env.local` with real Supabase credentials
- [x] Create `/api/portfolio/route.ts` (GET, POST, PUT, DELETE with Supabase)
- [x] Create `components/Lightbox.tsx` for portfolio dialog showcase
- [x] Create `components/PortfolioGrid.tsx` for public showcase with categories
- [x] Integrate Portfolio section into `app/page.tsx` and Navbar
- [x] Update `components/Services.tsx` with Flyer Pricing (Starter 900rb, Pro 2.399jt, Enterprise 4.699jt)
- [x] Update `components/Calculator.tsx` to align with new pricing tiers
- [x] Update `lib/dictionaries.ts` (ID & EN) for all pricing labels, features, and calculator steps
- [x] Update `components/ContactForm.tsx` to match package keys
- [x] Verify production build (`npm run build`) — passed with Turbopack & TypeScript check
- [x] Test live API CRUD directly against Supabase database — verified working (POST & GET successful)

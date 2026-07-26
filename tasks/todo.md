# TODO List - PRD-016 Installment Pricing & Email Hosting Continuation

## Checklist

- `[x]` Write `docs/prd/prd-016-installment-pricing-email-hosting.md`
- `[x]` Update `lib/dictionaries.ts`
  - `[x]` Hero subtitle/subtitleMobile (ID/EN): remove "Tanpa biaya bulanan" + old "Rp 1,5 juta" claim, point to Rp 599.000/bulan
  - `[x]` Services: add `installmentLabel`, `minContractNote`, `emailContinuationNote` (ID/EN)
  - `[x]` Services `waTemplate`: include monthly + total price
  - `[x]` FAQ: rewrite "biaya bulanan" answer, add new "email hosting gratis selamanya?" item, update payment-flow answer (ID/EN)
  - `[x]` Contact form package dropdown labels updated to monthly price (ID/EN)
- `[x]` Update `components/Services.tsx`
  - `[x]` Add `monthlyPrice` + `emailContinuationPrice` per package (Startup/Professional/Enterprise)
  - `[x]` Card now shows monthly price as headline, total + "Cicilan 6x" + min-contract fine print below
  - `[x]` Email hosting continuation note rendered per card
  - `[x]` WhatsApp message includes monthly + total price
- `[x]` Update `app/layout.tsx` SEO description to match new entry price
- `[x]` Sync stale price examples in reference docs (`docs/CONVENTIONS.md`, `docs/patterns/i18n.md`, `docs/patterns/reports.md`) so future copy/paste doesn't reintroduce the old contradiction
- `[x]` Verification and Testing
  - `[x]` Run Next.js production build (`npm run build`) — passes with no type errors

## Review & Verification Summary
- **Root problem fixed**: Hero, Calculator, and Services previously showed 3 different "starting price" claims (Rp 1,5 juta / Rp 800rb / Rp 3.499.000). Hero now points at the real, achievable Startup entry price (Rp 599.000/bulan cicilan) instead of an arbitrary number nothing else on the page matched.
- **No bait-and-switch**: minimum 6-month contract and the email-hosting continuation fee are both disclosed directly on the pricing card and in FAQ, not revealed only during WhatsApp negotiation.
- **No contradiction with existing claims**: website hosting stays free forever on Vercel (unchanged, matches FAQ). The new recurring fee is scoped specifically to email hosting continuation (a named, finite feature), which is the only cost that is genuinely recurring for the studio.
- **Out of scope**: Calculator's per-component prices (e.g. Landing Page Rp800rb) were flagged in prior cost analysis as sitting at/below modal — not changed in this pass, tracked as a follow-up in PRD-016 section 5.
- **Build**: `npm run build` completes successfully, no TypeScript errors.

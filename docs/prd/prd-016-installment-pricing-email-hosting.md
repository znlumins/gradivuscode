# PRD-016: Installment (Cicilan) Pricing Display & Email Hosting Continuation

## 1. Overview & Objective
This document restructures how package prices are presented across the site — from a single large lump-sum number to a monthly installment ("cicilan") headline — to lower the psychological barrier for UMKM buyers, while keeping every price claim on the site internally consistent and legally honest (no hidden terms revealed only at deal-closing).

**Strict Constraint**: No component may claim "no monthly fee" while simultaneously displaying a "/bulan" price. Any recurring charge must be disclosed on the page itself, not only during WhatsApp negotiation.

---

## 2. Problem Statement
1. **Cross-component price contradiction**: Hero (`"harga mulai Rp 1,5 juta"`) does not match Calculator's cheapest item (Rp 800.000) or the Services Startup package (Rp 3.499.000). Three different "starting price" claims exist on one page.
2. **Psychological barrier**: Displaying full lump-sum prices (Rp 3.499.000 – Rp 14.999.000) upfront is a conversion barrier for price-sensitive UMKM buyers used to thinking in monthly terms.
3. **Cost-basis risk**: At a realistic freelance labor rate (~Rp75.000/jam), several current price points sit at or below modal (e.g. Calculator's Landing Page).
4. **Existing "no monthly fee" claims must not become false**: FAQ already states website hosting is free forever on Vercel and that there are no monthly fees beyond annual domain renewal (paid directly by the client to the registrar). Any new recurring offer must not contradict these two existing FAQ answers — it must be scoped to something not already promised free-forever. Email hosting (a named, finite feature — "Email Hosting X Slot") is the only genuinely recurring cost the studio incurs, so the paid continuation must be scoped to **email hosting only**, not general "hosting."
5. **No bait-and-switch**: Minimum contract terms and recurring costs must be visible on the pricing card itself, not sprung on the buyer at deal-closing time.

---

## 3. Requirements

### 3.1 Services Pricing Card — Installment Display
- Each package card displays the **monthly installment price** as the primary/large number (not the one-time total).
- Below it, in smaller text: the total price and "Cicilan 6x" label.
- Fine print: minimum contract disclosure ("Minimal kontrak 6 bulan").
- One-time total remains available (subtitle text + WhatsApp message) for transparency — never hidden, just de-emphasized visually.

### 3.2 Email Hosting Continuation Disclosure
- Each card shows a small note under the "Email Hosting (X Slot)" feature: email hosting is free for the first year; continuing it afterward is **optional** and costs a disclosed monthly amount, minimum 6-month term.
- This must NOT be worded as generic "hosting" (website hosting stays free forever on Vercel per existing FAQ — do not contradict that claim).
- A new FAQ entry is added explicitly answering "is email hosting free forever?" to prevent ambiguity with the existing "no monthly fee" FAQ answer.

### 3.3 Hero & Metadata Copy Alignment
- Remove the "Tanpa biaya bulanan" (no monthly fee) claim from the Hero — it directly contradicts a page that now shows "/bulan" pricing.
- Replace the "harga mulai Rp 1,5 juta" claim (Hero subtitle, both desktop/mobile variants, ID/EN) and the SEO meta description in `app/layout.tsx` with the real, achievable entry price: **Rp 599.000/bulan** (Startup package cicilan).
- This resolves the original 3-way price contradiction (Hero vs. Calculator vs. Services) by making Hero point at a number that actually exists on the page.

### 3.4 FAQ Payment-Flow Update
- Update the "apakah ada biaya bulanan" FAQ answer: no longer claim zero monthly payments — clarify that the installment is finite (ends after 6 months) versus a perpetual subscription, and that website hosting itself stays free forever.
- Update the "alur pengerjaan dan pembayaran" FAQ answer to reflect DP + 6x cicilan flow instead of the old DP 50% / pelunasan 50% flow.

### 3.5 Contact Form Package Labels
- Update `contact.packages.*` dropdown labels (ID/EN) to show the same monthly entry price as the Services cards, so the contact form doesn't reintroduce a 4th inconsistent price.

### 3.6 WhatsApp Message Templates
- `services.waTemplate` must state both the monthly cicilan amount and the total, so the lead already has full pricing context before a human even replies (reduces "why is it different than the site said" friction).

---

## 4. Pricing & Data Specification

| Paket | Harga one-time (referensi) | Cicilan 6x /bulan | Total cicilan (6x) | Email slot | Modal lanjutan email/bulan | Harga lanjutan email/bulan | Margin lanjutan |
|---|---|---|---|---|---|---|---|
| Startup | Rp 3.499.000 | **Rp 599.000** | Rp 3.594.000 | 2 slot | ~Rp 82.500 | **Rp 149.000** | ~45% |
| Professional | Rp 6.999.000 | **Rp 1.199.000** | Rp 7.194.000 | 5 slot | ~Rp 165.000 | **Rp 249.000** | ~34% |
| Enterprise | Rp 14.999.000 | **Rp 2.599.000** | Rp 15.594.000 | ~10 slot | ~Rp 315.000 | **Rp 449.000** | ~30% |

*(Cicilan totals run ~2.7%–4% above the one-time reference price — this is an intentional small buffer covering installment collection/admin risk, not a hidden markup.)*

---

## 5. Out of Scope / Follow-up
- **Calculator (`components/Calculator.tsx`) base prices are not changed in this PRD.** The Landing Page item (Rp 800.000) was found to sit at/below modal at a Rp75.000/jam labor rate in prior cost analysis. This needs its own pricing pass and is tracked as a follow-up, not bundled here to keep this change reviewable.
- No change to admin panel, portfolio, or navbar.

---

## 6. QA / Acceptance Checklist
- [ ] Services cards show "/bulan" price as the primary number, with total + "Cicilan 6x" + "Minimal kontrak 6 bulan" visible as secondary text
- [ ] Each card shows the email hosting continuation note with the correct per-package price
- [ ] Hero subtitle (desktop + mobile, ID + EN) no longer says "Tanpa biaya bulanan" and shows "Rp 599.000/bulan" instead of "Rp 1,5 juta"
- [ ] `app/layout.tsx` SEO description matches the new entry price
- [ ] FAQ "biaya bulanan" answer no longer claims zero monthly payments; new FAQ item about email hosting continuation exists (ID + EN)
- [ ] FAQ payment-flow answer reflects DP + cicilan 6x (ID + EN)
- [ ] Contact form package dropdown shows the same monthly price as Services cards (ID + EN)
- [ ] WhatsApp message from Services includes both monthly and total price
- [ ] No page still states or implies a fully non-recurring, single lump-sum-only price for packages
- [ ] `npm run build` passes with no type errors

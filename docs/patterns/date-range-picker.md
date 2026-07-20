# Animasi & Transisi Tailwind CSS

Panduan penerapan transisi, hover effects, dan animasi state-driven di proyek Gradivus Code menggunakan utility classes dari Tailwind CSS.

## 1. Animasi Latar Belakang (Hero Section)

Next.js/React menggunakan CSS custom animation untuk merender animasi complex seperti gradient-shifting di hero section.

Di `app/globals.css`:
```css
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-shift {
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}
```

Di component `Hero.js`:
```jsx
export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-[-50%] bg-gradient-to-tr from-accent-purple/20 via-bg-primary to-accent-teal/10 animate-gradient-shift z-[-1]" />
      {/* ... Content */}
    </section>
  );
}
```

---

## 2. Hover Effects (Pricing & Portfolio Cards)

Untuk card elevation dan hover glow, gunakan transisi built-in Tailwind CSS:

```jsx
export default function PricingCard({ name, price }) {
  return (
    <div className="bg-bg-card border border-border rounded-2xl p-8 hover:translate-y-[-8px] hover:border-accent-purple/50 hover:shadow-[0_8px_40px_rgba(108,99,255,0.15)] transition-all duration-300">
      <h3 className="text-xl font-bold">{name}</h3>
      {/* ... */}
    </div>
  );
}
```

---

## 3. Animasi Angka / Counter (Price Calculator)

Gunakan custom hook di React untuk men-trigger animasi perubahan angka (counter animation) saat total estimasi kalkulator berubah secara dinamis.

```javascript
'use client';

import { useState, useEffect } from 'react';

export function useAnimatedCounter(targetValue, duration = 400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = count;
    const end = parseInt(targetValue, 10);
    if (start === end) return;

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      const currentVal = Math.round(start + (end - start) * eased);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [targetValue]);

  return count;
}
```

### Penggunaan di `Calculator.js`

```jsx
const animatedTotal = useAnimatedCounter(totalPrice);

return (
  <div className="text-4xl font-heading font-bold text-accent-purple">
    Rp {animatedTotal.toLocaleString('id-ID')}
  </div>
);
```

---

## 4. FAQ Accordion Toggle

Transisi halus untuk buka-tutup panel jawaban FAQ menggunakan Tailwind height transitions:

```jsx
export default function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button 
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left text-lg font-medium hover:text-accent-purple transition-colors"
      >
        <span>{question}</span>
        <span className={`text-2xl transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-text-secondary leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  );
}
```

## Rules

1.  **Transform & Opacity Only:** Animasi kustom (seperti keyframes) disarankan hanya menggunakan property `transform` dan `opacity` untuk memicu GPU acceleration.
2.  **Transition Classes:** Selalu sertakan `transition-all` (atau spesifik seperti `transition-transform`) beserta duration (contoh: `duration-300`) untuk mencegah transisi instan yang tidak estetik.
3.  **Scroll Animations:** Next.js disarankan menggunakan native browser API (`IntersectionObserver`) di dalam React hook `useEffect` untuk menambahkan class animasi saat elemen memasuki viewport.
4.  **Respect Reduced Motion:** Hormati preferensi animasi pengguna dengan menambahkan utility `motion-reduce:transition-none` atau `motion-reduce:transform-none` di Tailwind.

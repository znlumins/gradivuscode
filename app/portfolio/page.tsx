'use client';

import Navbar from '@/components/Navbar';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function PortfolioPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <a href="#portfolio" className="skip-link">{t.general.skipLink}</a>
      <Navbar />
      
      {/* Top spacing to account for floating fixed Navbar */}
      <main className="flex-1 pt-28">
        <PortfolioGrid />
      </main>

      <Footer />
    </div>
  );
}

'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PortfolioTeaser from '@/components/PortfolioTeaser';
import Calculator from '@/components/Calculator';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <a href="#hero" className="skip-link">{t.general.skipLink}</a>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <PortfolioTeaser />
        <Calculator />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

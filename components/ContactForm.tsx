'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { MessageCircle, Mail, CheckCircle, ChevronDown } from 'lucide-react';

export default function ContactForm() {
  const { lang, t } = useLanguage();
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [pkg, setPkg] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [success, setSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = t.contact.errorName;
    if (!business.trim()) tempErrors.business = t.contact.errorBusiness;
    if (!pkg) tempErrors.pkg = t.contact.errorPackage;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Format Pesan WhatsApp
    const notesText = notes.trim()
      ? (lang === 'en' ? `\nAdditional notes:\n_${notes.trim()}_\n` : `\nCatatan tambahan:\n_${notes.trim()}_\n`)
      : '';

    const message = t.contact.waTemplate
      .replace('{name}', name)
      .replace('{business}', business)
      .replace('{pkg}', pkg)
      .replace('{notes}', notesText);

    const waUrl = `https://wa.me/6281358939283?text=${encodeURIComponent(message)}`;

    // Redirect ke WhatsApp tab baru
    window.open(waUrl, '_blank');

    // Tampilkan sukses panel & reset form
    setSuccess(true);
    setName('');
    setBusiness('');
    setPkg('');
    setNotes('');

    // Sembunyikan sukses panel setelah 5 detik
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-text-primary mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">{t.contact.subtitle}</p>
        </div>

        {/* Centered Form Wrapper */}
        <div className="max-w-2xl mx-auto bg-bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-md">
          {success ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-accent-teal/10 text-accent-teal flex items-center justify-center rounded-full mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-medium text-accent-purple mb-2">
                {t.contact.successTitle}
              </h3>
              <p className="text-sm text-text-secondary">
                {t.contact.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Nama */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2" htmlFor="contact-name">{t.contact.labelName}</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                  }}
                  placeholder={t.contact.placeholderName}
                  className={`px-4 py-3 rounded-xl bg-bg-primary border outline-none transition-all ${errors.name ? 'border-error focus:ring-1 focus:ring-error' : 'border-border focus:border-accent-purple'
                    }`}
                />
                {errors.name && <span className="text-xs text-error mt-2">{errors.name}</span>}
              </div>

              {/* Nama Usaha */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2" htmlFor="contact-business">{t.contact.labelBusiness}</label>
                <input
                  id="contact-business"
                  type="text"
                  value={business}
                  onChange={(e) => {
                    setBusiness(e.target.value);
                    if (errors.business) setErrors(prev => ({ ...prev, business: null }));
                  }}
                  placeholder={t.contact.placeholderBusiness}
                  className={`px-4 py-3 rounded-xl bg-bg-primary border outline-none transition-all ${errors.business ? 'border-error focus:ring-1 focus:ring-error' : 'border-border focus:border-accent-purple'
                    }`}
                />
                {errors.business && <span className="text-xs text-error mt-2">{errors.business}</span>}
              </div>

              {/* Select Paket */}
              <div className="flex flex-col relative" ref={dropdownRef}>
                <label className="text-sm font-semibold mb-2">{t.contact.labelPackage}</label>
                
                {/* Custom Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-bg-primary border text-left outline-none transition-all cursor-pointer relative ${
                    errors.pkg ? 'border-error' : isDropdownOpen ? 'border-accent-purple ring-1 ring-accent-purple/20' : 'border-border hover:border-border-hover'
                  }`}
                >
                  <span className={pkg ? 'text-text-primary font-medium' : 'text-text-muted'}>
                    {pkg || t.contact.placeholderPackage}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-accent-purple' : ''}`} />
                </button>

                {/* Custom Dropdown Options Overlay */}
                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-xl bg-bg-card border border-border p-1.5 shadow-card-hover space-y-1">
                    {[
                      t.contact.placeholderPackage,
                      t.contact.packages.starter,
                      t.contact.packages.pro,
                      t.contact.packages.enterprise,
                      t.contact.optionUndecided
                    ].map((option, index) => {
                      const isPlaceholder = index === 0;
                      const value = isPlaceholder ? '' : option;
                      const isSelected = pkg === value;
                      
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setPkg(value);
                            setIsDropdownOpen(false);
                            if (errors.pkg) setErrors(prev => ({ ...prev, pkg: null }));
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-accent-purple text-white font-semibold' 
                              : 'text-text-secondary hover:bg-bg-card-hover hover:text-text-primary'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.pkg && <span className="text-xs text-error mt-2">{errors.pkg}</span>}
              </div>

              {/* Catatan */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2" htmlFor="contact-notes">{t.contact.labelNotes}</label>
                <textarea
                  id="contact-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.contact.placeholderNotes}
                  rows={4}
                  className="px-4 py-3 rounded-xl bg-bg-primary border border-border focus:border-accent-purple outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="btn-primary w-full py-4 font-medium inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.contact.ctaWhatsapp}
                </button>
                <a
                  href="mailto:daffaahmadalattas@gmail.com"
                  className="btn-secondary w-full py-3.5 text-center text-sm font-medium inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  {t.contact.ctaEmail}
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

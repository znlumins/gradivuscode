'use client';

import { useLanguage } from '@/lib/LanguageContext';

interface ErrorDialogProps {
  open: boolean;
  message?: string;
  onClose: () => void;
}

export default function ErrorDialog({ open, message, onClose }: ErrorDialogProps) {
  const { t } = useLanguage();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Content Modal */}
      <div className="relative bg-bg-card border border-error/50 rounded-2xl w-full max-w-sm p-6 text-center shadow-xl animate-fade-in z-10">
        <div className="w-12 h-12 bg-red-500/10 text-error text-2xl font-bold flex items-center justify-center rounded-full mx-auto mb-4">
          ✕
        </div>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
          {t.errorDialog.title}
        </h3>
        <p className="text-xs text-text-secondary mb-6 leading-relaxed">
          {message || t.errorDialog.defaultMessage}
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full text-xs transition-colors"
        >
          {t.errorDialog.buttonText}
        </button>
      </div>
    </div>
  );
}

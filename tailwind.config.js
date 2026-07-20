/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0f',
          secondary: '#12121a',
          card: '#1a1a2e',
          'card-hover': '#22223a',
        },
        accent: {
          purple: '#6c63ff',
          'purple-hover': '#5a52e0',
          teal: '#00d4aa',
          'teal-hover': '#00b894',
        },
        text: {
          primary: '#f0f0f5',
          secondary: '#a0a0b5',
          muted: '#6b6b80',
        },
        border: '#2a2a3e',
        'border-hover': '#3a3a52',
        success: '#00d4aa',
        warning: '#ffb347',
        error: '#ff6b6b',
      },
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(108, 99, 255, 0.08)',
        'card-hover': '0 8px 40px rgba(108, 99, 255, 0.15)',
        glow: '0 0 30px rgba(108, 99, 255, 0.2)',
      },
      zIndex: {
        dropdown: '50',
        navbar: '100',
        modal: '1000',
        toast: '2000',
      }
    },
  },
  plugins: [],
}

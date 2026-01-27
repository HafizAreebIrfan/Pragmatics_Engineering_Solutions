/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: {
          primary: '#0D0D0D',
          secondary: '#1A1A1A',
          tertiary: '#262626',
        },
        // Brand colors
        brand: {
          primary: '#00D26A',
          secondary: '#00FF7F',
        },
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#666666',
        },
        // Status colors
        status: {
          success: '#00D26A',
          warning: '#FFB800',
          error: '#FF4757',
          info: '#3498DB',
        },
        // Border colors
        border: {
          DEFAULT: '#333333',
          focus: '#00D26A',
        },
        // SLD colors
        sld: {
          renewable: '#00D26A',
          grid: '#3B82F6',
          site: '#EF4444',
          dotGrid: '#2A2A2A',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['10px', { lineHeight: '14px' }],
        sm: ['12px', { lineHeight: '16px' }],
        base: ['14px', { lineHeight: '20px' }],
        lg: ['16px', { lineHeight: '24px' }],
        xl: ['18px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amal: {
          black: '#0A0A0A',
          charcoal: '#1A1A1A',
          graphite: '#2A2A2A',
          ash: '#3D3D3D',
          warm: '#B8A080',
          gold: '#C4A265',
          sand: '#D4C5B0',
          cream: '#F5F0EB',
          ivory: '#FAF7F2',
          white: '#FAFAF8',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', '"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['var(--font-body)', '"Inter"', 'system-ui', 'sans-serif'],
        editorial: ['var(--font-editorial)', '"Cormorant"', 'Georgia', 'serif'],
        script: ['var(--font-script)', '"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        luxury: '0.2em',
        'wide-luxury': '0.3em',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 20s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;

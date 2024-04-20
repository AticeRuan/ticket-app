/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        nav:"#14080E",
        page:"#2b3441",
        card:"#2F2F2F",
        "card-hover":"#19647E",
        "default-text":"#BBD8B3",
        "blue-accent":"#0084d4",
        "blue-accent-hover":"#009fff",
        "progress-bar-bg":"#E9AFA3",
        "progress-bar-fill":"#D57A66",
      }
    },
  },
  plugins: [],
}

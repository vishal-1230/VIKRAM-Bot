/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-button': 'linear-gradient(90deg, #D20ED2 0%, #11A4DA 100%)',
        'gradient-white-text': "linear-gradient(90deg, #FFFFFFE5 0%, #FFFFFFB2 100%)",
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "bg-dark-blue": "#101629",
        "gradient-pink": "#D20ED2",
        "gradient-blue": "#11A4DA",
        "gradient-dull-pink": "#C816D3",
        "gradient-dull-blue": "#1A9EDA",
        "white": "#fff",
        "white-gray": "#FFFFFFB2",
        "black": "#000",
        "selected-text": "#11A4DA"
      }
    },
  },
  plugins: [],
}

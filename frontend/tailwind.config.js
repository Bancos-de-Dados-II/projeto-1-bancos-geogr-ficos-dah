import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F5F4F6',
        'text': '#0D0D0D',
        'primary': '#C300FF',
        'secondary': '#FFFFFF',
        'accent': '#AA94B1',
      }
    },
    fontFamily: {
      'sans': 'Roboto, sans-serif',
    }
  },
  plugins: [],
})


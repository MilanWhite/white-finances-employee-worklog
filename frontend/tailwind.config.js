/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/*.{js,ts,jsx,tsx}",
        "./pages/*.{js,ts,jsx,tsx}",
        "./pages/*/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*"
      ],
      theme: {
        extend: {
          colors: {
            slate: {

              'blue-unselected': '#419fce',
              'blue-selected': '#007da8',
              blue: '#3786b5',
              'blue-hover': '#63a7cf',

              bluedark2: '#006b99',
              bluedark3: '#005a85',
              bluedark4: '#133a61',

              dark: '#394955',
              light: '#9dadbc',
              'light-hover': '#8095a8',
              sidebar: "#0f172a",
            },
            special: {
              tapestry: '#AD6A8F',
              cosmic: '#77395C',
            },
            //TEXT
            navtext: "#cffafe",
            navicon: "#cffafe",
            light5: '#f9fafb', // 50
            light4: '#f3f4f6', // 100
            light3: '#e5e7eb', // 200
            light2: '#d1d5db', // 300
            light1: '#9ca3af', // 400
            light: '#6b7280', // text-gray-500
            main: '#374151', // text-gray-700
            dark: '#111827', // text-gray-900
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
        },
      },
    plugins: [],
}
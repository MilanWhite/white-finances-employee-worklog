/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/*.{js,ts,jsx,tsx}",
        "./pages/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            slate: {
              blue: '#3786b5',
              'blue-hover': '#63a7cf',
              dark: '#394955',
              light: '#9dadbc',
              'light-hover': '#8095a8',
            },
            special: {
              tapestry: '#AD6A8F',
              cosmic: '#77395C',
            },
            text: {
              light: '#6b7280', // text-gray-500
              main: '#374151', // text-gray-700
              dark: '#111827', // text-gray-900
            },
          },
        },
      },
    plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			screens: {
				'tablet': '600px',
				// => @media (min-width: 640px) { ... }
		  
				'laptop': '1024px',
				// => @media (min-width: 1024px) { ... }
		  
				'desktop': '1630px',
				// => @media (min-width: 1280px) { ... }
			  },
      }
  },
  plugins: [],
}
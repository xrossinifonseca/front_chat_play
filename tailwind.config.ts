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
        "purple-primary": "#544878",
        "purple-secundary": "#6F619A",
        "light-pink": "#EFA985",
      },
    },
  },
  plugins: [],
};
export default config;

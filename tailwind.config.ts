import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    { pattern: /cols-\d/, variants: ["sm", "md", "lg", "xl", "2xl"] },
    { pattern: /rows-\d/, variants: ["sm", "md", "lg", "xl", "2xl"] },
    { pattern: /col-span-\d/, variants: ["sm", "md", "lg", "xl", "2xl"] },
    { pattern: /row-span-\d/, variants: ["sm", "md", "lg", "xl", "2xl"] },
  ],
};

export default config;

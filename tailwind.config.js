/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Tailwind가 적용될 파일들
  theme: {
    extend: {
      colors: {
        primary: "#007BFF", // 밝은 블루
        secondary: "#0056B3", // 딥 블루
        background: "#F8F9FA", // 라이트 그레이
        accent: "#17A2B8", // 시안 블루
      },
    },
  },
  plugins: [],
};

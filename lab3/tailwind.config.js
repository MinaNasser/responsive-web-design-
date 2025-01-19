/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./*.html"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    './index.html', // إذا كان ملف الـ HTML في المسار الجذري للمشروع
    './assets/**/*.{js,jsx,ts,tsx}', // لتغطية ملفات JavaScript في مجلد src
    './assets/css/**/*.css', // لتغطية ملفات CSS في مجلد css
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Arial", "Helvetica", "sans-serif"],
      serif: ["Merriweather", "Georgia", "serif"],
      mono: ["Courier New", "Courier", "monospace"],
      custom: ['"Open Sans"', "Arial", "sans-serif"],
      body: ['"Roboto"', "sans-serif"],
      heading: ['"Montserrat"', "sans-serif"],
      display: ['"Lora"', "serif"],
    },
    fontWeight: {
      thin: "100",
      "extra-light": "200",
      light: "300",
      regular: "400",
      medium: "500",
      "semi-bold": "600",
      bold: "700",
      "extra-bold": "800",
      black: "900",
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "4rem", // 64px
      "7xl": "5rem", // 80px
      xxl: "2.5rem", // 40px
      "xxx-lg": "3rem", // 48px
    },
    lineHeight: {
      tight: "1.1",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      "extra-loose": "2.5",
      "super-tight": "1.1",
      "super-loose": "3",
    },
    letterSpacing: {
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.1em",
      widest: "0.2em",
      "extra-tight": "-0.05em",
      "extra-wide": "0.3em",
    },

    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }
      "4xl": "2560px",
      // => @media (min-width: 2560px) { ... }
    },

    extend: {
      colors: {
        "red": {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        "blue": {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        "green": {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        "yellow": {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        "purple": {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#9b4de3",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        "orange": {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        "gray": {
          50: "#f9f9f9",
          100: "#f2f2f2",
          200: "#e6e6e6",
          300: "#d1d1d1",
          400: "#b3b3b3",
          500: "#999999",
          600: "#808080",
          700: "#666666",
          800: "#4d4d4d",
          900: "#333333",
          950: "#1a1a1a",
        },
        "pink": {
          50: "#ffe6f2",
          100: "#ffccde",
          200: "#ff99bd",
          300: "#ff669b",
          400: "#ff337a",
          500: "#ff0059",
          600: "#e60050",
          700: "#cc0046",
          800: "#b3003d",
          900: "#80002b",
          950: "#66001f",
        },
        "slate": {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        "zinc": {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        "neutral": {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        "stone": {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        "amber": {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        "lime": {
          50: "#f7fee7",
          100: "#ecfccb",
          200: "#d9f99d",
          300: "#bef264",
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
          700: "#4d7c0f",
          800: "#3f6212",
          900: "#365314",
          950: "#1a2e05",
        },
        "emerald": {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        "teal": {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        "cyan": {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        "sky": {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        "indigo": {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        "violet": {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#ff0000",
        neutral: "#333333",
        "base-100": "#ffffff",
        info: "#3abff8",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
        brightRed: "hsl(12, 88%, 59%)",
        brightRedLight: "hsl(12, 88%, 69%)",
        brightRedSupLight: "hsl(12, 88%, 95%)",
        darkBlue: "hsl(228, 39%, 23%)",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        veryDarkBlue: "hsl(233, 12%, 13%)",
        veryPaleRed: "hsl(13, 100%, 96%)",
        veryLightGray: "hsl(0, 0%, 98%)",
        "bk-teal": "#008080",
        "bk-indigo": "#3F51B5",
        "bk-brown": "#795548",
        "bk-dark": "#1C1C1C",
        "bk-light": "#F1F1F1",
        "bk-gold": "#FFD700",
        "bk-silver": "#C0C0C0",
        "bk-lime": "#32CD32",
      },
      spacing: {
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',    // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem',     // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem',    // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem',       // 16px
        '5': '1.25rem',    // 20px
        '6': '1.5rem',     // 24px
        '7': '1.75rem',    // 28px
        '8': '2rem',       // 32px
        '9': '2.25rem',    // 36px
        '10': '2.5rem',    // 40px
        '11': '2.75rem',   // 44px
        '12': '3rem',      // 48px
        '14': '3.5rem',    // 56px
        '16': '4rem',      // 64px
        '20': '5rem',      // 80px
        '24': '6rem',      // 96px
        '28': '7rem',      // 112px
        '32': '8rem',      // 128px
        '36': '9rem',      // 144px
        '40': '10rem',     // 160px
        '44': '11rem',     // 176px
        '48': '12rem',     // 192px
        '52': '13rem',     // 208px
        '56': '14rem',     // 224px
        '60': '15rem',     // 240px
        '64': '16rem',     // 256px
        '72': '18rem',     // 288px
        '80': '20rem',     // 320px 
        '96': '24rem',     // 384px
        'px': '1px',       // 1px
      },
    boxShadow: {
      'xs': '0 0 2px rgba(0, 0, 0, 0.1)',      // ظلال صغيرة
      'sm': '0 1px 3px rgba(0, 0, 0, 0.12)',     // ظلال خفيفة
      'md': '0 4px 6px rgba(0, 0, 0, 0.1)',      // ظلال متوسطة
      'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',    // ظلال كبيرة
      'xl': '0 15px 30px rgba(0, 0, 0, 0.15)',   // ظلال ضخمة
      '2xl': '0 20px 40px rgba(0, 0, 0, 0.2)',   // ظلال أكبر
      'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', // ظل داخلي
      'none': 'none',                           // بدون ظل
    }
    
    },
    plugins: [],
  },
};

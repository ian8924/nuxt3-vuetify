import tailwindVariables from "./assets/styles/variable/variable.tailwind.js";

/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./views/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: tailwindVariables,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false, // 禁用基础样式重置，避免污染 Docusaurus 默认样式
    },
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./docs/**/*.mdx",
        "./blog/**/*.mdx",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}


import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
                old: path.resolve(__dirname, "old/index.html"),
            },
        },
    },
})

// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
    image: {
        domains: ["*.tkkr.dev", "tkkr.dev"],
    },
    vite: {
        plugins: [tailwindcss()],
    },
    experimental: {
        fonts: [
            {
                provider: fontProviders.google(),
                name: "Figtree",
                weights: ["300 900"],
                cssVariable: "--font-figtree",
                fallbacks: ["sans-serif"],
            },
            {
                provider: fontProviders.google(),
                name: "JetBrains Mono",
                weights: ["100 800"],
                cssVariable: "--font-jetbrains-mono",
                fallbacks: ["monospace"],
            },
        ],
    },
});

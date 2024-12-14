import vercel from "vite-plugin-vercel";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [
    vike({
      prerender: true,
    }),
    react({}),
    sentryVitePlugin({
      sourcemaps: {
        disable: false,
      },
    }),
    vercel(),
  ],

  build: {
    sourcemap: true,
  },
});

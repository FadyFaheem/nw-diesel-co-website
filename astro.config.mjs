import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  build: {
    assets: "assets",
  },
  vite: {
    plugins: [
      {
        name: "remove-crossorigin",
        transformIndexHtml(html) {
          // Remove crossorigin attribute from script and link tags
          return html
            .replace(/\s+crossorigin="anonymous"/g, "")
            .replace(/\s+crossorigin='anonymous'/g, "")
            .replace(/\s+crossorigin/g, "");
        },
      },
    ],
  },
});


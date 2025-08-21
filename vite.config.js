import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: "src",
  build: {
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        atv: resolve(__dirname, "src/pages/atv-dubrovnik.html"),
        euroconsumers: resolve(__dirname, "src/pages/euroconsumers.html"),
        rackbeat: resolve(__dirname, "src/pages/rackbeat.html"),
        sigrid: resolve(__dirname, "src/pages/sigrid.html"),
        sociallyPowerful: resolve(
          __dirname,
          "src/pages/socially-powerful.html"
        ),
        vibefuel: resolve(__dirname, "src/pages/vibefuel.html"),
        vidde: resolve(__dirname, "src/pages/vidde.html"),
      },
    },
    outDir: "../build",
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
  ],
  base: "/portfolio",
});

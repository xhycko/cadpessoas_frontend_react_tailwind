import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      ...(isProduction
        ? [
            compression({
              algorithm: "gzip",
              ext: ".gz",
              threshold: 1024,
              deleteOriginFile: false,
            }),
            compression({
              algorithm: "brotliCompress",
              ext: ".br",
              threshold: 1024,
              deleteOriginFile: false,
            }),
          ]
        : []),
    ],

    build: {
      minify: "terser",
      sourcemap: isProduction ? false : true,
      target: "es2015",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 500,

      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) {
                return "react-vendor";
              }
              if (id.includes("react-router")) {
                return "router";
              }
              if (id.includes("axios")) {
                return "http";
              }
              if (id.includes("@heroicons")) {
                return "icons";
              }
              return "vendor";
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },

      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },

      assetsInlineLimit: 4096,
      reportCompressedSize: true,
    },

    server: {
      port: 3000,
      host: true,
      open: true,
    },

    preview: {
      port: 4173,
      host: true,
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "axios",
        "@heroicons/react/24/outline",
        "@heroicons/react/24/solid",
      ],
    },

    css: {
      devSourcemap: !isProduction,
    },
  };
});
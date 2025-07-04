import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from "tailwindcss"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main-app',
      remotes: {
        music_library: 'http://localhost:4173/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 3000,
    cors: true,
  },
  build: {
    target: 'esnext',
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  federation  from '@originjs/vite-plugin-federation';
import tailwindcss from "tailwindcss"

export default defineConfig({
  plugins: [react(),
    federation({
      name:"music_library",
      filename:"remoteEntry.js",
      exposes:{
        './MusicLibrary': './src/MusicLibrary.jsx',
      },
      shared:['react','react-dom','react-router-dom'],
    }),
  ],
    css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server:{
    port:3001,
    cors:true,
  },
  build: {
    target: "esnext",
  },
})

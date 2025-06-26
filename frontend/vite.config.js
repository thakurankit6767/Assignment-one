import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Don't forget to import path

export default defineConfig({
  plugins: [
    react({
      // Remove the babel preset configuration unless you specifically need it
      // Most React projects don't need this with Vite
      jsxRuntime: 'classic' // Optional: try this if issues persist
    }),
  ],
  server: {
    port: 5173,
    open: true,
    host: true // Add this to allow network access
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
    jsxInject: `import React from 'react'` // Ensure React is available
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Explicitly include React
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
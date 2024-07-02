import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      $utils: path.resolve('./src/utils'),
      $components: path.resolve('./src/components'),
    }
  }
});
import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 750,
  video: false,
  e2e: {
    baseUrl: 'http://127.0.0.1:4173',
    supportFile: false,
  },
});

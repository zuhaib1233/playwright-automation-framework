import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  workers: 1, // ek waqt me sirf ek test chalega
  use: {
    baseURL: process.env.BASE_URL || 'https://nektos.virzit.com',
    headless: false, // browser screen par samne open hoga
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome', // direct Google Chrome browser use karega
      },
    },
  ],
});
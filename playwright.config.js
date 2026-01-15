import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 50000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,   // see browser UI
    slowMo: 200,       // slows actions so you can watch
    viewport: { width: 1280, height: 720 },
  },
});

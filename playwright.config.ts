import { defineConfig, devices } from "@playwright/test";



export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    /**
     * Challenge 9
     * Can you enable screenshots and videos for failed tests or retries?
     */
    trace: "on-first-retry",
    screenshot : "only-on-failure",
    video : "retain-on-failure",
    //headless: false,

  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    /**
     * Challenge 10
     * Can you add configurations for other browsers like Firefox or WebKit?
     */
    
    {
      name: "firefox",
      use: {...devices["Desktop Firefox"]}
    },
    {
      name: 'webkit',
      use: { ...devices["Desktop Safari"] }
    },
  ]
});

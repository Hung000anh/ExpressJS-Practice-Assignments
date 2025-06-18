const { test, expect } = require('@playwright/test');

test('User flow: visit homepage', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/My App/i);
});
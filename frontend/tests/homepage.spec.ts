import { test, expect } from '@playwright/test';

test('Short URL input of homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/sURL/);

  await page.getByLabel('Your long URL').fill('https://surl.hackclub.com/');

  await page.getByRole('button', { name: 'Shorten URL' }).click();

  expect(page.locator('input#shortened-url')).not.toBeNull();
});

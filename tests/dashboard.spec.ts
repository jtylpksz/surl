import { test, expect } from '@playwright/test';

test('Login with `Playwright` user to dashboard', async ({ page }) => {
  // Account for Testing, not real user

  const username = 'Playwright';
  const password = 'playwright';

  await page.goto('http://localhost:3000/login');

  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/dashboard');

  page.getByText(/Dashboard/);
  await page.getByRole('button', { name: 'Create new link' }).click();

  await page
    .getByPlaceholder('Your long URL')
    .fill(`https://surl.hackclub.com/${username}`);

  await page.getByRole('button', { name: 'Create link' }).click();

  await page.locator('#card-url-shortened').waitFor();

  await page.locator('#options-button').click();
  await page.getByRole('button', { name: 'Delete' }).click();

  expect(page.locator('#card-url-shortened')).toBeNull();
});

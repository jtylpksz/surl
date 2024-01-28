import { test, expect } from '@playwright/test';

import { generateName } from './utils/generateRandomName';
import { randomString } from './utils/randomString';

test('Creating account on Signup page', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');

  const randomUsername = generateName();
  const randomPassword = randomString(8);

  await page.getByPlaceholder('Username').fill(randomUsername);
  await page.getByPlaceholder('Password').fill(randomPassword);

  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

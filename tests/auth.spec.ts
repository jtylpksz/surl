import { test, expect } from '@playwright/test';

import { generateName } from './utils/generateRandomName';
import { randomString } from './utils/randomString';

const randomUsername = generateName();
const randomPassword = randomString(8);

test('Creating account on Signup page', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');

  await page.getByPlaceholder('Username').fill(randomUsername);
  await page.getByPlaceholder('Password').fill(randomPassword);

  await page.getByRole('button', { name: 'Create account' }).click();

  await page.waitForURL('**/dashboard');

  expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('Login on Login page', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.getByPlaceholder('Username').fill(randomUsername);
  await page.getByPlaceholder('Password').fill(randomPassword);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/dashboard');

  expect(page).toHaveURL('http://localhost:3000/dashboard');
});

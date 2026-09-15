import { test, expect } from '@playwright/test';

test('handles multiple windows', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Multiple Windows' }).click();

  await expect(page).toHaveTitle('The Internet');
  await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();

  const newWindowPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Click Here' }).click();
  const newWindow = await newWindowPromise;
  await expect(newWindow).toHaveTitle('New Window');
  await expect(newWindow.getByRole('heading', { name: 'New Window' })).toBeVisible();

  await page.bringToFront();
  await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();
});

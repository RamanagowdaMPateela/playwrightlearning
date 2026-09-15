import { test, expect } from '@playwright/test';
import MultipleWindowsPage from '../page-objects/multi.windows.page';

test('handles multiple windows', async ({ page }) => {
  const parentWindow = new MultipleWindowsPage(page);
  await parentWindow.navigateToMultipleWindowsPage();

  await expect(page).toHaveTitle('The Internet');
  await expect(parentWindow.openingNewWindowHeading).toBeVisible();

  const newWindow = await parentWindow.openNewWindow();
  await expect(newWindow.page).toHaveTitle('New Window');
  await expect(newWindow.newWindowHeading).toBeVisible();

  await parentWindow.returnToParentWindow();
  await expect(parentWindow.openingNewWindowHeading).toBeVisible();
});

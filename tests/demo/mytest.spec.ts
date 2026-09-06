import { test, expect } from '@playwright/test';

test.describe("Login Test", () => {

    test.beforeEach("Go to login page", async ({ page }) => {
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await page.getByText('Please login to make').click();
        await expect(page.locator('#login')).toContainText('Please login to make appointment.');

    })

    test("Test1-login failed", { tag: "@test2" }, async ({ page }) => {
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisNOtPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
    });

    test("Test2-login success", async ({ page }) => {
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(await page.getByRole('heading',{name:'Make Appointment'})).toBeVisible();
    });


});


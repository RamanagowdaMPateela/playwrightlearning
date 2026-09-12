import { test, expect } from '@playwright/test';

test.describe("Make appointment", async () => {

    test.beforeEach("Login with valid cred", async ({ page }) => {
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await expect(page.locator('#login')).toContainText('Please login to make appointment.');
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(await page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
    })


    test('Should Make appointment with non Default values', async ({ page }) => {

        //dropdown- by value, by label, by index
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
        await page.getByLabel('Facility').selectOption({ label: "Seoul CURA Healthcare Center" })
        await page.getByLabel('Facility').selectOption({ index: 1 });

        let dropDownListOptions = page.getByLabel("Facility").locator('option');
        await expect((dropDownListOptions)).toHaveCount(3);

        //checkbox 
           //  await page.getByText('Apply for hospital readmission').click();
        await page.getByText('Apply for hospital readmission').check();
        await expect(page.getByText('Apply for hospital readmission')).toBeChecked();
        await page.waitForTimeout(3000);
        await page.getByText('Apply for hospital readmission').uncheck();
        await expect(page.getByText('Apply for hospital readmission')).not.toBeChecked();
  

        //radio btn
        await page.getByText('Medicaid').click();

        //date input 
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('cell', { name: '10' }).first().click();
        await page.getByRole('cell', { name: '10' }).first().click();

        //comment input bix
        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('This is multi line \ncaptured by playwright');

        //button
        await page.getByRole('button', { name: 'Book Appointment' }).click();

        //assert
        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
    });

});
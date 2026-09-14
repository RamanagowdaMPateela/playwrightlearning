import { test, expect } from '@playwright/test';
import { TestData } from "../../data/test-data";
import logger from '../helpers/logger';

const makeApptmntData = TestData.makeAppointmentTestData();


for (const data of makeApptmntData) {
    test.describe("Make appointment", async () => {

        test.beforeEach("Login with valid cred", async ({ page }, testInfo) => {
            //base url custom based
            const envConfig = testInfo.project.use as any;

            //custom log
            logger.info("app launching in browser ")


            await page.goto(envConfig.appURL);

            await expect(page).toHaveTitle("CURA Healthcare Service");
            await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

            await page.getByRole('link', { name: 'Make Appointment' }).click();
            await expect(page.locator('#login')).toContainText('Please login to make appointment.');
            await page.getByLabel('Username').fill(process.env.TEST_USERNAME);
            logger.debug("Request payload: { user: 'John Doe' }");
            //checkbox 
            await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
            await page.getByRole('button', { name: 'Login' }).click();
            logger.warn("Slow response detected");
            const loginCookies = await page.context().cookies();
            process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);
            logger.warn("Slow response detected");
            await expect(await page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();

        })

        test(`${data.testId}Should Make appointment with non Default values`, async ({ page }) => {

            console.log(">>login cookies", `${process.env.LOGIN_COOKIES}`)
            //dropdown- by value, by label, by index
            await page.getByLabel('Facility').selectOption(data.facility);
            // await page.getByLabel('Facility').selectOption({ label: "Seoul CURA Healthcare Center" })
            // await page.getByLabel('Facility').selectOption({ index: 1 });

            let dropDownListOptions = page.getByLabel("Facility").locator('option');
            await expect((dropDownListOptions)).toHaveCount(3);



            //  await page.getByText('Apply for hospital readmission').click();
            await page.getByText('Apply for hospital readmission').check();
            await expect(page.getByText('Apply for hospital readmission')).toBeChecked();
            await page.waitForTimeout(3000);
            await page.getByText('Apply for hospital readmission').uncheck();
            await expect(page.getByText('Apply for hospital readmission')).not.toBeChecked();


            //radio btn
            await page.getByText(data.hcp).click();

            //date input 
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill(data.visitDt);
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press("Enter");

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

}
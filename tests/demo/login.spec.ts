import { test, expect } from '@playwright/test';
import userLoginData from "../../data/constant.json";
import logger from '../helpers/logger';

test.describe("Login Test", () => {

    test.beforeEach("Go to login page", async ({ page }, testInfo) => {
        console.log("BaseURL :", await testInfo.project.use.baseURL);
       // console.log("BaseURL:", await testInfo.project.use.appURL);
        
        const envURL= await  testInfo.project.use;
        await page.goto(envURL.baseURL);
        logger.info("app launching in browser ")
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        await page.getByText('Please login to make').click();
        await expect(page.locator('#login')).toContainText('Please login to make appointment.');
    })

    test("Test1-login failed", { tag: "@test2" }, async ({ page }, testInfo) => {
        await page.getByLabel('Username').fill(userLoginData.userName);
        await page.getByLabel('Password').fill(userLoginData.invalidPassword);
        await page.getByRole('button', { name: 'Login' }).click();
         logger.debug("Request payload: { user: 'John Doe' }");
        await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
        logger.error("Login failed due to invalid credentials");
        let fullPageScreenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach("login page failed", { body: fullPageScreenshot, contentType: "image/png" });
    });

    // ✅1. Fill 📍
    test("Test2-login success", async ({ page }) => {
        // await page.locator('Username').clear();
        await page.getByLabel('Username').fill(userLoginData.userName);
        await page.getByLabel('Password').fill(userLoginData.validPassword);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(await page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
        logger.success("Login test passed!");

        
    });


});


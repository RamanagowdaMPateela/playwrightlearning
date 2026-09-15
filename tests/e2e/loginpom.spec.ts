import { test, expect } from '@playwright/test';
import userLoginData from "../../data/constant.json";
import logger from '../helpers/logger';
import LoginPage from '../page-objects/login.page';
import PwHelper from '../helpers/pw-helper';


test.describe("Login Test", () => {

    test.beforeEach("Go to login page", async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page);

        console.log("BaseURL :", await testInfo.project.use.baseURL);
       // console.log("BaseURL:", await testInfo.project.use.appURL);
        
        const envURL= await  testInfo.project.use;
        await loginPage.navigateToLoginPage(envURL.baseURL, userLoginData.pageTitle , userLoginData.loginHeading);
        logger.info("app launched in browser ");
    })

     test("Test- login failed", async ({ page }) => {
         const loginPage = new LoginPage(page);
         await loginPage.login(userLoginData.userName,userLoginData.invalidPassword);
         await loginPage.assertLoginFailed(userLoginData.loginFailedMsg);  
         const pwHelper = new PwHelper(page);
         await pwHelper.takeFullPageScreenshot("login page");
          logger.info("login failed errro message dispalyed ");
    });

    test("Test- login success", async ({ page }) => {
         const loginPage = new LoginPage(page);
         await loginPage.login(userLoginData.userName,userLoginData.validPassword);
         await loginPage.assertLoginSuccess(userLoginData.expectedUrl);  
    });


});


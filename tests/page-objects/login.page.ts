import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page";
import logger from "../helpers/logger"

export default class LoginPage extends BasePage {

    //constructor
    constructor(page: Page) {
        super(page);
    }

    //Elements
    get makeAppointmentButton() {
        return this.page.getByRole('link', { name: 'Make Appointment' });
    }

    get userNameInputBox() {
        return this.page.getByLabel('Username');
    }

    get userPasswordInputBox() {
        return this.page.getByLabel('Password');
    }

    get loginBtn() {
        return this.page.getByRole('button', { name: 'Login' });
    }


    get loginMessage() {
        return this.page.locator('#login');
    }

    //actions
    async navigateToLoginPage(url: string, expectedTitle: string, loginHeading: string) {
        await this.navigateTo(url);
        await expect(this.page).toHaveTitle(expectedTitle);
        await this.click(this.makeAppointmentButton);
        await expect(this.loginMessage).toContainText(loginHeading);
         logger.info("Login page dispayed");

    }

    async login(userName: string, password: string) {
        await this.typeInto(this.userNameInputBox, userName);
        await this.typeInto(this.userPasswordInputBox, password);
        await this.click(this.loginBtn);

    }

    // Login failed! Please ensure the username and password are valid.
    async assertLoginFailed(loginFailedMsg: string) {
        await expect(this.loginMessage).toContainText(loginFailedMsg);
         logger.error("Login test faiiled!");
    }

    async assertLoginSuccess(expectedUrl: string) {
        await expect(this.page).toHaveURL(expectedUrl);
        logger.success("Login test passed!");
    }

}

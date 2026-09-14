import { expect, type Locator, type Page } from "@playwright/test";
import { Logger } from "@playwright/test";
import logger from "../helpers/logger";

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** reusable actions */
    async navigateTo(path: string) {
        logger.info(`Navigating to the path ${path}`);
        await this.page.goto(path)
    }

    /** click action*/
    async click(ele: Locator) {
        try {
            await expect(ele).toBeVisible({ timeout: 10_000 });
            await ele.click();
        } catch (error) {
            logger.error(`Failed to click Element ${ele}, original error: ${error}`);
        }
    }

      /** Type action*/
     async typeInto(ele: Locator, text: string) {
        try {
            await expect(ele).toBeVisible({ timeout: 10_000 });
            await ele.fill(text);
        } catch (error) {
            logger.error(`Failed to type into Element ${ele}, original error: ${error}`);
        }
    }
}


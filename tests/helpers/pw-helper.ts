// helpers/pw-helper.ts
import { Page } from "@playwright/test";

export default class PwHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Capture full page screenshot
   * @param fileName - name of the screenshot file
   */
  async takeFullPageScreenshot(fileName: string) {
    await this.page.screenshot({
      path: `screenshots/${fileName}.png`,
      fullPage: true
    });
  }

  /**
   * Capture screenshot of a specific element
   * @param locator - Playwright locator for the element
   * @param fileName - name of the screenshot file
   */
  async takeElementScreenshot(locator: string, fileName: string) {
    const element = this.page.locator(locator);
    await element.screenshot({
      path: `screenshots/${fileName}.png`
    });
  }
}

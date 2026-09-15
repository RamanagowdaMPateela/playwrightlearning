import { type Page } from "@playwright/test";
import BasePage from "./base.page";

export default class MultipleWindowsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get multipleWindowsLink() {
    return this.page.getByRole("link", { name: "Multiple Windows" });
  }

  get openingNewWindowHeading() {
    return this.page.getByRole("heading", { name: "Opening a new window" });
  }

  get clickHereLink() {
    return this.page.getByRole("link", { name: "Click Here" });
  }

  get newWindowHeading() {
    return this.page.getByRole("heading", { name: "New Window" });
  }

  async navigateToMultipleWindowsPage() {
    await this.navigateTo("https://the-internet.herokuapp.com/");
    await this.multipleWindowsLink.click();
  }

  async openNewWindow() {
    const newWindowPromise = this.page.waitForEvent("popup");
    await this.clickHereLink.click();
    return new MultipleWindowsPage(await newWindowPromise);
  }

  async returnToParentWindow() {
    await this.page.bringToFront();
  }
}
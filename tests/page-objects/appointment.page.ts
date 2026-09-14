// page-objects/AppointmentPage.ts
import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page";

export default class AppointmentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Elements
  get facilityDropdown() {
    return this.page.getByLabel("Facility");
  }

  get readmissionCheckbox() {
    return this.page.getByText("Apply for hospital readmission");
  }

  get visitDateInput() {
    return this.page.getByRole("textbox", { name: "Visit Date (Required)" });
  }

  get commentBox() {
    return this.page.getByRole("textbox", { name: "Comment" });
  }

  get bookAppointmentBtn() {
    return this.page.getByRole("button", { name: "Book Appointment" });
  }

  get confirmationHeading() {
    return this.page.locator("h2");
  }

  get goToHomepageLink() {
    return this.page.getByRole("link", { name: "Go to Homepage" });
  }

  // Actions
  async selectFacility(facility: string) {
    await this.facilityDropdown.selectOption(facility);
    await expect(this.facilityDropdown.locator("option")).toHaveCount(3);
  }

  async toggleReadmission() {
    await this.readmissionCheckbox.check();
    await expect(this.readmissionCheckbox).toBeChecked();
    await this.readmissionCheckbox.uncheck();
    await expect(this.readmissionCheckbox).not.toBeChecked();
  }

  async chooseHealthcareProgram(hcp: string) {
    await this.page.getByText(hcp).click();
  }

  async setVisitDate(date: string) {
    await this.visitDateInput.fill(date);
    await this.visitDateInput.press("Enter");
  }

  async addComment(comment: string) {
    await this.commentBox.fill(comment);
  }

  async bookAppointment() {
    await this.bookAppointmentBtn.click();
  }

  async assertConfirmation() {
    await expect(this.confirmationHeading).toContainText("Appointment Confirmation");
    await expect(this.goToHomepageLink).toBeVisible();
  }
}

import { test } from "@playwright/test";
import readCSV from "../helpers/csvReader";
import userLoginData from "../../data/constant.json";
import path from "path";
import LoginPage from "../page-objects/login.page";
import AppointmentPage from "../page-objects/appointment.page";
import logger from '../helpers/logger';


const csvFilePath = path.resolve(`${process.cwd()}/data/make-apptmnt-data.csv`);
const makeApptmntData = readCSV(csvFilePath);

for (const data of makeApptmntData) {
    test.describe(`Make appointment - ${data.testId}`, () => {
        test.beforeEach(async ({ page }, testInfo) => {
            const loginPage = new LoginPage(page);
            const baseURL = testInfo.project.use.baseURL;

            // Navigate + login
            await loginPage.navigateToLoginPage(baseURL, userLoginData.pageTitle, userLoginData.loginHeading);
            logger.info("app launched in browser ");
            await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
            await loginPage.assertLoginSuccess(`${baseURL}#appointment`);
        });

        test(`${data.testId} - Should make appointment`, async ({ page }) => {
            const appointmentPage = new AppointmentPage(page);

            await appointmentPage.selectFacility(data.facility);
            await appointmentPage.toggleReadmission();
            await appointmentPage.chooseHealthcareProgram(data.hcp);
            await appointmentPage.setVisitDate(data.visitDt);
            await appointmentPage.addComment("This is multi line \ncaptured by playwright");
            await appointmentPage.bookAppointment();
            await appointmentPage.assertConfirmation();
        });
    });
}

import { test, expect, request } from "@playwright/test";
import logger from "./../helpers/logger";
import userDataConstants from "../../data/constant.json";
import { TestData } from "../../data/test-data";
import { readFile, writeFile } from "../helpers/file-helper";

test.describe("REST API DEMO", () => {

    let envConfig: { apiURL: string };
    test.beforeEach("Go to login page", async ({ page }, testInfo) => {
        envConfig = testInfo.project.use;
        logger.info(`app launched in browser ${envConfig.apiURL}`);
    })

    test("Should get list of users", async ({ request }) => {
        logger.info(`making get call using- ${envConfig.apiURL}`);

        const res = await request.get(`${envConfig.apiURL}${userDataConstants.REQ_RES_ENDPOINTS.GET_USER_LIST} `,
            {
                headers: {
                    "x-api-key": process.env.REQ_RES_API_KEY,
                }
            }
        )
        expect(res.status()).toBe(userDataConstants.GET_STATUS_CODE.success);
        logger.success(`Get call- success with code ${res.status()}`);
        const resData = await res.json();
        logger.info(`list of users ${JSON.stringify(resData)}`);
        writeFile(`${process.cwd()}/data/api-res-get-list-users.json`, `${JSON.stringify(resData, undefined, 4)}`)

    })

    test("Should create a users", async ({ request }) => {
        logger.info(`making post call using- ${envConfig.apiURL}`);

        const res = await request.post(`${envConfig.apiURL}/users`,
            {
                headers: {
                    "x-api-key": process.env.REQ_RES_API_KEY,
                    "Content-Type": "application/json"
                },
                data: TestData.apiUserCreation()[0],
            }
        )
        expect(res.status()).toBe(userDataConstants.POST_STATUS_CODE.success);
        logger.success(`POST call success with code ${res.status()}`);

        const resData = await res.json();
        logger.info(`created user ${JSON.stringify(resData)}`);
    })

});
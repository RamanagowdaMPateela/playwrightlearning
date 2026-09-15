import { FullConfig } from "@playwright/test";
import path from 'path';
import fs from "fs"

export default async function globalSetup(config: FullConfig) {
  console.info(`Test runnning on ${process.env.RUNNER}`)
        if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
                console.info("running on local-setup")

                const allureDirectories = ['allure-results', 'allure-report'];

                for (const directory of allureDirectories) {
                        const directoryPath = path.resolve(process.cwd(), directory);
                        console.log(`Cleaning ${directoryPath}`);
                        fs.rmSync(directoryPath, { recursive: true, force: true });
                }
        }

        process.env.LOGIN_COOKIES = undefined;

}
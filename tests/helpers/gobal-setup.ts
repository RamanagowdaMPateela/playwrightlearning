import { FullConfig } from "@playwright/test";
import path from 'path';
import fs from "fs"

export default async function globalSetup(config: FullConfig) {
  console.info(`Test runnning on ${process.env.RUNNER}`)
        if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
                console.info("running on local-setup")

                const resultDir = path.resolve(process.cwd(), 'allure-result');
                console.log(resultDir);

                if (fs.existsSync(resultDir)) {
                        fs.rmSync(resultDir, { recursive: true, force: true })
                }
        }

}
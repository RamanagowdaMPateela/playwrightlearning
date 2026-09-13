import { FullConfig } from "@playwright/test";
import path from 'path';
import fs from "fs"

export default async function globalSetup(config: FullConfig) {

        if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
                console.info("running on local - tear down ")
  
        }

}
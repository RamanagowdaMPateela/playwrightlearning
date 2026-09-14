import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import {EnvConfig} from "../tests/helpers/config-fixtures.ts"
 import path from "path"

console.log("running in dev env");

export default defineConfig<EnvConfig>({
 ...baseConfig, //loads all existing config devices
 testDir:path.resolve(process.cwd(), "./tests"),
 use: {
    ...baseConfig.use,
    envName:"Dev",
    appURL : "https://www.google.com/",
     dbConfig: {
        server:"",
        dbName:"",
        connectionStr: "",

     }
 },

});
import { test as base } from '@playwright/test';

export type EnvConfig = {
  envName: string,
  appURL: string,
  dbConfig: {},
  apiURL:string
};

export const test = base.extend<EnvConfig>({
  envName: ["test", { option: true }],
  appURL: ["<provideUrl>", { option: true }],
  dbConfig: [{},{option:true}],
  apiURL: ["<provideUrl>", { option: true }],
});
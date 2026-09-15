// helpers/file-helper.ts
import * as fs from "fs";
import * as path from "path";

export function readFile(filePath: string): string {
  return fs.readFileSync(path.resolve(filePath), "utf-8");
}

export function writeFile(filePath: string, data: any): void {
  const content = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  fs.writeFileSync(path.resolve(filePath), content, "utf-8");
}

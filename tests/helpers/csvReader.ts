import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync"

function readCSV(filePath: string):any {
    const csvData = fs.readFileSync(filePath, { encoding: "utf-8" });
    const csvDataParsed = parse(csvData, { columns: true, skip_empty_lines: true, trim: true });

    return csvDataParsed;
}
// csvReader.ts
export default readCSV;

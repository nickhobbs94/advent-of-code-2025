import {readFileSync} from "fs";
import { main } from "./lib";

const data = readFileSync("input.txt", "utf-8");
const result = main(data, 1000);
console.log(result);


import {readFileSync} from "fs";
import { main } from "./lib";

const data = readFileSync("input.txt", "utf-8");
const result = main(data);
console.log(result);


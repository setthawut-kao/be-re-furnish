import { randomBytes } from "crypto";

const key = randomBytes(64).toString("hex");

console.log("Generated Secret Key:");
console.log(key);

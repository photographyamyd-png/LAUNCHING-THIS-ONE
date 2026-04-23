/**
 * Extracts embedded PNG from Ground Level Logo.svg (data URL).
 * Output is ~4MB — only run when you need the raw bitmap for tracing tools.
 */
import fs from "fs";

const svgPath =
  "C:/Users/hutch/OneDrive/Desktop/htnl attempts/Public Images/Ground Level Logo.svg";
const outPath =
  "C:/Users/hutch/OneDrive/Desktop/htnl attempts/Public Images/motifs/_logo-embedded-extract.png";

const s = fs.readFileSync(svgPath, "utf8");
const m = s.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
if (!m) {
  console.error("No embedded PNG found");
  process.exit(1);
}
const b64 = m[1].replace(/&#10;/g, "");
const buf = Buffer.from(b64, "base64");
fs.writeFileSync(outPath, buf);
console.log("Wrote", outPath, buf.length, "bytes (large)");

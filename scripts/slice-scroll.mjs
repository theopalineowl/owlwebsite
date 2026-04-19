/**
 * One-off: slice public/images/scrollblog.png into top / middle (tile) / bottom
 * for 9-slice CSS backgrounds. Run: node scripts/slice-scroll.mjs
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public/images/scrollblog.png");
const outDir = join(root, "public/images");

const TARGET_WIDTH = 1600;
const MID_STRIP_H = 40;

const trimmedBuf = await sharp(src).trim().png().toBuffer();
const meta = await sharp(trimmedBuf).metadata();
const w = meta.width;
const h = meta.height;

if (!w || !h) throw new Error("Could not read trimmed dimensions");

const topPct = 0.17;
const bottomPct = 0.17;
const topH = Math.round(h * topPct);
const bottomH = Math.round(h * bottomPct);
const midY = Math.floor(h / 2 - MID_STRIP_H / 2);

await sharp(trimmedBuf)
  .extract({ left: 0, top: 0, width: w, height: topH })
  .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
  .png()
  .toFile(join(outDir, "scroll-top.png"));

await sharp(trimmedBuf)
  .extract({ left: 0, top: h - bottomH, width: w, height: bottomH })
  .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
  .png()
  .toFile(join(outDir, "scroll-bottom.png"));

await sharp(trimmedBuf)
  .extract({ left: 0, top: midY, width: w, height: MID_STRIP_H })
  .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
  .png()
  .toFile(join(outDir, "scroll-middle.png"));

console.log("Wrote scroll-top.png, scroll-middle.png, scroll-bottom.png");
console.log({ trimmed: { w, h }, topH, bottomH, midY, midStripH: MID_STRIP_H });

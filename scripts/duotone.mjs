// Brand duotone for placeholder photography (SITE_BLUEPRINT.md §4.2).
// Maps every photo onto the ink → gold ramp so stock images from different
// photographers read as one club shoot and stray kit colours disappear.
//
// Usage: node scripts/duotone.mjs            (processes every file in assets-src/photos)
//        node scripts/duotone.mjs hero.jpg   (one file)
// Output: public/images/<name>.jpg (masters; next/image serves AVIF/WebP from these)

import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets-src/photos";
const OUT = "public/images";
const MAX_WIDTH = 2560;

// tokens.css: --p-color-ink-950 (shadows) → --p-color-gold-200 (highlights)
const SHADOW = [0x05, 0x07, 0x0c];
const HIGHLIGHT = [0xf5, 0xd4, 0x8a];
const CONTRAST = 1.15;

const lut = Array.from({ length: 256 }, (_, v) => {
  const t = Math.min(1, Math.max(0, (v / 255 - 0.5) * CONTRAST + 0.5));
  return SHADOW.map((s, i) => Math.round(s + (HIGHLIGHT[i] - s) * t));
});

async function processFile(file) {
  const { data, info } = await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgb = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    const [r, g, b] = lut[data[i * info.channels]];
    rgb[i * 3] = r;
    rgb[i * 3 + 1] = g;
    rgb[i * 3 + 2] = b;
  }

  const name = path.parse(file).name;
  await sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, `${name}.jpg`));
  console.log(`${file} → ${OUT}/${name}.jpg (${info.width}×${info.height})`);
}

await mkdir(OUT, { recursive: true });
const only = process.argv[2];
const files = only ? [only] : (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
for (const f of files) await processFile(f);

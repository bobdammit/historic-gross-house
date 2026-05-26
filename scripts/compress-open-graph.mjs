import { copyFile, rename, stat, unlink } from "node:fs/promises";
import sharp from "sharp";

const sourcePath = "public/images/open-graph.jpg";
const backupPath = "public/images/open-graph.original.jpg";
const tempPath = "public/images/open-graph.compressed.jpg";

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;

async function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const before = await stat(sourcePath);
console.log(`Source: ${before.size} bytes (${await formatKb(before.size)})`);

try {
  await stat(backupPath);
} catch {
  await copyFile(sourcePath, backupPath);
  console.log(`Backup saved: ${backupPath}`);
}

await sharp(sourcePath)
  .rotate()
  .resize(TARGET_WIDTH, TARGET_HEIGHT, {
    fit: "cover",
    position: "centre",
  })
  .jpeg({
    quality: 82,
    mozjpeg: true,
    progressive: true,
  })
  .toFile(tempPath);

let output = await stat(tempPath);
console.log(`Compressed: ${output.size} bytes (${await formatKb(output.size)})`);

if (output.size > 550 * 1024) {
  await sharp(sourcePath)
    .rotate()
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover", position: "centre" })
    .jpeg({ quality: 74, mozjpeg: true, progressive: true })
    .toFile(tempPath);

  output = await stat(tempPath);
  console.log(`Re-compressed (q74): ${output.size} bytes (${await formatKb(output.size)})`);
}

await unlink(sourcePath);
await rename(tempPath, sourcePath);

const after = await stat(sourcePath);
const savings = ((1 - after.size / before.size) * 100).toFixed(1);
console.log(`Final: ${after.size} bytes (${await formatKb(after.size)}) — ${savings}% smaller`);

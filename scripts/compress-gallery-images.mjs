import { readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = "public/images";

/** Long edge — enough for 3x retina on ~640px mobile tiles and lightbox. */
const DEFAULT_MAX_EDGE = 1920;

/** Hero and wide aerial shots — slightly larger cap. */
const LARGE_MAX_EDGE = 2400;

const LARGE_FILES = new Set([
  "gross-house-exterior.jpg",
  "exterior-pano.jpg",
  "open-graph.jpg",
]);

const SKIP_FILES = new Set(["og-share.jpg", "open-graph.original.jpg"]);

const JPEG_OPTIONS = {
  quality: 80,
  mozjpeg: true,
  progressive: true,
};

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function compressFile(filename) {
  if (SKIP_FILES.has(filename)) {
    return { filename, status: "skipped" };
  }

  const filePath = path.join(IMAGES_DIR, filename);
  const before = await stat(filePath);
  const maxEdge = LARGE_FILES.has(filename) ? LARGE_MAX_EDGE : DEFAULT_MAX_EDGE;

  const meta = await sharp(filePath, { failOn: "none" }).metadata();
  const needsResize =
    (meta.width ?? 0) > maxEdge || (meta.height ?? 0) > maxEdge;

  let transformer = sharp(filePath, { failOn: "none" }).rotate();

  if (needsResize) {
    transformer = transformer.resize(maxEdge, maxEdge, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const buffer = await transformer.jpeg(JPEG_OPTIONS).toBuffer();

  if (buffer.length >= before.size && !needsResize) {
    return {
      filename,
      status: "unchanged",
      before: before.size,
      after: before.size,
    };
  }

  const tempPath = `${filePath}.compressing`;
  await writeFile(tempPath, buffer);
  await unlink(filePath);
  await rename(tempPath, filePath);

  const after = await stat(filePath);
  const savings = ((1 - after.size / before.size) * 100).toFixed(0);

  return {
    filename,
    status: "compressed",
    before: before.size,
    after: after.size,
    savings,
    dimensions: needsResize ? `→≤${maxEdge}px` : "",
  };
}

const entries = await readdir(IMAGES_DIR);
const jpgFiles = entries.filter((name) => /\.jpe?g$/i.test(name)).sort();

console.log(`Compressing ${jpgFiles.length} images in ${IMAGES_DIR}…\n`);

let totalBefore = 0;
let totalAfter = 0;
let compressed = 0;
let unchanged = 0;
let skipped = 0;

for (const filename of jpgFiles) {
  const result = await compressFile(filename);

  if (result.status === "skipped") {
    skipped++;
    console.log(`  skip  ${filename}`);
    continue;
  }

  if (result.status === "unchanged") {
    unchanged++;
    totalBefore += result.before;
    totalAfter += result.after;
    console.log(`  keep  ${filename} (${formatKb(result.before)})`);
    continue;
  }

  compressed++;
  totalBefore += result.before;
  totalAfter += result.after;
  console.log(
    `  done  ${filename}: ${formatKb(result.before)} → ${formatKb(result.after)} (${result.savings}% smaller) ${result.dimensions}`.trim()
  );
}

const overallSavings =
  totalBefore > 0 ? ((1 - totalAfter / totalBefore) * 100).toFixed(1) : "0";

console.log("\n---");
console.log(
  `Compressed: ${compressed} | Unchanged: ${unchanged} | Skipped: ${skipped}`
);
console.log(
  `Total: ${formatKb(totalBefore)} → ${formatKb(totalAfter)} (${overallSavings}% smaller)`
);

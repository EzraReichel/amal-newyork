/**
 * fix-swatches.js
 * Targeted re-crop for specific problem swatches ONLY.
 * Does NOT touch any other images.
 *
 * Root causes fixed:
 *   IMG_0908.PNG — startY=700 lands in the "OPACO" title band
 *     → opaco-viola, opaco-prugna, opaco-notte
 *   48d3777b.JPG — startY=285 lands in the sheet header / title area
 *     → opaco-nero, opaco-antra, opaco-grigio, opaco-moro (white corner)
 *   IMG_0906.PNG — row-2 labelPct insufficient; trim can't skip label text row
 *     → lucido-smeraldo, lucido-verdone, lucido-petrolio
 *
 * Run: node scripts/fix-swatches.js
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const SRC = path.join(__dirname, '../public/images/Amal_Leathers');
const OUT = path.join(__dirname, '../public/images/leathers');

// ---------------------------------------------------------------------------
// Each entry: source file, output name, exact pixel region, trim threshold.
// Regions are chosen to land squarely on leather texture, well clear of
// title banners and label text.
// ---------------------------------------------------------------------------

// ── IMG_0908.PNG geometry ─────────────────────────────────────────────────
// 1320×2868, cols=3 → colW=440, insetX=66, cellW=308
// Real swatches start ~y=860 (title band occupies y≈700-840)
// rowH_new = (2480-860)/3 ≈ 540, insetTop=27 → row0 top≈887
const IMG0908 = 'IMG_0908.PNG';
const W0908   = 308;  // colW - 2*insetX
const TOP0908 = 887;  // row 0 top with corrected startY=860
const H0908   = 210;  // stays well above label area

// ── 48d3777b.JPG geometry ────────────────────────────────────────────────
// 739×1600, cols=3 → colW≈246, insetX≈44, cellW≈158
// Real swatches start ~y=440 (header occupies y≈0-420)
// rowH_new = (1460-440)/4 = 255, insetTop=13 → row0 top≈453
const JPG48  = '48d3777b-4db9-4383-b736-88a439a42ef5.JPG';
// 48d3777b: colW=246.3, leather centers at x≈123, 369, 615
// Use width=120 centered in leather patch to avoid inter-swatch gutter
const W48     = 120;
// Probe confirmed: leather at y≈340-510, paper/label starts y≈520
const TOP48R0 = 350;  // row 0: safely in leather zone
const H48R0   = 145;  // ends at y≈495, well before paper boundary at y≈520
// Row 1: main script used top=594,h=138; moro just needs threshold bump
const TOP48R1 = 600;
const H48R1   = 130;

// ── IMG_0906.PNG geometry ─────────────────────────────────────────────────
// 1320×2868, cols=3 → colW=440, insetX=66, cellW=308
// Row 2 base = 760 + 2×607 = 1974; label text appears at ~y=2290+
// Crop strictly the upper leather zone of that row
const IMG0906 = 'IMG_0906.PNG';
const W0906   = 308;
const TOP0906 = 2000;  // safely in leather zone for row 2
const H0906   = 155;   // ends at y=2155 — probe confirmed paper starts at y=2165

const FIXES = [
  // ── IMG_0908.PNG row 0: "OPACO" title band in old crop ──────────────
  { file: IMG0908, name: 'opaco-viola',  region: { left: 66,  top: TOP0908, width: W0908, height: H0908 }, threshold: 40 },
  { file: IMG0908, name: 'opaco-prugna', region: { left: 506, top: TOP0908, width: W0908, height: H0908 }, threshold: 40 },
  { file: IMG0908, name: 'opaco-notte',  region: { left: 946, top: TOP0908, width: W0908, height: H0908 }, threshold: 40 },

  // ── 48d3777b.JPG row 0: probe confirmed leather at y=350-495 ─────────
  // left = col_center - W48/2: 63, 309, 555
  { file: JPG48, name: 'opaco-nero',   region: { left: 63,  top: TOP48R0, width: W48, height: H48R0 }, threshold: 40 },
  { file: JPG48, name: 'opaco-antra',  region: { left: 309, top: TOP48R0, width: W48, height: H48R0 }, threshold: 40 },
  { file: JPG48, name: 'opaco-grigio', region: { left: 555, top: TOP48R0, width: W48, height: H48R0 }, threshold: 40 },

  // ── 48d3777b.JPG row 1 col 1: white corner, re-trim with threshold 40 ─
  { file: JPG48, name: 'opaco-moro',   region: { left: 309, top: TOP48R1, width: W48, height: H48R1 }, threshold: 40 },

  // ── IMG_0906.PNG row 2: label text at bottom, crop upper leather zone ─
  { file: IMG0906, name: 'lucido-smeraldo', region: { left: 66,  top: TOP0906, width: W0906, height: H0906 }, threshold: 40 },
  { file: IMG0906, name: 'lucido-verdone',  region: { left: 506, top: TOP0906, width: W0906, height: H0906 }, threshold: 40 },
  { file: IMG0906, name: 'lucido-petrolio', region: { left: 946, top: TOP0906, width: W0906, height: H0906 }, threshold: 40 },
];

// ---------------------------------------------------------------------------

async function fixSwatch({ file, name, region, threshold }) {
  const inputPath = path.join(SRC, file);
  const outputPath = path.join(OUT, `${name}.jpg`);

  // Validate bounds
  const meta = await sharp(inputPath).metadata();
  const r = region;
  if (r.left + r.width > meta.width || r.top + r.height > meta.height) {
    console.error(`  ✗  ${name} — region out of bounds (${meta.width}×${meta.height}), skipping`);
    return;
  }

  // Step 1: Extract
  const extracted = await sharp(inputPath)
    .extract({ left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) })
    .toBuffer();

  // Step 2: Trim white paper
  let trimmed, trimInfo;
  try {
    const result = await sharp(extracted)
      .trim({ background: { r: 255, g: 255, b: 255, alpha: 1 }, threshold })
      .toBuffer({ resolveWithObject: true });
    trimmed  = result.data;
    trimInfo = result.info;
  } catch {
    const result = await sharp(extracted).toBuffer({ resolveWithObject: true });
    trimmed  = result.data;
    trimInfo = result.info;
  }

  // Step 3: Centred square
  const { width: tw, height: th } = trimInfo;
  const size = Math.min(tw, th);
  const squareLeft = Math.floor((tw - size) / 2);
  const squareTop  = Math.floor((th - size) / 2);

  // Step 4: Resize, enhance, save
  await sharp(trimmed)
    .extract({ left: squareLeft, top: squareTop, width: size, height: size })
    .resize(400, 400)
    .modulate({ brightness: 1.03, saturation: 1.08 })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outputPath);

  console.log(`  ✓  ${name}.jpg`);
}

(async () => {
  console.log(`Fixing ${FIXES.length} problem swatches…\n`);
  for (const fix of FIXES) {
    try {
      await fixSwatch(fix);
    } catch (err) {
      console.error(`  ✗  ${fix.name}: ${err.message}`);
    }
  }
  console.log('\n── Done ──');
})();

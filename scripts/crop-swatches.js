/**
 * crop-swatches.js — v2
 * Crops individual leather swatches from swatch sheet photos.
 *
 * Pipeline per swatch:
 *   1. Extract the raw cell region (generous insets on all sides)
 *   2. Trim remaining white/paper borders (Sharp trim with white background)
 *   3. Extract the largest centred square from the trimmed result
 *   4. Resize to 400×400, subtly enhance, sharpen, save JPEG
 *
 * Run: node scripts/crop-swatches.js
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const SRC = path.join(__dirname, '../public/images/Amal_Leathers');
const OUT = path.join(__dirname, '../public/images/leathers');
fs.mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------------------
// Source sheet definitions
//
// startY / endY  — vertical range containing ALL swatch rows (pixels)
// cols / rows    — grid dimensions
// insetPct       — fraction of cell width/height to cut on EVERY side (removes gutters)
// labelPct       — additional fraction to cut from the BOTTOM of each cell (removes label text)
// names          — row-major; null = skip this cell
// ---------------------------------------------------------------------------
const SOURCES = [
  // ── IMG_0907.PNG  1320×2868  Alligatore Lucido — 4 rows (darks/purples/pinks)
  {
    file:      'IMG_0907.PNG',
    prefix:    'lucido',
    cols: 3,   rows: 4,
    startY:    680,  endY: 2540,
    insetPct:    0.15,
    insetTopPct: 0.12,
    labelPct:    0.48,
    trimThreshold: 40,  // no cream leathers on this sheet — aggressive trim safe
    names: [
      'nero',      'antra',  'moro',
      'notte',     'blu',    'lavanda',
      'viola',     'prugna', 'wine',
      'ciclamino', 'fucsia', 'baby',
    ],
  },

  // ── IMG_0906.PNG  1320×2868  Alligatore Lucido — 3 rows (reds/greens)
  {
    file:      'IMG_0906.PNG',
    prefix:    'lucido',
    cols: 3,   rows: 3,
    startY:    760,  endY: 2580,
    insetPct:    0.15,
    insetTopPct: 0.15,  // rosso row has white paper above leather — cut more from top
    labelPct:    0.48,
    trimThreshold: 40,
    names: [
      'rosso',    'anguria', 'fragola',
      'corallo',  'sabbia',  'acqua',
      'smeraldo', 'verdone', 'petrolio',
    ],
  },

  // ── IMG_0908.PNG  1320×2868  Alligatore Opaco — 3 rows (brights)
  {
    file:      'IMG_0908.PNG',
    prefix:    'opaco',
    cols: 3,   rows: 3,
    startY:    700,  endY: 2480,
    insetPct:  0.15,
    labelPct:  0.55,  // giallo label needed extra cut
    trimThreshold: 40,
    names: [
      'viola',  'prugna',   'notte',
      'cielo',  'acqua',    'smeraldo',
      'verde',  'mela',     'giallo',
    ],
  },

  // ── 48d3777b.JPG  739×1600  Alligatore Opaco — 4 rows (neutrals/darks)
  // threshold 22: panna ≈ rgb(232,224,208) — min channel diff from white is 23
  {
    file:      '48d3777b-4db9-4383-b736-88a439a42ef5.JPG',
    prefix:    'opaco',
    cols: 3,   rows: 4,
    startY:    285,  endY: 1460,
    insetPct:  0.18,
    labelPct:  0.48,
    trimThreshold: 22,  // must stay low — opaco-panna is near-white
    names: [
      'nero',  'antra',  'grigio',
      'panna', 'moro',   'fango',
      'cuoio', 'wine',   'cremisi',
      null,    null,     'corallo',
    ],
  },
];

// ---------------------------------------------------------------------------

async function cropSwatch(inputPath, region, outputPath, trimThreshold = 22) {
  // ── Step 1: Extract the raw cell area ──────────────────────────
  const extracted = await sharp(inputPath)
    .extract({
      left:   Math.max(0, Math.round(region.left)),
      top:    Math.max(0, Math.round(region.top)),
      width:  Math.round(region.width),
      height: Math.round(region.height),
    })
    .toBuffer();

  // ── Step 2: Trim white/paper borders ───────────────────────────
  let trimmed, trimInfo;
  try {
    const result = await sharp(extracted)
      .trim({ background: { r: 255, g: 255, b: 255, alpha: 1 }, threshold: trimThreshold })
      .toBuffer({ resolveWithObject: true });
    trimmed  = result.data;
    trimInfo = result.info;
  } catch {
    // trim() throws if nothing is trimmed (image already fills bounds) — use original
    const result = await sharp(extracted).toBuffer({ resolveWithObject: true });
    trimmed  = result.data;
    trimInfo = result.info;
  }

  // ── Step 3: Extract the largest centred square ─────────────────
  const { width: tw, height: th } = trimInfo;
  const size      = Math.min(tw, th);
  const squareLeft = Math.floor((tw - size) / 2);
  const squareTop  = Math.floor((th - size) / 2);

  // ── Step 4: Resize, enhance, save ─────────────────────────────
  await sharp(trimmed)
    .extract({ left: squareLeft, top: squareTop, width: size, height: size })
    .resize(400, 400)                               // exact square, no letter-boxing
    .modulate({ brightness: 1.03, saturation: 1.08 })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outputPath);
}

async function processSheet(source) {
  const inputPath = path.join(SRC, source.file);
  if (!fs.existsSync(inputPath)) {
    console.error(`✗  Not found: ${source.file}`);
    return;
  }

  const meta  = await sharp(inputPath).metadata();
  const imgW  = meta.width;

  const colW  = imgW / source.cols;
  const rowH  = (source.endY - source.startY) / source.rows;

  // Horizontal inset removes gutters on both sides of each cell
  const insetX = colW  * source.insetPct;
  // Vertical top inset — per-source override or default 5%
  const insetYtop = rowH * (source.insetTopPct ?? 0.05);
  // Height: cut labelPct from bottom plus the top inset
  const cellH = rowH * (1 - source.labelPct) - insetYtop;

  console.log(
    `\n▸ ${source.file}  (${imgW}×${meta.height})` +
    `  colW=${colW.toFixed(0)}  rowH=${rowH.toFixed(0)}` +
    `  cropW=${Math.round(colW - 2*insetX)}  cropH=${Math.round(cellH)}`
  );

  for (let r = 0; r < source.rows; r++) {
    for (let c = 0; c < source.cols; c++) {
      const idx  = r * source.cols + c;
      const name = source.names[idx];
      if (!name) continue;

      const left   = c * colW + insetX;
      const top    = source.startY + r * rowH + insetYtop;
      const width  = colW - 2 * insetX;
      const height = cellH;

      if (left + width > imgW || top + height > meta.height) {
        console.warn(`  ⚠  ${name} — out of bounds, skipping`);
        continue;
      }

      const filename = `${source.prefix}-${name}.jpg`;
      const outPath  = path.join(OUT, filename);

      try {
        await cropSwatch(inputPath, { left, top, width, height }, outPath, source.trimThreshold);
        console.log(`  ✓  ${filename}`);
      } catch (err) {
        console.error(`  ✗  ${filename}: ${err.message}`);
      }
    }
  }
}

(async () => {
  console.log('Cropping leather swatches (v2 — tight crop + white trim)…\n');
  for (const source of SOURCES) {
    await processSheet(source);
  }
  console.log('\n── Done ──');
  console.log('Output:', OUT);
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.jpg')).sort();
  console.log(`${files.length} files:`);
  files.forEach(f => console.log(' ', f));
})();

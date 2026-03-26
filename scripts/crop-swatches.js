/**
 * crop-swatches.js
 * Crops individual leather swatches from swatch sheet photos.
 * Run: node scripts/crop-swatches.js
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const SRC = path.join(__dirname, '../public/images/Amal_Leathers');
const OUT = path.join(__dirname, '../public/images/leathers');
fs.mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------------------
// Source sheets
// Each entry describes one photo and where the swatches live inside it.
//
// Coordinates are in pixels from the top-left of the source image.
// startY / endY define the vertical range that contains ALL swatch rows.
// cols / rows define the grid inside that range.
// labelFrac: fraction of each row-cell to CUT from the bottom (the text label).
// insetX / insetY: extra padding inside each cell (avoids white gutters).
// names: row-major order, null = skip.
// ---------------------------------------------------------------------------
const SOURCES = [
  // ── IMG_0907.PNG  1320×2868  ── Alligatore Lucido (darks/purples/pinks)
  // Swatch rows begin after title at ~y=680, end before phone bottom bar at ~y=2540
  {
    file:      'IMG_0907.PNG',
    prefix:    'lucido',
    cols: 3, rows: 4,
    startY:    680,  endY: 2540,
    insetX:    42,   insetY: 30,
    labelFrac: 0.30,  // cut 30% from bottom of each row (label + gap)
    names: [
      'nero',      'antra',  'moro',
      'notte',     'blu',    'lavanda',
      'viola',     'prugna', 'wine',
      'ciclamino', 'fucsia', 'baby',
    ],
  },

  // ── IMG_0906.PNG  1320×2868  ── Alligatore Lucido (reds/greens)
  {
    file:      'IMG_0906.PNG',
    prefix:    'lucido',
    cols: 3, rows: 3,
    startY:    760,  endY: 2580,
    insetX:    42,   insetY: 30,
    labelFrac: 0.30,
    names: [
      'rosso',    'anguria', 'fragola',
      'corallo',  'sabbia',  'acqua',
      'smeraldo', 'verdone', 'petrolio',
    ],
  },

  // ── IMG_0908.PNG  1320×2868  ── Alligatore Opaco (brights)
  // Bottom bar starts around y=2500, so end conservatively at 2480
  {
    file:      'IMG_0908.PNG',
    prefix:    'opaco',
    cols: 3, rows: 3,
    startY:    700,  endY: 2480,
    insetX:    42,   insetY: 30,
    labelFrac: 0.30,
    names: [
      'viola',  'prugna',   'notte',
      'cielo',  'acqua',    'smeraldo',
      'verde',  'mela',     'giallo',
    ],
  },

  // ── 48d3777b.JPG  739×1600  ── Alligatore Opaco (neutrals/darks/reds)
  {
    file:      '48d3777b-4db9-4383-b736-88a439a42ef5.JPG',
    prefix:    'opaco',
    cols: 3, rows: 4,
    startY:    285,  endY: 1460,
    insetX:    22,   insetY: 16,
    labelFrac: 0.30,
    names: [
      'nero',  'antra',   'grigio',
      'panna', 'moro',    'fango',
      'cuoio', 'wine',    'cremisi',
      null,    null,      'corallo',
    ],
  },
];

// ---------------------------------------------------------------------------

async function cropSwatch(inputPath, { left, top, width, height }, outputPath) {
  // Clamp to safe integer values
  const region = {
    left:   Math.max(0, Math.round(left)),
    top:    Math.max(0, Math.round(top)),
    width:  Math.round(width),
    height: Math.round(height),
  };

  await sharp(inputPath)
    .extract(region)
    .resize(400, 400, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 1.04, saturation: 1.08 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outputPath);
}

async function processSheet(source) {
  const inputPath = path.join(SRC, source.file);
  if (!fs.existsSync(inputPath)) {
    console.error(`✗  File not found: ${source.file}`);
    return;
  }

  const meta    = await sharp(inputPath).metadata();
  const imgW    = meta.width;
  const imgH    = meta.height;
  const colW    = imgW / source.cols;
  const rowH    = (source.endY - source.startY) / source.rows;
  const swatchH = rowH * (1 - source.labelFrac) - source.insetY;

  console.log(`\n▸ ${source.file}  (${imgW}×${imgH})  colW=${colW.toFixed(0)}  rowH=${rowH.toFixed(0)}`);

  for (let r = 0; r < source.rows; r++) {
    for (let c = 0; c < source.cols; c++) {
      const idx  = r * source.cols + c;
      const name = source.names[idx];
      if (!name) continue;

      const left   = c * colW + source.insetX;
      const top    = source.startY + r * rowH + source.insetY;
      const width  = colW - 2 * source.insetX;
      const height = swatchH;

      // Safety check
      if (left + width > imgW || top + height > imgH) {
        console.warn(`  ⚠  ${name} — region out of bounds, skipping`);
        continue;
      }

      const filename = `${source.prefix}-${name}.jpg`;
      const outPath  = path.join(OUT, filename);

      try {
        await cropSwatch(inputPath, { left, top, width, height }, outPath);
        console.log(`  ✓  ${filename}`);
      } catch (err) {
        console.error(`  ✗  ${filename}: ${err.message}`);
      }
    }
  }
}

(async () => {
  console.log('Cropping leather swatches…\n');
  for (const source of SOURCES) {
    await processSheet(source);
  }
  console.log('\nDone. Output:', OUT);
  console.log('Files generated:');
  fs.readdirSync(OUT).sort().forEach(f => console.log(' ', f));
})();

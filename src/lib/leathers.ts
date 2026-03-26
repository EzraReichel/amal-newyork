export interface Leather {
  id: string;
  name: string;       // Italian
  nameEn: string;     // English translation
  collection: string;
  origin: string;
  color: string;      // hex fallback
  image: string;      // path to cropped swatch
}

// 40 entries arranged in row-major order for an 8×5 grid.
// Layout logic:
//   Cols 1–4: Alligatore Lucido  (glossy croc, left half)
//   Cols 5–8: Alligatore Opaco   (matte croc, right half)
//   Rows read dark → light / warm → cool top-to-bottom within each zone
export const leathers: Leather[] = [
  // ── Row 1: deep darks ─────────────────────────────────────────
  {
    id: "lucido-nero",    name: "Nero",    nameEn: "Black",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#1A1A1A", image: "/images/leathers/lucido-nero.jpg",
  },
  {
    id: "lucido-antra",   name: "Antra",   nameEn: "Anthracite",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#2D2D2D", image: "/images/leathers/lucido-antra.jpg",
  },
  {
    id: "lucido-moro",    name: "Moro",    nameEn: "Dark Brown",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#2A1A0E", image: "/images/leathers/lucido-moro.jpg",
  },
  {
    id: "lucido-notte",   name: "Notte",   nameEn: "Night",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#1A1F2E", image: "/images/leathers/lucido-notte.jpg",
  },
  {
    id: "opaco-nero",     name: "Nero",    nameEn: "Black",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#1C1C1C", image: "/images/leathers/opaco-nero.jpg",
  },
  {
    id: "opaco-antra",    name: "Antra",   nameEn: "Anthracite",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#303030", image: "/images/leathers/opaco-antra.jpg",
  },
  {
    id: "opaco-moro",     name: "Moro",    nameEn: "Dark Brown",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#2A1A0A", image: "/images/leathers/opaco-moro.jpg",
  },
  {
    id: "opaco-notte",    name: "Notte",   nameEn: "Night",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#1A1A30", image: "/images/leathers/opaco-notte.jpg",
  },

  // ── Row 2: deep jewel tones ───────────────────────────────────
  {
    id: "lucido-blu",     name: "Blu",     nameEn: "Blue",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#1A3A6E", image: "/images/leathers/lucido-blu.jpg",
  },
  {
    id: "lucido-lavanda", name: "Lavanda", nameEn: "Lavender",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#6A5A8A", image: "/images/leathers/lucido-lavanda.jpg",
  },
  {
    id: "lucido-viola",   name: "Viola",   nameEn: "Violet",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#4A2060", image: "/images/leathers/lucido-viola.jpg",
  },
  {
    id: "lucido-prugna",  name: "Prugna",  nameEn: "Plum",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#3A1840", image: "/images/leathers/lucido-prugna.jpg",
  },
  {
    id: "opaco-prugna",   name: "Prugna",  nameEn: "Plum",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#2A1040", image: "/images/leathers/opaco-prugna.jpg",
  },
  {
    id: "opaco-viola",    name: "Viola",   nameEn: "Violet",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#3A1850", image: "/images/leathers/opaco-viola.jpg",
  },
  {
    id: "opaco-cielo",    name: "Cielo",   nameEn: "Sky Blue",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#2060C0", image: "/images/leathers/opaco-cielo.jpg",
  },
  {
    id: "opaco-acqua",    name: "Acqua",   nameEn: "Aqua",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#208080", image: "/images/leathers/opaco-acqua.jpg",
  },

  // ── Row 3: mid reds / wines / greens ─────────────────────────
  {
    id: "lucido-wine",    name: "Wine",    nameEn: "Wine",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#3A1A28", image: "/images/leathers/lucido-wine.jpg",
  },
  {
    id: "lucido-ciclamino", name: "Ciclamino", nameEn: "Cyclamen",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#CC2060", image: "/images/leathers/lucido-ciclamino.jpg",
  },
  {
    id: "lucido-fucsia",  name: "Fucsia",  nameEn: "Fuchsia",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#C01870", image: "/images/leathers/lucido-fucsia.jpg",
  },
  {
    id: "lucido-baby",    name: "Baby",    nameEn: "Baby Pink",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#CC3050", image: "/images/leathers/lucido-baby.jpg",
  },
  {
    id: "opaco-cremisi",  name: "Cremisi", nameEn: "Crimson",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#780820", image: "/images/leathers/opaco-cremisi.jpg",
  },
  {
    id: "opaco-wine",     name: "Wine",    nameEn: "Wine",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#4A1820", image: "/images/leathers/opaco-wine.jpg",
  },
  {
    id: "opaco-smeraldo", name: "Smeraldo", nameEn: "Emerald",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#088050", image: "/images/leathers/opaco-smeraldo.jpg",
  },
  {
    id: "opaco-verde",    name: "Verde",   nameEn: "Green",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#206020", image: "/images/leathers/opaco-verde.jpg",
  },

  // ── Row 4: warm reds / corals / earth tones ───────────────────
  {
    id: "lucido-rosso",   name: "Rosso",   nameEn: "Red",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#C02020", image: "/images/leathers/lucido-rosso.jpg",
  },
  {
    id: "lucido-anguria", name: "Anguria", nameEn: "Watermelon",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#C43030", image: "/images/leathers/lucido-anguria.jpg",
  },
  {
    id: "lucido-fragola", name: "Fragola", nameEn: "Strawberry",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#CC2040", image: "/images/leathers/lucido-fragola.jpg",
  },
  {
    id: "lucido-corallo", name: "Corallo", nameEn: "Coral",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#D04020", image: "/images/leathers/lucido-corallo.jpg",
  },
  {
    id: "opaco-fango",    name: "Fango",   nameEn: "Clay",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#806040", image: "/images/leathers/opaco-fango.jpg",
  },
  {
    id: "opaco-cuoio",    name: "Cuoio",   nameEn: "Leather Brown",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#8C5A20", image: "/images/leathers/opaco-cuoio.jpg",
  },
  {
    id: "opaco-corallo",  name: "Corallo", nameEn: "Coral",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#CC4020", image: "/images/leathers/opaco-corallo.jpg",
  },
  {
    id: "opaco-mela",     name: "Mela",    nameEn: "Apple Green",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#60A020", image: "/images/leathers/opaco-mela.jpg",
  },

  // ── Row 5: lights / sands / brights ──────────────────────────
  {
    id: "lucido-sabbia",  name: "Sabbia",  nameEn: "Sand",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#A08040", image: "/images/leathers/lucido-sabbia.jpg",
  },
  {
    id: "lucido-acqua",   name: "Acqua",   nameEn: "Aqua",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#208060", image: "/images/leathers/lucido-acqua.jpg",
  },
  {
    id: "lucido-smeraldo", name: "Smeraldo", nameEn: "Emerald",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#1A6040", image: "/images/leathers/lucido-smeraldo.jpg",
  },
  {
    id: "lucido-verdone", name: "Verdone", nameEn: "Dark Green",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#1A4020", image: "/images/leathers/lucido-verdone.jpg",
  },
  {
    id: "lucido-petrolio", name: "Petrolio", nameEn: "Petrol",
    collection: "Alligatore Lucido", origin: "Italy",
    color: "#0A2A30", image: "/images/leathers/lucido-petrolio.jpg",
  },
  {
    id: "opaco-grigio",   name: "Grigio",  nameEn: "Grey",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#808080", image: "/images/leathers/opaco-grigio.jpg",
  },
  {
    id: "opaco-panna",    name: "Panna",   nameEn: "Cream",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#E8E0D0", image: "/images/leathers/opaco-panna.jpg",
  },
  {
    id: "opaco-giallo",   name: "Giallo",  nameEn: "Yellow",
    collection: "Alligatore Opaco",  origin: "Italy",
    color: "#C0C000", image: "/images/leathers/opaco-giallo.jpg",
  },
];

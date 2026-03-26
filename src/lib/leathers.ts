export interface Leather {
  id: string;
  name: string;
  origin: string;
  color: string;
  category: string;
}

// Arranged in row-major order for an 8×5 grid.
// Each column is a coherent color story, reading light→dark top→bottom:
//   Col 1: Lights/bone   Col 2: Yellow-tans   Col 3: Caramels     Col 4: Warm browns
//   Col 5: Dark browns   Col 6: Reds/burgundy  Col 7: Jewel tones  Col 8: Cool darks
export const leathers: Leather[] = [
  // ── Row 1 (lightest of each column) ────────────────────────────
  { id: "bone-vachetta",     name: "Bone Vachetta",     origin: "Florence, Italy",         color: "#E8DBC8", category: "Full Grain" },
  { id: "linen-nubuck",      name: "Linen Nubuck",      origin: "Bavaria, Germany",        color: "#C8B47C", category: "Nubuck"     },
  { id: "butterscotch-calf", name: "Butterscotch Calf", origin: "Buenos Aires, Argentina", color: "#C49858", category: "Full Grain" },
  { id: "whiskey-bridle",    name: "Whiskey Bridle",    origin: "Dublin, Ireland",         color: "#9C6030", category: "Full Grain" },
  { id: "mocha-bridle",      name: "Mocha Bridle",      origin: "Provence, France",        color: "#6A3C1C", category: "Full Grain" },
  { id: "terracotta-suede",  name: "Terracotta Suede",  origin: "Rajasthan, India",        color: "#904030", category: "Suede"      },
  { id: "plum-patent",       name: "Plum Patent",       origin: "Milan, Italy",            color: "#4A2048", category: "Patent"     },
  { id: "slate-bridle",      name: "Slate Bridle",      origin: "Buenos Aires, Argentina", color: "#38404C", category: "Full Grain" },

  // ── Row 2 ────────────────────────────────────────────────────────
  { id: "parchment-calf",    name: "Parchment Calf",    origin: "Lyon, France",            color: "#DDD0B0", category: "Full Grain" },
  { id: "wheat-calf",        name: "Wheat Calf",        origin: "Tuscany, Italy",          color: "#C0A870", category: "Full Grain" },
  { id: "cognac-sella",      name: "Cognac Sella",      origin: "Córdoba, Spain",          color: "#B07838", category: "Full Grain" },
  { id: "hazelnut-calf",     name: "Hazelnut Calf",     origin: "Tuscany, Italy",          color: "#8C5830", category: "Full Grain" },
  { id: "mahogany-calf",     name: "Mahogany Calf",     origin: "Lagos, Nigeria",          color: "#60301A", category: "Full Grain" },
  { id: "brick-calf",        name: "Brick Calf",        origin: "Córdoba, Spain",          color: "#7C3028", category: "Full Grain" },
  { id: "midnight-navy",     name: "Midnight Navy",     origin: "Kyoto, Japan",            color: "#1A2848", category: "Full Grain" },
  { id: "storm-calf",        name: "Storm Calf",        origin: "Reykjavik, Iceland",      color: "#303848", category: "Full Grain" },

  // ── Row 3 ────────────────────────────────────────────────────────
  { id: "ivory-nappa",       name: "Ivory Nappa",       origin: "Milan, Italy",            color: "#D8C8A4", category: "Full Grain" },
  { id: "sahara-vachetta",   name: "Sahara Vachetta",   origin: "Rajasthan, India",        color: "#B89E64", category: "Full Grain" },
  { id: "amber-bridle",      name: "Amber Bridle",      origin: "Lancashire, England",     color: "#A07030", category: "Full Grain" },
  { id: "chestnut-bridle",   name: "Chestnut Bridle",   origin: "Lancashire, England",     color: "#7E4828", category: "Full Grain" },
  { id: "chocolate-nappa",   name: "Chocolate Nappa",   origin: "Milan, Italy",            color: "#542818", category: "Full Grain" },
  { id: "burgundy-nappa",    name: "Burgundy Nappa",    origin: "Lyon, France",            color: "#6C2030", category: "Full Grain" },
  { id: "forest-bridle",     name: "Forest Bridle",     origin: "Bavaria, Germany",        color: "#1E3828", category: "Full Grain" },
  { id: "graphite-nappa",    name: "Graphite Nappa",    origin: "Milan, Italy",            color: "#2C3038", category: "Full Grain" },

  // ── Row 4 ────────────────────────────────────────────────────────
  { id: "natural-bridle",    name: "Natural Bridle",    origin: "Lancashire, England",     color: "#D0BC94", category: "Full Grain" },
  { id: "honey-bridle",      name: "Honey Bridle",      origin: "Provence, France",        color: "#C49050", category: "Full Grain" },
  { id: "caramel-nappa",     name: "Caramel Nappa",     origin: "Bavaria, Germany",        color: "#985E20", category: "Full Grain" },
  { id: "walnut-vachetta",   name: "Walnut Vachetta",   origin: "Florence, Italy",         color: "#7E4828", category: "Full Grain" },
  { id: "espresso-calf",     name: "Espresso Calf",     origin: "Tuscany, Italy",          color: "#482014", category: "Full Grain" },
  { id: "oxblood-bridle",    name: "Oxblood Bridle",    origin: "Lancashire, England",     color: "#601828", category: "Full Grain" },
  { id: "olive-nubuck",      name: "Olive Nubuck",      origin: "Tuscany, Italy",          color: "#484830", category: "Nubuck"     },
  { id: "charcoal-nubuck",   name: "Charcoal Nubuck",   origin: "Lancashire, England",     color: "#242830", category: "Nubuck"     },

  // ── Row 5 (darkest of each column) ─────────────────────────────
  { id: "champagne-suede",   name: "Champagne Suede",   origin: "Córdoba, Spain",          color: "#CCBB88", category: "Suede"      },
  { id: "tuscan-caramel",    name: "Tuscan Caramel",    origin: "Florence, Italy",         color: "#BC8640", category: "Full Grain" },
  { id: "saddle-vachetta",   name: "Saddle Vachetta",   origin: "Córdoba, Spain",          color: "#8C5418", category: "Full Grain" },
  { id: "tobacco-calf",      name: "Tobacco Calf",      origin: "Buenos Aires, Argentina", color: "#744020", category: "Full Grain" },
  { id: "espresso-black",    name: "Espresso Black",    origin: "Florence, Italy",         color: "#1C1818", category: "Full Grain" },
  { id: "bordeaux-suede",    name: "Bordeaux Suede",    origin: "Provence, France",        color: "#501428", category: "Suede"      },
  { id: "hunter-calf",       name: "Hunter Calf",       origin: "Lancashire, England",     color: "#2A3C28", category: "Full Grain" },
  { id: "jet-patent",        name: "Jet Patent",        origin: "Kyoto, Japan",            color: "#100C0C", category: "Patent"     },
];

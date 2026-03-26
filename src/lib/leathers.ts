export interface Leather {
  id: string;
  name: string;
  origin: string;
  color: string;
  category: string;
}

// Arranged so the 8×5 grid reads as a cohesive palette:
// Row 1 — lights (bone → wheat)
// Row 2 — warm tans & caramels
// Row 3 — mid browns
// Row 4 — reds, burgundies, deep jewel tones
// Row 5 — darks (olive, slate, charcoal, black)
export const leathers: Leather[] = [
  // ── Row 1: Lights ──────────────────────────────────────────────
  { id: "bone-vachetta",     name: "Bone Vachetta",     origin: "Florence, Italy",          color: "#E8DBC8", category: "Full Grain" },
  { id: "parchment-calf",    name: "Parchment Calf",    origin: "Lyon, France",             color: "#DDD0B0", category: "Full Grain" },
  { id: "ivory-nappa",       name: "Ivory Nappa",       origin: "Milan, Italy",             color: "#D8C8A4", category: "Full Grain" },
  { id: "natural-bridle",    name: "Natural Bridle",    origin: "Lancashire, England",      color: "#D0BC94", category: "Full Grain" },
  { id: "champagne-suede",   name: "Champagne Suede",   origin: "Córdoba, Spain",           color: "#CCBB88", category: "Suede"      },
  { id: "linen-nubuck",      name: "Linen Nubuck",      origin: "Bavaria, Germany",         color: "#C8B47C", category: "Nubuck"     },
  { id: "wheat-calf",        name: "Wheat Calf",        origin: "Tuscany, Italy",           color: "#C0A870", category: "Full Grain" },
  { id: "sahara-vachetta",   name: "Sahara Vachetta",   origin: "Rajasthan, India",         color: "#B89E64", category: "Full Grain" },

  // ── Row 2: Warm Tans & Caramels ────────────────────────────────
  { id: "honey-bridle",      name: "Honey Bridle",      origin: "Provence, France",         color: "#C49050", category: "Full Grain" },
  { id: "tuscan-caramel",    name: "Tuscan Caramel",    origin: "Florence, Italy",          color: "#BC8640", category: "Full Grain" },
  { id: "butterscotch-calf", name: "Butterscotch Calf", origin: "Buenos Aires, Argentina",  color: "#B07C38", category: "Full Grain" },
  { id: "cognac-sella",      name: "Cognac Sella",      origin: "Córdoba, Spain",           color: "#A87230", category: "Full Grain" },
  { id: "amber-bridle",      name: "Amber Bridle",      origin: "Lancashire, England",      color: "#A06828", category: "Full Grain" },
  { id: "caramel-nappa",     name: "Caramel Nappa",     origin: "Bavaria, Germany",         color: "#985E20", category: "Full Grain" },
  { id: "saddle-vachetta",   name: "Saddle Vachetta",   origin: "Córdoba, Spain",           color: "#8C5418", category: "Full Grain" },
  { id: "whiskey-bridle",    name: "Whiskey Bridle",    origin: "Dublin, Ireland",          color: "#845018", category: "Full Grain" },

  // ── Row 3: Mid Browns ──────────────────────────────────────────
  { id: "hazelnut-calf",     name: "Hazelnut Calf",     origin: "Tuscany, Italy",           color: "#9C6038", category: "Full Grain" },
  { id: "chestnut-bridle",   name: "Chestnut Bridle",   origin: "Lancashire, England",      color: "#8C5430", category: "Full Grain" },
  { id: "walnut-vachetta",   name: "Walnut Vachetta",   origin: "Florence, Italy",          color: "#7E4828", category: "Full Grain" },
  { id: "tobacco-calf",      name: "Tobacco Calf",      origin: "Buenos Aires, Argentina",  color: "#744020", category: "Full Grain" },
  { id: "mocha-bridle",      name: "Mocha Bridle",      origin: "Provence, France",         color: "#6A3C1C", category: "Full Grain" },
  { id: "mahogany-calf",     name: "Mahogany Calf",     origin: "Lagos, Nigeria",           color: "#60301A", category: "Full Grain" },
  { id: "chocolate-nappa",   name: "Chocolate Nappa",   origin: "Milan, Italy",             color: "#542818", category: "Full Grain" },
  { id: "espresso-calf",     name: "Espresso Calf",     origin: "Tuscany, Italy",           color: "#482014", category: "Full Grain" },

  // ── Row 4: Reds, Burgundies, Jewel Tones ───────────────────────
  { id: "terracotta-suede",  name: "Terracotta Suede",  origin: "Rajasthan, India",         color: "#904030", category: "Suede"      },
  { id: "brick-calf",        name: "Brick Calf",        origin: "Córdoba, Spain",           color: "#7C3028", category: "Full Grain" },
  { id: "burgundy-nappa",    name: "Burgundy Nappa",    origin: "Lyon, France",             color: "#6C2030", category: "Full Grain" },
  { id: "oxblood-bridle",    name: "Oxblood Bridle",    origin: "Lancashire, England",      color: "#601828", category: "Full Grain" },
  { id: "bordeaux-suede",    name: "Bordeaux Suede",    origin: "Provence, France",         color: "#501428", category: "Suede"      },
  { id: "plum-patent",       name: "Plum Patent",       origin: "Milan, Italy",             color: "#3C1838", category: "Patent"     },
  { id: "midnight-navy",     name: "Midnight Navy",     origin: "Kyoto, Japan",             color: "#1A2848", category: "Full Grain" },
  { id: "forest-bridle",     name: "Forest Bridle",     origin: "Bavaria, Germany",         color: "#1E3828", category: "Full Grain" },

  // ── Row 5: Darks ───────────────────────────────────────────────
  { id: "olive-nubuck",      name: "Olive Nubuck",      origin: "Tuscany, Italy",           color: "#484830", category: "Nubuck"     },
  { id: "hunter-calf",       name: "Hunter Calf",       origin: "Lancashire, England",      color: "#2A3C28", category: "Full Grain" },
  { id: "slate-bridle",      name: "Slate Bridle",      origin: "Buenos Aires, Argentina",  color: "#38404C", category: "Full Grain" },
  { id: "storm-calf",        name: "Storm Calf",        origin: "Reykjavik, Iceland",       color: "#303848", category: "Full Grain" },
  { id: "graphite-nappa",    name: "Graphite Nappa",    origin: "Milan, Italy",             color: "#2C3038", category: "Full Grain" },
  { id: "charcoal-nubuck",   name: "Charcoal Nubuck",   origin: "Lancashire, England",      color: "#242830", category: "Nubuck"     },
  { id: "espresso-black",    name: "Espresso Black",    origin: "Florence, Italy",          color: "#1C1818", category: "Full Grain" },
  { id: "jet-patent",        name: "Jet Patent",        origin: "Kyoto, Japan",             color: "#100C0C", category: "Patent"     },
];

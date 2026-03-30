export type CollectionDrop = {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  year: number;
  description: string;
  longDescription: string;
  productCount: number;
  heroImage: string;
  current: boolean;
};

export const collections: CollectionDrop[] = [
  {
    id: "ss26",
    title: "The Art of Restraint",
    subtitle: "Spring/Summer 2026",
    season: "SS26",
    year: 2026,
    description: "Our debut collection. 31 pieces of exotic leather goods — each one handcrafted in Italy, designed to outlast everything.",
    longDescription: "The Art of Restraint is a meditation on quiet luxury. In an era of excess, we chose subtlety. Each piece in this collection begins with a single hide, selected over months for its natural beauty. The result is 31 unique works — belts, wallets, and accessories that carry the singular character of their materials. No two are alike. None ever will be.",
    productCount: 31,
    heroImage: "/images/shop/placeholder.jpg",
    current: true,
  },
  {
    id: "fw25",
    title: "First Light",
    subtitle: "Fall/Winter 2025",
    season: "FW25",
    year: 2025,
    description: "The collection that started it all. Himalayan crocodile meets Italian craftsmanship.",
    longDescription: "First Light was born from a single Himalayan crocodile hide — the rarest leather in the world. We spent eighteen months developing the techniques to work with it. The result was our signature buckle system and the beginning of everything.",
    productCount: 12,
    heroImage: "/images/shop/placeholder.jpg",
    current: false,
  },
  {
    id: "capsule-stingray",
    title: "Caviar",
    subtitle: "Capsule 2025",
    season: "Capsule",
    year: 2025,
    description: "A limited capsule exploring the extraordinary texture of caviar stingray leather.",
    longDescription: "Stingray leather is nature's armor — calcium-reinforced, virtually indestructible, and unlike anything else you'll touch. The Caviar capsule is our tribute to this material.",
    productCount: 6,
    heroImage: "/images/shop/placeholder.jpg",
    current: false,
  },
  {
    id: "archive-001",
    title: "Archive 001",
    subtitle: "The Beginning",
    season: "Archive",
    year: 2024,
    description: "Where it all started. The original prototypes and first production pieces.",
    longDescription: "Before Amal had a name, there were prototypes. Cut in a New York apartment, finished in a Florentine workshop. These are the pieces that proved the concept.",
    productCount: 8,
    heroImage: "/images/shop/placeholder.jpg",
    current: false,
  },
];

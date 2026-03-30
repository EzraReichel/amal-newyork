export type Article = {
  id: string;
  title: string;
  subtitle: string;
  category: "Craftsmanship" | "Culture" | "Materials" | "Behind the Scenes";
  date: string;
  readTime: string;
  excerpt: string;
  featured: boolean;
};

export const articles: Article[] = [
  {
    id: "art-of-restraint",
    title: "The Art of Restraint",
    subtitle: "Why true luxury whispers",
    category: "Culture",
    date: "March 2026",
    readTime: "6 min",
    excerpt: "In a world that screams for attention, Amal chooses to speak softly. A meditation on the philosophy of quiet luxury and why restraint is the ultimate expression of confidence.",
    featured: true,
  },
  {
    id: "himalayan-crocodile",
    title: "The Himalayan",
    subtitle: "Rarest of the rare",
    category: "Materials",
    date: "February 2026",
    readTime: "8 min",
    excerpt: "The Himalayan crocodile skin undergoes a process so meticulous that only a handful of tanneries in the world attempt it.",
    featured: true,
  },
  {
    id: "ss26-behind-scenes",
    title: "Making SS26",
    subtitle: "Behind the scenes of our debut",
    category: "Behind the Scenes",
    date: "January 2026",
    readTime: "5 min",
    excerpt: "Twelve months of sourcing, prototyping, and refining distilled into 31 pieces.",
    featured: false,
  },
  {
    id: "buckle-making",
    title: "The Buckle Maker",
    subtitle: "Portrait of an artisan",
    category: "Craftsmanship",
    date: "January 2026",
    readTime: "5 min",
    excerpt: "In a small workshop outside Florence, a third-generation metalworker hand-casts every Amal buckle using techniques unchanged for sixty years.",
    featured: false,
  },
  {
    id: "leather-grading",
    title: "Reading the Hide",
    subtitle: "How we grade our leathers",
    category: "Materials",
    date: "December 2025",
    readTime: "7 min",
    excerpt: "Not all exotic leather is equal. Our grading system evaluates symmetry, scale regularity, and natural markings.",
    featured: false,
  },
  {
    id: "new-york-roots",
    title: "A New York Story",
    subtitle: "The city that shaped the brand",
    category: "Culture",
    date: "November 2025",
    readTime: "4 min",
    excerpt: "Amal was born in the back of a West Village apartment.",
    featured: false,
  },
  {
    id: "behind-the-stitch",
    title: "Behind the Stitch",
    subtitle: "Inside our Italian atelier",
    category: "Behind the Scenes",
    date: "October 2025",
    readTime: "6 min",
    excerpt: "A day inside the workshop where every Amal piece comes to life.",
    featured: false,
  },
  {
    id: "stingray-deep-dive",
    title: "Caviar of the Sea",
    subtitle: "The stingray leather story",
    category: "Materials",
    date: "September 2025",
    readTime: "5 min",
    excerpt: "Stingray leather is nature's armor — calcium-reinforced and virtually indestructible.",
    featured: false,
  },
];

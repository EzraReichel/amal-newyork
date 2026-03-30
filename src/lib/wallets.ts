export type Wallet = {
  id: string;
  name: string;
  type: "Bifold" | "Card Holder" | "Travel Wallet";
  leather: string;
  color: string;
  price: number;
  inStock: boolean;
  imageClosed: string;
  imageOpen: string;
  description: string;
  features: string[];
  gradientFrom: string;
  gradientTo: string;
};

// Resting pile offsets — organic, not grid-like
export const PILE_OFFSETS: { x: number; y: number; rotate: number }[] = [
  { x: 0,    y: 0,   rotate: 0    },
  { x: 8,    y: -5,  rotate: 2    },
  { x: -12,  y: 3,   rotate: -3   },
  { x: 5,    y: -8,  rotate: 1.5  },
  { x: -6,   y: 6,   rotate: -1   },
  { x: 10,   y: 2,   rotate: 2.5  },
  { x: -3,   y: -4,  rotate: -2   },
  { x: 7,    y: 5,   rotate: 0.5  },
];

export const wallets: Wallet[] = [
  {
    id: "ostrich-bifold",
    name: "Ostrich Bifold",
    type: "Bifold",
    leather: "Ostrich",
    color: "Chocolate Brown",
    price: 325,
    inStock: true,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Full-grain ostrich leather bifold wallet.",
    features: ["8 Card Slots", "2 Bill Compartments", "2 Hidden Pockets"],
    gradientFrom: "#5C3D2E",
    gradientTo: "#3D2B1F",
  },
  {
    id: "croc-cardholder-black",
    name: "Crocodile Card Holder",
    type: "Card Holder",
    leather: "Crocodile",
    color: "Black",
    price: 350,
    inStock: true,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Slim crocodile leather card holder.",
    features: ["4 Card Slots", "Center Pocket", "Slim Profile"],
    gradientFrom: "#2A2A2A",
    gradientTo: "#1A1A1A",
  },
  {
    id: "himalayan-bifold",
    name: "Himalayan Bifold",
    type: "Bifold",
    leather: "Crocodile",
    color: "Himalayan White Grey",
    price: 895,
    inStock: true,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Himalayan crocodile bifold wallet — the rarest wallet in the collection.",
    features: ["8 Card Slots", "2 Bill Compartments", "Himalayan Gradient"],
    gradientFrom: "#D4CFC8",
    gradientTo: "#A89F95",
  },
  {
    id: "stingray-cardholder",
    name: "Stingray Card Holder",
    type: "Card Holder",
    leather: "Stingray",
    color: "Navy Caviar",
    price: 295,
    inStock: true,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Caviar stingray card holder. Nearly indestructible.",
    features: ["4 Card Slots", "Slim Profile", "Caviar Texture"],
    gradientFrom: "#1A2A4A",
    gradientTo: "#0D1829",
  },
  {
    id: "croc-travel-wallet",
    name: "Crocodile Travel Wallet",
    type: "Travel Wallet",
    leather: "Crocodile",
    color: "Cognac",
    price: 685,
    inStock: true,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Full-size crocodile travel wallet with passport slot.",
    features: ["Passport Slot", "6 Card Slots", "Boarding Pass Pocket", "Pen Loop"],
    gradientFrom: "#7A4A20",
    gradientTo: "#4A2A10",
  },
  {
    id: "ostrich-cardholder",
    name: "Ostrich Card Holder",
    type: "Card Holder",
    leather: "Ostrich",
    color: "Tan",
    price: 225,
    inStock: true,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Ostrich leather card holder with signature quill pattern.",
    features: ["4 Card Slots", "Center Pocket"],
    gradientFrom: "#A07840",
    gradientTo: "#6A4E28",
  },
  {
    id: "alligator-bifold",
    name: "Alligator Bifold",
    type: "Bifold",
    leather: "Alligator",
    color: "Nero",
    price: 750,
    inStock: false,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Italian alligator leather bifold.",
    features: ["8 Card Slots", "2 Bill Compartments", "Hand-Stitched Edge"],
    gradientFrom: "#1E1E1E",
    gradientTo: "#0A0A0A",
  },
  {
    id: "shark-cardholder",
    name: "Shark Card Holder",
    type: "Card Holder",
    leather: "Shark",
    color: "Slate Grey",
    price: 275,
    inStock: false,
    imageClosed: "/images/wallets/placeholder-closed.jpg",
    imageOpen: "/images/wallets/placeholder-open.jpg",
    description: "Shark skin card holder with unique natural grain.",
    features: ["3 Card Slots", "Money Clip"],
    gradientFrom: "#5A5A60",
    gradientTo: "#35353A",
  },
];

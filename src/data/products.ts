export type ProductCategory = 'belts' | 'wallets' | 'bags' | 'accessories';

export interface BeltProduct {
  id: string;
  name: string;
  slug: string;
  category: 'belts';
  price: number;
  color: string;
  sizes: string[];
  stock: 'in_stock' | 'sold_out';
  imageCoiled: string;
  imageUnrolled: string;
  leather: string;
}

export interface OtherProduct {
  id: string;
  name: string;
  slug: string;
  category: 'wallets' | 'bags' | 'accessories';
  price: number | null;
  color: string;
  sizes: string[];
  stock: 'in_stock' | 'sold_out';
  imagePrimary: string;
  imageHover: string;
  leather: string;
}

export type Product = BeltProduct | OtherProduct;

export const products: Product[] = [
  // ── BELTS ─────────────────────────────────────────────────────────────────
  {
    id: 'exotic-caviar-stingray-belt-strap-navy',
    name: 'Exotic Caviar Stingray Belt Strap — Navy',
    slug: 'exotic-caviar-stingray-belt-strap-navy',
    category: 'belts',
    price: 495,
    color: 'Navy',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/exotic-caviar-stingray-belt-strap-navy-coiled.jpg',
    imageUnrolled: '/images/products/belts/exotic-caviar-stingray-belt-strap-navy-unrolled.jpg',
    leather: 'Stingray',
  },
  {
    id: 'exotic-caviar-stingray-belt-strap-black',
    name: 'Exotic Caviar Stingray Belt Strap — Black',
    slug: 'exotic-caviar-stingray-belt-strap-black',
    category: 'belts',
    price: 495,
    color: 'Black',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/exotic-caviar-stingray-belt-strap-black-coiled.jpg',
    imageUnrolled: '/images/products/belts/exotic-caviar-stingray-belt-strap-black-unrolled.jpg',
    leather: 'Stingray',
  },
  {
    id: 'exotic-grey-crocodile-belt-strap',
    name: 'Exotic Grey Crocodile Belt Strap',
    slug: 'exotic-grey-crocodile-belt-strap',
    category: 'belts',
    price: 695,
    color: 'Grey',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/exotic-grey-crocodile-belt-strap-coiled.jpg',
    imageUnrolled: '/images/products/belts/exotic-grey-crocodile-belt-strap-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'calf-hair-animal-print-belt',
    name: 'Calf Hair Animal Print Belt',
    slug: 'calf-hair-animal-print-belt',
    category: 'belts',
    price: 295,
    color: 'Multi',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/calf-hair-animal-print-belt-coiled.jpg',
    imageUnrolled: '/images/products/belts/calf-hair-animal-print-belt-unrolled.jpg',
    leather: 'Calf Hair',
  },
  {
    id: 'exotic-caviar-stingray-belt-strap-charcoal',
    name: 'Exotic Caviar Stingray Belt Strap — Charcoal',
    slug: 'exotic-caviar-stingray-belt-strap-charcoal',
    category: 'belts',
    price: 495,
    color: 'Charcoal',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/exotic-caviar-stingray-belt-strap-charcoal-coiled.jpg',
    imageUnrolled: '/images/products/belts/exotic-caviar-stingray-belt-strap-charcoal-unrolled.jpg',
    leather: 'Stingray',
  },
  {
    id: 'leopard-calf-hair-belt-32',
    name: 'Leopard Calf Hair Belt — 32"',
    slug: 'leopard-calf-hair-belt-32',
    category: 'belts',
    price: 295,
    color: 'Leopard',
    sizes: ['32'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/leopard-calf-hair-belt-32-coiled.jpg',
    imageUnrolled: '/images/products/belts/leopard-calf-hair-belt-32-unrolled.jpg',
    leather: 'Calf Hair',
  },
  {
    id: 'leopard-calf-hair-belt-40',
    name: 'Leopard Calf Hair Belt — 40"',
    slug: 'leopard-calf-hair-belt-40',
    category: 'belts',
    price: 295,
    color: 'Leopard',
    sizes: ['40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/leopard-calf-hair-belt-40-coiled.jpg',
    imageUnrolled: '/images/products/belts/leopard-calf-hair-belt-40-unrolled.jpg',
    leather: 'Calf Hair',
  },
  {
    id: 'himalayan-croc-belt-100cm',
    name: 'Himalayan Crocodile Belt — 100cm',
    slug: 'himalayan-croc-belt-100cm',
    category: 'belts',
    price: 1950,
    color: 'Himalayan',
    sizes: ['100cm'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/himalayan-croc-belt-100cm-coiled.jpg',
    imageUnrolled: '/images/products/belts/himalayan-croc-belt-100cm-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'himalayan-croc-belt-110cm',
    name: 'Himalayan Crocodile Belt — 110cm',
    slug: 'himalayan-croc-belt-110cm',
    category: 'belts',
    price: 1950,
    color: 'Himalayan',
    sizes: ['110cm'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/himalayan-croc-belt-110cm-coiled.jpg',
    imageUnrolled: '/images/products/belts/himalayan-croc-belt-110cm-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'himalayan-croc-belt-95cm',
    name: 'Himalayan Crocodile Belt — 95cm',
    slug: 'himalayan-croc-belt-95cm',
    category: 'belts',
    price: 1950,
    color: 'Himalayan',
    sizes: ['95cm'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/himalayan-croc-belt-95cm-coiled.jpg',
    imageUnrolled: '/images/products/belts/himalayan-croc-belt-95cm-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'himalayan-croc-belt-115cm',
    name: 'Himalayan Crocodile Belt — 115cm',
    slug: 'himalayan-croc-belt-115cm',
    category: 'belts',
    price: 1950,
    color: 'Himalayan',
    sizes: ['115cm'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/himalayan-croc-belt-115cm-coiled.jpg',
    imageUnrolled: '/images/products/belts/himalayan-croc-belt-115cm-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'bone-croc-belt-black',
    name: 'Bone Crocodile Belt — Black',
    slug: 'bone-croc-belt-black',
    category: 'belts',
    price: 1450,
    color: 'Black',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/bone-croc-belt-black-coiled.jpg',
    imageUnrolled: '/images/products/belts/bone-croc-belt-black-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'bone-croc-belt-navy',
    name: 'Bone Crocodile Belt — Navy',
    slug: 'bone-croc-belt-navy',
    category: 'belts',
    price: 1450,
    color: 'Navy',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/bone-croc-belt-navy-coiled.jpg',
    imageUnrolled: '/images/products/belts/bone-croc-belt-navy-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'bone-croc-belt-taupe',
    name: 'Bone Crocodile Belt — Taupe',
    slug: 'bone-croc-belt-taupe',
    category: 'belts',
    price: 1450,
    color: 'Taupe',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/bone-croc-belt-taupe-coiled.jpg',
    imageUnrolled: '/images/products/belts/bone-croc-belt-taupe-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'bone-croc-belt-olive',
    name: 'Bone Crocodile Belt — Olive',
    slug: 'bone-croc-belt-olive',
    category: 'belts',
    price: 1450,
    color: 'Olive',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/bone-croc-belt-olive-coiled.jpg',
    imageUnrolled: '/images/products/belts/bone-croc-belt-olive-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'bone-croc-belt-purple',
    name: 'Bone Crocodile Belt — Purple',
    slug: 'bone-croc-belt-purple',
    category: 'belts',
    price: 1450,
    color: 'Purple',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/bone-croc-belt-purple-coiled.jpg',
    imageUnrolled: '/images/products/belts/bone-croc-belt-purple-unrolled.jpg',
    leather: 'Crocodile',
  },
  {
    id: 'exotic-croc-belt-strap-orange',
    name: 'Exotic Crocodile Belt Strap — Orange',
    slug: 'exotic-croc-belt-strap-orange',
    category: 'belts',
    price: 695,
    color: 'Orange',
    sizes: ['32', '34', '36', '38', '40'],
    stock: 'in_stock',
    imageCoiled: '/images/products/belts/exotic-croc-belt-strap-orange-coiled.jpg',
    imageUnrolled: '/images/products/belts/exotic-croc-belt-strap-orange-unrolled.jpg',
    leather: 'Crocodile',
  },

  // ── WALLETS ───────────────────────────────────────────────────────────────
  {
    id: 'ostrich-bifold-wallet',
    name: 'Ostrich Bifold Wallet',
    slug: 'ostrich-bifold-wallet',
    category: 'wallets',
    price: 395,
    color: 'Brown',
    sizes: [],
    stock: 'in_stock',
    imagePrimary: '/images/products/wallets/ostrich-bifold-wallet-primary.jpg',
    imageHover: '/images/products/wallets/ostrich-bifold-wallet-hover.jpg',
    leather: 'Ostrich',
  },

  // ── ACCESSORIES ───────────────────────────────────────────────────────────
  {
    id: 'blue-vintage-car-buckle',
    name: 'Blue Vintage Car Buckle',
    slug: 'blue-vintage-car-buckle',
    category: 'accessories',
    price: null,
    color: 'Blue',
    sizes: [],
    stock: 'in_stock',
    imagePrimary: '/images/products/accessories/blue-vintage-car-buckle-primary.jpg',
    imageHover: '/images/products/accessories/blue-vintage-car-buckle-hover.jpg',
    leather: 'Exotic Leather',
  },

  // ── BAGS ──────────────────────────────────────────────────────────────────
  {
    id: 'red-python-amy-bag',
    name: 'Red Python Amy Bag',
    slug: 'red-python-amy-bag',
    category: 'bags',
    price: 1850,
    color: 'Red',
    sizes: [],
    stock: 'in_stock',
    imagePrimary: '/images/products/bags/red-python-amy-bag-primary.jpg',
    imageHover: '/images/products/bags/red-python-amy-bag-hover.jpg',
    leather: 'Python',
  },
];

export const belts = products.filter((p): p is BeltProduct => p.category === 'belts');
export const wallets = products.filter(p => p.category === 'wallets');
export const bags = products.filter(p => p.category === 'bags');
export const accessories = products.filter(p => p.category === 'accessories');

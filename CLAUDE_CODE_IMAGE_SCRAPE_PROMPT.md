# ═══════════════════════════════════════════════════════════════
# AMAL NEW YORK — PRODUCT IMAGE SCRAPE + BELTS PAGE UPDATE
# ═══════════════════════════════════════════════════════════════
#
# PREREQUISITES:
#   - Place `amal_product_data.json` in the project root
#   - Run this prompt in Claude Code from the amal-newyork directory
#
# ═══════════════════════════════════════════════════════════════


## STEP 1: Download all product images

Read `amal_product_data.json` in the project root. This file contains every AMAL product from the YP Collective Shopify store with Shopify CDN image URLs.

Download every image URL in the JSON to local files. Organize them like this:

```
public/images/products/
  belts/
    {product-id}-coiled.jpg      ← the coiled/rolled belt shot
    {product-id}-unrolled.jpg    ← the flat/unrolled belt shot
  wallets/
    {product-id}-primary.jpg
    {product-id}-hover.jpg
  bags/
    {product-id}-primary.jpg
    {product-id}-hover.jpg
  accessories/
    {product-id}-primary.jpg
    {product-id}-hover.jpg
  hero/
    collection-hero.jpg
```

Use `curl` or `wget` to download. The URLs are Shopify CDN links with `&width=2000` for high resolution. Download them as-is.

For belt products, the JSON uses `image_coiled` and `image_unrolled` keys.
For non-belt products, the JSON uses `image_primary` and `image_hover` keys.

Use the product `id` field from the JSON as the filename prefix.

After downloading, verify all files exist and are valid JPEGs (not HTML error pages). Report any failures.


## STEP 2: Create a TypeScript product data module

Create `src/data/products.ts` that exports the complete product catalog as typed data:

```typescript
export type ProductCategory = 'belts' | 'wallets' | 'bags' | 'accessories';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number | null;
  color: string;
  sizes: string[];
  stock: 'in_stock' | 'sold_out';
  // For belts:
  imageCoiled?: string;    // path relative to /images/products/
  imageUnrolled?: string;
  // For non-belts:
  imagePrimary?: string;
  imageHover?: string;
  leather: string;  // Extract leather type from the product name (e.g., "Crocodile", "Stingray", "Ostrich", "Calf Hair", "Python")
}

export const products: Product[] = [
  // ... populate from the JSON, using LOCAL image paths (not CDN URLs)
  // e.g. imageCoiled: '/images/products/belts/bone-croc-belt-black-coiled.jpg'
];

export const belts = products.filter(p => p.category === 'belts');
export const wallets = products.filter(p => p.category === 'wallets');
export const bags = products.filter(p => p.category === 'bags');
export const accessories = products.filter(p => p.category === 'accessories');
```

Parse the leather type from the product name:
- "Crocodile" or "Himalayan Crocodile" → leather: "Crocodile"  
- "Stingray" or "Caviar Stingray" → leather: "Stingray"
- "Ostrich" → leather: "Ostrich"
- "Calf Hair" → leather: "Calf Hair"
- "Python" → leather: "Python"
- Otherwise → leather: "Exotic Leather"


## STEP 3: Update the Belts page

The current belts page (find it — it's likely at `src/app/belts/page.tsx` or similar) uses a Cover Flow interaction with colored rectangle placeholders.

Rewrite it with these requirements:

### Layout: Coiled belts floating in space
- **Remove all colored background rectangles/cards.** The belts should float on the page background with no card or container behind them.
- Each belt is displayed as its **coiled/rolled image** — the circular coiled shot is the default state.
- The coiled belt images should appear to float in space against the page's dark background (use the existing `amal.black` or `amal.charcoal` from the Tailwind config).
- The images need transparent or dark backgrounds. Since these are product shots on dark/neutral backgrounds from Shopify, they should blend naturally. If any have visible backgrounds that clash, use CSS `mix-blend-mode: lighten` or `multiply` to help them blend.

### Interaction: Scroll focus with image swap
- Keep the existing horizontal scroll / Cover Flow behavior where one belt is "focused" at a time.
- **Default state (unfocused):** Show the coiled belt image. Belt should be slightly scaled down and have reduced opacity (e.g., `opacity: 0.6`, `scale: 0.85`).
- **Focused state (center/active belt):** 
  - Smoothly transition from the coiled image to the **unrolled image** using a crossfade (opacity transition on both images, ~400ms).
  - Scale up to full size (`scale: 1`).
  - Full opacity.
  - Display the product info below/beside the belt:
    - Product name (heading font)
    - Leather type (muted, editorial font)
    - Price (accent color)
    - Available sizes
    - Color name
- **When a belt loses focus:** Crossfade back from unrolled to coiled image.

### Product info sidebar/overlay
- When a belt is focused, show a minimal product info panel. Position it either:
  - Fixed on the right side of the viewport (like the current storybook layout), OR
  - Directly below the focused belt image
- The info should animate in when the belt gains focus and out when it loses focus.
- Include a "View Details" or "Inquire" button styled with the accent color.

### Data source
- Import products from `src/data/products.ts` — use the `belts` export.
- Use the `imageCoiled` path for the default/unfocused state.
- Use the `imageUnrolled` path for the focused state.
- Display real product names, prices (formatted as `$X,XXX`), colors, sizes, and leather types.

### Animation
- Use GSAP for the scroll-based focus detection and transitions.
- The coiled-to-unrolled crossfade should feel smooth and intentional — not a hard swap.
- Add a subtle Ken Burns (slow zoom) effect on the focused belt image.


## STEP 4: Update other pages that reference products

Search the codebase for any other pages that display products (shop page, collections, homepage featured section, etc.). Update them to import from `src/data/products.ts` instead of using placeholder data. Replace any `placehold.co` URLs with the real local image paths.

For non-belt product displays (wallets, bags), use `imagePrimary` as default and `imageHover` on hover.


## STEP 5: Verify

Run `npm run dev` and confirm:
1. All product images load correctly (no broken images)
2. The belts page shows coiled belts floating on dark background with no colored rectangles
3. Scrolling to focus a belt crossfades from coiled to unrolled
4. Product names, prices, and details are correct per the JSON data
5. No TypeScript or build errors

Report what you built and flag any images that failed to download or had issues.

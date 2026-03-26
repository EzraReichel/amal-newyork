/**
 * Converts a hex color to its relative luminance (0–1) per WCAG 2.1.
 */
export function getLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Returns true if the color is light enough to warrant dark-colored text on top.
 */
export function isLightColor(hex: string): boolean {
  return getLuminance(hex) > 0.35;
}

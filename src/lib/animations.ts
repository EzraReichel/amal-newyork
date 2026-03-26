export const easings = {
  luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeOut: 'ease-out',
} as const;

export const durations = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
  verySlow: 1.2,
} as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    },
  },
};

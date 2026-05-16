export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  emphasized: [0.34, 1.56, 0.64, 1] as const
};

export const easeCSS = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  emphasized: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
};

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 1.2,
  cinematic: 1.8
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

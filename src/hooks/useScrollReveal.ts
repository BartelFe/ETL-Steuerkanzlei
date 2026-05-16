import { useEffect, useRef } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  stagger?: number;
  selector?: string;
  once?: boolean;
}

/**
 * Lightweight scroll-reveal. Adds `is-visible` to the container and to each
 * matched child (with a stagger). Disabled when prefers-reduced-motion is on.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  opts: Options = {}
) {
  const ref = useRef<T | null>(null);
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
    stagger = 80,
    selector = '[data-reveal]',
    once = true
  } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.classList.add('is-visible');
      el.querySelectorAll<HTMLElement>(selector).forEach((child) =>
        child.classList.add('is-visible')
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            const children = (entry.target as HTMLElement).querySelectorAll<HTMLElement>(selector);
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * stagger}ms`;
              child.classList.add('is-visible');
            });
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
            (entry.target as HTMLElement)
              .querySelectorAll<HTMLElement>(selector)
              .forEach((child) => child.classList.remove('is-visible'));
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, stagger, selector, once]);

  return ref;
}

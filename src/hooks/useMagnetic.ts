import { useEffect, useRef } from 'react';

interface Options {
  strength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(opts: Options = {}) {
  const { strength = 0.35, radius = 1.4 } = opts;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || touch) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    function tick() {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      if (el) {
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const r = Math.max(rect.width, rect.height) * radius;

      if (dist < r) {
        const k = strength * (1 - dist / r);
        target.x = dx * k;
        target.y = dy * k;
      } else {
        target.x = 0;
        target.y = 0;
      }
    }

    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      if (el) el.style.transform = '';
    };
  }, [strength, radius]);

  return ref;
}

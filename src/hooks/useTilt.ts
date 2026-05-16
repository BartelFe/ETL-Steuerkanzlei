import { useEffect, useRef } from 'react';

export function useTilt<T extends HTMLElement = HTMLElement>(max = 6) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || touch) return;

    let raf = 0;
    const t = { rx: 0, ry: 0 };
    const c = { rx: 0, ry: 0 };

    function tick() {
      c.rx += (t.rx - c.rx) * 0.12;
      c.ry += (t.ry - c.ry) * 0.12;
      if (el) {
        el.style.transform = `perspective(1000px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      t.ry = x * max;
      t.rx = -y * max;
    }

    function onLeave() {
      t.rx = 0;
      t.ry = 0;
    }

    raf = requestAnimationFrame(tick);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener('pointermove', onMove);
      el?.removeEventListener('pointerleave', onLeave);
    };
  }, [max]);

  return ref;
}

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || touch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');

    const m = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringP = { x: m.x, y: m.y };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    function tick() {
      ringP.x += (m.x - ringP.x) * 0.18;
      ringP.y += (m.y - ringP.y) * 0.18;
      scale += (targetScale - scale) * 0.18;
      if (dot) dot.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
      if (ring) ring.style.transform = `translate3d(${ringP.x}px, ${ringP.y}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      m.x = e.clientX;
      m.y = e.clientY;
    }

    function onOver(e: PointerEvent) {
      const t = e.target as HTMLElement | null;
      const hover = t?.closest('a, button, [data-cursor-hover]');
      targetScale = hover ? 1.8 : 1;
    }

    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}

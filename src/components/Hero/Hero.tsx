import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMagnetic } from '../../hooks/useMagnetic';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const magneticPrimary = useMagnetic<HTMLAnchorElement>({ strength: 0.4 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          '.hero-mega, .hero-die, .hero-fuer, .hero-bayern, .hero-sub, .hero-cta, .hero-caption, .hero-meta',
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', yPercent: 0 }
        );
        return;
      }

      gsap.set('.hero-mega', { clipPath: 'inset(100% 0 0 0)', opacity: 0 });
      gsap.set(['.hero-die', '.hero-fuer', '.hero-bayern'], { yPercent: 110, opacity: 0 });
      gsap.set('.hero-sub, .hero-cta, .hero-meta', { y: 30, opacity: 0 });
      gsap.set('.hero-caption', { opacity: 0, y: 12 });

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'expo.out' } });

      tl.to('.hero-caption', { opacity: 1, y: 0, duration: 0.8 })
        .to('.hero-mega', { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.6 }, '-=0.4')
        .to('.hero-die',    { yPercent: 0, opacity: 1, duration: 1.0 }, '-=1.2')
        .to('.hero-fuer',   { yPercent: 0, opacity: 1, duration: 1.0 }, '<+0.05')
        .to('.hero-bayern', { yPercent: 0, opacity: 1, duration: 1.0 }, '<+0.05')
        .to('.hero-sub',    { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
        .to('.hero-cta',    { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .to('.hero-meta',   { y: 0, opacity: 1, duration: 0.7 }, '-=0.4');
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="hero-section min-h-[100svh] pt-[120px] flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none hero-bg" aria-hidden>
        <div className="hero-bg-glow" />
        <div className="hero-bg-grain" />
      </div>

      <div className="container-x relative w-full">
        <div className="hero-caption caption mb-10 md:mb-16">
          <span className="text-accent">01</span>
          <span className="mx-2 opacity-60">—</span>
          <span>Sippl &amp; Huber</span>
        </div>

        <div className="hero-composition">
          <span className="hero-die">Die</span>
          <h1 className="hero-mega">Gesundheits&shy;kanzlei</h1>
          <div className="hero-lower">
            <span className="hero-fuer">für</span>
            <span className="hero-bayern">Bayern.</span>
          </div>
        </div>

        <div className="hero-foot grid grid-cols-12 gap-y-10 mt-16">
          <p className="hero-sub col-span-12 lg:col-span-6 text-lead text-text/85 font-light leading-relaxed max-w-[52ch] text-pretty">
            Spezialisierte Steuerberatung für Ärzte, Apotheker, Pflegedienste
            und Therapeuten — in Ingolstadt, Bad Endorf und weit darüber
            hinaus.
          </p>

          <div className="hero-cta col-span-12 lg:col-span-6 flex flex-wrap items-center gap-4 lg:justify-end">
            <a
              ref={magneticPrimary}
              href="#kontakt"
              className="btn btn-primary"
              data-cursor-hover
            >
              Erstgespräch vereinbaren
              <Arrow />
            </a>
            <a href="#manifest" className="btn btn-ghost" data-cursor-hover>
              Mehr erfahren
            </a>
          </div>

          <div className="hero-meta col-span-12 flex items-end justify-between pt-10 border-t border-border">
            <div className="caption">
              <span className="opacity-60">Standorte</span>
              <span className="mx-2 opacity-30">/</span>
              <span>Ingolstadt</span>
              <span className="mx-2 opacity-30">·</span>
              <span>Bad Endorf</span>
            </div>
            <div className="hidden md:flex caption items-center gap-2">
              <span className="opacity-60">Scroll</span>
              <span className="block h-px w-10 bg-accent/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

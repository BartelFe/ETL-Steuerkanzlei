import { useEffect, useRef, lazy, Suspense } from 'react';

const OrganicMesh = lazy(() =>
  import('./OrganicMesh').then((m) => ({ default: m.OrganicMesh }))
);

const headlineWords = ['Die', 'Gesundheits­kanzlei', 'für', 'Bayern.'];

export function Hero() {
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduced ? 0 : 1;

    const t = setTimeout(() => {
      captionRef.current?.classList.add('is-visible');
      wordsRef.current.forEach((w, i) => {
        setTimeout(() => w?.classList.add('is-visible'), reduced ? 0 : i * 110);
      });
      const headlineTime = reduced ? 0 : headlineWords.length * 110 + 480;
      setTimeout(() => subRef.current?.classList.add('is-visible'), headlineTime);
      setTimeout(() => ctaRef.current?.classList.add('is-visible'), headlineTime + (reduced ? 0 : 220));
    }, delay);

    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className="hero-section min-h-[100svh] pt-[120px] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hero-bg" aria-hidden>
        <div className="hero-bg-glow" />
        <div className="hero-bg-grain" />
      </div>

      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <Suspense fallback={null}>
          <OrganicMesh />
        </Suspense>
      </div>

      <div className="container-x relative grid grid-cols-12 gap-y-12 items-end">
        <div className="col-span-12 mb-8 md:mb-20">
          <div ref={captionRef} className="caption fade-in-up">
            <span className="text-accent">01</span>
            <span className="mx-2 opacity-60">—</span>
            <span>Sippl &amp; Huber</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-10">
          <h1 className="hero-headline text-balance">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="word-mask"
              >
                <span
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                  className="word"
                >
                  {word}
                  {i < headlineWords.length - 1 && i !== 1 ? ' ' : ''}
                  {i === 1 ? <br className="hidden md:block" /> : null}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-1 mt-10">
          <p
            ref={subRef}
            className="fade-in-up text-lead text-text/85 font-light leading-relaxed max-w-[58ch] text-pretty"
          >
            Spezialisierte Steuerberatung für Ärzte, Apotheker, Pflegedienste
            und Therapeuten — in Ingolstadt, Bad Endorf und weit darüber
            hinaus.
          </p>
        </div>

        <div className="col-span-12 mt-12 mb-6">
          <div ref={ctaRef} className="fade-in-up flex flex-wrap items-center gap-4">
            <a href="#kontakt" className="btn btn-primary">
              Erstgespräch vereinbaren
              <Arrow />
            </a>
            <a href="#manifest" className="btn btn-ghost">
              Mehr erfahren
            </a>
          </div>
        </div>

        <div className="col-span-12 flex items-end justify-between pt-10 border-t border-border">
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
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

export function Career() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 120 });

  return (
    <section id="karriere" className="relative">
      <div className="container-x" ref={ref}>
        <div className="rounded-3xl border border-border-strong bg-gradient-to-br from-surface to-surface-elevated px-6 md:px-16 py-16 md:py-24 relative overflow-hidden">
          <div
            className="absolute -right-32 -bottom-32 w-[420px] h-[420px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(201,169,97,0.18), transparent 65%)'
            }}
            aria-hidden
          />

          <div className="relative grid grid-cols-12 gap-y-10 lg:gap-x-12 items-start">
            <div className="col-span-12 lg:col-span-7">
              <SectionCaption number="08" label="Karriere" />
              <h2 data-reveal className="mt-6 text-balance">
                Wer Heilberufe versteht,
                <br />
                <span className="text-accent">bleibt nicht lange auf Stellensuche.</span>
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-8 lg:pt-4">
              <p data-reveal className="text-text/80 text-pretty leading-relaxed">
                Steuerfachangestellte, Bilanzbuchhalterinnen und
                Berufseinsteigerinnen finden bei uns das, was Standard-Kanzleien
                nicht bieten: echte Spezialisierung, klare Verantwortung und
                ein Team, das den eigenen Beruf ernst nimmt. Auch ohne dass
                das jeden Tag betont werden muss.
              </p>
              <div data-reveal>
                <a href="#" className="btn btn-ghost">
                  Offene Stellen ansehen
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

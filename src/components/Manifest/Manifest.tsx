import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

export function Manifest() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 140 });

  return (
    <section id="manifest" className="relative">
      <div className="container-x" ref={ref}>
        <div className="mb-16 md:mb-24">
          <SectionCaption number="02" label="Manifest" />
        </div>

        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start">
            <h2 data-reveal className="text-balance">
              Wir machen nicht alles.
              <br />
              <span className="text-accent">Wir machen eines richtig.</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-7 space-y-8 lg:space-y-10">
            <p data-reveal className="text-lead text-text/85 max-w-[58ch] text-pretty">
              In Deutschland gibt es über 100.000 Steuerberatungskanzleien. Die
              meisten bieten alles für jeden. Das geht selten gut.
            </p>
            <p data-reveal className="text-lead text-text/85 max-w-[58ch] text-pretty">
              Wir haben uns entschieden, eine einzige Branche wirklich zu
              verstehen: die Heilberufe. Praxen, Apotheken, Pflegedienste,
              Therapeuten. Drei Generationen Sippl &amp; Huber haben gelernt,
              wie die wirtschaftliche Realität in Ihren Berufen aussieht —
              jenseits der Lehrbücher.
            </p>
            <p data-reveal className="text-lead text-text/85 max-w-[58ch] text-pretty">
              Das macht uns nicht zur größten Kanzlei in Bayern. Aber zur
              richtigen für die, die wir betreuen.
            </p>

            <div data-reveal className="pt-6 mt-12 border-t border-border flex flex-wrap gap-x-12 gap-y-6">
              <Stat value="3" label="Generationen" />
              <Stat value="19" label="Spezialisten" />
              <Stat value="2" label="Standorte" />
              <Stat value="1" label="Branche" hl />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, hl }: { value: string; label: string; hl?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`font-display text-5xl md:text-6xl leading-none ${
          hl ? 'text-accent' : 'text-bone'
        }`}
        style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
      >
        {value}
      </span>
      <span className="caption mt-2">{label}</span>
    </div>
  );
}

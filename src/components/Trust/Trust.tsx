import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

export function Trust() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 120 });

  return (
    <section id="vertrauen" className="relative">
      <div className="absolute inset-0 bg-surface/40 pointer-events-none" aria-hidden />
      <div className="container-x relative" ref={ref}>
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <SectionCaption number="06" label="Vertrauen" />
            <h3 data-reveal className="mt-6 font-display leading-tight text-balance" style={{ fontSize: 'var(--size-h2)' }}>
              Verankert.
              <br />
              <span className="text-accent">Vernetzt.</span>
            </h3>
          </div>

          <div className="col-span-12 lg:col-span-7 space-y-10">
            <p data-reveal className="text-lead text-text/85 max-w-[58ch] text-pretty">
              Sippl &amp; Huber ist Mitglied der ETL-Qualitätskanzleien — dem
              größten Steuerberater-Netzwerk Deutschlands. Das gibt Ihnen
              Zugang zu über 1.500 spezialisierten Beratern aus Steuern,
              Recht, Wirtschaftsprüfung und Unternehmensberatung. Sie haben
              einen persönlichen Ansprechpartner. Wir haben das Netzwerk im
              Rücken.
            </p>

            <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border-strong border border-border-strong rounded-2xl overflow-hidden">
              <CredMark
                label="ETL Qualitätskanzlei"
                sub="Mitglied seit 2009"
              />
              <CredMark
                label="ETL ADVISION"
                sub="Branchenexpertise"
              />
              <CredMark
                label="StBK München"
                sub="Steuerberaterkammer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredMark({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="bg-bg px-6 py-8 flex flex-col gap-2">
      <span className="font-display text-xl leading-tight text-bone">
        {label}
      </span>
      <span className="caption">{sub}</span>
    </div>
  );
}

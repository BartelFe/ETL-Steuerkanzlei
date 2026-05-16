import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

const services = [
  {
    title: 'Steuerberatung & -gestaltung',
    body: 'Vom laufenden Mandat bis zur Praxisübertragung. Wir denken steuerliche Gestaltung von der Branchenrealität rückwärts, nicht vom Lehrbuch vorwärts.'
  },
  {
    title: 'Finanzbuchhaltung',
    body: 'Digital, fristgerecht, mit branchenspezifischen Kontenrahmen für Praxen, Apotheken und Pflegedienste.'
  },
  {
    title: 'Lohn- und Gehaltsabrechnung',
    body: 'Pflege-Mindestlohn, Bereitschaftsdienste, MVZ-Honorarüberverteilung. Themen, an denen Standard-Kanzleien scheitern.'
  },
  {
    title: 'Jahresabschluss & Bilanz',
    body: 'Mit allen Besonderheiten der Heilberufe: GoB für Apotheken, Bewertung von Vertragsarztsitzen, sektorenübergreifende Bewertungen.'
  },
  {
    title: 'Wirtschaftliche Beratung',
    body: 'Was kostet ein zweiter Standort? Lohnt sich das MVZ? Wir rechnen das nicht nur, wir verstehen das Geschäftsmodell dahinter.'
  },
  {
    title: 'Praxis- und Apothekenverkauf',
    body: 'Bewertung, steueroptimale Strukturierung, Nachfolgeplanung. Der wichtigste Tag im Berufsleben — da reicht kein Generalist.'
  }
];

export function Services() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 90 });

  return (
    <section id="leistungen" className="relative">
      <div className="container-x" ref={ref}>
        <div className="mb-12">
          <SectionCaption number="04" label="Leistungen" />
        </div>

        <div className="hairline mb-16" data-reveal />

        <div className="grid grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-7">
            <h2 data-reveal className="text-balance">
              Steuerberatung,
              <br />
              Buchhaltung,
              <br />
              <span className="text-accent">Strategie.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right md:self-end">
            <p data-reveal className="text-text/70 max-w-[34ch] md:ml-auto">
              Die klassischen Felder — mit der Tiefe, die nur eine
              Spezialisierung ermöglicht.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <article key={i} data-reveal className="card flex flex-col gap-4">
              <div className="card-glow" />
              <div className="flex items-baseline justify-between">
                <span className="caption text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                <span className="block h-px w-12 bg-border-strong" />
              </div>
              <h3 className="font-display text-h3 leading-tight text-pretty">
                {s.title}
              </h3>
              <p className="text-text/70 leading-relaxed text-pretty">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

const audiences = [
  {
    icon: <IconOrganic />,
    title: 'Ärztinnen & Ärzte',
    body: 'Von der Einzelpraxis über Berufsausübungsgemeinschaften bis zur MVZ-Struktur. Wir kennen die Honorarverteilung im KV-System, die steuerlichen Fallstricke bei Praxisübergaben und die Frage, wann ein MVZ wirtschaftlich Sinn ergibt.'
  },
  {
    icon: <IconFlask />,
    title: 'Apothekerinnen & Apotheker',
    body: 'Inhabergeführte Apotheken, Filialverbünde, der Übergang zur E-Rezept-Realität. Apotheken-BWA ist kein Standard-BWA — wir behandeln sie auch nicht so.'
  },
  {
    icon: <IconHands />,
    title: 'Pflegedienste & Heimbetreiber',
    body: 'Ambulante und stationäre Pflege. Investitions- und Personalkostenstrukturen, die spezifischer sind als jede andere Branche im Mittelstand. Wir kennen die Kassen-Mechanik.'
  },
  {
    icon: <IconWave />,
    title: 'Therapeuten & Heilmittelerbringer',
    body: 'Physiotherapie, Ergotherapie, Logopädie. Praxen die schnell wachsen, aber kaum jemand begleitet sie steuerlich richtig. Wir tun es.'
  }
];

export function Audiences() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 120 });

  return (
    <section id="zielgruppen" className="relative">
      <div className="container-x" ref={ref}>
        <div className="grid grid-cols-12 items-end gap-y-12 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-7">
            <SectionCaption number="03" label="Zielgruppen" />
            <h2 data-reveal className="mt-6 text-balance">
              Vier Berufe.
              <br />
              <span className="text-accent">Eine Sprache.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <p data-reveal className="text-text/70 max-w-[42ch] md:ml-auto">
              Spezialisierung heißt: Wir müssen nicht erklärt bekommen, wie Ihr
              Geschäft funktioniert.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {audiences.map((a, i) => (
            <article key={i} data-reveal className="card flex flex-col gap-6">
              <div className="card-glow" />
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-bg/50 border border-border-strong text-accent">
                  {a.icon}
                </div>
                <span className="caption">0{i + 1}</span>
              </div>
              <h3 className="text-balance">{a.title}</h3>
              <p className="text-text/75 leading-relaxed text-pretty">{a.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconOrganic() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 4c4 0 7 3 7 7s-3 7-7 7-7-3-7-7c0-2 1-4 3-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="14" cy="11" r="2.2" fill="currentColor" opacity="0.7" />
      <path d="M14 18v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconFlask() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M10 4h8M12 4v6L7 22a2 2 0 0 0 1.8 2.8h10.4A2 2 0 0 0 21 22l-5-12V4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="18" r="1.2" fill="currentColor" opacity="0.7" />
      <circle cx="17" cy="20" r="0.8" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconHands() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M4 16c2-3 4-4 6-4M24 16c-2-3-4-4-6-4M9 12V6M19 12V6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M11 16c0 3 1 6 3 6s3-3 3-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWave() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M3 14c2 0 3-4 5-4s3 8 5 8 3-12 5-12 3 8 5 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

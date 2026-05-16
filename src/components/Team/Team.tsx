import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

const team = [
  { name: 'Sippl', role: 'Diplom-Kaufmann, Steuerberater' },
  { name: 'Huber', role: 'Diplom-Ökonomin, Steuerberaterin' },
  { name: 'Daibel', role: 'M.Sc., Steuerberaterin' }
];

export function Team() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 140 });

  return (
    <section id="menschen" className="relative">
      <div className="container-x" ref={ref}>
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 mb-16 md:mb-20">
          <div className="col-span-12 lg:col-span-6">
            <SectionCaption number="07" label="Menschen" />
            <h2 data-reveal className="mt-6 text-balance">
              Drei Steuerberater.
              <br />
              Sechzehn Spezialistinnen.
              <br />
              <span className="text-accent">Ein gemeinsames Ziel.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:self-end">
            <p data-reveal className="text-text/75 max-w-[42ch] text-pretty">
              Wir glauben, dass Beratung nur funktioniert, wenn sie persönlich
              ist. Deshalb haben Sie bei uns einen festen Ansprechpartner —
              nicht eine Hotline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {team.map((m, i) => (
            <article key={m.name} data-reveal className="flex flex-col gap-5">
              <div className="silhouette">
                <Silhouette variant={i} />
              </div>
              <div>
                <h3 className="font-display text-2xl mb-1">{m.name}</h3>
                <span className="caption">{m.role}</span>
                <p className="mt-3 text-text-muted italic text-sm">
                  [Bio in finaler Version]
                </p>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-12 caption italic text-text-muted max-w-[60ch] text-pretty">
          In der finalen Website mit echten Fotos und Geschichten der
          Kanzleiführung. Wir würden die Aufnahmen gerne gemeinsam mit Ihnen
          planen.
        </p>
      </div>
    </section>
  );
}

function Silhouette({ variant }: { variant: number }) {
  const cx = 50;
  const headR = 14;
  const shoulderY = 78;
  const shoulderW = variant === 1 ? 40 : variant === 2 ? 36 : 38;

  return (
    <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`g${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(244,239,230,0.18)" />
          <stop offset="100%" stopColor="rgba(201,169,97,0.10)" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={40} r={headR} fill={`url(#g${variant})`} />
      <path
        d={`M ${cx - shoulderW} 130 C ${cx - shoulderW} ${shoulderY + 6}, ${cx - 14} ${shoulderY - 2}, ${cx} ${shoulderY - 2} C ${cx + 14} ${shoulderY - 2}, ${cx + shoulderW} ${shoulderY + 6}, ${cx + shoulderW} 130 Z`}
        fill={`url(#g${variant})`}
      />
    </svg>
  );
}

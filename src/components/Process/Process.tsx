import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

const steps = [
  {
    n: '01',
    title: 'Erstgespräch',
    body: '60 Minuten, kostenfrei, unverbindlich. Wir hören zu, bevor wir reden.'
  },
  {
    n: '02',
    title: 'Bestandsaufnahme',
    body: 'Wir schauen in Ihre Zahlen und Verträge — und sagen Ihnen, was wir sehen. Ehrlich, auch wenn es unbequem ist.'
  },
  {
    n: '03',
    title: 'Strategie',
    body: 'Wir entwickeln einen Plan: was sofort, was mittelfristig, was zur Nachfolge. Schriftlich, nachvollziehbar.'
  },
  {
    n: '04',
    title: 'Begleitung',
    body: 'Wir setzen um. Mit persönlichem Ansprechpartner. Ohne, dass Sie alle drei Monate erklären müssen, was Sie tun.'
  }
];

export function Process() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 180 });

  return (
    <section id="ansatz" className="relative bg-bg">
      <div className="container-x" ref={ref}>
        <div className="grid grid-cols-12 gap-y-10 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-6">
            <SectionCaption number="05" label="Ansatz" />
            <h2 data-reveal className="mt-6 text-balance">
              Vier Schritte.
              <br />
              <span className="text-accent">Kein Korsett.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:self-end">
            <p data-reveal className="text-text/70 max-w-[36ch]">
              Wir folgen einer klaren Reihenfolge. Nicht weil wir Schablonen
              mögen, sondern weil sie Ihnen Zeit spart.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="process-spine" />

          <ol className="relative space-y-20 md:space-y-32">
            {steps.map((s, i) => (
              <li
                key={s.n}
                data-reveal
                className={`relative grid grid-cols-12 gap-y-6 items-start ${
                  i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
                }`}
              >
                <div
                  className={`col-span-12 md:col-span-5 ${
                    i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12 md:col-start-8'
                  }`}
                >
                  <span className="step-number block">{s.n}</span>
                </div>

                <div className="hidden md:block md:col-span-2 md:col-start-6 relative">
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />
                </div>
                <span className="md:hidden absolute left-5 top-3 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />

                <div
                  className={`col-span-12 pl-10 md:pl-0 md:col-span-5 ${
                    i % 2 === 0 ? 'md:col-start-8' : 'md:col-start-1 md:pr-12 md:text-right'
                  }`}
                >
                  <h3 className="font-display text-h3 mb-3 text-balance">{s.title}</h3>
                  <p className="text-text/75 max-w-[38ch] leading-relaxed text-pretty">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

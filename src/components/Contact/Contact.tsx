import { useState, lazy, Suspense, type FormEvent } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionCaption } from '../Layout/SectionCaption';

const BavariaMap = lazy(() =>
  import('./BavariaMap').then((m) => ({ default: m.BavariaMap }))
);

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 100 });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!(data.get('name') as string)?.trim()) next.name = 'Bitte Namen eingeben.';
    const email = (data.get('email') as string)?.trim();
    if (!email) next.email = 'Bitte E-Mail eingeben.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'E-Mail-Format prüfen.';
    if (!(data.get('message') as string)?.trim()) next.message = 'Bitte eine kurze Nachricht hinterlassen.';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
    }
  }

  return (
    <section id="kontakt" className="relative">
      <div className="container-x" ref={ref}>
        <div className="mb-16 md:mb-20">
          <SectionCaption number="09" label="Kontakt" />
          <h2 data-reveal className="mt-6 text-balance">
            Lassen Sie uns reden.
          </h2>
          <p data-reveal className="mt-6 text-lead text-text/80 max-w-[48ch] text-pretty">
            Erstgespräch in der Kanzlei, am Telefon oder per Video — Sie
            entscheiden.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-y-16 lg:gap-x-16">
          <div className="col-span-12 lg:col-span-6 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <LocationCard
                title="Ingolstadt"
                lines={[
                  'Theodor-Heuss-Straße 51–53',
                  '85055 Ingolstadt',
                  '+49 841 93340'
                ]}
              />
              <LocationCard
                title="Bad Endorf"
                lines={[
                  'Farmerland 1',
                  '83093 Bad Endorf',
                  '+49 8053 2740'
                ]}
              />
            </div>

            <div data-reveal className="caption text-text-muted">
              Mo–Do 9–16 Uhr
              <span className="dot-divider" />
              Fr 9–12 Uhr
              <span className="dot-divider" />
              Termine nach Vereinbarung
            </div>

            {sent ? (
              <div
                className="border border-accent rounded-2xl p-8 flex flex-col gap-4"
                role="status"
                aria-live="polite"
              >
                <span className="caption text-accent">Eingegangen</span>
                <h3 className="font-display text-3xl text-bone">Danke, wir melden uns.</h3>
                <p className="text-text/70">
                  In der Regel innerhalb eines Werktages. Bei dringenden Fällen
                  erreichen Sie uns telefonisch.
                </p>
              </div>
            ) : (
              <form data-reveal onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" />
                    {errors.name && <span className="text-accent text-sm">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="email">E-Mail</label>
                    <input id="email" name="email" type="email" autoComplete="email" />
                    {errors.email && <span className="text-accent text-sm">{errors.email}</span>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="phone">Telefon (optional)</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="message">Kurze Nachricht</label>
                  <textarea id="message" name="message" rows={3} />
                  {errors.message && <span className="text-accent text-sm">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">
                  Anfrage senden
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div data-reveal>
              <Suspense fallback={<div className="map-frame" aria-hidden />}>
                <BavariaMap />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div data-reveal className="card flex flex-col gap-4">
      <div className="card-glow" />
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl">{title}</h3>
        <span className="block h-px w-10 bg-accent/60" />
      </div>
      <address className="not-italic font-mono text-sm leading-relaxed text-text/80 space-y-0.5">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </address>
    </div>
  );
}

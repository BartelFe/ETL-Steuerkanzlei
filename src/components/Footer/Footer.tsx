export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="container-x py-16 md:py-24">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 mb-16">
          <div className="col-span-12 lg:col-span-4">
            <a href="#top" className="inline-flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
                <path
                  d="M2 11 C 5 5, 8 5, 11 11 S 17 17, 20 11"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-display text-3xl leading-none">
                Sippl <span className="text-text-muted">&amp;</span> Huber
              </span>
            </a>
            <p className="mt-4 text-text-muted max-w-[34ch]">
              Die Gesundheitskanzlei für Bayern. Spezialisierte Steuerberatung
              für Heilberufe.
            </p>
          </div>

          <div className="col-span-6 lg:col-span-3">
            <span className="caption text-accent">Navigation</span>
            <ul className="mt-4 space-y-2">
              {[
                ['#leistungen', 'Leistungen'],
                ['#manifest', 'Kanzlei'],
                ['#karriere', 'Karriere'],
                ['#kontakt', 'Kontakt']
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-text/80 hover:text-accent transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-3">
            <span className="caption text-accent">Standorte</span>
            <ul className="mt-4 space-y-2 text-text/80 font-mono text-sm">
              <li>Ingolstadt</li>
              <li>Bad Endorf</li>
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-2">
            <span className="caption text-accent">Netzwerk</span>
            <p className="mt-4 text-text-muted text-sm">
              Mitglied der ETL-Qualitätskanzleien.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6">
          <div className="caption text-text-muted">
            © 2026 ETL Sippl, Huber &amp; Kollegen GmbH
          </div>
          <div className="flex flex-wrap gap-6 caption text-text-muted">
            <a href="#" className="hover:text-accent">Impressum</a>
            <a href="#" className="hover:text-accent">Datenschutz</a>
            <a href="#" className="hover:text-accent">Barrierefreiheit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';

const links = [
  { href: '#manifest', label: 'Kanzlei' },
  { href: '#leistungen', label: 'Leistungen' },
  { href: '#ansatz', label: 'Ansatz' },
  { href: '#karriere', label: 'Karriere' },
  { href: '#kontakt', label: 'Kontakt' }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500 ${
        scrolled
          ? 'backdrop-blur-md bg-bg/70 border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between h-[68px]">
        <a href="#top" className="flex items-center gap-3 group">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M2 11 C 5 5, 8 5, 11 11 S 17 17, 20 11"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-display text-lg leading-none tracking-tightish">
            Sippl <span className="text-text-muted">&amp;</span> Huber
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.78rem] uppercase tracking-widish text-text/70 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#kontakt" className="hidden md:inline-flex btn btn-primary !py-2 !px-4 !text-[0.72rem]">
          Erstgespräch
        </a>

        <button
          aria-label="Menü"
          aria-expanded={open}
          className="md:hidden inline-flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block h-px w-6 bg-bone transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-bone transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-bone transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">
          <div className="container-x py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-sm uppercase tracking-widish text-text/80"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)} className="btn btn-primary self-start mt-2">
              Erstgespräch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

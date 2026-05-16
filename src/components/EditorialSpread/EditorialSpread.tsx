import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTilt } from '../../hooks/useTilt';

gsap.registerPlugin(ScrollTrigger);

const QUOTE_LINE_1 = ['Eine', 'Branche', 'zu', 'verstehen', 'heißt', 'nicht,'];
const QUOTE_LINE_2 = ['sie', 'zu', 'kennen.'];
const QUOTE_LINE_3 = ['Es', 'heißt,', 'sie', 'zu', 'hören,'];
const QUOTE_LINE_4 = ['bevor', 'sie', 'spricht.'];

export function EditorialSpread() {
  const ref = useRef<HTMLElement>(null);
  const tiltRef = useTilt<HTMLElement>(5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.editorial-word', { yPercent: 0, opacity: 1 });
        gsap.set('.editorial-attribution', { x: 0, opacity: 1 });
        return;
      }

      const words = el.querySelectorAll<HTMLElement>('.editorial-word');

      gsap.from(words, {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 65%',
          end: 'top 25%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.editorial-image-inner', {
        scale: 1.18,
        duration: 2.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2
        }
      });

      gsap.from('.editorial-attribution', {
        x: -24,
        opacity: 0,
        duration: 1.0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="editorial-spread"
      className="editorial-spread"
      aria-label="Intermezzo"
    >
      <div className="editorial-grid">
        <div className="editorial-text">
          <span className="caption editorial-caption">— Intermezzo</span>

          <blockquote className="editorial-quote">
            <Line words={QUOTE_LINE_1} />
            <br />
            <Line words={QUOTE_LINE_2} />
            <br />
            <Line words={QUOTE_LINE_3} />
            <br />
            <Line words={QUOTE_LINE_4} accent />
          </blockquote>

          <cite className="editorial-attribution">
            <span className="block-line" />
            <span>Aus dem Selbstverständnis von Sippl &amp; Huber</span>
          </cite>
        </div>

        <figure ref={tiltRef} className="editorial-image-frame">
          <div className="editorial-image-inner">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"
              alt=""
              loading="lazy"
            />
          </div>
          <figcaption className="editorial-figcaption">
            Eine Praxis ist kein Unternehmen wie jedes andere. Ihre
            Buchhaltung sollte das wissen.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Line({ words, accent }: { words: string[]; accent?: boolean }) {
  return (
    <span className={accent ? 'editorial-line is-accent' : 'editorial-line'}>
      {words.map((w, i) => (
        <span key={i} className="editorial-word-mask">
          <span className="editorial-word">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

import { lazy, Suspense } from 'react';
import { useLenis } from './hooks/useLenis';
import { Nav } from './components/Layout/Nav';
import { Hero } from './components/Hero/Hero';
import { Manifest } from './components/Manifest/Manifest';
import { Audiences } from './components/Audiences/Audiences';
import { Services } from './components/Services/Services';
import { Process } from './components/Process/Process';
import { Trust } from './components/Trust/Trust';
import { Team } from './components/Team/Team';
import { Career } from './components/Career/Career';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

const PulsLine = lazy(() =>
  import('./components/Hero/PulsLine').then((m) => ({ default: m.PulsLine }))
);

function App() {
  useLenis();

  return (
    <>
      <Nav />
      <Suspense fallback={null}>
        <PulsLine />
      </Suspense>
      <main>
        <Hero />
        <Manifest />
        <Audiences />
        <Services />
        <Process />
        <Trust />
        <Team />
        <Career />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

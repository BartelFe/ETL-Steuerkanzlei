import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const SEGMENTS = 220;
const TUBE_RADIUS = 0.018;

type ShapeFn = (i: number, n: number, t: number) => number;

const shapes: ShapeFn[] = [
  (i, n, t) => Math.sin((i / n) * Math.PI * 2 + t * 0.5) * 0.45,
  (i, n) => (i === Math.floor(n / 2) ? 1.2 : Math.sin((i / n) * 6) * 0.08),
  (i, n, t) => Math.sin((i / n) * 4 + t * 0.6) * 0.5 + Math.cos((i / n) * 8) * 0.08,
  (i, n, t) =>
    Math.sin((i / n) * 3) * 0.6 - Math.exp(-Math.pow(((i / n) - 0.5) * 4, 2)) * 0.4 + Math.sin(t) * 0.05,
  (i, n) =>
    0.5 * Math.sin((i / n) * 12) +
    (i % 18 === 0 ? 0.6 : 0) -
    (i % 24 === 0 ? 0.4 : 0),
  (i, n, t) => Math.sin((i / n) * Math.PI * 2 + t * 0.3) * 0.3
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getShapeValue(i: number, t: number, progress: number): number {
  const total = shapes.length - 1;
  const scaled = progress * total;
  const idx = Math.floor(scaled);
  const blend = scaled - idx;
  const a = shapes[Math.min(idx, total)](i, SEGMENTS, t);
  const b = shapes[Math.min(idx + 1, total)](i, SEGMENTS, t);
  return lerp(a, b, blend);
}

function Tube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      targetRef.current = Math.min(1, Math.max(0, p));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      points.push(new THREE.Vector3((i / SEGMENTS) * 14 - 7, 0, 0));
    }
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.3);
  }, []);

  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, SEGMENTS, TUBE_RADIUS, 8, false),
    [curve]
  );

  const tStart = useRef(performance.now());

  useFrame(() => {
    progressRef.current = lerp(progressRef.current, targetRef.current, 0.08);
    const t = (performance.now() - tStart.current) / 1000;
    const points = curve.points;
    for (let i = 0; i < points.length; i++) {
      points[i].y = getShapeValue(i, t, progressRef.current);
    }
    curve.updateArcLengths?.();
    const newGeo = new THREE.TubeGeometry(curve, SEGMENTS, TUBE_RADIUS, 8, false);
    if (meshRef.current) {
      const old = meshRef.current.geometry;
      meshRef.current.geometry = newGeo;
      old.dispose();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshBasicMaterial color="#C9A961" transparent opacity={0.85} />
    </mesh>
  );
}

export function PulsLine() {
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches;

  if (isMobile) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-10 hidden md:block"
      style={{ mixBlendMode: 'screen' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Tube />
      </Canvas>
    </div>
  );
}

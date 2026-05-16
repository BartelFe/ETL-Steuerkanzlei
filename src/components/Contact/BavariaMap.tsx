import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

const BAVARIA_OUTLINE: [number, number][] = [
  [0.32, 0.05], [0.42, 0.02], [0.55, 0.04], [0.66, 0.08], [0.72, 0.14],
  [0.78, 0.22], [0.84, 0.30], [0.88, 0.40], [0.92, 0.50], [0.95, 0.60],
  [0.94, 0.70], [0.90, 0.78], [0.84, 0.86], [0.74, 0.93], [0.62, 0.96],
  [0.50, 0.97], [0.38, 0.95], [0.28, 0.92], [0.20, 0.86], [0.14, 0.78],
  [0.10, 0.68], [0.08, 0.56], [0.10, 0.44], [0.14, 0.32], [0.20, 0.22],
  [0.24, 0.14], [0.28, 0.08]
];

function pointInPoly(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function BavariaShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { geometry, baseY } = useMemo(() => {
    const seg = 36;
    const geo = new THREE.PlaneGeometry(3, 3.3, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const base = new Float32Array(pos.count);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const nx = (x + 1.5) / 3;
      const ny = 1 - (z + 1.65) / 3.3;
      const inside = pointInPoly(nx, ny, BAVARIA_OUTLINE);
      base[i] = inside ? 0 : -0.8;
      pos.setY(i, base[i]);
    }
    geo.computeVertexNormals();
    return { geometry: geo, baseY: base };
  }, []);

  const wireGeo = useMemo(() => {
    return new THREE.WireframeGeometry(geometry);
  }, [geometry]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const wave = Math.sin(x * 1.6 + t * 0.8) * 0.04 + Math.cos(z * 1.8 + t * 0.6) * 0.04;
      pos.setY(i, baseY[i] + (baseY[i] === 0 ? wave : 0));
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <group rotation={[-0.25, 0, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#1A3A2E"
          roughness={0.9}
          metalness={0.0}
          flatShading
          transparent
          opacity={0.6}
        />
      </mesh>
      <lineSegments ref={linesRef} geometry={wireGeo}>
        <lineBasicMaterial color="#F4EFE6" transparent opacity={0.18} />
      </lineSegments>

      {/* Ingolstadt marker — north */}
      <Marker position={[-0.45, 0.18, -0.85]} delay={0} />
      {/* Bad Endorf marker — south-east */}
      <Marker position={[0.55, 0.18, 0.75]} delay={1} />
    </group>
  );
}

function Marker({ position, delay }: { position: [number, number, number]; delay: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + delay;
    const pulse = 1 + Math.sin(t * 1.8) * 0.25;
    if (sphereRef.current) sphereRef.current.scale.setScalar(pulse);
    if (ringRef.current) {
      const expand = (t * 0.6) % 1;
      ringRef.current.scale.setScalar(0.05 + expand * 0.5);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - expand) * 0.6;
    }
  });

  return (
    <group position={position}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#C9A961" />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#C9A961" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function BavariaMap() {
  return (
    <div className="map-frame">
      <Canvas
        camera={{ position: [0, 2.2, 2.6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#F4EFE6" />
        <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#C9A961" />
        <Suspense fallback={null}>
          <BavariaShape />
        </Suspense>
      </Canvas>

      {/* Overlay labels */}
      <div className="absolute top-6 left-6 caption text-text-muted">
        <span className="text-accent">●</span> Standorte
      </div>
      <div className="absolute bottom-6 right-6 text-right">
        <div className="caption text-text-muted">Bayern</div>
        <div className="font-display text-2xl text-bone">N 48° / E 11°</div>
      </div>
    </div>
  );
}

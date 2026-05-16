import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import type { Mesh } from 'three';

function Blob() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.02;
  });

  return (
    <Icosahedron ref={ref} args={[1.6, 4]} position={[2.6, 0.4, 0]}>
      <MeshDistortMaterial
        color="#C9A961"
        attach="material"
        distort={0.35}
        speed={0.6}
        roughness={0.4}
        metalness={0.0}
        transparent
        opacity={0.28}
      />
    </Icosahedron>
  );
}

export function OrganicMesh() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#F4EFE6" />
      <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#2A5145" />
      <Suspense fallback={null}>
        <Blob />
      </Suspense>
    </Canvas>
  );
}

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

const SEGMENTS = 256;

function Ribbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(SEGMENTS * 2 * 3);
    const aT = new Float32Array(SEGMENTS * 2);
    const aSide = new Float32Array(SEGMENTS * 2);
    const indices: number[] = [];

    for (let i = 0; i < SEGMENTS; i++) {
      const t = i / (SEGMENTS - 1);
      positions[i * 6 + 0] = 0;
      positions[i * 6 + 1] = 0;
      positions[i * 6 + 2] = 0;
      aT[i * 2 + 0] = t;
      aSide[i * 2 + 0] = 1;
      positions[i * 6 + 3] = 0;
      positions[i * 6 + 4] = 0;
      positions[i * 6 + 5] = 0;
      aT[i * 2 + 1] = t;
      aSide[i * 2 + 1] = -1;

      if (i < SEGMENTS - 1) {
        const a = i * 2;
        const b = i * 2 + 1;
        const c = (i + 1) * 2;
        const d = (i + 1) * 2 + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aT', new THREE.BufferAttribute(aT, 1));
    geo.setAttribute('aSide', new THREE.BufferAttribute(aSide, 1));
    geo.setIndex(indices);
    geo.computeBoundingSphere();

    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime:            { value: 0 },
      uTargetSection:   { value: 0 },
      uLength:          { value: 14 },
      uThickness:       { value: 0.055 },
      uMouse:           { value: new THREE.Vector2(0, -10) },
      uMagnetStrength:  { value: 0.0 },
      uColorA:          { value: new THREE.Color('#C9A961') },
      uColorB:          { value: new THREE.Color('#E8B96E') },
      uInvert:          { value: 0 }
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      uniforms.uMouse.value.set(nx * 7, ny * 0.8);
      uniforms.uMagnetStrength.value = 0.55;
    };
    const onLeave = () => {
      uniforms.uMagnetStrength.value = 0.0;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [uniforms]);

  useEffect(() => {
    let raf = 0;
    let current = 0;
    let target = 0;

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      target = p * 8;
    }

    function loop() {
      current += (target - current) * 0.08;
      uniforms.uTargetSection.value = current;

      const editorialEl = document.getElementById('editorial-spread');
      let invert = 0;
      if (editorialEl) {
        const r = editorialEl.getBoundingClientRect();
        const inFrame = r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
        invert = inFrame ? 1 : 0;
      }
      uniforms.uInvert.value += (invert - uniforms.uInvert.value) * 0.15;
      raf = requestAnimationFrame(loop);
    }

    onScroll();
    loop();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [uniforms]);

  useFrame((_, dt) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += dt;
    }
  });

  useEffect(() => {
    const w = size.width;
    const length = Math.max(10, Math.min(18, w / 90));
    uniforms.uLength.value = length;
  }, [size, uniforms]);

  return (
    <mesh ref={meshRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function PulsLine() {
  if (
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
     window.matchMedia('(pointer: coarse)').matches)
  ) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="puls-line-canvas fixed inset-0 pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        dpr={[1, 1.5]}
      >
        <Ribbon />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.75}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.65}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface AtmosphericParticlesProps {
  mobile: boolean;
  reducedMotion: boolean;
  active: boolean;
}

function seeded(index: number) {
  const value = Math.sin(index * 128.617 + 53.91) * 43758.5453123;
  return value - Math.floor(value);
}

export function AtmosphericParticles({
  mobile,
  reducedMotion,
  active,
}: AtmosphericParticlesProps) {
  const field = useRef<THREE.Points>(null);
  const count = mobile ? 360 : 900;
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 7 + seeded(index * 3) * 39;
      const theta = seeded(index * 3 + 1) * Math.PI * 2;
      const elevation = (seeded(index * 3 + 2) - 0.42) * 13;
      positions[index * 3] = Math.cos(theta) * radius;
      positions[index * 3 + 1] = elevation;
      positions[index * 3 + 2] = Math.sin(theta) * radius;

      const mint = seeded(index * 7) > 0.82;
      colors[index * 3] = mint ? 0.45 : 0.24;
      colors[index * 3 + 1] = mint ? 0.95 : 0.72;
      colors[index * 3 + 2] = mint ? 0.76 : 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return particleGeometry;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!field.current || reducedMotion) return;
    field.current.rotation.y += delta * (active ? 0.015 : 0.005);
    field.current.rotation.x = Math.sin(performance.now() * 0.00008) * 0.022;
  });

  return (
    <points ref={field} geometry={geometry}>
      <pointsMaterial
        size={mobile ? 0.026 : 0.034}
        sizeAttenuation
        vertexColors
        transparent
        opacity={active ? 0.68 : 0.33}
        depthWrite={false}
      />
    </points>
  );
}

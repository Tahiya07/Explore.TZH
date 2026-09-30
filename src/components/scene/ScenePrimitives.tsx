"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Vec3 } from "./layout";

export interface PulseRingProps {
  radius: number;
  color: string;
  active?: boolean;
  reducedMotion?: boolean;
  opacity?: number;
  rotation?: readonly [number, number, number];
}

export function PulseRing({
  radius,
  color,
  active = true,
  reducedMotion = false,
  opacity = 0.55,
  rotation = [Math.PI / 2, 0, 0],
}: PulseRingProps) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ring.current || reducedMotion) return;
    const phase = Math.sin(clock.getElapsedTime() * 0.8 + radius) * 0.028;
    ring.current.scale.setScalar(1 + phase);
  });

  return (
    <mesh ref={ring} rotation={rotation}>
      <torusGeometry args={[radius, 0.016, 6, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={active ? opacity : opacity * 0.3}
        depthWrite={false}
      />
    </mesh>
  );
}

export interface SignalRouteProps {
  points: readonly Vec3[];
  color: string;
  active?: boolean;
  reducedMotion?: boolean;
  nodeScale?: number;
}

export function SignalRoute({
  points,
  color,
  active = true,
  reducedMotion = false,
  nodeScale = 0.1,
}: SignalRouteProps) {
  const signal = useRef<THREE.Mesh>(null);
  const trail = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints(
        points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      ),
    [points],
  );

  useEffect(() => () => trail.dispose(), [trail]);

  useFrame(({ clock }) => {
    if (!signal.current) return;
    const count = points.length - 1;
    const elapsed = reducedMotion ? 0.18 : (clock.getElapsedTime() * (active ? 0.34 : 0.11)) % count;
    const segment = Math.min(Math.floor(elapsed), count - 1);
    const factor = elapsed - segment;
    const from = points[segment];
    const to = points[segment + 1];
    signal.current.position.set(
      THREE.MathUtils.lerp(from[0], to[0], factor),
      THREE.MathUtils.lerp(from[1], to[1], factor),
      THREE.MathUtils.lerp(from[2], to[2], factor),
    );
  });

  return (
    <group>
      <lineSegments geometry={trail}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.55 : 0.18}
          depthWrite={false}
        />
      </lineSegments>
      {points.map((point, index) => (
        <mesh key={`${point.join("-")}-${index}`} position={point}>
          <octahedronGeometry args={[nodeScale, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={active ? 2.4 : 0.45}
            roughness={0.25}
          />
        </mesh>
      ))}
      <mesh ref={signal}>
        <sphereGeometry args={[nodeScale * 1.35, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.95 : 0.3} />
      </mesh>
    </group>
  );
}

export function IndustrialBeam({
  position,
  size,
  color = "#14253b",
}: {
  position: Vec3;
  size: Vec3;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.84} roughness={0.38} />
    </mesh>
  );
}

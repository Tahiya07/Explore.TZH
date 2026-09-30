"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PulseRing } from "./ScenePrimitives";

interface NeuralCoreProps {
  active: boolean;
  reducedMotion: boolean;
}

interface CoreLattice {
  nodes: THREE.Vector3[];
  connections: THREE.BufferGeometry;
}

function createLattice(): CoreLattice {
  const nodes: THREE.Vector3[] = [];
  for (let index = 0; index < 36; index += 1) {
    const t = index / 35;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const radius = 2.1 + ((index * 17) % 9) * 0.11;
    nodes.push(
      new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius * 0.86 + 2.2,
        Math.sin(theta) * Math.sin(phi) * radius,
      ),
    );
  }

  const segments: number[] = [];
  nodes.forEach((node, index) => {
    const closest = nodes
      .map((candidate, candidateIndex) => ({
        index: candidateIndex,
        distance: candidate.distanceToSquared(node),
      }))
      .filter((candidate) => candidate.index > index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    closest.forEach(({ index: connectedIndex }) => {
      const connected = nodes[connectedIndex];
      segments.push(node.x, node.y, node.z, connected.x, connected.y, connected.z);
    });
  });

  const connections = new THREE.BufferGeometry();
  connections.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(segments, 3),
  );
  return { nodes, connections };
}

function OrbitSignal({
  phase,
  active,
  reducedMotion,
}: {
  phase: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  const signal = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!signal.current) return;
    const t = reducedMotion ? phase : clock.getElapsedTime() * (active ? 0.65 : 0.18) + phase;
    signal.current.position.set(Math.cos(t) * 3.5, 2.2 + Math.sin(t * 1.7) * 1.5, Math.sin(t) * 2.1);
  });
  return (
    <mesh ref={signal}>
      <sphereGeometry args={[0.09, 12, 12]} />
      <meshBasicMaterial color="#9efbd8" transparent opacity={active ? 0.92 : 0.35} />
    </mesh>
  );
}

export function NeuralCore({ active, reducedMotion }: NeuralCoreProps) {
  const assembly = useRef<THREE.Group>(null);
  const pointLight = useRef<THREE.PointLight>(null);
  const lattice = useMemo(createLattice, []);

  useEffect(() => () => lattice.connections.dispose(), [lattice]);

  useFrame(({ clock }, delta) => {
    if (!assembly.current) return;
    if (!reducedMotion) {
      assembly.current.rotation.y += delta * (active ? 0.09 : 0.025);
      assembly.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.24) * 0.045;
    }
    const scale = active ? 1.04 : 0.91;
    assembly.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
    if (pointLight.current) pointLight.current.intensity = active ? 12 : 4.2;
  });

  return (
    <group ref={assembly}>
      <pointLight ref={pointLight} position={[0, 2.6, 0]} color="#58b9ff" distance={21} decay={2} />
      <mesh position={[0, 2.2, 0]} rotation={[0.35, 0.15, 0]}>
        <octahedronGeometry args={[2.55, 1]} />
        <meshStandardMaterial
          color="#102a4d"
          emissive="#176eb5"
          emissiveIntensity={active ? 1.15 : 0.34}
          wireframe
          metalness={0.82}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[0, 2.2, 0]} rotation={[0.68, -0.25, 0.52]}>
        <dodecahedronGeometry args={[1.82, 0]} />
        <meshStandardMaterial
          color="#071325"
          emissive="#69e6c6"
          emissiveIntensity={active ? 0.6 : 0.15}
          wireframe
          transparent
          opacity={0.76}
        />
      </mesh>
      <group rotation={[0, 0.55, 0]}>
        <mesh rotation={[Math.PI / 2.8, 0, 0.2]}>
          <torusGeometry args={[3.55, 0.026, 8, 96]} />
          <meshBasicMaterial color="#4cc9ff" transparent opacity={active ? 0.72 : 0.25} />
        </mesh>
        <mesh rotation={[1.24, 0.42, 1.14]}>
          <torusGeometry args={[3.18, 0.018, 8, 96]} />
          <meshBasicMaterial color="#8cf0c4" transparent opacity={active ? 0.58 : 0.2} />
        </mesh>
      </group>
      <lineSegments geometry={lattice.connections}>
        <lineBasicMaterial
          color="#55beff"
          transparent
          opacity={active ? 0.58 : 0.17}
          depthWrite={false}
        />
      </lineSegments>
      {lattice.nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <sphereGeometry args={[index % 5 === 0 ? 0.115 : 0.068, 10, 10]} />
          <meshStandardMaterial
            color={index % 5 === 0 ? "#aaf7dd" : "#5eb9ff"}
            emissive={index % 5 === 0 ? "#70f2c7" : "#258ac8"}
            emissiveIntensity={active ? 2.6 : 0.58}
            roughness={0.2}
          />
        </mesh>
      ))}
      {[0, Math.PI * 0.67, Math.PI * 1.32].map((phase) => (
        <OrbitSignal key={phase} phase={phase} active={active} reducedMotion={reducedMotion} />
      ))}
      <PulseRing radius={5.15} color="#256da0" active={active} reducedMotion={reducedMotion} opacity={0.42} />
      <PulseRing radius={6.25} color="#39a9bf" active={active} reducedMotion={reducedMotion} opacity={0.19} />
    </group>
  );
}

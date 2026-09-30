"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type NodeData = {
  position: [number, number, number];
  scale: number;
  colorMix: number;
};

function NeuralCore() {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo<NodeData[]>(() => {
    const result: NodeData[] = [];
    const count = 42;

    for (let i = 0; i < count; i += 1) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.7 + (i % 4) * 0.16;

      result.push({
        position: [
          Math.sin(phi) * Math.cos(theta) * radius,
          Math.cos(phi) * radius,
          Math.sin(phi) * Math.sin(theta) * radius,
        ],
        scale: 0.045 + (i % 5) * 0.012,
        colorMix: i / count,
      });
    }

    return result;
  }, []);

  const connections = useMemo(() => {
    const segments: Array<[[number, number, number], [number, number, number]]> = [];

    nodes.forEach((node, index) => {
      const nearby = nodes
        .slice(index + 1)
        .map((candidate, offset) => ({
          candidate,
          index: index + offset + 1,
          distance: new THREE.Vector3(...node.position).distanceTo(
            new THREE.Vector3(...candidate.position),
          ),
        }))
        .filter(({ distance }) => distance < 2.75)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2);

      nearby.forEach(({ candidate }) => {
        segments.push([node.position, candidate.position]);
      });
    });

    return segments;
  }, [nodes]);

  const particles = useMemo(() => {
    const values = new Float32Array(480);

    for (let i = 0; i < values.length; i += 3) {
      const radius = 4 + Math.random() * 4;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      values[i] = Math.sin(phi) * Math.cos(theta) * radius;
      values[i + 1] = Math.cos(phi) * radius;
      values[i + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    }

    return values;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.075;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.12,
      0.04,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.08,
      0.04,
    );
  });

  return (
    <>
      <Points positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          size={0.018}
          sizeAttenuation
          depthWrite={false}
          color="#8690ff"
          opacity={0.42}
        />
      </Points>

      <group ref={group}>
        <mesh>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshBasicMaterial color="#dce1ff" transparent opacity={0.92} />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.58, 32, 32]} />
          <meshBasicMaterial color="#5f70ff" transparent opacity={0.08} />
        </mesh>

        {connections.map(([start, end], index) => (
          <Line
            key={index}
            points={[start, end]}
            color={index % 5 === 0 ? "#c65aa7" : "#6f7fff"}
            transparent
            opacity={index % 5 === 0 ? 0.34 : 0.16}
            lineWidth={0.55}
          />
        ))}

        {nodes.map((node, index) => (
          <mesh key={index} position={node.position} scale={node.scale}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial
              color={node.colorMix > 0.72 ? "#d06ab2" : "#9aa4ff"}
              transparent
              opacity={0.88}
            />
          </mesh>
        ))}

        <Float speed={0.7} rotationIntensity={0.18} floatIntensity={0.3}>
          <mesh rotation={[0.15, 0.35, 0.55]}>
            <torusGeometry args={[2.95, 0.006, 8, 160]} />
            <meshBasicMaterial color="#7f8aff" transparent opacity={0.32} />
          </mesh>
        </Float>

        <mesh rotation={[1.03, -0.42, 0.18]}>
          <torusGeometry args={[3.18, 0.005, 8, 160]} />
          <meshBasicMaterial color="#c35da9" transparent opacity={0.28} />
        </mesh>

        <mesh rotation={[0.25, 1.2, -0.55]}>
          <torusGeometry args={[3.38, 0.004, 8, 160]} />
          <meshBasicMaterial color="#8d98ff" transparent opacity={0.2} />
        </mesh>
      </group>
    </>
  );
}

export default function NeuralOrbit() {
  return (
    <div className="neural-orbit" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 34 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.15} />
        <NeuralCore />
      </Canvas>
    </div>
  );
}

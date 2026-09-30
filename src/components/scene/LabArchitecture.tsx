"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { projects } from "@/data/projects";
import { areaPlacements, projectPlacements, type Vec3 } from "./layout";
import { IndustrialBeam, PulseRing } from "./ScenePrimitives";

function FloorGrid({ size = 76, divisions = 38 }: { size?: number; divisions?: number }) {
  const grid = useMemo(() => {
    const points: number[] = [];
    const half = size / 2;
    for (let step = 0; step <= divisions; step += 1) {
      const offset = -half + (step / divisions) * size;
      points.push(-half, 0.015, offset, half, 0.015, offset);
      points.push(offset, 0.015, -half, offset, 0.015, half);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [divisions, size]);

  useEffect(() => () => grid.dispose(), [grid]);

  return (
    <lineSegments geometry={grid}>
      <lineBasicMaterial color="#12304b" transparent opacity={0.18} depthWrite={false} />
    </lineSegments>
  );
}

function RadialBridge({ angle }: { angle: number }) {
  return (
    <group rotation={[0, angle, 0]}>
      <IndustrialBeam position={[0, -0.18, 8.5]} size={[4.9, 0.3, 17]} color="#07111f" />
      <IndustrialBeam position={[-2.38, 0.16, 8.5]} size={[0.07, 0.3, 17]} color="#255273" />
      <IndustrialBeam position={[2.38, 0.16, 8.5]} size={[0.07, 0.3, 17]} color="#255273" />
      {[1.8, 5.2, 8.6, 12].map((z) => (
        <group key={z} position={[0, 0, z]}>
          <IndustrialBeam position={[-2.34, 1.7, 0]} size={[0.12, 3.6, 0.15]} />
          <IndustrialBeam position={[2.34, 1.7, 0]} size={[0.12, 3.6, 0.15]} />
          <IndustrialBeam position={[0, 3.43, 0]} size={[4.82, 0.12, 0.15]} />
          <mesh position={[0, 3.3, 0.02]}>
            <boxGeometry args={[1.35, 0.04, 0.05]} />
            <meshBasicMaterial color="#3f9fd0" transparent opacity={0.56} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AreaBridge({ origin, yaw }: { origin: Vec3; yaw: number }) {
  const distance = Math.sqrt(origin[0] ** 2 + origin[2] ** 2) - 6;
  return (
    <group rotation={[0, yaw, 0]}>
      <IndustrialBeam position={[0, -0.2, distance / 2 + 5]} size={[3.8, 0.24, distance]} color="#07111f" />
      <IndustrialBeam position={[-1.82, 0.12, distance / 2 + 5]} size={[0.06, 0.3, distance]} color="#1a435e" />
      <IndustrialBeam position={[1.82, 0.12, distance / 2 + 5]} size={[0.06, 0.3, distance]} color="#1a435e" />
    </group>
  );
}

function OuterMasses() {
  const masses: readonly { position: Vec3; size: Vec3 }[] = [
    { position: [-36, 5, -36], size: [11, 10, 17] },
    { position: [36, 5, -36], size: [11, 10, 17] },
    { position: [-39, 4, 22], size: [9, 8, 21] },
    { position: [39, 4, 22], size: [9, 8, 21] },
    { position: [0, 7, -42], size: [19, 14, 8] },
  ];
  return (
    <group>
      {masses.map((mass, index) => (
        <mesh key={index} position={mass.position}>
          <boxGeometry args={mass.size} />
          <meshStandardMaterial color="#050b15" metalness={0.86} roughness={0.42} />
        </mesh>
      ))}
    </group>
  );
}

export function LabArchitecture() {
  return (
    <group>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[11.4, 12.7, 0.75, 64]} />
        <meshStandardMaterial color="#071321" metalness={0.83} roughness={0.37} />
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[9.2, 9.2, 0.08, 64]} />
        <meshStandardMaterial color="#081a2d" metalness={0.8} roughness={0.25} />
      </mesh>
      <PulseRing radius={9.4} color="#2e9cc8" opacity={0.45} />
      <PulseRing radius={11.15} color="#176188" opacity={0.26} />
      <FloorGrid />
      {projects.map((project) => (
        <RadialBridge key={project.id} angle={projectPlacements[project.id].angle} />
      ))}
      <AreaBridge origin={areaPlacements.research.position} yaw={areaPlacements.research.yaw} />
      <AreaBridge origin={areaPlacements.engineering.position} yaw={areaPlacements.engineering.yaw} />
      <AreaBridge origin={areaPlacements.contact.position} yaw={areaPlacements.contact.yaw} />
      <OuterMasses />
      {[-7, 7].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <IndustrialBeam position={[0, 4.8, 0]} size={[0.25, 9.6, 0.3]} color="#0a1b2d" />
          <mesh position={[0, 7.9, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.08, 0.1, 8.4]} />
            <meshBasicMaterial color="#1c7194" transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

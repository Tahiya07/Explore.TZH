"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { projects, technologies } from "@/data/projects";
import type { LocationId } from "@/types/lab";
import { AtmosphericParticles } from "./AtmosphericParticles";
import { LabArchitecture } from "./LabArchitecture";
import { LabCamera } from "./LabCamera";
import { NeuralCore } from "./NeuralCore";
import { areaPlacements, getGuideAnchor, localToWorld, projectPlacements } from "./layout";
import { IndustrialBeam, PulseRing, SignalRoute } from "./ScenePrimitives";

export interface LaboratorySceneProps {
  location: LocationId;
  onNavigate: (id: LocationId) => void;
  onHoverLocation: (id: LocationId | null) => void;
  reducedMotion: boolean;
  mobile: boolean;
  introComplete: boolean;
}

function SceneAssembly({
  location,
  mobile,
  reducedMotion,
  onNavigate,
  onHoverLocation,
  introComplete,
}: LaboratorySceneProps) {
  const coreActive = location === "core";
  return (
    <>
      <color attach="background" args={["#020711"]} />
      <fog attach="fog" args={["#020711", 15, 75]} />
      <ambientLight intensity={0.22} color="#698ab4" />
      <hemisphereLight args={["#6cb7e8", "#02050c", 0.24]} />
      <directionalLight position={[8, 14, 9]} intensity={1.15} color="#7bbbf8" />
      <directionalLight position={[-15, 7, -10]} intensity={0.4} color="#86e6ce" />
      <LabCamera location={location} mobile={mobile} reducedMotion={reducedMotion} />
      <LabArchitecture />
      <NeuralCore active={coreActive} reducedMotion={reducedMotion} />
      <AtmosphericParticles
        mobile={mobile}
        reducedMotion={reducedMotion}
        active={coreActive}
      />
      <ProjectPortals location={location} onNavigate={onNavigate} onHover={onHoverLocation} reducedMotion={reducedMotion} />
      <AreaPortals location={location} onNavigate={onNavigate} onHover={onHoverLocation} reducedMotion={reducedMotion} />
      <Guide location={location} reducedMotion={reducedMotion} visible={introComplete} />
    </>
  );
}

function ProjectPortals({ location, onNavigate, onHover, reducedMotion }: Pick<LaboratorySceneProps, "location" | "onNavigate" | "reducedMotion"> & { onHover: (id: LocationId | null) => void }) {
  return <group>{projects.map((project) => <ProjectPortal key={project.id} id={project.id} index={project.index} accent={project.accent} angle={projectPlacements[project.id].angle} position={projectPlacements[project.id].position} active={location === project.id} onNavigate={onNavigate} onHover={onHover} reducedMotion={reducedMotion} />)}</group>;
}

function ProjectPortal({ id, index, accent, angle, position, active, onNavigate, onHover, reducedMotion }: { id: Extract<LocationId, string>; index: string; accent: string; angle: number; position: readonly [number, number, number]; active: boolean; onNavigate: (id: LocationId) => void; onHover: (id: LocationId | null) => void; reducedMotion: boolean }) {
  const portal = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!portal.current || reducedMotion) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * (active ? 2 : 1.1) + angle) * (active ? 0.035 : 0.014);
    portal.current.scale.setScalar(pulse);
  });
  const route = useMemo(() => [localToWorld(angle, position, [0, 0.26, -8]), localToWorld(angle, position, [0, 1.45, -2.7]), localToWorld(angle, position, [0, 1.9, 0])], [angle, position]);
  return <group ref={portal} position={position} rotation={[0, angle, 0]} onClick={(event) => { event.stopPropagation(); onNavigate(id); }} onPointerOver={(event) => { event.stopPropagation(); onHover(id); document.body.style.cursor = "pointer"; }} onPointerOut={() => { onHover(null); document.body.style.cursor = "default"; }}>
    <SignalRoute points={route} color={accent} active={active} reducedMotion={reducedMotion} nodeScale={0.075} />
    <mesh position={[0, 2.3, 0]}><boxGeometry args={[5.8, 4.8, 0.42]} /><meshStandardMaterial color="#07121f" metalness={0.88} roughness={0.29} /></mesh>
    <mesh position={[0, 2.3, 0.24]}><boxGeometry args={[3.65, 3.25, 0.06]} /><meshBasicMaterial color={accent} transparent opacity={active ? 0.27 : 0.1} /></mesh>
    <mesh position={[-2.36, 2.3, 0.36]}><boxGeometry args={[0.12, 4.4, 0.12]} /><meshBasicMaterial color={accent} transparent opacity={0.68} /></mesh>
    <mesh position={[2.36, 2.3, 0.36]}><boxGeometry args={[0.12, 4.4, 0.12]} /><meshBasicMaterial color={accent} transparent opacity={0.68} /></mesh>
    <mesh position={[0, 4.44, 0.36]}><boxGeometry args={[4.8, 0.12, 0.12]} /><meshBasicMaterial color={accent} transparent opacity={0.68} /></mesh>
    <mesh position={[0, 0.14, 0.36]}><boxGeometry args={[4.8, 0.12, 0.12]} /><meshBasicMaterial color={accent} transparent opacity={0.45} /></mesh>
    <mesh position={[-1.95, 3.75, 0.5]}><planeGeometry args={[0.72, 0.44]} /><meshBasicMaterial color="#d4efff" transparent opacity={0.8} /></mesh>
    <PulseRing radius={active ? 3.32 : 3.02} color={accent} active={active} reducedMotion={reducedMotion} opacity={active ? 0.56 : 0.18} rotation={[Math.PI / 2, 0, 0]} />
    <pointLight position={[0, 2.4, 1.3]} color={accent} intensity={active ? 4.2 : 1.05} distance={9} />
    <mesh position={[0, 0.25, 1.1]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.38, 0.56, 32]} /><meshBasicMaterial color={accent} transparent opacity={0.8} side={THREE.DoubleSide} /></mesh>
  </group>;
}

function AreaPortals({ location, onNavigate, onHover, reducedMotion }: Pick<LaboratorySceneProps, "location" | "onNavigate" | "reducedMotion"> & { onHover: (id: LocationId | null) => void }) {
  const areas: { id: Extract<LocationId, "research" | "engineering" | "contact">; color: string }[] = [{ id: "research", color: "#86dce3" }, { id: "engineering", color: "#72baff" }, { id: "contact", color: "#9ae6c3" }];
  return <group>{areas.map(({ id, color }) => { const place = areaPlacements[id]; return <group key={id} position={place.position} rotation={[0, place.yaw, 0]} onClick={(event) => { event.stopPropagation(); onNavigate(id); }} onPointerOver={(event) => { event.stopPropagation(); onHover(id); document.body.style.cursor = "pointer"; }} onPointerOut={() => { onHover(null); document.body.style.cursor = "default"; }}>
    <mesh position={[0, 2.2, 0]}><cylinderGeometry args={[4.1, 4.7, 4.4, 48, 1, true]} /><meshStandardMaterial color="#071523" metalness={0.82} roughness={0.33} side={THREE.BackSide} /></mesh>
    <PulseRing radius={3.5} color={color} active={location === id} reducedMotion={reducedMotion} opacity={0.45} />
    <mesh position={[0, 1.9, 0]} rotation={[0.2, 0.2, 0]}>{id === "engineering" ? <icosahedronGeometry args={[1.45, 1]} /> : id === "research" ? <octahedronGeometry args={[1.45, 1]} /> : <torusKnotGeometry args={[0.9, 0.21, 96, 12]} />}<meshStandardMaterial color="#0a2740" emissive={color} emissiveIntensity={location === id ? 1.2 : 0.32} wireframe /></mesh>
    <pointLight position={[0, 2, 0]} color={color} intensity={location === id ? 4 : 1} distance={10} />
    {id === "engineering" ? technologies.slice(0, 8).map((_, index) => <mesh key={index} position={[Math.cos(index / 8 * Math.PI * 2) * 2.35, 1.5 + (index % 2) * .7, Math.sin(index / 8 * Math.PI * 2) * 2.35]}><sphereGeometry args={[.12, 10, 10]} /><meshBasicMaterial color={color} /></mesh>) : null}
  </group>; })}</group>;
}

function Guide({ location, reducedMotion, visible }: { location: LocationId; reducedMotion: boolean; visible: boolean }) {
  const figure = useRef<THREE.Group>(null);
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }, delta) => { if (!figure.current || !visible) return; target.set(...getGuideAnchor(location)); figure.current.position.lerp(target, reducedMotion ? 1 : 1 - Math.exp(-delta * 2.4)); if (!reducedMotion) figure.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * .04; });
  if (!visible) return null;
  return <group ref={figure}><pointLight position={[0, 2.3, .7]} color="#8cf0c4" intensity={1.2} distance={5} /><mesh position={[0, 1.95, 0]}><sphereGeometry args={[.34, 16, 16]} /><meshStandardMaterial color="#b7eff0" emissive="#3a8db2" emissiveIntensity={.55} roughness={.36} /></mesh><mesh position={[0, 1.12, 0]}><capsuleGeometry args={[.42, 1.1, 8, 16]} /><meshStandardMaterial color="#10243b" emissive="#155070" emissiveIntensity={.25} metalness={.35} roughness={.43} /></mesh><mesh position={[-.48, 1.3, .04]} rotation={[0, 0, -.42]}><capsuleGeometry args={[.1, .68, 6, 10]} /><meshStandardMaterial color="#1d4960" /></mesh><mesh position={[.48, 1.3, .04]} rotation={[0, 0, .42]}><capsuleGeometry args={[.1, .68, 6, 10]} /><meshStandardMaterial color="#1d4960" /></mesh><mesh position={[-.2, .34, 0]}><capsuleGeometry args={[.14, .55, 6, 10]} /><meshStandardMaterial color="#102b45" /></mesh><mesh position={[.2, .34, 0]}><capsuleGeometry args={[.14, .55, 6, 10]} /><meshStandardMaterial color="#102b45" /></mesh></group>;
}

export default function LaboratoryScene({
  location,
  onNavigate,
  onHoverLocation,
  reducedMotion,
  mobile,
  introComplete,
}: LaboratorySceneProps) {
  return (
    <Canvas
      aria-label="Interactive 3D model of Tahiya's AI laboratory"
      camera={{ position: [0, 5.8, 19.5], fov: mobile ? 52 : 48, near: 0.1, far: 120 }}
      dpr={mobile ? [1, 1.25] : [1, 1.7]}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
      onPointerMissed={() => onHoverLocation(null)}
    >
      <Suspense fallback={null}>
        <SceneAssembly location={location} mobile={mobile} reducedMotion={reducedMotion} onNavigate={onNavigate} onHoverLocation={onHoverLocation} introComplete={introComplete} />
      </Suspense>
    </Canvas>
  );
}

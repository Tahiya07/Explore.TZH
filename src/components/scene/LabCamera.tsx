"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { LocationId } from "@/types/lab";
import { getCameraPose } from "./layout";

interface LabCameraProps {
  location: LocationId;
  mobile: boolean;
  reducedMotion: boolean;
}

export function LabCamera({ location, mobile, reducedMotion }: LabCameraProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const settling = useRef(true);

  useEffect(() => {
    const pose = getCameraPose(location, mobile);
    desiredPosition.set(...pose.position);
    desiredTarget.set(...pose.target);
    settling.current = true;
  }, [location, mobile, desiredPosition, desiredTarget]);

  useFrame((_, delta) => {
    const orbit = controls.current;
    if (!orbit || !settling.current) return;

    const alpha = reducedMotion ? 1 : 1 - Math.exp(-delta * 3.8);
    camera.position.lerp(desiredPosition, alpha);
    orbit.target.lerp(desiredTarget, alpha);
    orbit.update();

    if (
      camera.position.distanceTo(desiredPosition) < 0.025 &&
      orbit.target.distanceTo(desiredTarget) < 0.025
    ) {
      camera.position.copy(desiredPosition);
      orbit.target.copy(desiredTarget);
      settling.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom={!mobile}
      enableDamping
      dampingFactor={0.07}
      rotateSpeed={mobile ? 0.45 : 0.34}
      zoomSpeed={0.52}
      minDistance={mobile ? 8 : 5.8}
      maxDistance={mobile ? 28 : 34}
      minPolarAngle={0.48}
      maxPolarAngle={Math.PI * 0.76}
      onStart={() => {
        settling.current = false;
      }}
    />
  );
}

import type { LocationId, ProjectId } from "@/types/lab";

export type Vec3 = readonly [number, number, number];

export interface CameraPose {
  position: Vec3;
  target: Vec3;
}

export interface ProjectPlacement {
  angle: number;
  position: Vec3;
}

const PROJECT_RING_RADIUS = 14;

function polar(angle: number, radius: number, y = 0): Vec3 {
  return [Math.sin(angle) * radius, y, Math.cos(angle) * radius];
}

export function localToWorld(
  angle: number,
  origin: Vec3,
  local: Vec3,
): Vec3 {
  const [x, y, z] = local;
  return [
    origin[0] + x * Math.cos(angle) + z * Math.sin(angle),
    origin[1] + y,
    origin[2] - x * Math.sin(angle) + z * Math.cos(angle),
  ];
}

const projectAngles: Record<ProjectId, number> = {
  eduguard: Math.PI,
  "autonomous-ai": Math.PI + Math.PI / 3,
  "computer-vision": Math.PI + (2 * Math.PI) / 3,
  "ai-security": 0,
  "multimodal-intelligence": Math.PI / 3,
  "predictive-systems": (2 * Math.PI) / 3,
};

export const projectPlacements: Record<ProjectId, ProjectPlacement> =
  Object.fromEntries(
    Object.entries(projectAngles).map(([id, angle]) => [
      id,
      { angle, position: polar(angle, PROJECT_RING_RADIUS) },
    ]),
  ) as Record<ProjectId, ProjectPlacement>;

export const areaPlacements = {
  research: {
    position: [-29, 0, -20] as Vec3,
    yaw: -0.72,
  },
  engineering: {
    position: [29, 0, -20] as Vec3,
    yaw: 0.72,
  },
  contact: {
    position: [0, 0, 32] as Vec3,
    yaw: 0,
  },
} as const;

const roomPose = (id: ProjectId, mobile: boolean): CameraPose => {
  const placement = projectPlacements[id];
  const camera = localToWorld(
    placement.angle,
    placement.position,
    [0, mobile ? 4.1 : 3.55, mobile ? 5.1 : 3.15],
  );
  const target = localToWorld(
    placement.angle,
    placement.position,
    [0, 2.05, 11.6],
  );
  return { position: camera, target };
};

export function getCameraPose(location: LocationId, mobile: boolean): CameraPose {
  if (location in projectPlacements) {
    return roomPose(location as ProjectId, mobile);
  }

  if (location === "core") {
    return {
      position: mobile ? [0, 6.8, 20] : [0, 5.8, 19.5],
      target: [0, 1.9, 0],
    };
  }

  if (location === "research") {
    return {
      position: mobile ? [-24.5, 5.6, -15] : [-24.7, 4.4, -14.2],
      target: [-30, 2.2, -22.2],
    };
  }

  if (location === "engineering") {
    return {
      position: mobile ? [24.5, 5.6, -15] : [24.7, 4.4, -14.2],
      target: [30, 2.25, -22.2],
    };
  }

  return {
    position: mobile ? [0, 5.5, 25.5] : [0, 4.2, 24.5],
    target: [0, 1.8, 34],
  };
}

export function getGuideAnchor(location: LocationId): Vec3 {
  if (location in projectPlacements) {
    const placement = projectPlacements[location as ProjectId];
    return localToWorld(placement.angle, placement.position, [-1.65, 0, 8.2]);
  }

  if (location === "research") return [-28.8, 0, -18.4];
  if (location === "engineering") return [28.8, 0, -18.4];
  if (location === "contact") return [1.9, 0, 31.1];
  return [3.1, 0, 2.4];
}

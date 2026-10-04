export const projectIds = [
  "eduguard",
  "autonomous-ai",
  "computer-vision",
  "ai-security",
  "multimodal-intelligence",
  "predictive-systems",
] as const;

export type ProjectId = (typeof projectIds)[number];

export type LocationId = "core" | ProjectId | "research" | "engineering" | "contact";

export type ProjectStatus = "source-pending" | "research-area" | "active-project";

export type VisualSystem =
  | "split-pathway"
  | "agent-loop"
  | "vision-array"
  | "security-gate"
  | "multimodal-stack"
  | "forecast-ring";

export interface ProjectRoom {
  id: ProjectId;
  index: string;
  title: string;
  discipline: string;
  status: ProjectStatus;
  statusLabel: string;
  description: string;
  visualSystem: VisualSystem;
  route: readonly string[];
  accent: string;
  featured?: boolean;
  sourceNote?: string;
}

export interface LabLocation {
  id: LocationId;
  label: string;
  eyebrow: string;
  message: string;
}

export interface NavTarget {
  id: LocationId;
  label: string;
  kind: "project" | "area" | "core";
}

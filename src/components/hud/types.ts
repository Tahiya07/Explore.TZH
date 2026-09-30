import type { LocationId } from "@/types/lab";

export type NavigateToLocation = (location: LocationId) => void;

/**
 * The small, renderer-agnostic contract between the laboratory scene and its
 * accessible interface. Keeping it here makes the HUD usable by both the 3D
 * experience and the no-WebGL presentation.
 */
export interface LabExperienceControls {
  location: LocationId;
  introComplete: boolean;
  onEnter: () => void;
  onNavigate: NavigateToLocation;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  webglAvailable: boolean;
  hoveredLocation: LocationId | null;
}

export interface OptionalHudCapabilities {
  /** Set by the audio hook when the browser cannot construct an audio graph. */
  audioAvailable?: boolean;
}

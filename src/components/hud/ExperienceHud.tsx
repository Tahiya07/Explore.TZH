"use client";

import { AccessibleFallback } from "./AccessibleFallback";
import { IntroSequence } from "./IntroSequence";
import { LabHud } from "./LabHud";
import { LocationPanel } from "./LocationPanel";
import type { LabExperienceControls, OptionalHudCapabilities } from "./types";

export type ExperienceHudProps = LabExperienceControls & OptionalHudCapabilities;

/** The renderer-independent HUD composition used by the top-level experience. */
export function ExperienceHud({
  location,
  introComplete,
  onEnter,
  onNavigate,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  webglAvailable,
  hoveredLocation,
  audioAvailable,
}: ExperienceHudProps) {
  if (!webglAvailable) {
    return (
      <AccessibleFallback
        location={location}
        hoveredLocation={hoveredLocation}
        onNavigate={onNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={onToggleReducedMotion}
        audioAvailable={audioAvailable}
      />
    );
  }

  return (
    <>
      <IntroSequence complete={introComplete} onEnter={onEnter} reducedMotion={reducedMotion} />
      {introComplete ? (
        <>
          <LabHud
            location={location}
            hoveredLocation={hoveredLocation}
            onNavigate={onNavigate}
            soundEnabled={soundEnabled}
            onToggleSound={onToggleSound}
            reducedMotion={reducedMotion}
            onToggleReducedMotion={onToggleReducedMotion}
            audioAvailable={audioAvailable}
          />
          <LocationPanel location={location} hoveredLocation={hoveredLocation} onNavigate={onNavigate} />
        </>
      ) : null}
    </>
  );
}

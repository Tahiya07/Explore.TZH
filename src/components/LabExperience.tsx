"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode, useCallback, useEffect, useState } from "react";

import { ExperienceHud } from "@/components/hud";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";
import { useMediaPreferences } from "@/hooks/useMediaPreferences";
import type { LocationId } from "@/types/lab";

const LaboratoryScene = dynamic(() => import("@/components/scene/LaboratoryScene"), {
  ssr: false,
  loading: () => (
    <div className="world-loading" role="status" aria-live="polite">
      <span className="world-loading__mark" aria-hidden="true" />
      <span>LOADING LABORATORY</span>
      <small>Preparing spatial interface</small>
    </div>
  ),
});

interface SceneBoundaryProps {
  children: ReactNode;
  onFailure: () => void;
}

interface SceneBoundaryState {
  failed: boolean;
}

class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canRenderWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function LabExperience() {
  const [location, setLocation] = useState<LocationId>("core");
  const [hoveredLocation, setHoveredLocation] = useState<LocationId | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const { mobile, reducedMotion, toggleReducedMotion } = useMediaPreferences();
  const { available: audioAvailable, enabled: soundEnabled, toggle, activateFromEntry } = useAmbientAudio();

  useEffect(() => {
    setWebglAvailable(canRenderWebGL());
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && introComplete) {
        setLocation("core");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [introComplete]);

  const navigate = useCallback((destination: LocationId) => {
    setHoveredLocation(null);
    setLocation(destination);
  }, []);

  const enterLab = useCallback(() => {
    setIntroComplete(true);
    void activateFromEntry();
  }, [activateFromEntry]);

  return (
    <section className="lab-shell" aria-label="Tahiya AI laboratory">
      {webglAvailable ? (
        <SceneBoundary onFailure={() => setWebglAvailable(false)}>
          <div className="lab-canvas" aria-hidden="true">
            <LaboratoryScene
              location={location}
              onNavigate={navigate}
              onHoverLocation={setHoveredLocation}
              reducedMotion={reducedMotion}
              mobile={mobile}
              introComplete={introComplete}
            />
          </div>
        </SceneBoundary>
      ) : null}

      <ExperienceHud
        location={location}
        introComplete={introComplete}
        onEnter={enterLab}
        onNavigate={navigate}
        soundEnabled={soundEnabled}
        onToggleSound={() => void toggle()}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        webglAvailable={webglAvailable}
        hoveredLocation={hoveredLocation}
        audioAvailable={audioAvailable}
      />
    </section>
  );
}

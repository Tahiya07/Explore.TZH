"use client";

import { useState } from "react";

import { navTargets } from "@/data/projects";
import type { LocationId } from "@/types/lab";

import { AudioToggle } from "./AudioToggle";
import { getLocationLabel } from "./location-details";
import type { NavigateToLocation } from "./types";

interface LabHudProps {
  location: LocationId;
  hoveredLocation: LocationId | null;
  onNavigate: NavigateToLocation;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  audioAvailable?: boolean;
}

export function LabHud({
  location,
  hoveredLocation,
  onNavigate,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  audioAvailable,
}: LabHudProps) {
  const [mapOpen, setMapOpen] = useState(false);
  const hoverLabel = hoveredLocation ? getLocationLabel(hoveredLocation) : null;

  const navigate = (target: LocationId) => {
    onNavigate(target);
    setMapOpen(false);
  };

  return (
    <aside className="lab-hud" aria-label="Laboratory controls">
      <div className="lab-hud__topline">
        <button
          type="button"
          className="lab-hud__brand"
          onClick={() => navigate("core")}
          aria-label="Return to the neural core"
        >
          <span className="lab-hud__brand-mark" aria-hidden="true" />
          <span>TAHIYA // AI LAB</span>
        </button>

        <div className="lab-hud__utilities">
          <AudioToggle enabled={soundEnabled} onToggle={onToggleSound} available={audioAvailable} />
          <button
            type="button"
            className="lab-hud__utility"
            aria-pressed={reducedMotion}
            onClick={onToggleReducedMotion}
          >
            {reducedMotion ? "MOTION REDUCED" : "REDUCE MOTION"}
          </button>
        </div>
      </div>

      <div className="lab-hud__location-readout" aria-live="polite" aria-atomic="true">
        <span className="lab-hud__label">CURRENT LOCATION</span>
        <strong>{getLocationLabel(location)}</strong>
        {hoverLabel && hoveredLocation !== location ? (
          <button
            type="button"
            className="lab-hud__signal"
            onClick={() => {
              if (hoveredLocation) navigate(hoveredLocation);
            }}
          >
            PORTAL SIGNAL: {hoverLabel}
          </button>
        ) : null}
      </div>

      <div className="lab-hud__map-control">
        <button
          type="button"
          className="lab-hud__map-toggle"
          aria-expanded={mapOpen}
          aria-controls="system-map"
          onClick={() => setMapOpen((current) => !current)}
        >
          <span>SYSTEM MAP</span>
          <span aria-hidden="true">{mapOpen ? "−" : "+"}</span>
        </button>

        <nav id="system-map" className="lab-hud__map" aria-label="Laboratory destinations" hidden={!mapOpen}>
          <ul>
            {navTargets.map((target) => (
              <li key={target.id} data-kind={target.kind}>
                <button
                  type="button"
                  aria-current={location === target.id ? "location" : undefined}
                  onClick={() => navigate(target.id)}
                >
                  <span className="lab-hud__map-marker" aria-hidden="true" />
                  {target.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="lab-hud__interaction-note">
        <span className="lab-hud__interaction-note--desktop">DRAG TO SURVEY · SELECT A PORTAL TO MOVE</span>
        <span className="lab-hud__interaction-note--touch">SWIPE TO SURVEY · USE THE MAP TO MOVE</span>
      </p>
    </aside>
  );
}

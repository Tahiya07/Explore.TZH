"use client";

import { labLocations, projectById } from "@/data/projects";
import type { LocationId, ProjectRoom } from "@/types/lab";

import { getLocationDetails, isProjectLocation } from "./location-details";
import type { NavigateToLocation } from "./types";

interface LocationPanelProps {
  location: LocationId;
  hoveredLocation?: LocationId | null;
  onNavigate: NavigateToLocation;
}

export function LocationPanel({ location, hoveredLocation = null, onNavigate }: LocationPanelProps) {
  const project: ProjectRoom | null = isProjectLocation(location) ? projectById[location] : null;
  const area = project ? null : labLocations[location];
  const hoverDetails = hoveredLocation ? getLocationDetails(hoveredLocation) : null;

  return (
    <section className="location-panel" aria-labelledby="location-panel-title" aria-live="polite" aria-atomic="true">
      <div className="location-panel__rule" aria-hidden="true" />
      <p className="location-panel__eyebrow">{project ? project.statusLabel : area?.eyebrow}</p>
      <h2 id="location-panel-title">{project ? project.title : area?.label}</h2>
      {project ? <p className="location-panel__discipline">{project.discipline}</p> : null}
      <p className="location-panel__description">{project ? project.description : area?.message}</p>

      {project ? (
        <>
          <div className="location-panel__route" aria-label="Chamber markers">
            <span className="location-panel__route-label">
              {project.status === "source-pending" ? "CHAMBER CONTEXT" : "PLANNED STUDY FLOW"}
            </span>
            <ol>
              {project.route.map((marker) => (
                <li key={marker}>{marker}</li>
              ))}
            </ol>
          </div>
          {project.sourceNote ? <p className="location-panel__source-note">{project.sourceNote}</p> : null}
        </>
      ) : null}

      <div className="location-panel__actions">
        {location !== "core" ? (
          <button type="button" className="button button--secondary" onClick={() => onNavigate("core")}>
            RETURN TO CORE
          </button>
        ) : null}
        {hoveredLocation && hoveredLocation !== location && hoverDetails ? (
          <button type="button" className="button button--text" onClick={() => onNavigate(hoveredLocation)}>
            EXPLORE {isProjectLocation(hoveredLocation) ? projectById[hoveredLocation].title : labLocations[hoveredLocation].label}
          </button>
        ) : null}
      </div>
    </section>
  );
}

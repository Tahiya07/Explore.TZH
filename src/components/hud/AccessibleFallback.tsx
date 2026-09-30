"use client";

import { labLocations, navTargets, projects, technologies } from "@/data/projects";
import type { LocationId } from "@/types/lab";

import { AudioToggle } from "./AudioToggle";
import { LocationPanel } from "./LocationPanel";
import type { NavigateToLocation } from "./types";

interface AccessibleFallbackProps {
  location: LocationId;
  hoveredLocation?: LocationId | null;
  onNavigate: NavigateToLocation;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  audioAvailable?: boolean;
}

/**
 * A complete textual route through the lab for browsers without WebGL and for
 * visitors who choose not to use the spatial renderer.
 */
export function AccessibleFallback({
  location,
  hoveredLocation,
  onNavigate,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  audioAvailable,
}: AccessibleFallbackProps) {
  return (
    <main className="accessible-fallback" id="accessible-lab" tabIndex={-1}>
      <header className="accessible-fallback__hero">
        <p className="accessible-fallback__eyebrow">ACCESSIBLE LABORATORY INTERFACE</p>
        <h1>TAHIYA // AI LAB</h1>
        <p>
          A research-laboratory portfolio presented as a readable route through its core, project chambers,
          observatory, engineering systems, and contact terminal.
        </p>
        <p className="accessible-fallback__notice" role="status">
          The immersive renderer is unavailable, so this text interface keeps every destination reachable.
        </p>
        <div className="accessible-fallback__utilities">
          <AudioToggle enabled={soundEnabled} onToggle={onToggleSound} available={audioAvailable} />
          <button type="button" className="button button--secondary" onClick={onToggleReducedMotion} aria-pressed={reducedMotion}>
            {reducedMotion ? "MOTION REDUCED" : "REDUCE MOTION"}
          </button>
        </div>
      </header>

      <nav className="accessible-fallback__nav" aria-label="Laboratory route">
        <h2>System map</h2>
        <ul>
          {navTargets.map((target) => (
            <li key={target.id}>
              <button type="button" aria-current={location === target.id ? "location" : undefined} onClick={() => onNavigate(target.id)}>
                {target.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <LocationPanel location={location} hoveredLocation={hoveredLocation} onNavigate={onNavigate} />

      <section className="accessible-fallback__projects" aria-labelledby="fallback-projects-title">
        <p className="accessible-fallback__eyebrow">PROJECT CHAMBERS</p>
        <h2 id="fallback-projects-title">Prepared spaces, honest status</h2>
        <ol>
          {projects.map((project) => (
            <li key={project.id}>
              <article className="accessible-fallback__project">
                <div>
                  <p>{project.index} / {project.statusLabel}</p>
                  <h3>{project.title}</h3>
                  <p>{project.discipline}</p>
                  <p>{project.description}</p>
                </div>
                <button type="button" className="button button--secondary" onClick={() => onNavigate(project.id)}>
                  OPEN CHAMBER
                </button>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="accessible-fallback__systems" aria-labelledby="fallback-systems-title">
        <div>
          <p className="accessible-fallback__eyebrow">RESEARCH OBSERVATORY</p>
          <h2 id="fallback-systems-title">An archive designed to grow</h2>
          <p>{labLocations.research.message}</p>
          <button type="button" className="button button--secondary" onClick={() => onNavigate("research")}>
            VISIT OBSERVATORY
          </button>
        </div>
        <div>
          <p className="accessible-fallback__eyebrow">ENGINEERING SYSTEMS</p>
          <h2>Technology constellation</h2>
          <p>{labLocations.engineering.message}</p>
          <ul className="accessible-fallback__technology-list" aria-label="Technology areas">
            {technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <button type="button" className="button button--secondary" onClick={() => onNavigate("engineering")}>
            VISIT SYSTEMS
          </button>
        </div>
      </section>

      <footer className="accessible-fallback__footer">
        <p>LET&apos;S BUILD.</p>
        <h2>AI / RESEARCH / SYSTEMS</h2>
        <p>{labLocations.contact.message}</p>
        <button type="button" className="button button--primary" onClick={() => onNavigate("contact")}>
          OPEN CONTACT TERMINAL
        </button>
      </footer>
    </main>
  );
}

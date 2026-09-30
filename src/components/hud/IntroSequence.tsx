"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface IntroSequenceProps {
  complete: boolean;
  onEnter: () => void;
  reducedMotion: boolean;
}

const bootSignals = [
  "NEURAL ENVIRONMENT ONLINE",
  "RESEARCHER PROFILE: TAHIYA",
  "LABORATORY INTERFACE READY",
] as const;

/** A short, skippable boot state; it does not manufacture a loading percentage. */
export function IntroSequence({ complete, onEnter, reducedMotion }: IntroSequenceProps) {
  const [interfaceReady, setInterfaceReady] = useState(false);

  useEffect(() => {
    setInterfaceReady(true);
  }, []);

  if (complete) return null;

  return (
    <section
      className="intro-sequence"
      aria-labelledby="intro-title"
      data-reduced-motion={reducedMotion}
    >
      <div className="intro-sequence__grain" aria-hidden="true" />
      <div className="intro-sequence__content">
        <p className="intro-sequence__eyebrow">SYSTEM INITIALIZING</p>
        <div className="intro-sequence__signals" role="status" aria-live="polite">
          {bootSignals.map((signal, index) => (
            <p key={signal} className="intro-sequence__signal" style={{ "--signal-index": index } as CSSProperties}>
              <span aria-hidden="true" className="intro-sequence__signal-dot" />
              {signal}
            </p>
          ))}
        </div>

        <div className="intro-sequence__identity">
          <h1 id="intro-title">TAHIYA</h1>
          <p>AI RESEARCHER&nbsp; / &nbsp;ENGINEER&nbsp; / &nbsp;BUILDER</p>
        </div>

        <p className="intro-sequence__description">
          Enter an interactive research facility. Navigation remains available by keyboard and system map.
        </p>

        <div className="intro-sequence__actions">
          <button type="button" className="button button--primary" onClick={onEnter} autoFocus>
            ENTER LAB
          </button>
          <button type="button" className="button button--text" onClick={onEnter}>
            SKIP INTRO
          </button>
        </div>

        <p className="intro-sequence__ready" aria-live="polite">
          {interfaceReady ? "INTERFACE LINK ESTABLISHED" : "LINKING INTERFACE"}
        </p>
      </div>
    </section>
  );
}

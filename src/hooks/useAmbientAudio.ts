"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface AmbientGraph {
  context: AudioContext;
  master: GainNode;
  oscillatorA: OscillatorNode;
  oscillatorB: OscillatorNode;
}

const storageKey = "tahiya-ai-lab:sound";

export function useAmbientAudio() {
  const graphRef = useRef<AmbientGraph | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(true);

  const release = useCallback(() => {
    const graph = graphRef.current;
    if (!graph) return;

    graph.oscillatorA.stop();
    graph.oscillatorB.stop();
    void graph.context.close();
    graphRef.current = null;
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined" || !window.AudioContext) {
      setAvailable(false);
      return false;
    }

    try {
      const context = new window.AudioContext();
      const master = context.createGain();
      const oscillatorA = context.createOscillator();
      const oscillatorB = context.createOscillator();
      const drift = context.createOscillator();
      const driftGain = context.createGain();

      master.gain.value = 0.018;
      oscillatorA.type = "sine";
      oscillatorA.frequency.value = 47;
      oscillatorB.type = "sine";
      oscillatorB.frequency.value = 94.5;
      drift.type = "sine";
      drift.frequency.value = 0.07;
      driftGain.gain.value = 3.5;

      drift.connect(driftGain);
      driftGain.connect(oscillatorB.frequency);
      oscillatorA.connect(master);
      oscillatorB.connect(master);
      master.connect(context.destination);

      oscillatorA.start();
      oscillatorB.start();
      drift.start();
      await context.resume();

      graphRef.current = { context, master, oscillatorA, oscillatorB };
      setAvailable(true);
      setEnabled(true);
      window.localStorage.setItem(storageKey, "on");
      return true;
    } catch {
      setAvailable(false);
      return false;
    }
  }, []);

  const toggle = useCallback(async () => {
    if (graphRef.current) {
      release();
      setEnabled(false);
      window.localStorage.setItem(storageKey, "off");
      return;
    }

    await start();
  }, [release, start]);

  const activateFromEntry = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(storageKey) === "on") {
      await start();
    }
  }, [start]);

  useEffect(() => release, [release]);

  return { available, enabled, toggle, activateFromEntry };
}

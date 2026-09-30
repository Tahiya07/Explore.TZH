"use client";

import { useEffect, useState } from "react";

const reducedMotionKey = "tahiya-ai-lab:reduced-motion";

export function useMediaPreferences() {
  const [mobile, setMobile] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 780px), (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const manual = window.localStorage.getItem(reducedMotionKey);

    const sync = () => {
      setMobile(mobileQuery.matches);
      setSystemReducedMotion(motionQuery.matches);
      setReducedMotion(manual === null ? motionQuery.matches : manual === "on");
    };

    sync();
    mobileQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      mobileQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  const toggleReducedMotion = () => {
    setReducedMotion((current) => {
      const next = !current;
      window.localStorage.setItem(reducedMotionKey, next ? "on" : "off");
      return next;
    });
  };

  return { mobile, reducedMotion, systemReducedMotion, toggleReducedMotion };
}

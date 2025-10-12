"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScroller({ children }) {
  const lenisOptions = {
    // --- THIS IS THE VALUE WE ARE CHANGING ---
    // A lower value (like 0.07) makes the scroll smoother and less abrupt.
    // The original value was 0.1. Feel free to experiment with this!
    lerp: 0.07, 
    // ------------------------------------------
    duration: 1.5,
    smoothTouch: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroller;
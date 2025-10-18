"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis"; // Import useLenis
import { useEffect } from "react"; // Only useEffect is needed

function SmoothScroller({ children }) {
  const lenis = useLenis(); // Get the lenis instance using the hook

  useEffect(() => {
    // Scroll to top immediately when the component mounts
    // Check if lenis instance exists before calling scrollTo
    if (lenis) {
      lenis.scrollTo(0, { immediate: true }); // Use immediate scroll to top
    } else {
      // Fallback if lenis isn't ready immediately (less likely but safe)
      window.scrollTo(0, 0);
    }
  }, [lenis]); // Re-run effect if lenis instance changes (e.g., on mount)

  const lenisOptions = {
    lerp: 0.07,
    duration: 1.5,
    smoothTouch: true,
  };

  return (
    // No ref needed here anymore
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroller;
"use client"

import { ReactLenis } from 'lenis/react'
import { useState, useEffect } from 'react'

function HOC({children}) {
  // Default to true (mobile) during SSR so Lighthouse/mobile doesn't hydrate the heavy scroller initially
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
     <ReactLenis
        root
        options={{
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 1.5,
        }}
      >
        {children}
      </ReactLenis>
  )
}

export default HOC
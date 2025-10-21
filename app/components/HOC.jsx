"use client"

import { ReactLenis } from 'lenis/react'

function HOC({children}) {


  return (
    <>
      {/* <ReactLenis root /> */}
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
    </>
  )
}

export default HOC
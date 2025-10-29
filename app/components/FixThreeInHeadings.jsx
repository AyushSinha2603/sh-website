"use client";

import { useEffect } from "react";

export default function FixThreeInHeadings() {
  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      if (heading.innerHTML.includes("3")) {
        heading.innerHTML = heading.innerHTML.replace(
          /3/g,
          '<span style="font-weight: bolder; display: inline-block; transform: scale(1.1);">3</span>'
        );
      }
    });
  }, []);

  return null;
}

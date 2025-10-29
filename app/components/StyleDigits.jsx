"use client";

import React from 'react';

// This function recursively walks through React children
const parseAndStyle = (children) => {
  return React.Children.map(children, (child) => {
    
    // 1. If the child is a string, parse it for digits
    if (typeof child === 'string') {
      // Split the string by digits, but keep the digits in the array
      const parts = child.split(/(\d)/g);
      
      return parts.map((part, index) => {
        // Test if the part is a single digit
        if (/^\d$/.test(part)) {
          // If it is, wrap it in our span
          return <span key={index} className="bold-digit">{part}</span>;
        }
        // Otherwise, just return the text
        return part;
      });
    }
    
    // 2. If the child is another React element (like your <span>)
    if (React.isValidElement(child) && child.props.children) {
      // Clone it and run this function on *its* children
      return React.cloneElement(child, {
        ...child.props,
        children: parseAndStyle(child.props.children)
      });
    }
    
    // 3. Otherwise, just return the child as-is (e.g., an emoji)
    return child;
  });
};

/**
 * A safe React component to wrap digits in <span> tags.
 * Use this *inside* your headings.
 */
export default function StyleDigits({ children }) {
  return parseAndStyle(children);
};

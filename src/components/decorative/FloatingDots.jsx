import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';

/**
 * Organic floating dot particles animated with GSAP.
 * Each dot drifts to a new random position on completion (truly organic motion).
 *
 * Props:
 *   count           – number of dots
 *   color           – dot fill color
 *   minSize / maxSize – dot diameter range in px
 *   containerWidth  – bounding box width in px
 *   containerHeight – bounding box height in px
 *   opacity         – dot opacity
 */
const FloatingDots = ({
  count = 10,
  color = 'var(--accent-color)',
  minSize = 3,
  maxSize = 7,
  containerWidth = 300,
  containerHeight = 300,
  opacity = 0.3,
}) => {
  const containerRef = useRef(null);
  const dotRefs = useRef([]);
  const isAlive = useRef(true);

  // Stable dot data generated once
  const dotsData = useRef(
    Array.from({ length: count }, () => ({
      x: Math.random() * 85 + 5,          // % within container
      y: Math.random() * 85 + 5,
      size: minSize + Math.random() * (maxSize - minSize),
      delay: Math.random() * 2.5,
    }))
  );

  useEffect(() => {
    isAlive.current = true;
    dotRefs.current = dotRefs.current.slice(0, count);

    const animateDot = (dot) => {
      if (!dot || !isAlive.current) return;
      gsap.to(dot, {
        x: gsap.utils.random(-35, 35),
        y: gsap.utils.random(-35, 35),
        duration: gsap.utils.random(3.5, 7),
        ease: 'sine.inOut',
        onComplete: () => animateDot(dot),
      });
    };

    // Stagger start to avoid all dots syncing
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      setTimeout(() => animateDot(dot), dotsData.current[i]?.delay * 1000 ?? 0);
    });

    return () => {
      isAlive.current = false;
      if (dotRefs.current.length) {
        gsap.killTweensOf(dotRefs.current.filter(Boolean));
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        pointerEvents: 'none',
      }}
    >
      {dotsData.current.map((dot, i) => (
        <Box
          key={i}
          ref={(el) => { dotRefs.current[i] = el; }}
          sx={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            bgcolor: color,
            opacity,
            willChange: 'transform',
          }}
        />
      ))}
    </Box>
  );
};

export default FloatingDots;

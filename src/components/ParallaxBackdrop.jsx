import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A reusable fixed-position parallax background element.
 *
 * Architecture — two-layer system separates concerns cleanly:
 *   outerRef  →  scroll parallax  (y movement on scroll via GSAP ScrollTrigger)
 *   innerRef  →  mouse parallax   (lateral drift with cursor via mousemove)
 *
 * This prevents GSAP transform conflicts between the two animation types.
 *
 * Props:
 *   speed      – scroll movement factor (positive = moves up as user scrolls)
 *   top / left / right / bottom – CSS positioning of the outer wrapper
 *   rotate     – accumulated rotation over the full scroll range (degrees)
 *   opacity    – static opacity of the element
 *   mouseDepth – mouse-tracking depth factor (0 = none, 0.03 = 3% offset)
 *   zIndex     – z-index of the wrapper (default –1)
 *   children   – the decorative element to animate
 */
const ParallaxBackdrop = ({
  speed = 1,
  top,
  left,
  right,
  bottom,
  children,
  rotate = 0,
  opacity = 0.05,
  mouseDepth = 0,
  zIndex = -1,
}) => {
  const outerRef = useRef(null); // scroll parallax target
  const innerRef = useRef(null); // mouse parallax target

  // ── Scroll parallax ──────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(outerRef.current, {
        y: -120 * speed,
        rotation: rotate,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: Math.max(Math.abs(speed) * 0.8, 0.5),
        },
      });
    });
    return () => ctx.revert();
  }, [speed, rotate]);

  // ── Mouse parallax ───────────────────────────────────────────────
  useEffect(() => {
    if (!mouseDepth || !innerRef.current) return;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) * mouseDepth;
      const offsetY = (e.clientY - centerY) * mouseDepth;
      gsap.to(innerRef.current, {
        x: offsetX,
        y: offsetY,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseDepth]);

  return (
    <Box
      ref={outerRef}
      sx={{
        position: 'fixed',
        top,
        left,
        right,
        bottom,
        opacity,
        zIndex,
        pointerEvents: 'none',
      }}
    >
      <Box ref={innerRef} sx={{ pointerEvents: 'none' }}>
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxBackdrop;

import React, { useEffect, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Generates a smooth SVG polyline path approximating a cosine wave.
 * Uses many small L segments to stay smooth without complex Bezier math.
 */
function generateStrandPath(cx, amplitude, periods, height, phaseOffset = 0) {
  const steps = periods * 24; // 24 points per period → very smooth
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const y = (i / steps) * height;
    const angle = (i / steps) * periods * Math.PI * 2 + phaseOffset;
    const x = cx + amplitude * Math.cos(angle);
    d += i === 0 ? `M ${x.toFixed(2)},${y.toFixed(2)}` : ` L ${x.toFixed(2)},${y.toFixed(2)}`;
  }
  return d;
}

/**
 * Animated SVG double-helix with scroll-linked stroke-draw via GSAP ScrollTrigger.
 *
 * Props:
 *   width        – SVG width in px (default 100)
 *   height       – SVG height in px (default 500)
 *   color1       – Strand 1 color (default CSS var --accent-color)
 *   color2       – Strand 2 color (default CSS var --amber-accent)
 *   opacity      – Overall opacity of the wrapper
 *   animated     – Enable scroll stroke-draw animation (default true)
 *   triggerRef   – External ref used as ScrollTrigger.trigger (falls back to body)
 *   scrollStart  – ScrollTrigger start value
 *   scrollEnd    – ScrollTrigger end value
 */
const DnaHelix = ({
  width = 100,
  height = 500,
  color1 = 'var(--accent-color)',
  color2 = 'var(--amber-accent)',
  opacity = 1,
  animated = true,
  triggerRef = null,
  scrollStart = 'top 75%',
  scrollEnd = 'bottom 25%',
}) => {
  const containerRef = useRef(null);

  const cx = width / 2;
  const amplitude = width * 0.36;
  const periods = Math.max(3, Math.round(height / 80)); // ~1 period per 80px

  // Precompute paths & rungs once
  const { strand1, strand2, rungs } = useMemo(() => {
    const s1 = generateStrandPath(cx, amplitude, periods, height, 0);
    const s2 = generateStrandPath(cx, amplitude, periods, height, Math.PI);

    // Rungs connect strands at their peak/trough positions (every half-period)
    const rungY = [];
    const halfPeriodH = height / (periods * 2);
    for (let i = 0; i <= periods * 2; i++) {
      rungY.push(i * halfPeriodH);
    }
    const rungList = rungY.map((y) => {
      const angle = (y / height) * periods * Math.PI * 2;
      const x1 = cx + amplitude * Math.cos(angle);
      const x2 = cx - amplitude * Math.cos(angle);
      return { x1, x2, y };
    });
    return { strand1: s1, strand2: s2, rungs: rungList };
  }, [cx, amplitude, periods, height]);

  useEffect(() => {
    if (!animated || !containerRef.current) return;

    const trigger = triggerRef?.current ?? (typeof document !== 'undefined' ? document.body : null);

    const ctx = gsap.context(() => {
      const paths = containerRef.current.querySelectorAll('.dna-strand');
      const rungEls = containerRef.current.querySelectorAll('.dna-rung');

      paths.forEach((path) => {
        const len = path.getTotalLength?.();
        if (!len) return;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: scrollStart,
            end: scrollEnd,
            scrub: 1.5,
          },
        });
      });

      if (rungEls.length) {
        gsap.fromTo(
          rungEls,
          { opacity: 0 },
          {
            opacity: 0.55,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: scrollStart,
              end: scrollEnd,
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [animated, scrollStart, scrollEnd]);

  return (
    <Box ref={containerRef} sx={{ opacity, pointerEvents: 'none', lineHeight: 0 }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'visible' }}
      >
        {/* Rungs — ladder connections between strands */}
        {rungs.map((r, i) => (
          <line
            key={i}
            className="dna-rung"
            x1={r.x1.toFixed(2)}
            y1={r.y.toFixed(2)}
            x2={r.x2.toFixed(2)}
            y2={r.y.toFixed(2)}
            stroke={color1}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={animated ? 0 : 0.45}
          />
        ))}
        {/* Strand 1 */}
        <path
          className="dna-strand"
          d={strand1}
          fill="none"
          stroke={color1}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Strand 2 */}
        <path
          className="dna-strand"
          d={strand2}
          fill="none"
          stroke={color2}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

export default DnaHelix;

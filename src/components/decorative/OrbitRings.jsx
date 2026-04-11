import React from 'react';
import { Box } from '@mui/material';

/**
 * Concentric orbital rings with pure-CSS rotation animation.
 * Each ring is an SVG ellipse inside a rotating div.
 * Tilt is baked into the ellipse rx/ry ratio — no transform-stacking issues.
 *
 * Props:
 *   size        – outer diameter of the largest ring (px)
 *   color       – stroke color
 *   opacity     – stroke opacity per ring
 *   count       – number of rings (2–4)
 *   strokeWidth – ring stroke width
 */
const RING_CONFIGS = [
  { rxRatio: 1.0, ryRatio: 0.32, dir: 'cw',  duration: 22 },
  { rxRatio: 0.72, ryRatio: 0.22, dir: 'ccw', duration: 34 },
  { rxRatio: 0.5,  ryRatio: 0.14, dir: 'cw',  duration: 50 },
  { rxRatio: 0.85, ryRatio: 0.10, dir: 'ccw', duration: 18 },
];

const OrbitRings = ({
  size = 500,
  color = 'var(--accent-color)',
  opacity = 0.18,
  count = 3,
  strokeWidth = 1,
}) => {
  const rings = RING_CONFIGS.slice(0, Math.min(count, 4));

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
    >
      {rings.map((ring, i) => {
        const rx = (size / 2) * ring.rxRatio;
        const ry = (size / 2) * ring.ryRatio;
        const w = rx * 2 + strokeWidth * 2;
        const h = ry * 2 + strokeWidth * 2;

        return (
          <Box
            key={i}
            className={ring.dir === 'cw' ? 'orbit-ring-cw' : 'orbit-ring-ccw'}
            sx={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              margin: 'auto',
              width: w,
              height: h,
              animationDuration: `${ring.duration}s`,
            }}
          >
            <svg
              width={w}
              height={h}
              viewBox={`0 0 ${w} ${h}`}
              style={{ overflow: 'visible' }}
            >
              <ellipse
                cx={w / 2}
                cy={h / 2}
                rx={rx}
                ry={ry}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                opacity={opacity}
              />
            </svg>
          </Box>
        );
      })}
    </Box>
  );
};

export default OrbitRings;

import React, { useId, useMemo } from 'react';

/**
 * SVG honeycomb grid using a repeating <pattern>.
 * Efficient: one pattern definition, one fill rect — no per-hex elements.
 *
 * Props:
 *   width      – SVG element width in px
 *   height     – SVG element height in px
 *   cellSize   – circumradius of each hexagon (tip-to-tip = 2 * cellSize)
 *   color      – stroke color
 *   opacity    – stroke opacity
 *   strokeWidth
 */
const HexGrid = ({
  width = 600,
  height = 600,
  cellSize = 36,
  color = 'currentColor',
  opacity = 0.12,
  strokeWidth = 1,
}) => {
  const uid = useId().replace(/:/g, ''); // safe for SVG id attribute
  const patternId = `hex-${uid}`;

  // Pointy-top hexagon geometry
  const r = cellSize;
  const w = r * Math.sqrt(3);       // flat-to-flat width
  const h = r * 2;                  // tip-to-tip height
  const tileW = w;
  const tileH = h * 1.5;           // vertical step between row centres

  // Six vertices of a pointy-top hex centred at (w/2, h/2)
  const hexPath = useMemo(() => {
    const cx = w / 2;
    const cy = h / 2;
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30); // pointy-top
      return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`;
    });
    return `M ${pts.join(' L ')} Z`;
  }, [r, w, h]);

  // Second hex in the tile (shifted right by w/2, down by 3r/2)
  const hexPath2 = useMemo(() => {
    const cx = w;          // right edge of tile
    const cy = h / 2 + h * 0.75; // offset by 1.5 * r
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 180) * (60 * i - 30);
      return `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`;
    });
    return `M ${pts.join(' L ')} Z`;
  }, [r, w, h]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible', pointerEvents: 'none' }}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={tileW.toFixed(2)}
          height={tileH.toFixed(2)}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={hexPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
          <path
            d={hexPath2}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export default HexGrid;

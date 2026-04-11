import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-linked section wrapper using Framer Motion.
 * Animates opacity, scale, and y as the section enters and exits the viewport.
 *
 * Props:
 *   children     – section content
 *   offset       – unused (kept for API compat)
 *   disableExit  – if true, skip the fade-out/scale-down on scroll past
 *   style        – extra inline styles forwarded to motion.div
 */
const MotionSection = ({ children, offset = 0.2, disableExit = false, style = {} }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const inputRange = disableExit ? [0, 0.35] : [0, 0.35, 0.65, 1];
  const opacityOut  = disableExit ? [0, 1]         : [0, 1, 1, 0];
  const scaleOut    = disableExit ? [0.88, 1]       : [0.88, 1, 1, 0.88];
  const yOut        = disableExit ? [60, 0]         : [60, 0, 0, -60];

  const opacity = useTransform(scrollYProgress, inputRange, opacityOut);
  const scale   = useTransform(scrollYProgress, inputRange, scaleOut);
  const y       = useTransform(scrollYProgress, inputRange, yOut);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, position: 'relative', zIndex: 1, ...style }}
    >
      {children}
    </motion.div>
  );
};

export default MotionSection;

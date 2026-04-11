import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Awards from './components/Awards';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import ParallaxBackdrop from './components/ParallaxBackdrop';
import DnaHelix from './components/decorative/DnaHelix';
import HexGrid from './components/decorative/HexGrid';
import OrbitRings from './components/decorative/OrbitRings';
import FloatingDots from './components/decorative/FloatingDots';
import { Box, Fab, Zoom, useScrollTrigger, ThemeProvider, CssBaseline } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ScienceIcon from '@mui/icons-material/Science';
import PsychologyIcon from '@mui/icons-material/Psychology';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getTheme } from './theme';

gsap.registerPlugin(ScrollTrigger);

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#home');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200 }}>
        {children}
      </Box>
    </Zoom>
  );
}

function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const isDark = mode === 'dark';

  const toggleMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // Mouse → CSS vars for body ambient orbs
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const opacityBase = isDark ? 0.07 : 0.1;
  const divider = isDark ? 'rgba(99,179,237,0.15)' : 'rgba(9,9,11,0.1)';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        position: 'relative',
        bgcolor: 'background.default',
        transition: 'background-color 0.5s cubic-bezier(0.4,0,0.2,1)',
        minHeight: '100dvh',
      }}>
        {/* ── Static ambient gradient layer ────────────────────────── */}
        <Box sx={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: isDark
            ? 'radial-gradient(ellipse 80% 60% at 15% 0%, rgba(56,189,248,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 100%, rgba(245,158,11,0.06) 0%, transparent 55%)'
            : 'radial-gradient(ellipse 80% 60% at 15% 0%, rgba(2,132,199,0.07) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 85% 100%, rgba(217,119,6,0.04) 0%, transparent 50%)',
        }} />

        {/* ── Global Parallax Backdrops ─────────────────────────────── */}

        {/* 1. DNA Helix — top-left, scroll-drawn as page scrolls */}
        <ParallaxBackdrop speed={1.2} top="-2%" left="-2%" opacity={isDark ? 0.12 : 0.07} mouseDepth={0.014}>
          <DnaHelix
            width={110} height={680}
            color1={theme.palette.primary.main}
            color2={theme.palette.accent?.main || '#f59e0b'}
            animated
            triggerRef={null}
            scrollStart="top top"
            scrollEnd="bottom bottom"
          />
        </ParallaxBackdrop>

        {/* 2. Hex Grid — top-right, very faint molecular texture */}
        <ParallaxBackdrop speed={0.7} top="2%" right="-8%" opacity={isDark ? 0.045 : 0.03} mouseDepth={0.007}>
          <HexGrid width={650} height={650} cellSize={40} color={theme.palette.primary.main} />
        </ParallaxBackdrop>

        {/* 3. Orbit Rings — bottom-right, slow orbital motion */}
        <ParallaxBackdrop speed={2.2} bottom="-18%" right="-10%" opacity={isDark ? 0.14 : 0.09} mouseDepth={0.018}>
          <OrbitRings size={620} color={theme.palette.primary.main} count={3} strokeWidth={1} />
        </ParallaxBackdrop>

        {/* 4. Floating Dots — mid-left cluster */}
        <ParallaxBackdrop speed={1.0} top="38%" left="1%" opacity={1} mouseDepth={0.01}>
          <FloatingDots
            count={10}
            color={theme.palette.primary.light}
            containerWidth={260} containerHeight={380}
            minSize={2} maxSize={6}
            opacity={isDark ? 0.22 : 0.12}
          />
        </ParallaxBackdrop>

        {/* 5. Science Icon — mid-right accent */}
        <ParallaxBackdrop speed={3} top="55%" right="8%" rotate={180} opacity={opacityBase} mouseDepth={0.02}>
          <ScienceIcon sx={{ fontSize: 220, color: 'primary.main' }} />
        </ParallaxBackdrop>

        {/* 6. Psychology Icon — upper-right accent */}
        <ParallaxBackdrop speed={4.5} top="20%" right="22%" rotate={15} opacity={opacityBase * 0.8} mouseDepth={0.025}>
          <PsychologyIcon sx={{ fontSize: 160, color: 'primary.dark' }} />
        </ParallaxBackdrop>

        {/* ── Sections ──────────────────────────────────────────────── */}
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Hero />

        <Experience />
        <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${divider}, transparent)` }} />

        <Skills />
        <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${divider}, transparent)` }} />

        <Education />
        <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${divider}, transparent)` }} />

        <Certifications />
        <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${divider}, transparent)` }} />

        <Awards />
        <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${divider}, transparent)` }} />

        <Gallery />
        <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${divider}, transparent)` }} />

        <Contact />

        <ScrollTop mode={mode}>
          <Fab
            size="medium"
            aria-label="scroll back to top"
            sx={{
              bgcolor: 'primary.main',
              color: isDark ? '#070a12' : '#ffffff',
              boxShadow: isDark ? '0 8px 24px rgba(56,189,248,0.4)' : '0 8px 24px rgba(2,132,199,0.3)',
              '&:hover': {
                bgcolor: 'primary.light',
                transform: 'scale(1.1)',
                boxShadow: isDark ? '0 12px 32px rgba(56,189,248,0.55)' : '0 12px 32px rgba(2,132,199,0.45)',
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </ThemeProvider>
  );
}

export default App;

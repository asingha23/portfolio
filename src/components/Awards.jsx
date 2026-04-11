import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SectionHeader from './SectionHeader';
import MotionSection from './MotionSection';
import OrbitRings from './decorative/OrbitRings';
import FloatingDots from './decorative/FloatingDots';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@mui/material';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  { name: 'Visionary Award', year: '2026', icon: <EmojiEventsIcon />, color: '#ffd700' },
  { name: 'International Icon Award', year: '2026', icon: <WorkspacePremiumIcon />, color: '#00d4ff' },
  { name: 'Shresth Ratna Award', year: '2026', icon: <EmojiEventsIcon />, color: '#ff4d4d' },
  { name: 'Vidya Ratna Award', year: '2026', icon: <EmojiEventsIcon />, color: '#4dff88' },
];

const Awards = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);  // magnetic targets

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered reveal for award cards
      gsap.from(".award-card", {
        opacity: 0,
        scale: 0.8,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 1.1 Animate Section Underline
      gsap.to(sectionRef.current.querySelector(".section-underline"), {
        width: 80,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });

      // 2. Floating animation for icons
      gsap.to(".award-icon", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          from: "random"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic hover on award cards ───────────────────────────────
  useEffect(() => {
    const PULL = 0.09;
    const cleanups = [];

    cardRefs.current.forEach((card) => {
      if (!card) return;

      const onEnter = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        gsap.to(card, {
          x: (e.clientX - cx) * PULL,
          y: (e.clientY - cy) * PULL,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const onLeave = () => {
        gsap.to(card, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.5)', overwrite: 'auto' });
      };

      card.addEventListener('mousemove', onEnter);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <Box id="awards" ref={sectionRef} sx={{ py: { xs: 12, md: 20 }, bgcolor: 'background.default', color: 'text.primary', position: 'relative', overflow: 'hidden' }}>

      {/* Central ambient gradient */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(56,189,248,0.12) 0%, rgba(245,158,11,0.05) 40%, transparent 65%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Orbit Rings — slow, centered, decorative */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: isDark ? 0.07 : 0.045,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <OrbitRings size={720} color={theme.palette.primary.main} count={3} strokeWidth={1} />
      </Box>

      <MotionSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <SectionHeader align="left" overline="National Recognition" title="Awards & Achievements" />

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
              alignItems: 'stretch'
            }}
          >
            {awards.map((award, index) => (
              <Box
                key={index}
                className="award-card magnetic-target"
                ref={(el) => { cardRefs.current[index] = el; }}
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.33% - 24px)', lg: 'calc(25% - 24px)' },
                  display: 'flex'
                }}
              >
                <Box sx={{
                  textAlign: 'center',
                  p: { xs: 4, md: 5 },
                  width: '100%',
                  bgcolor: isDark ? 'rgba(13,17,23,0.6)' : 'rgba(255,255,255,0.85)',
                  borderRadius: 8,
                  border: `1px solid ${isDark ? award.color + '28' : theme.palette.divider}`,
                  backdropFilter: 'blur(24px)',
                  boxShadow: isDark
                    ? `inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 48px -20px rgba(0,0,0,0.6)`
                    : `inset 0 1px 0 rgba(255,255,255,0.95), 0 20px 48px -16px rgba(9,9,11,0.08)`,
                  transition: 'border-color 0.5s cubic-bezier(0.32,0.72,0,1), box-shadow 0.5s cubic-bezier(0.32,0.72,0,1), background 0.5s cubic-bezier(0.32,0.72,0,1)',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, transparent, ${award.color}bb, transparent)`,
                    opacity: 1,
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 0%, ${award.color}1a 0%, transparent 60%)`,
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(13,17,23,0.8)' : 'rgba(255,255,255,0.99)',
                    borderColor: award.color + '88',
                    boxShadow: isDark
                      ? `inset 0 1px 0 rgba(255,255,255,0.1), 0 32px 72px -20px ${award.color}50`
                      : `inset 0 1px 0 rgba(255,255,255,0.95), 0 32px 72px -20px ${award.color}28`,
                  }
                }}>
                  {/* Floating dots per card — using award color */}
                  <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0, opacity: 0.5 }}>
                    <FloatingDots
                      count={5}
                      color={award.color}
                      containerWidth={240}
                      containerHeight={220}
                      minSize={2}
                      maxSize={5}
                      opacity={isDark ? 0.35 : 0.18}
                    />
                  </Box>

                  <Box className="award-icon" sx={{ color: award.color, mb: 3, position: 'relative', zIndex: 1 }}>
                    {React.cloneElement(award.icon, { sx: { fontSize: 80, filter: `drop-shadow(0 0 16px ${award.color}77)` } })}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, color: 'text.primary', letterSpacing: '-0.03em', lineHeight: 1.2, textWrap: 'balance', position: 'relative', zIndex: 1, fontSize: { xs: '1.25rem', md: '1.4rem' } }}>
                    {award.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.55, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.7rem', position: 'relative', zIndex: 1, color: award.color }}>
                    {award.year}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </MotionSection>
    </Box>
  );
};

export default Awards;

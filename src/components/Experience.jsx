import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Divider, Chip, Stack, Paper, useTheme } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import SectionHeader from './SectionHeader';
import MotionSection from './MotionSection';
import HexGrid from './decorative/HexGrid';
import DnaHelix from './decorative/DnaHelix';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Associate Professor',
    company: 'PHYSICSWALLAH ZOOLOGY',
    duration: '2024 - Present',
    details: 'Leading advanced academic initiatives in biological sciences and zoological research.',
    current: true,
  },
  {
    role: 'Guest Zoology Faculty',
    company: 'Dirasa Pvt. School',
    duration: '2023 - 2024',
    details: 'Delivering specialized zoological curriculum and mentoring advanced students.',
  },
  {
    role: 'Guest Zoology Faculty',
    company: 'NM Girls Academy',
    duration: '2022 - 2023',
    details: 'Focused on human anatomy and physiological sciences education.',
  },
  {
    role: 'Guest Zoology Faculty',
    company: 'C.A Gajole',
    duration: '2021 - 2022',
    details: 'Instructing biological diversity and genetic fundamentals.',
  },
  {
    role: 'Zoology Faculty',
    company: 'NCSM WB GOVT.',
    duration: '2019 - 2021',
    details: 'Government-affiliated academic role focused on regional science education.',
  },
  {
    role: 'Zoology Faculty',
    company: 'SCIENCEMATE',
    duration: '2017 - 2019',
    details: 'Foundational role in academic biological sciences coaching.',
  },
];

const previousExp = [
  'SciencePlus Academy', 'Progressive Coaching Institute', 'Goalz Academy',
  'Neuron Malda', 'NM Coaching Institute', 'DoctorsZone',
  'Bright Mission', 'DB School', 'Vedantu (Biology SME)'
];

const Experience = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);   // magnetic targets
  const helixRef = useRef(null); // for DnaHelix scroll trigger

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered reveal for experience cards
      gsap.from(".exp-card", {
        opacity: 0,
        x: -40,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
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

      // 2. Reveal for history items
      gsap.from(".history-item", {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".history-panel",
          start: "top 80%",
        }
      });

      // 3. Line reveal for the title
      gsap.from(".history-divider", {
        width: 0,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".history-panel",
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic hover on exp-cards ──────────────────────────────────
  useEffect(() => {
    const PULL = 0.08;
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
    <Box id="experience" ref={sectionRef} sx={{ py: { xs: 10, md: 20 }, position: 'relative', overflow: 'hidden' }}>

      {/* Decorative HexGrid — left background */}
      <Box sx={{ position: 'absolute', left: '-5%', top: '10%', opacity: isDark ? 0.04 : 0.025, pointerEvents: 'none', zIndex: 0 }}>
        <HexGrid width={480} height={700} cellSize={36} color={theme.palette.primary.main} />
      </Box>

      {/* Decorative DnaHelix — far right, scroll-drawn */}
      <Box ref={helixRef} sx={{ position: 'absolute', right: '-2%', top: '5%', opacity: isDark ? 0.1 : 0.06, pointerEvents: 'none', zIndex: 0 }}>
        <DnaHelix
          width={90}
          height={600}
          color1={theme.palette.primary.main}
          color2={theme.palette.accent?.main || '#f59e0b'}
          animated
          triggerRef={helixRef}
          scrollStart="top 80%"
          scrollEnd="bottom 20%"
        />
      </Box>

      <MotionSection>
        <Container maxWidth="lg">
          <SectionHeader align="left" overline="Career Progression" title="Professional Background" />

          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12} lg={7}>
              <Stack spacing={4}>
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="exp-card magnetic-target"
                    ref={(el) => { cardRefs.current[index] = el; }}
                  >
                    <Card sx={{
                      p: { xs: 1, md: 2 },
                      borderLeft: exp.current ? '3px solid' : '1px solid',
                      borderColor: exp.current ? 'primary.main' : 'divider',
                      background: exp.current ? (isDark ? 'rgba(13, 17, 23, 0.7)' : 'rgba(255, 255, 255, 0.85)') : 'transparent',
                      borderRadius: 4,
                      backdropFilter: exp.current ? 'blur(32px)' : 'none',
                      transition: 'border-color 0.5s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.5s cubic-bezier(0.32, 0.72, 0, 1), background 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
                      boxShadow: exp.current
                        ? (isDark
                            ? '0 20px 50px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07), -4px 0 24px -4px rgba(56,189,248,0.25)'
                            : '0 20px 50px -20px rgba(9,9,11,0.08), inset 0 1px 0 rgba(255,255,255,0.95), -4px 0 24px -4px rgba(2,132,199,0.15)')
                        : 'none',
                      '&:hover': {
                        borderColor: 'primary.light',
                        background: isDark ? 'rgba(13,17,23,0.75)' : 'rgba(255,255,255,0.95)',
                        boxShadow: isDark
                          ? '0 30px 60px -20px rgba(0,0,0,0.7), -4px 0 30px -4px rgba(56,189,248,0.3)'
                          : '0 30px 60px -20px rgba(9,9,11,0.12), -4px 0 30px -4px rgba(2,132,199,0.2)',
                      }
                    }}>
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
                          <Box>
                            <Typography variant="h4" sx={{
                              fontWeight: 900,
                              color: 'text.primary',
                              mb: 0.5,
                              fontSize: { xs: '1.5rem', md: '1.75rem' },
                              letterSpacing: '-0.02em'
                            }}>
                              {exp.role} <Box component="span" sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 500, mx: 1 }}>•</Box> <Box component="span" sx={{ fontSize: '1.1rem', color: 'primary.main', fontWeight: 600 }}>{exp.company}</Box>
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.6 }}>
                              {exp.duration}
                            </Typography>
                          </Box>
                          {exp.current && (
                            <Chip
                              label="ACTIVE"
                              sx={{
                                bgcolor: isDark ? 'rgba(56,189,248,0.12)' : 'rgba(2,132,199,0.1)',
                                color: 'primary.main',
                                fontWeight: 900,
                                borderRadius: 2,
                                px: 3,
                                border: `1px solid ${isDark ? 'rgba(56,189,248,0.35)' : 'rgba(2,132,199,0.3)'}`,
                                animation: 'glow-pulse 2s ease-in-out infinite',
                                fontSize: '0.75rem',
                                letterSpacing: 1.5,
                              }}
                            />
                          )}
                        </Stack>
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.7, opacity: 0.8 }}>{exp.details}</Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Paper className="history-panel" sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 6,
                background: isDark ? 'rgba(24, 24, 27, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(32px)',
                position: { lg: 'sticky' },
                top: 120,
                boxShadow: isDark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 100px -30px rgba(0,0,0,0.7)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 40px 100px -30px rgba(9, 9, 11, 0.05)',
                border: `1px solid ${theme.palette.divider}`,
                backgroundImage: 'none',
                overflow: 'hidden',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 4,
                  height: '100%',
                  background: `linear-gradient(180deg, transparent, ${theme.palette.accent?.main || '#f59e0b'} 30%, transparent)`,
                  opacity: 0.8,
                }
              }}>
                <Typography variant="h4" sx={{ mb: 6, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 2, color: 'text.primary', letterSpacing: '-0.02em' }}>
                  <Divider className="history-divider" sx={{ width: 40, bgcolor: 'primary.main', height: 4, borderRadius: 2, opacity: 0.5 }} />
                  Academic History
                </Typography>
                <Grid container spacing={2}>
                  {previousExp.map((item, index) => (
                    <Grid item xs={12} key={index} className="history-item">
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(9, 9, 11, 0.02)',
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                        '&:hover': {
                          bgcolor: isDark ? 'rgba(56,189,248,0.07)' : 'rgba(2,132,199,0.06)',
                          borderColor: 'primary.main',
                          borderLeft: `2px solid`,
                          borderLeftColor: 'primary.main',
                          transform: 'translateX(10px)',
                          boxShadow: isDark ? '2px 0 0 0 rgba(56,189,248,0.3)' : '2px 0 0 0 rgba(2,132,199,0.2)',
                        }
                      }}>
                        <Typography sx={{
                          fontWeight: 900,
                          color: 'primary.main',
                          fontSize: '0.75rem',
                          opacity: 0.5,
                          width: 24,
                          textAlign: 'right'
                        }}>
                          {String(index + 1).padStart(2, '0')}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.95rem' }}>{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                  <Paper sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '100px',
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(9, 9, 11, 0.02)',
                    border: `1px solid ${theme.palette.divider}`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 10px 20px ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'}`,
                    backgroundImage: 'none'
                  }}>
                    <Typography variant="h5" className="gradient-text" sx={{
                      fontWeight: 900,
                      letterSpacing: 3,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}>
                      Professional Excellence Since 2015
                    </Typography>
                  </Paper>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </MotionSection>
    </Box>
  );
};

export default Experience;

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container, Grid, Avatar, Stack, Chip, useTheme } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ScienceIcon from '@mui/icons-material/Science';
import PetsIcon from '@mui/icons-material/Pets';
import NatureIcon from '@mui/icons-material/Nature';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const icon3Ref = useRef(null);
  const bgLayerRef = useRef(null);   // depth 0.025 — furthest bg icons
  const midLayerRef = useRef(null);  // depth 0.012 — secondary bg icons

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(".hero-chip", { opacity: 0, y: 20, stagger: 0.1, duration: 0.8 })
        .from(titleRef.current, { opacity: 0, x: -50, filter: "blur(10px)", duration: 1 }, "-=0.4")
        .from(subtitleRef.current, { opacity: 0, y: 30, duration: 1 }, "-=0.6")
        .from(buttonsRef.current, { opacity: 0, scale: 0.8, duration: 0.8 }, "-=0.6")
        .from(".stat-item", { opacity: 0, y: 30, stagger: 0.2, duration: 0.8 }, "-=0.4")
        .from(imageRef.current, { opacity: 0, scale: 0.8, rotate: 5, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "-=1.2");

      // 1.1 Count-up Animation for Stats
      const statNumbers = [
        { el: ".stat-num-1", value: 9 },
        { el: ".stat-num-2", value: 34 },
        { el: ".stat-num-3", value: 5 }
      ];

      statNumbers.forEach(stat => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%"
          },
          onUpdate: () => {
            const target = document.querySelector(stat.el);
            if (target) target.textContent = Math.floor(obj.val) + "+";
          }
        });
      });

      // 2. Floating Animations for background icons
      gsap.to([icon1Ref.current, icon2Ref.current, icon3Ref.current], {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 3. Scroll Parallax
      gsap.to(icon1Ref.current, {
        y: -300,
        rotate: 180,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(icon2Ref.current, {
        y: -500,
        rotate: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(icon3Ref.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5
        }
      });

      gsap.to(".hero-parallax-4", {
        y: -400,
        x: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });

      gsap.to(".hero-parallax-5", {
        y: -150,
        x: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });

      // 4. Scroll Down Indicator Animation
      gsap.to(".scroll-indicator", {
        y: 15,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });

      gsap.to(".avatar-ring", {
        rotation: 360,
        repeat: -1,
        duration: 20,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Multi-layer mouse-tracking parallax ──────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // bg icons — deepest depth (most movement)
      if (bgLayerRef.current) {
        gsap.to(bgLayerRef.current, {
          x: dx * 0.025,
          y: dy * 0.025,
          duration: 1.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      // mid icons — medium depth
      if (midLayerRef.current) {
        gsap.to(midLayerRef.current, {
          x: dx * 0.012,
          y: dy * 0.012,
          duration: 1.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
      // profile image — subtle depth
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: dx * 0.006,
          y: dy * 0.006,
          duration: 2.0,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    section.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      ref={sectionRef}
      id="home"
      component="section"
      sx={{
        padding: { xs: '120px 24px', md: '180px 0' },
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        transition: 'background-color 0.5s ease',
      }}
    >
      {/* Background Elements — layer 1 (deepest parallax depth) */}
      <Box ref={bgLayerRef} sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <Box ref={icon1Ref} sx={{ position: 'absolute', top: '10%', left: '5%', opacity: isDark ? 0.08 : 0.04, display: { xs: 'none', md: 'block' } }}>
          <ScienceIcon sx={{ fontSize: 130, color: 'primary.main' }} />
        </Box>
        <Box ref={icon2Ref} sx={{ position: 'absolute', bottom: '10%', right: '5%', opacity: isDark ? 0.08 : 0.04, display: { xs: 'none', md: 'block' } }}>
          <PetsIcon sx={{ fontSize: 180, color: 'text.secondary' }} />
        </Box>
        <Box ref={icon3Ref} sx={{ position: 'absolute', top: '40%', right: '15%', opacity: isDark ? 0.05 : 0.02, display: { xs: 'none', md: 'block' } }}>
          <NatureIcon sx={{ fontSize: 100, color: 'primary.light' }} />
        </Box>
      </Box>

      {/* Additional Parallax Elements — layer 2 (mid depth) */}
      <Box ref={midLayerRef} sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <Box className="hero-parallax-4" sx={{ position: 'absolute', top: '20%', right: '40%', opacity: isDark ? 0.03 : 0.01, display: { xs: 'none', md: 'block' } }}>
          <ScienceIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        </Box>
        <Box className="hero-parallax-5" sx={{ position: 'absolute', bottom: '30%', left: '20%', opacity: isDark ? 0.03 : 0.01, display: { xs: 'none', md: 'block' } }}>
          <NatureIcon sx={{ fontSize: 140, color: 'primary.light' }} />
        </Box>
      </Box>

      {/* Primary Sky Glow */}
      <Box sx={{ 
        position: 'absolute', 
        top: '30%', 
        left: '30%', 
        width: '100vw', 
        height: '100vh', 
        background: `radial-gradient(ellipse 60% 50% at 40% 40%, ${isDark ? 'rgba(56, 189, 248, 0.07)' : 'rgba(2, 132, 199, 0.05)'} 0%, transparent 70%)`,
        zIndex: 0,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />
      {/* Secondary Amber Orb */}
      <Box sx={{ 
        position: 'absolute', 
        top: '70%',
        left: '70%',
        width: '80vw',
        height: '80vh',
        background: `radial-gradient(ellipse 50% 40% at 60% 60%, ${isDark ? 'rgba(245, 158, 11, 0.05)' : 'rgba(217, 119, 6, 0.04)'} 0%, transparent 70%)`,
        zIndex: 0,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={8} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Box>
                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ mb: 3, flexWrap: 'wrap', gap: 1.5, justifyContent: { xs: 'center', md: 'flex-start' } }}
                >
                  <Chip 
                    className="hero-chip"
                    icon={<ScienceIcon style={{ fontSize: 16, color: 'inherit' }} />} 
                    label="Human Anatomy Specialist" 
                    sx={{ 
                      bgcolor: isDark ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.05)', 
                      color: 'primary.main', 
                      fontWeight: 700, 
                      px: 1.5,
                      border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)'}`,
                      boxShadow: isDark ? '0 0 20px rgba(56, 189, 248, 0.1)' : '0 0 20px rgba(2, 132, 199, 0.05)',
                      '& .MuiChip-icon': { color: 'inherit' } 
                    }} 
                  />
                  <Chip 
                    className="hero-chip"
                    icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mr: 0.5 }} />} 
                    label="Zoology" 
                    variant="outlined"
                    sx={{ borderColor: 'divider', color: 'text.secondary', fontWeight: 600, px: 1.5 }} 
                  />
                </Stack>
                
                <Typography ref={titleRef} variant="h1" gutterBottom className="gradient-text">
                  ABHISHEK SINGHA
                </Typography>
                
                <Box ref={subtitleRef}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, mb: 3, maxWidth: 540, mx: { xs: 'auto', md: 0 }, opacity: 0.95, fontSize: '1.3rem', lineHeight: 1.75, textWrap: 'balance' }}>
                    Bridging Biology, Anatomy, and Health Science through nearly a decade of academic excellence.
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '520px', mb: 5, fontSize: '1rem', lineHeight: 1.8, mx: { xs: 'auto', md: 0 }, opacity: 0.6 }}>
                    Currently serving as <Box component="span" sx={{ color: 'primary.main', fontWeight: 700, opacity: 1 }}>Associate Professor at PHYSICSWALLAH</Box>.
                  </Typography>
                </Box>
              </Box>

              <Stack 
                ref={buttonsRef}
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3} 
                sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'center' }}
              >
                {/* Primary CTA — Button-in-Button pill */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleScrollTo('experience')}
                  sx={{ 
                    py: 1.8,
                    pl: 4,
                    pr: 1.5,
                    borderRadius: '100px',
                    minWidth: 220,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.02em',
                    boxShadow: isDark ? '0 16px 48px -12px rgba(56, 189, 248, 0.6)' : '0 16px 48px -12px rgba(2, 132, 199, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                      transform: 'translateY(-3px)',
                      boxShadow: isDark ? '0 28px 56px -12px rgba(56, 189, 248, 0.7)' : '0 28px 56px -12px rgba(2, 132, 199, 0.55)',
                    },
                    '&:active': { transform: 'translateY(0) scale(0.98)' }
                  }}
                >
                  Academic Experience
                  <Box sx={{ 
                    width: 36, height: 36, borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', flexShrink: 0,
                    transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
                    '.MuiButton-root:hover &': { transform: 'translate(2px, -2px) scale(1.1)' }
                  }}>↗</Box>
                </Button>

                {/* Secondary CTA — ghost pill */}
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ContactMailIcon sx={{ fontSize: 18 }} />}
                  onClick={() => handleScrollTo('contact')}
                  sx={{ 
                    py: 1.8,
                    px: 4,
                    borderRadius: '100px',
                    borderWidth: '1px',
                    minWidth: 180, 
                    borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(9,9,11,0.12)',
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    backdropFilter: 'blur(8px)',
                    bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(9,9,11,0.02)',
                    '&:hover': { 
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      bgcolor: isDark ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.04)',
                      transform: 'translateY(-3px)'
                    },
                    '&:active': { transform: 'translateY(0) scale(0.98)' }
                  }}
                >
                  Get in Touch
                </Button>
              </Stack>

              <Stack
                ref={statsRef}
                direction="row"
                spacing={{ xs: 3, sm: 6 }}
                sx={{
                  pt: 6,
                  borderTop: `1px solid ${isDark ? 'rgba(99,179,237,0.15)' : 'rgba(9,9,11,0.1)'}`,
                  width: '100%',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box className="stat-item" sx={{ textAlign: 'center' }}>
                  <Typography className="stat-num-1" variant="h3" sx={{ fontWeight: 950, color: 'var(--amber-accent)', fontSize: { xs: '3rem', md: '4rem' }, lineHeight: 1, filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.5))' }}>0+</Typography>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 4, fontWeight: 900, color: 'text.secondary', fontSize: '0.8rem', mt: 0.5, display: 'block' }}>Years EXP</Typography>
                </Box>
                <Box sx={{ width: '1px', height: 50, bgcolor: isDark ? 'rgba(99,179,237,0.15)' : 'divider', display: { xs: 'none', sm: 'block' }, alignSelf: 'center' }} />
                <Box className="stat-item" sx={{ textAlign: 'center' }}>
                  <Typography className="stat-num-2" variant="h3" sx={{ fontWeight: 950, color: 'primary.main', fontSize: { xs: '3rem', md: '4rem' }, lineHeight: 1, filter: `drop-shadow(0 0 12px ${isDark ? 'rgba(56,189,248,0.5)' : 'rgba(2,132,199,0.4)'})` }}>0+</Typography>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 4, fontWeight: 900, color: 'text.secondary', fontSize: '0.8rem', mt: 0.5, display: 'block' }}>Certificates</Typography>
                </Box>
                <Box sx={{ width: '1px', height: 50, bgcolor: isDark ? 'rgba(99,179,237,0.15)' : 'divider', display: { xs: 'none', sm: 'block' }, alignSelf: 'center' }} />
                <Box className="stat-item" sx={{ textAlign: 'center' }}>
                  <Typography className="stat-num-3" variant="h3" sx={{ fontWeight: 950, color: 'var(--amber-accent)', fontSize: { xs: '3rem', md: '4rem' }, lineHeight: 1, filter: 'drop-shadow(0 0 12px rgba(245,158,11,0.5))' }}>0+</Typography>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 4, fontWeight: 900, color: 'text.secondary', fontSize: '0.8rem', mt: 0.5, display: 'block' }}>Awards</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              ref={imageRef}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Rotating Decorative Ring (outer) */}
              <Box
                className="avatar-ring"
                sx={{
                  position: 'absolute',
                  width: { xs: 340, sm: 440, md: 520 },
                  height: { xs: 340, sm: 440, md: 520 },
                  borderRadius: '50%',
                  border: `2px dashed ${theme.palette.primary.main}`,
                  opacity: 0.4,
                  zIndex: 0,
                  filter: `drop-shadow(0 0 6px ${isDark ? 'rgba(56,189,248,0.3)' : 'rgba(2,132,199,0.2)'})`,
                }}
              />

              {/* Inner amber accent ring */}
              <Box sx={{
                position: 'absolute',
                width: { xs: 300, sm: 400, md: 476 },
                height: { xs: 300, sm: 400, md: 476 },
                borderRadius: '50%',
                border: `1.5px solid ${isDark ? 'rgba(245,158,11,0.3)' : 'rgba(217,119,6,0.2)'}`,
                boxShadow: isDark ? '0 0 40px rgba(56,189,248,0.08), inset 0 0 40px rgba(245,158,11,0.05)' : 'none',
                zIndex: 0
              }} />

              {/* Double-Bezel Outer Shell */}
              <Box sx={{
                position: 'relative', zIndex: 1,
                p: '10px',
                borderRadius: '50%',
                background: isDark ? 'rgba(24,24,27,0.5)' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(9,9,11,0.06)'}`,
                boxShadow: isDark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 100px -20px rgba(0,0,0,0.5)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 40px 100px -20px rgba(9,9,11,0.08)',
                backdropFilter: 'blur(4px)',
              }}>
                {/* Inner Core */}
                <Avatar
                  src={profileImg}
                  alt="Abhishek Singha"
                  sx={{
                    width: { xs: 268, sm: 368, md: 436 },
                    height: { xs: 268, sm: 368, md: 436 },
                    display: 'block',
                    boxShadow: isDark
                      ? '0 0 0 1px rgba(56,189,248,0.1), inset 0 0 60px rgba(0,0,0,0.3)'
                      : '0 0 0 1px rgba(2,132,199,0.08)',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Container>

      {/* Scroll Down Indicator */}
      <Box 
        className="scroll-indicator"
        sx={{ 
          position: 'absolute', 
          bottom: 40, 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          opacity: 0.5,
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={() => handleScrollTo('experience')}
      >
        <Typography variant="caption" sx={{ letterSpacing: 4, fontWeight: 900, textTransform: 'uppercase' }}>Scroll</Typography>
        {/* <Box sx={{ width: 1, height: 40, bgcolor: 'primary.main', borderRadius: 1 }} /> */}
      </Box>
    </Box>
  );
};

export default Hero;


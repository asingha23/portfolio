import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Paper, Stack, useTheme } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ScienceIcon from '@mui/icons-material/Science';
import SchoolIcon from '@mui/icons-material/School';
import SectionHeader from './SectionHeader';
import MotionSection from './MotionSection';
import HexGrid from './decorative/HexGrid';
import DnaHelix from './decorative/DnaHelix';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Biological Sciences',
    icon: <BiotechIcon />,
    color: 'biology',
    skills: [
      { name: 'Zoology', level: 95 },
      { name: 'Human Anatomy', level: 98 },
      { name: 'Cellular Biology', level: 90 },
      { name: 'Genetics', level: 85 }
    ]
  },
  {
    title: 'Medical & Health',
    icon: <ScienceIcon />,
    color: 'medical',
    skills: [
      { name: 'Physiology', level: 92 },
      { name: 'Lifestyle Medicine', level: 88 },
      { name: 'Nutrition & Dietetics', level: 85 },
      { name: 'Public Health', level: 80 }
    ]
  },
  {
    title: 'Psychology & Behavioral',
    icon: <PsychologyIcon />,
    color: 'psychology',
    skills: [
      { name: 'Animal Behavior', level: 90 },
      { name: 'Human Psychology', level: 85 },
      { name: 'Dementia Care', level: 80 },
      { name: 'Child Mentality', level: 75 }
    ]
  },
  {
    title: 'Academic & Tech',
    icon: <SchoolIcon />,
    color: 'tech',
    skills: [
      { name: 'Teaching & Mentorship', level: 95 },
      { name: 'Content Development', level: 90 },
      { name: 'Artificial Intelligence', level: 75 },
      { name: 'Communication', level: 95 }
    ]
  }
];

const RadialSkill = ({ name, level, color }) => {
  const theme = useTheme();
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;
  const accentColor = theme.palette.custom[color] || theme.palette.primary.main;

  return (
    <Box sx={{ textAlign: 'center', width: 110 }}>
      <Box sx={{ position: 'relative', width: 110, height: 110 }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          {/* Track ring */}
          <circle cx="55" cy="55" r={radius} fill="transparent" stroke={theme.palette.divider} strokeWidth="6" opacity="0.5" />
          {/* Progress ring */}
          <circle
            className="skill-circle"
            data-offset={offset}
            cx="55" cy="55" r={radius}
            fill="transparent"
            stroke={accentColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            transform="rotate(-90 55 55)"
            style={{ filter: `drop-shadow(0 0 8px ${accentColor}88)` }}
          />
        </svg>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <Typography sx={{ fontWeight: 900, lineHeight: 1, fontSize: '1.15rem', color: 'text.primary' }}>
            <span className="skill-pct-num" data-val={level}>0</span>%
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" sx={{
        mt: 1, fontWeight: 700, display: 'block',
        color: 'text.secondary', fontSize: '0.7rem',
        textTransform: 'uppercase', letterSpacing: 1.2,
        lineHeight: 1.3
      }}>
        {name}
      </Typography>
    </Box>
  );
};

const Skills = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);  // magnetic targets

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the whole section
      gsap.from(".skill-category-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 2. Radial skill reveal
      const skillCircles = document.querySelectorAll('.skill-circle');
      skillCircles.forEach((circle) => {
        const finalOffset = circle.getAttribute('data-offset');
        gsap.to(circle, {
          strokeDashoffset: finalOffset,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: circle,
            start: "top 90%",
          }
        });
      });

      // 2.1 Percentage count-up
      const pctNums = document.querySelectorAll('.skill-pct-num');
      pctNums.forEach((num) => {
        const targetVal = parseInt(num.getAttribute('data-val'));
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: num,
            start: "top 90%",
          },
          onUpdate: () => {
            num.textContent = Math.floor(obj.val);
          }
        });
      });

      // 2.2 Animate Section Underline
      gsap.to(sectionRef.current.querySelector(".section-underline"), {
        width: 80,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });

      // 3. Background Parallax
      gsap.to(".skill-bg-parallax-1", {
        y: -300,
        rotate: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      gsap.to(".skill-bg-parallax-2", {
        y: -150,
        rotate: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic hover on skill category cards ───────────────────────
  useEffect(() => {
    const PULL = 0.07;
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
    <Box ref={sectionRef} sx={{ py: 15, position: 'relative', overflow: 'hidden' }}>
      {/* Background Decor — kept for GSAP parallax */}
      <Box className="skill-bg-parallax-1" sx={{ position: 'absolute', top: '10%', right: '5%', opacity: isDark ? 0.05 : 0.02, zIndex: 0 }}>
        <ScienceIcon sx={{ fontSize: 200, color: 'primary.main' }} />
      </Box>
      <Box className="skill-bg-parallax-2" sx={{ position: 'absolute', bottom: '15%', left: '2%', opacity: isDark ? 0.05 : 0.02, zIndex: 0 }}>
        <BiotechIcon sx={{ fontSize: 250, color: 'primary.light' }} />
      </Box>

      {/* HexGrid — bottom-right molecular texture */}
      <Box sx={{ position: 'absolute', bottom: '-5%', right: '-4%', opacity: isDark ? 0.04 : 0.025, pointerEvents: 'none', zIndex: 0 }}>
        <HexGrid width={500} height={500} cellSize={38} color={theme.palette.primary.main} />
      </Box>

      {/* DnaHelix — left side, scroll-drawn */}
      <Box sx={{ position: 'absolute', left: '-1%', top: '5%', opacity: isDark ? 0.11 : 0.065, pointerEvents: 'none', zIndex: 0 }}>
        <DnaHelix
          width={80}
          height={620}
          color1={theme.palette.primary.main}
          color2={theme.palette.accent?.main || '#f59e0b'}
          animated
          triggerRef={sectionRef}
          scrollStart="top 85%"
          scrollEnd="bottom 20%"
        />
      </Box>

      <MotionSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <SectionHeader overline="Expertise" title="Domain Skills" />

          <Grid container spacing={4} justifyContent="center">
            {skillCategories.map((category, idx) => (
              <Grid item xs={12} md={6} key={idx} className="skill-category-card">
                <Paper
                  className="magnetic-target"
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  sx={{
                p: { xs: 4, md: 5 }, 
                borderRadius: 6, 
                bgcolor: isDark ? 'rgba(24, 24, 27, 0.45)' : 'rgba(255, 255, 255, 0.75)', 
                backdropFilter: 'blur(16px)',
                boxShadow: isDark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 50px -20px rgba(0,0,0,0.5)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 20px 50px -20px rgba(9,9,11,0.06)',
                border: `1px solid ${theme.palette.divider}`,
                height: '100%',
                backgroundImage: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, transparent, ${theme.palette.custom[category.color] || theme.palette.primary.main}, transparent)`,
                  opacity: 1,
                },
                '&:hover': {
                  borderColor: theme.palette.custom[category.color] || theme.palette.primary.main,
                  boxShadow: isDark
                    ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px ${theme.palette.custom[category.color] || theme.palette.primary.main}22`
                    : `inset 0 1px 0 rgba(255,255,255,0.9), 0 30px 60px -20px rgba(9,9,11,0.08), 0 0 0 1px ${theme.palette.custom[category.color] || theme.palette.primary.main}18`,
                  bgcolor: isDark ? 'rgba(24, 24, 27, 0.65)' : 'rgba(255, 255, 255, 0.92)',
                }
              }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                  {/* Icon double-bezel */}
                  <Box sx={{
                    p: '3px', borderRadius: '18px 6px 18px 6px',
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(9,9,11,0.03)',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px ${(theme.palette.custom[category.color] || theme.palette.primary.main)}33`
                  }}>
                    <Box sx={{
                      p: 1.75,
                      borderRadius: '15px 4px 15px 4px',
                      bgcolor: theme.palette.custom[category.color] || 'primary.main',
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 8px 24px ${(theme.palette.custom[category.color] || theme.palette.primary.main)}55`
                    }}>
                      {category.icon}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary', fontSize: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.2 }}>{category.title}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, fontSize: '0.65rem', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700 }}>{category.skills.length} skills tracked</Typography>
                  </Box>
                </Stack>

                <Grid container spacing={3} justifyContent="center">
                  {category.skills.map((skill, sIdx) => (
                    <Grid item key={sIdx}>
                      <RadialSkill name={skill.name} level={skill.level} color={category.color} />
                    </Grid>
                  ))}
                </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionSection>
    </Box>
  );
};

export default Skills;

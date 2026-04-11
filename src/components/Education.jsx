import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Stack, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SectionHeader from './SectionHeader';
import ScienceIcon from '@mui/icons-material/Science';
import HealingIcon from '@mui/icons-material/Healing';
import PetsIcon from '@mui/icons-material/Pets';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DnaHelix from './decorative/DnaHelix';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educations = [
  {
    degree: 'BSc in Zoology',
    institution: 'Bundelkhand University',
    year: '2016 - 2019',
    icon: <BiotechIcon />,
    color: '#06b6d4',
  },
  {
    degree: 'BSc in Chemistry',
    institution: 'University of Gour Banga (UGB)',
    year: '2013 - 2016',
    icon: <ScienceIcon />,
    color: '#10b981',
  },
  {
    degree: 'Diploma in Nutrition and Dietetics',
    institution: 'Specialized Healthcare',
    year: '2019 - 2020',
    icon: <HealingIcon />,
    color: '#f59e0b',
  },
  {
    degree: 'Diploma in Human Anatomy and Physiology',
    institution: 'AIU IRELAND',
    year: '2020 - 2021',
    icon: <LocalHospitalIcon />,
    color: '#ef4444',
  },
  {
    degree: 'Diploma in Animal Behavior and Psychology',
    institution: 'AIU IRELAND',
    year: '2021 - 2022',
    icon: <PetsIcon />,
    color: '#8b5cf6',
  },
  {
    degree: 'Diploma in Human Anatomy',
    institution: 'STANFORD UNIVERSITY',
    year: '2022 - 2023',
    icon: <SchoolIcon />,
    color: '#3b82f6',
  },
];

const Education = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const helixLeftRef = useRef(null);
  const helixRightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      // GSAP Scroll Animation: Fan out/Slide into place
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 100,
          rotateX: -20,
          scale: 0.9,
          transformOrigin: "center top"
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 1.1 Animate Section Underline
      const underline = containerRef.current?.parentElement?.querySelector(".section-underline");
      if (underline) {
        gsap.to(underline, {
          width: 80,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        });
      }

      // Background Parallax
      gsap.to(".edu-bg-parallax", {
        y: -250,
        rotate: 15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the card
    const y = e.clientY - rect.top; // y position within the card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: maximum 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <Box id="education" sx={{ py: { xs: 12, md: 20 }, position: 'relative', overflow: 'hidden' }}>
      {/* Background Decor */}
      <Box className="edu-bg-parallax" sx={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', opacity: 0.05, zIndex: 0 }}>
        <SchoolIcon sx={{ fontSize: 400, color: 'primary.main' }} />
      </Box>

      {/* DnaHelix — left side, amber strand, scroll-drawn */}
      <Box ref={helixLeftRef} sx={{ position: 'absolute', left: '-1%', top: '0%', opacity: isDark ? 0.13 : 0.07, pointerEvents: 'none', zIndex: 0 }}>
        <DnaHelix
          width={85}
          height={580}
          color1={theme.palette.accent?.main || '#f59e0b'}
          color2={theme.palette.primary.main}
          animated
          triggerRef={helixLeftRef}
          scrollStart="top 85%"
          scrollEnd="bottom 25%"
        />
      </Box>

      {/* DnaHelix — right side, mirrored, primary strand */}
      <Box ref={helixRightRef} sx={{ position: 'absolute', right: '-1%', bottom: '0%', opacity: isDark ? 0.1 : 0.055, pointerEvents: 'none', zIndex: 0, transform: 'scaleX(-1)' }}>
        <DnaHelix
          width={75}
          height={480}
          color1={theme.palette.primary.main}
          color2={theme.palette.accent?.main || '#f59e0b'}
          animated
          triggerRef={helixRightRef}
          scrollStart="top 90%"
          scrollEnd="bottom 15%"
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader align="left" overline="Academic Foundation" title="Educational Qualifications" />


        <Box 
          ref={containerRef}
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, 
            gap: 4,
            perspective: '1000px' // Added perspective for 3D effect
          }}
        >
          {educations.map((edu, index) => (
            <div 
              key={index}
              className="tilt-card-container"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{ height: '100%' }}
            >
              <div
                ref={el => cardsRef.current[index] = el}
                className="tilt-card organic-card"
                style={{
                  '--card-accent': edu.color,
                  borderLeft: `4px solid ${edu.color}66`,
                  borderBottom: `4px solid ${edu.color}66`,
                }}
              >
                <div className="icon-wrapper" style={{ color: edu.color, boxShadow: `0 0 30px ${edu.color}33` }}>
                  {React.cloneElement(edu.icon, { sx: { fontSize: 48 } })}
                </div>
                
                <Typography variant="h5" className="degree-text">
                  {edu.degree}
                </Typography>
                
                <Typography variant="body1" className="institution-text" sx={{ mb: 2 }}>
                  {edu.institution}
                </Typography>

                <Typography variant="caption" sx={{
                  fontWeight: 900,
                  color: edu.color,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  opacity: 0.9,
                  mt: 'auto',
                  filter: `drop-shadow(0 0 4px ${edu.color}66)`,
                }}>
                  {edu.year}
                </Typography>

                {/* Depth effect layer */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 'inherit',
                  background: `radial-gradient(circle at center, ${edu.color}14 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  zIndex: -1
                }} />
              </div>
            </div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Education;

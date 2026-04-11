import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Card, Stack, Tabs, Tab, useTheme } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import SectionHeader from './SectionHeader';
import MotionSection from './MotionSection';
import HexGrid from './decorative/HexGrid';
import FloatingDots from './decorative/FloatingDots';
import DnaHelix from './decorative/DnaHelix';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certCategories = [
  {
    label: 'Medical & Health',
    items: [
      'GERD (GMC)', 'HIV (GMC)', 'Demystifying Dementia for Primary Care (GMC)',
      'Feeding Problem and Disorders (MIMS EDUCATION)', 'Lifestyle Medicine (MIMS)',
      'Diabetic Therapies End Organ Protection (MIMS)', 'Empowering Quitters (MIMS)',
      'HEPATITIS B (CIMS)', 'Mental Health (UNIVERSITY OF TASMANIA)',
      'INFERTILITY (CIMS)', 'SIDE EFFECTS OF COVID (MIMS)', 'CANCER (UNIVERSITY OF TEXAS)'
    ]
  },
  {
    label: 'Academic & Teaching',
    items: [
      'Special Teacher Training (Reliance Foundation)', 'Biodiversity (UNESCO)',
      'Organic Chemistry (Saylor UK)', 'Basis of Zoology (ALISON UK)',
      'Communication Skill (STANFORD UNIVERSITY)', 'Gender Equality (UNIVERSITY OF PADOVA)',
      'Children Mentality (OPEN LEARN UNIVERSITY UK)', 'Basis of Psychology (CAMBRIDGE INTERNATIONAL, UK)',
      'Cellular Biology (Saylor UK)', 'Genetics (Reliance Foundation)'
    ]
  },
  {
    label: 'Bio-Tech & Specialist',
    items: [
      'ANTIBODIES (BIORAD)', 'PCR (BIORAD)', 'Fundamentals of Chromatography (BIO-RAD)',
      'AI (GOOGLE)', 'Basis of AI (NSDL)', 'Microbes (OPEN UNIVERSITY UK)',
      'Occupational Safety (CIQ UK)', 'Occupational Disorder (CIQ, UK)',
      'Health and Fire (ALISON UK)', 'COVID (DARTMOUTH HEALTH)', 'Chikungunya (MEDSCAPE RUSSIA)'
    ]
  }
];

const Certifications = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-card", {
        opacity: 0,
        y: 24,
        stagger: 0.04,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
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
    }, sectionRef);

    return () => ctx.revert();
  }, [tabValue]); // Re-run animation when tab changes

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box id="certifications" ref={sectionRef} sx={{ py: { xs: 10, md: 15 }, position: 'relative', overflow: 'hidden' }}>

      {/* HexGrid — top-right molecular texture */}
      <Box sx={{ position: 'absolute', top: '-4%', right: '-5%', opacity: isDark ? 0.04 : 0.025, pointerEvents: 'none', zIndex: 0 }}>
        <HexGrid width={460} height={460} cellSize={34} color={theme.palette.primary.main} />
      </Box>

      {/* DnaHelix — left side, scroll-drawn, amber-first */}
      <Box sx={{ position: 'absolute', left: '-1%', top: '8%', opacity: isDark ? 0.1 : 0.06, pointerEvents: 'none', zIndex: 0 }}>
        <DnaHelix
          width={80}
          height={560}
          color1={theme.palette.accent?.main || '#f59e0b'}
          color2={theme.palette.primary.main}
          animated
          triggerRef={sectionRef}
          scrollStart="top 85%"
          scrollEnd="bottom 20%"
        />
      </Box>

      {/* FloatingDots — bottom-left cluster */}
      <Box sx={{ position: 'absolute', bottom: '5%', left: '2%', pointerEvents: 'none', zIndex: 0 }}>
        <FloatingDots
          count={8}
          color={theme.palette.primary.light}
          containerWidth={220}
          containerHeight={300}
          minSize={2}
          maxSize={5}
          opacity={isDark ? 0.15 : 0.08}
        />
      </Box>

      <MotionSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <SectionHeader overline="International Credentials" title="Professional Certifications" />

          <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                bgcolor: isDark ? 'rgba(13,17,23,0.6)' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${isDark ? 'rgba(99,179,237,0.1)' : 'rgba(9,9,11,0.07)'}`,
                borderRadius: '100px',
                px: 1,
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTab-root': {
                  fontWeight: 700,
                  px: 3,
                  py: 1.5,
                  fontSize: '0.9rem',
                  letterSpacing: 0.5,
                  borderRadius: '100px',
                  mx: 0.5,
                  my: 0.75,
                  border: '1px solid transparent',
                  color: 'text.secondary',
                  transition: 'all 0.35s cubic-bezier(0.32,0.72,0,1)',
                  minHeight: 'unset',
                  textTransform: 'none',
                },
                '& .Mui-selected': {
                  bgcolor: isDark ? 'rgba(56,189,248,0.12)' : 'rgba(2,132,199,0.1)',
                  color: 'primary.main !important',
                  border: `1px solid ${isDark ? 'rgba(56,189,248,0.35)' : 'rgba(2,132,199,0.3)'}`,
                  boxShadow: isDark ? '0 4px 20px rgba(56,189,248,0.2)' : '0 4px 20px rgba(2,132,199,0.12)',
                },
                '& .MuiTab-root:hover:not(.Mui-selected)': {
                  color: 'primary.main',
                  bgcolor: isDark ? 'rgba(56,189,248,0.05)' : 'rgba(2,132,199,0.05)',
                }
              }}
            >
              {certCategories.map((cat, i) => (
                <Tab key={i} label={cat.label} />
              ))}
            </Tabs>
          </Box>

          <Grid container spacing={2} justifyContent="center" alignItems="stretch">
            {certCategories[tabValue].items.map((cert, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} className="cert-card" sx={{ display: 'flex' }}>
                <Card sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: isDark ? 'rgba(13,17,23,0.55)' : 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${theme.palette.divider}`,
                  borderLeft: `2px solid ${isDark ? 'rgba(56,189,248,0.3)' : 'rgba(2,132,199,0.25)'}`,
                  borderRadius: 4,
                  boxShadow: isDark
                    ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 20px -8px rgba(0,0,0,0.4)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 8px 20px -8px rgba(9,9,11,0.05)',
                  flexGrow: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(13,17,23,0.75)' : 'rgba(255,255,255,0.98)',
                    borderColor: 'primary.main',
                    borderLeftColor: 'primary.main',
                    transform: 'translateY(-6px)',
                    boxShadow: isDark
                      ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 40px -12px rgba(0,0,0,0.55), -3px 0 16px -3px rgba(56,189,248,0.25)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 20px 40px -12px rgba(9,9,11,0.09)',
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(56,189,248,0.7)' : 'rgba(2,132,199,0.6)'}, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&:hover:before': {
                    opacity: 1,
                  }
                }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ width: '100%' }}>
                    <VerifiedIcon sx={{
                      color: 'primary.main',
                      mt: 0.5, fontSize: 22, flexShrink: 0,
                      filter: `drop-shadow(0 2px 8px ${isDark ? 'rgba(56,189,248,0.45)' : 'rgba(2,132,199,0.3)'})`
                    }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.55, color: 'text.primary', fontSize: '0.875rem' }}>
                      {cert}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionSection>
    </Box>
  );
};

export default Certifications;

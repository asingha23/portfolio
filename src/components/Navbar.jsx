import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem, Typography, Container, Button, useTheme, useMediaQuery, Stack, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { name: 'Home', id: 'home' },
  { name: 'Experience', id: 'experience' },
  { name: 'Education', id: 'education' },
  { name: 'Certifications', id: 'certifications' },
  { name: 'Awards', id: 'awards' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Contact', id: 'contact' },
];

const Navbar = ({ mode, toggleMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance animation - Only run if initial component mount
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );

      // 2. Sticky behavior and background transition
      ScrollTrigger.create({
        start: "top -100",
        onEnter: () => {
          gsap.to(navRef.current, {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(9, 9, 11, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(24px)',
            boxShadow: theme.palette.mode === 'dark' ? '0 20px 40px rgba(0, 0, 0, 0.4)' : '0 20px 40px rgba(9, 9, 11, 0.05)',
            paddingTop: '4px',
            paddingBottom: '4px',
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: true
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            boxShadow: 'none',
            paddingTop: '12px',
            paddingBottom: '12px',
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: true
          });
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, [theme.palette.mode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileOpen) setMobileOpen(false);
  };

  const ModeToggle = () => (
    <Tooltip title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
      <IconButton 
        onClick={toggleMode} 
        sx={{ 
          ml: 2, 
          bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(9, 9, 11, 0.03)',
          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(9, 9, 11, 0.08)'}`,
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          '&:hover': {
            bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(9, 9, 11, 0.08)',
            transform: 'scale(1.1) rotateY(180deg)',
            color: 'primary.main'
          }
        }}
        color="primary"
      >
        <Box sx={{ display: 'flex', transition: 'transform 0.4s ease' }}>
          {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
        </Box>
      </IconButton>
    </Tooltip>
  );

  const drawer = (
    <Box sx={{ width: 300, height: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
      {/* Drawer Header with gradient sheen */}
      <Box sx={{
        pt: 5, pb: 4, px: 3,
        mb: 1,
        background: mode === 'dark'
          ? 'linear-gradient(135deg, rgba(56,189,248,0.06) 0%, rgba(245,158,11,0.04) 100%)'
          : 'linear-gradient(135deg, rgba(2,132,199,0.04) 0%, rgba(217,119,6,0.03) 100%)',
        borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(9,9,11,0.05)'}`
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: '-1px', fontSize: '1.6rem', display: 'flex', alignItems: 'center' }}>
            AS<span className="logo-dot"></span>
          </Typography>
          <ModeToggle />
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.65rem', mt: 1, display: 'block' }}>
          Prof. Abhishek Singha
        </Typography>
      </Box>

      <List sx={{ px: 2, flex: 1 }}>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding sx={{ mb: 0.5 }}>
            <Button
              fullWidth
              variant="text"
              onClick={() => handleScrollTo(section.id)}
              sx={{ 
                justifyContent: 'flex-start', 
                px: 3, 
                py: 1.5, 
                borderRadius: '100px',
                fontWeight: activeSection === section.id ? 700 : 500,
                fontSize: '0.95rem',
                color: activeSection === section.id ? 'primary.main' : 'text.secondary',
                bgcolor: activeSection === section.id
                  ? (mode === 'dark' ? 'rgba(56,189,248,0.08)' : 'rgba(2,132,199,0.06)')
                  : 'transparent',
                '&:hover': {
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(9,9,11,0.03)',
                  color: 'primary.main',
                }
              }}
            >
              {section.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        ref={navRef}
        position="fixed" 
        component="nav"
        sx={{ 
          bgcolor: 'transparent',
          boxShadow: 'none',
          borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(9, 9, 11, 0.03)'}`,
          py: 1.5,
          backgroundImage: 'none'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 70, md: 80 } }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, color: 'primary.main', cursor: 'pointer', letterSpacing: '-1px', fontSize: '1.75rem', display: 'flex', alignItems: 'center' }}
              onClick={() => handleScrollTo('home')}
            >
              AS<span className="logo-dot">.</span>
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isMobile && (
                <Stack direction="row" spacing={0.5}>
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      onClick={() => handleScrollTo(section.id)}
                      sx={{
                        fontWeight: activeSection === section.id ? 700 : 500,
                        px: 2,
                        py: 0.75,
                        fontSize: '0.875rem',
                        borderRadius: '100px',
                        color: activeSection === section.id ? 'primary.main' : 'text.secondary',
                        bgcolor: activeSection === section.id
                          ? (mode === 'dark' ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.06)')
                          : 'transparent',
                        border: activeSection === section.id
                          ? `1px solid ${mode === 'dark' ? 'rgba(56,189,248,0.2)' : 'rgba(2,132,199,0.15)'}`
                          : '1px solid transparent',
                        '&:hover': {
                          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(9,9,11,0.03)',
                          color: 'primary.main',
                          opacity: 1,
                        },
                        transition: 'all 0.35s cubic-bezier(0.32, 0.72, 0, 1)'
                      }}
                      className={`nav-link-underline ${activeSection === section.id ? 'active' : ''}`}
                    >
                      {section.name}
                    </Button>
                  ))}
                </Stack>
              )}
              
              {!isMobile && <ModeToggle />}

              {isMobile && (
                <IconButton color="primary" onClick={handleDrawerToggle} sx={{ bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(9, 9, 11, 0.03)' }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ 
          sx: { 
            borderRadius: '24px 0 0 24px', 
            border: 'none', 
            boxShadow: mode === 'dark' ? '-20px 0 60px rgba(0,0,0,0.6)' : '-20px 0 60px rgba(9, 9, 11, 0.1)',
            backgroundImage: 'none'
          } 
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, TextField, Button, Paper, Stack, IconButton, Avatar, useTheme } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ScienceIcon from '@mui/icons-material/Science';
import PetsIcon from '@mui/icons-material/Pets';
import SectionHeader from './SectionHeader';
import FloatingDots from './decorative/FloatingDots';
import DnaHelix from './decorative/DnaHelix';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const bgIcon1 = useRef(null);
  const bgIcon2 = useRef(null);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "918927977836"; // International format for India
    const text = `*New Inquiry from Portfolio*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animations
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // 2. Background Parallax — enhanced with rotation
      gsap.to(bgIcon1.current, {
        y: -200,
        rotate: 45,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(bgIcon2.current, {
        y: 200,
        rotate: -35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // 3. Animate Section Underline
      gsap.to(sectionRef.current.querySelector(".section-underline"), {
        width: 80,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });

      // Contact items ride the parent infoRef slide-in — no separate animation needed.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box 
      ref={sectionRef}
      id="contact" 
      component="section"
      sx={{ py: { xs: 12, md: 20 }, position: 'relative', overflow: 'hidden', bgcolor: 'background.default' }}
    >
      {/* Background Icons with enhanced Parallax */}
      <Box ref={bgIcon1} sx={{ position: 'absolute', bottom: -100, right: -100, opacity: isDark ? 0.03 : 0.01, zIndex: 0 }}>
        <ScienceIcon sx={{ fontSize: 450, color: 'primary.main' }} />
      </Box>
      <Box ref={bgIcon2} sx={{ position: 'absolute', top: -100, left: -60, opacity: isDark ? 0.03 : 0.01, zIndex: 0 }}>
        <PetsIcon sx={{ fontSize: 450, color: 'primary.main' }} />
      </Box>

      {/* DnaHelix — right side, mid-section, subtle */}
      <Box sx={{ position: 'absolute', right: '-1%', top: '15%', opacity: isDark ? 0.09 : 0.055, pointerEvents: 'none', zIndex: 0 }}>
        <DnaHelix
          width={75}
          height={520}
          color1={theme.palette.primary.main}
          color2='#f59e0b'
          animated
          triggerRef={sectionRef}
          scrollStart="top 85%"
          scrollEnd="bottom 15%"
        />
      </Box>

      {/* FloatingDots — top-left cluster, primary color */}
      <Box sx={{ position: 'absolute', top: '8%', left: '3%', pointerEvents: 'none', zIndex: 0 }}>
        <FloatingDots
          count={9}
          color={theme.palette.primary.light}
          containerWidth={200}
          containerHeight={280}
          minSize={2}
          maxSize={6}
          opacity={isDark ? 0.18 : 0.1}
        />
      </Box>

      {/* FloatingDots — bottom-right cluster, amber */}
      <Box sx={{ position: 'absolute', bottom: '12%', right: '4%', pointerEvents: 'none', zIndex: 0 }}>
        <FloatingDots
          count={7}
          color='#f59e0b'
          containerWidth={180}
          containerHeight={240}
          minSize={2}
          maxSize={5}
          opacity={isDark ? 0.15 : 0.08}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader align="center" overline="Collaboration" title="Start a Conversation" />


        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start" justifyContent="center">
          <Grid item xs={12} md={5} ref={infoRef}>
            <Stack spacing={5}>
              {/* Info Header */}
              <Box>
                <Typography variant="overline" sx={{ letterSpacing: 3, fontWeight: 800, color: 'primary.main', fontSize: '0.7rem', opacity: 0.7, mb: 1, display: 'block' }}>Get in touch</Typography>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 900, fontSize: { xs: '1.75rem', md: '2rem' }, letterSpacing: -1, lineHeight: 1.2, color: 'text.primary' }}>Professional Details</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 400, opacity: 0.7 }}>
                  Ready for guest lectures, academic research collaborations, and professional health consultations.
                </Typography>
              </Box>

              {/* Contact Info Cards */}
              <Stack spacing={2.5}>
                {[
                  { icon: <PhoneIphoneIcon />, label: 'Phone/WhatsApp', value: '8927977836', color: theme.palette.primary.main },
                  { icon: <ContactMailIcon />, label: 'Email', value: 'asingha160496@gmail.com', color: '#f59e0b' },
                  { icon: <LocationOnIcon />, label: 'Address', value: 'Kaliyaganj, WB, 733129', color: '#10b981' }
                ].map((item, i) => (
                  <Box 
                    key={i} 
                    className="contact-item"
                    sx={{ 
                      p: 2.5,
                      pl: 3,
                      width: '100%',
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(9, 9, 11, 0.02)',
                      border: `1px solid ${theme.palette.divider}`,
                      borderLeft: `3px solid ${item.color}`,
                      borderRadius: 3,
                      backdropFilter: 'blur(10px)',
                      boxShadow: isDark
                        ? 'inset 0 1px 0 rgba(255,255,255,0.03)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.9)',
                      transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      '&:hover': {
                        bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(9, 9, 11, 0.03)',
                        borderLeftColor: 'primary.light',
                        transform: 'translateX(8px)',
                        boxShadow: isDark
                          ? `4px 0 20px -4px ${item.color}33, inset 0 1px 0 rgba(255,255,255,0.05)`
                          : `4px 0 20px -4px ${item.color}18, inset 0 1px 0 rgba(255,255,255,0.9)`,
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: isDark ? `${item.color}18` : `${item.color}14`,
                      width: 42, height: 42,
                      border: `1px solid ${item.color}30`,
                      color: item.color,
                      flexShrink: 0
                    }}>
                      {React.cloneElement(item.icon, { sx: { fontSize: 18 } })}
                    </Avatar>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', mb: 0.25, fontSize: '0.6rem', opacity: 0.65 }}>{item.label}</Typography>
                      <Typography sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.9rem' }}>{item.value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              {/* Social Links */}
              <Box>
                <Typography variant="caption" sx={{ mb: 2.5, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: 2.5, color: 'text.secondary', opacity: 0.5, display: 'block' }}>Social</Typography>
                <Stack direction="row" spacing={2}>
                  {[
                    { icon: <LinkedInIcon />, label: 'LinkedIn', color: '#0077b5' },
                    { icon: <InstagramIcon />, label: 'Instagram', color: '#e4405f' }
                  ].map((social, i) => (
                    <IconButton
                      key={i}
                      target="_blank"
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        color: 'text.secondary',
                        transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                        '&:hover': {
                          bgcolor: `${social.color}14`,
                          color: social.color,
                          borderColor: `${social.color}55`,
                          boxShadow: `0 10px 24px ${social.color}30`,
                          transform: 'translateY(-5px)',
                        }
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={7} ref={formRef}>
            <Paper sx={{ 
              p: { xs: 4, sm: 5, md: 6 }, 
              borderRadius: 6, 
              bgcolor: isDark ? 'rgba(24, 24, 27, 0.6)' : 'rgba(255, 255, 255, 0.85)',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 40px 80px -20px rgba(0,0,0,0.5)'
                : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 40px 80px -20px rgba(9,9,11,0.06)',
              width: '100%',
              backdropFilter: 'blur(20px)',
              backgroundImage: 'none'
            }}>
              <Typography variant="h3" sx={{ mb: 1, fontWeight: 950, letterSpacing: -1.5, textAlign: { xs: 'center', md: 'left' }, color: 'text.primary', fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Send a Message
              </Typography>
              <Typography variant="body2" sx={{ mb: 6, color: 'text.secondary', fontWeight: 500, opacity: 0.6, textAlign: { xs: 'center', md: 'left' }, fontSize: '1rem', maxWidth: '400px' }}>
                I usually respond within 24 hours. Looking forward to hearing from you.
              </Typography>
              
              <Box component="form" onSubmit={handleWhatsAppSubmit}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', mb: 1, ml: 1, fontWeight: 700, color: 'text.secondary', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.65rem', opacity: 0.8 }}>Full Name</Typography>
                      <TextField 
                        fullWidth 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Shruti Das" 
                        variant="outlined"
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            fontSize: '0.95rem',
                            bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            transition: 'all 0.3s ease',
                            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            '&.Mui-focused fieldset': { borderWidth: 1, borderColor: 'primary.main' },
                            '&.Mui-focused': { bgcolor: isDark ? 'rgba(56,189,248,0.02)' : 'rgba(2,132,199,0.02)', boxShadow: isDark ? '0 0 0 4px rgba(56,189,248,0.1)' : '0 0 0 4px rgba(2,132,199,0.08)' }
                          }
                        }} 
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ display: 'block', mb: 1, ml: 1, fontWeight: 700, color: 'text.secondary', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.65rem', opacity: 0.8 }}>Phone Number</Typography>
                      <TextField 
                        fullWidth 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210" 
                        variant="outlined"
                        type="tel"
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            fontSize: '0.95rem',
                            bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            transition: 'all 0.3s ease',
                            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            '&.Mui-focused fieldset': { borderWidth: 1, borderColor: 'primary.main' },
                            '&.Mui-focused': { bgcolor: isDark ? 'rgba(56,189,248,0.02)' : 'rgba(2,132,199,0.02)', boxShadow: isDark ? '0 0 0 4px rgba(56,189,248,0.1)' : '0 0 0 4px rgba(2,132,199,0.08)' }
                          }
                        }} 
                      />
                    </Box>
                  </Stack>
                  
                  <Box>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, ml: 1, fontWeight: 700, color: 'text.secondary', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.65rem', opacity: 0.8 }}>Subject</Typography>
                    <TextField 
                      fullWidth 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="I need help with your course..." 
                      variant="outlined"
                      required
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px',
                          fontSize: '0.95rem',
                          bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                          transition: 'all 0.3s ease',
                          '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                          '&:hover fieldset': { borderColor: 'primary.main' },
                          '&.Mui-focused fieldset': { borderWidth: 1, borderColor: 'primary.main' },
                          '&.Mui-focused': { bgcolor: isDark ? 'rgba(56,189,248,0.02)' : 'rgba(2,132,199,0.02)', boxShadow: isDark ? '0 0 0 4px rgba(56,189,248,0.1)' : '0 0 0 4px rgba(2,132,199,0.08)' }
                        }
                      }} 
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, ml: 1.5, fontWeight: 700, color: 'text.secondary', letterSpacing: 1.5, textTransform: 'uppercase', fontSize: '0.65rem', opacity: 0.8 }}>Message</Typography>
                    <TextField 
                      fullWidth 
                      multiline 
                      rows={6} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      variant="outlined"
                      required
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                          fontSize: '0.95rem',
                          bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                          transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                          '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                          '&:hover fieldset': { borderColor: 'primary.main' },
                          '&.Mui-focused fieldset': { borderWidth: 1, borderColor: 'primary.main' },
                          '&.Mui-focused': { 
                            bgcolor: isDark ? 'rgba(56,189,248,0.02)' : 'rgba(2,132,199,0.02)', 
                            boxShadow: isDark ? '0 0 0 4px rgba(56,189,248,0.1)' : '0 0 0 4px rgba(2,132,199,0.08)' 
                          },
                          '& input::placeholder, & textarea::placeholder': {
                            color: 'text.secondary',
                            opacity: 0.4,
                            fontWeight: 400
                          }
                        }
                      }} 
                    />
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <Button 
                      fullWidth 
                      type="submit"
                      variant="contained" 
                      size="large" 
                      sx={{ 
                        py: 1.8,
                        pl: 4,
                        pr: 1.5,
                        borderRadius: '100px',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'primary.contrastText',
                        transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: isDark ? '0 20px 40px -12px rgba(56,189,248,0.45)' : '0 20px 40px -12px rgba(2,132,199,0.35)',
                        },
                        '&:active': { transform: 'translateY(0) scale(0.98)' }
                      }}
                    >
                      Send Message
                      <Box sx={{
                        width: 36, height: 36, borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', flexShrink: 0
                      }}>↗</Box>
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Branding */}
      <Box sx={{ py: 8, mt: 10, bgcolor: 'background.default', textAlign: 'center', borderTop: `1px solid ${isDark ? 'rgba(99,179,237,0.12)' : 'rgba(9,9,11,0.08)'}` }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            className="shimmer-text"
            sx={{ fontWeight: 900, mb: 2, letterSpacing: -1, fontSize: '1.6rem' }}
          >
            ABHISHEK.S
          </Typography>
          <Box sx={{
            width: 60,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${isDark ? '#38bdf8' : '#0284c7'}, transparent)`,
            mx: 'auto',
            mb: 3,
            borderRadius: 2,
          }} />
          <Typography variant="body2" sx={{ opacity: 0.35, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', color: 'text.secondary' }}>
            © {new Date().getFullYear()} Prof. Abhishek Singha&nbsp;&nbsp;•&nbsp;&nbsp;All rights reserved
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;

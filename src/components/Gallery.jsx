import React, { useState } from 'react';
import { Box, Container, Typography, useTheme, Dialog, IconButton, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SectionHeader from './SectionHeader';

import gallery1 from '../assets/gallery1.jpg';
import gallery2 from '../assets/gallery2.jpg';
import gallery3 from '../assets/gallery3.jpg';
import gallery4 from '../assets/gallery4.png';
import gallery5 from '../assets/gallery5.png';
import gallery6 from '../assets/gallery6.png';
import gallery7 from '../assets/gallery7.png';
import gallery8 from '../assets/gallery8.png';
import gallery9 from '../assets/gallery9.png';

const galleryItems = [
  { img: gallery1, title: 'Medical Education', subtitle: 'Deep Dive into Human Anatomy & Physiology' },
  { img: gallery2, title: 'Biological Research', subtitle: 'Molecular Biology & Clinical Research Analysis' },
  { img: gallery3, title: 'Best Faculty Award', subtitle: 'Recognized for Excellence in Academic Instruction' },
  { img: gallery4, title: 'Interactive Learning', subtitle: 'Engaging Students in Practical Applications' },
  { img: gallery5, title: 'Laboratory Work', subtitle: 'Advanced Experiments and Scientific Discovery' },
  { img: gallery6, title: 'Conference Presenter', subtitle: 'Sharing Research Worldwide' },
  { img: gallery7, title: 'Seminar Leader', subtitle: 'Interactive Academic Sessions' },
  { img: gallery8, title: 'Scientific Publication', subtitle: 'Contributing to Academic Literature' },
  { img: gallery9, title: 'Community Outreach', subtitle: 'Promoting Science in the Local Community' },
];

const Gallery = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (item) => setSelectedImage(item);
  const handleClose = () => setSelectedImage(null);

  return (
    <Box
      id="gallery"
      sx={{ py: { xs: 12, md: 20 }, position: 'relative', zIndex: 1, isolation: 'isolate' }}
    >
      <Container maxWidth="lg">
        <SectionHeader overline="Professional Life" title="Academic Gallery" />

        {/* Desktop & Tablet: Masonry-style layout using CSS columns */}
        <Box sx={{
          display: { xs: 'none', sm: 'block' },
          mt: 6,
          columnCount: { sm: 2, md: 3 },
          columnGap: '24px',
        }}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              onClick={() => handleOpen(item)}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                marginBottom: '24px',
                breakInside: 'avoid',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '24px',
                background: 'linear-gradient(to top, rgba(2,6,23,0.95) 0%, transparent 100%)',
                boxSizing: 'border-box',
              }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, mb: 0.5 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' }}>
                  {item.subtitle}
                </Typography>
              </div>
            </div>
          ))}
        </Box>

        {/* Mobile: stack vertically */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: 3, mt: 6 }}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              onClick={() => handleOpen(item)}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                cursor: 'pointer',
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '20px',
                background: 'linear-gradient(to top, rgba(2,6,23,0.95) 0%, transparent 100%)',
                boxSizing: 'border-box',
              }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, mb: 0.25 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem' }}>
                  {item.subtitle}
                </Typography>
              </div>
            </div>
          ))}
        </Box>
        {/* Fullscreen Image Modal */}
        <Dialog
          open={!!selectedImage}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }}
          TransitionComponent={Zoom}
        >
          {selectedImage && (
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: '#fff',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  },
                  zIndex: 2,
                }}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.7)',
                }}
              />
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Gallery;

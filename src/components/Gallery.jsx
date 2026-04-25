import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import SectionHeader from './SectionHeader';

import gallery1 from '../assets/gallery1.jpg';
import gallery2 from '../assets/gallery2.jpg';
import gallery3 from '../assets/gallery3.jpg';

const galleryItems = [
  { img: gallery1, title: 'Medical Education', subtitle: 'Deep Dive into Human Anatomy & Physiology' },
  { img: gallery2, title: 'Biological Research', subtitle: 'Molecular Biology & Clinical Research Analysis' },
  { img: gallery3, title: 'Best Faculty Award', subtitle: 'Recognized for Excellence in Academic Instruction' },
];

const Gallery = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      id="gallery"
      sx={{ py: { xs: 12, md: 20 }, position: 'relative', zIndex: 1, isolation: 'isolate' }}
    >
      <Container maxWidth="lg">
        <SectionHeader overline="Professional Life" title="Academic Gallery" />

        {/* Desktop: Masonry-style layout using pure CSS grid */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          {/* Card 1 — tall, left, spans 2 rows */}
          <div
            style={{
              gridColumn: '1',
              gridRow: '1 / span 2',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              height: '600px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={gallery1}
              alt="Medical Education"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '32px',
              background: 'linear-gradient(to top, rgba(2,6,23,0.95) 0%, transparent 100%)',
              boxSizing: 'border-box',
            }}>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900, mb: 0.5 }}>
                Medical Education
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                Deep Dive into Human Anatomy & Physiology
              </Typography>
            </div>
          </div>

          {/* Card 2 — top-right */}
          <div
            style={{
              gridColumn: '2',
              gridRow: '1',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              height: '280px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={gallery2}
              alt="Biological Research"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
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
                Biological Research
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' }}>
                Molecular Biology & Clinical Research Analysis
              </Typography>
            </div>
          </div>

          {/* Card 3 — bottom-right */}
          <div
            style={{
              gridColumn: '2',
              gridRow: '2',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              height: '296px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={gallery3}
              alt="Best Faculty Award"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
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
                Best Faculty Award
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' }}>
                Recognized for Excellence in Academic Instruction
              </Typography>
            </div>
          </div>
        </div>
        </Box>

        {/* Mobile: stack vertically */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', gap: 3, mt: 6 }}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                height: '280px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
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
      </Container>
    </Box>
  );
};

export default Gallery;

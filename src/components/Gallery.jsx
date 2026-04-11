import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import SectionHeader from './SectionHeader';

import gallery1 from '../assets/gallery1.png';
import gallery2 from '../assets/gallery2.png';
import gallery3 from '../assets/gallery3.png';

const galleryItems = [
  { img: gallery1, title: 'Academic Lectures', subtitle: 'Teaching Zoology in Modern Classroom Context' },
  { img: gallery2, title: 'Scientific Research', subtitle: 'Laboratory Analysis & Medical Research' },
  { img: gallery3, title: 'Professional Seminars', subtitle: 'National Health & Biological Science Summits' },
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
              alt="Academic Lectures"
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
                Academic Lectures
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                Teaching Zoology in Modern Classroom Context
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
              alt="Scientific Research"
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
                Scientific Research
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' }}>
                Laboratory Analysis & Medical Research
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
              alt="Professional Seminars"
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
                Professional Seminars
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem' }}>
                National Health & Biological Science Summits
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

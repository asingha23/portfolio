import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

const SectionHeader = ({ overline, title, align = 'center' }) => {
  return (
    <Stack
      spacing={2}
      sx={{
        mb: { xs: 10, md: 14 },
        textAlign: align,
        alignItems: align === 'center' ? 'center' : 'flex-start'
      }}
    >
      <Typography
        variant="overline"
        className="section-overline"
        sx={{
          letterSpacing: 4,
          fontWeight: 900,
          color: 'primary.main',
          textTransform: 'uppercase',
          opacity: 0.9,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '2px',
            bgcolor: 'primary.main',
            flexShrink: 0,
            boxShadow: '0 0 8px currentColor',
          }}
        />
        {overline}
      </Typography>

      <Typography
        variant="h2"
        className="section-title"
        sx={{
          fontWeight: 900,
          fontSize: { xs: '2.5rem', md: '3.75rem' },
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          textAlign: align
        }}
      >
        {title}
      </Typography>

      <Box
        className="section-underline"
        sx={{
          width: 0,
          height: '3px',
          borderRadius: 2,
          mt: 2,
          /* gradient defined in index.css via .section-underline */
        }}
      />
    </Stack>
  );
};

export default SectionHeader;

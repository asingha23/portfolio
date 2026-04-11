import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#38bdf8' : '#0284c7', // Sky 400 vs Sky 600
      light: mode === 'dark' ? '#7dd3fc' : '#38bdf8',
      dark: mode === 'dark' ? '#0ea5e9' : '#0369a1',  // was #0284c7 / #0369a1
      contrastText: mode === 'dark' ? '#070a12' : '#ffffff',
    },
    secondary: {
      main: '#71717a', // Zinc 500
    },
    accent: {
      main: '#f59e0b', // Amber 500
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#070a12',
    },
    custom: {
      biology: '#06b6d4',
      medical: '#10b981',
      psychology: '#8b5cf6',
      academic: '#f59e0b',
      tech: '#0ea5e9',
      safety: '#f43f5e',
    },
    background: {
      default: mode === 'dark' ? '#070a12' : '#f0f4f8', // deep navy-black vs cool white
      paper:   mode === 'dark' ? '#0d1117' : '#ffffff',  // cooler dark vs pure white
    },
    text: {
      primary:  mode === 'dark' ? '#f0f9ff' : '#0f172a', // slightly cooler white vs deep slate
      secondary: mode === 'dark' ? '#94a3b8' : '#475569', // slate-400 vs slate-600
      disabled: mode === 'dark' ? 'rgba(240,249,255,0.3)' : 'rgba(15,23,42,0.3)',
    },
    divider: mode === 'dark' ? 'rgba(99,179,237,0.1)' : 'rgba(9,9,11,0.08)', // blue-tinted divider in dark
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '4.5rem',
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
      color: mode === 'dark' ? '#f0f9ff' : '#0f172a',
    },
    h2: {
      fontWeight: 800,
      fontSize: '3rem',
      letterSpacing: '-0.03em',
      color: mode === 'dark' ? '#f0f9ff' : '#0f172a',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.02em',
      color: mode === 'dark' ? '#f0f9ff' : '#0f172a',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.65,
      color: mode === 'dark' ? '#94a3b8' : '#475569',
    },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: '12px 32px',
          fontWeight: 700,
          boxShadow: 'none',
          textTransform: 'none',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          '&:hover': {
            transform: 'translateY(-3px) scale(1.02)',
            boxShadow: mode === 'dark'
              ? '0 24px 50px -12px rgba(56, 189, 248, 0.45)'
              : '0 24px 50px -12px rgba(2, 132, 199, 0.5)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(32px)',
          backgroundColor: mode === 'dark' ? 'rgba(13, 17, 23, 0.55)' : 'rgba(255, 255, 255, 0.85)',
          border: mode === 'dark'
            ? '1px solid rgba(99, 179, 237, 0.1)'
            : '1px solid rgba(9, 9, 11, 0.06)',
          boxShadow: mode === 'dark'
            ? '0 20px 50px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 20px 50px -20px rgba(9, 9, 11, 0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          '&:hover': {
            transform: 'translateY(-12px)',
            boxShadow: mode === 'dark'
              ? '0 40px 80px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(56, 189, 248, 0.15)'
              : '0 40px 80px -20px rgba(9, 9, 11, 0.12), 0 0 0 1px rgba(2, 132, 199, 0.15)',
            borderColor: mode === 'dark' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#0d1117' : '#ffffff',
          backgroundImage: 'none',
          border: mode === 'dark'
            ? '1px solid rgba(99, 179, 237, 0.08)'
            : '1px solid rgba(9, 9, 11, 0.05)',
        },
      },
    },
  },
});

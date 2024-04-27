'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { m, useScroll } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
// theme
import SearchField from 'src/components/search-field/search-field';
import { primaryFont } from 'src/theme/typography';
import { textGradient, bgGradient } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import { MotionContainer, varFade } from 'src/components/animate';
import { homeServicesProductsData } from 'src/sections/home/home-service-producst';
import { Paper } from '@mui/material';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';

// ----------------------------------------------------------------------

type StyledRoottype = {
  imgUrl?: string;
};

const StyledRoot = styled('div')<StyledRoottype>(({ theme, imgUrl }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.2 : 0.4),
    imgUrl,
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, #222 0.05%, rgba(34, 34, 34, 0.14) 51.16%, rgba(34, 34, 34, 0.00) 82.49%)'
      : 'linear-gradient(180deg, #fff 0.05%, rgba(255, 255, 255, 0.14) 51.16%, rgba(255, 255, 255, 0.00) 82.49%)',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  marginTop: 8,
  lineHeight: 1.1,
  marginBottom: 24,
  letterSpacing: 0,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: `${48 / 16}rem`,
  fontFamily: primaryFont.style.fontFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: `${48 / 16}rem`,
  },
}));

// ----------------------------------------------------------------------

interface ServicesViewProps {
  currentData: any;
}
export default function ServicesHome({ currentData }: ServicesViewProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 1000,
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          {currentData.title}
        </StyledTextGradient>
      </m.div>

      <m.div variants={varFade().in}>
        <Paper sx={{ p: 3, borderRadius: 2, width: 1 }} elevation={6}>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '22px',
            }}
          >
            {currentData.description}
          </Typography>
        </Paper>
      </m.div>
    </Stack>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        imgUrl={currentData.image}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            {renderDescription}
          </Container>
        </StyledWrapper>
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

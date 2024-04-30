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
import { useResponsive } from 'src/hooks/use-responsive';
import { display } from '@mui/system';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.2 : 0.4),
    imgUrl: '/assets/background/Hero.png',
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
  // [theme.breakpoints.up('md')]: {
  //   marginTop: HEADER.H_DESKTOP_OFFSET,
  // },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const mdUp = useResponsive('up', 'md');

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
      <Box
        sx={
          !mdUp
            ? {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.6),
                borderRadius: 4,
                padding: '10px',
                mt: {
                  md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
                },
              }
            : {}
        }
      >
        <m.div variants={varFade().in}>
          <Typography
            sx={{
              fontSize: { xs: 47, md: 67 },
              textAlign: 'center',
              fontWeight: 600,
              mb: 1,
              lineHeight: { xs: '55px', md: '77.141px' },
            }}
          >
            Especialistas en Mobiliario
          </Typography>
        </m.div>

        <Stack alignItems="center" justifyContent="center" gap={2}>
          <m.div variants={varFade().in}>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                fontWeight: {
                  xs: 500,
                  md: 500,
                },
              }}
            >
              Anuncios luminosos, sucursales y Mucho Más: Soluciones Innovadoras para tus
              Necesidades
            </Typography>
          </m.div>

          <m.div
            variants={varFade().inUp}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Typography sx={{ textAlign: 'center', fontWeight: 500 }}>
              Con IA te ayudamos a elegir la mejor opción para tu espacio.
            </Typography>
            <SearchField />
          </m.div>
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
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

import { m, MotionProps } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { BoxProps } from '@mui/material/Box';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
// theme
import { bgGradient } from 'src/theme/css';
// components
import { MotionContainer, varFade } from 'src/components/animate';
import { StyledWrapper } from '../home/home-hero';

// ----------------------------------------------------------------------

export default function FaqsHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[400], 0),
          imgUrl: '/assets/images/Services/Tecnología_Avanzada/main.webp',
        }),
      }}
    >
      <Box
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, #222 0.05%, rgba(34, 34, 34, 0.14) 70.16%, rgba(34, 34, 34, 0.00) 82.49%)'
              : 'linear-gradient(180deg, #fff 0.05%, rgba(255, 255, 255, 0.14) 70.16%, rgba(255, 255, 255, 0.00) 82.49%)',
          height: { md: 560 },
          py: { xs: 10, md: 0 },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Container component={MotionContainer}>
          <Box
            sx={{
              bottom: { md: 80 },
              position: { md: 'absolute' },
              textAlign: { xs: 'center', md: 'unset' },
            }}
          >
            <div>
              <TextAnimate
                text="Como"
                sx={{ color: 'primary.main' }}
                variants={varFade().inRight}
              />
              <br />

              <Stack
                spacing={2}
                display="inline-flex"
                direction="row"
                sx={{ color: 'common.white' }}
              >
                <TextAnimate text="Te" />
                <TextAnimate text="Podemoss" />
                <TextAnimate text="Ayudar?" />
              </Stack>
            </div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

'use client';

import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// layouts
import { Container } from '@mui/system';
import { Stack } from '@mui/material';
import CompactLayout from 'src/layouts/compact';
// routes
import { RouterLink } from 'src/routes/components';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
// assets
import { PageNotFoundIllustration } from 'src/assets/illustrations';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';

// ----------------------------------------------------------------------

export default function EndedProcess() {
  return (
    <Container component="main">
      <Stack
        sx={{
          py: 12,
          m: 'auto',
          maxWidth: 400,
          minHeight: '100vh',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Proceso Finalizado
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              El equipo de Mudebu va a revisar la cotización y pronto nos pondremos en contacto con
              ustedes
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <SeoIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>

          <Button component={RouterLink} href="/" size="large" variant="contained">
            Go to Home
          </Button>
        </MotionContainer>
      </Stack>
    </Container>
  );
}

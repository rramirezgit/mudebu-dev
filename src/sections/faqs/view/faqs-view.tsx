'use client';

// @mui
import Container from '@mui/material/Container';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Typography from '@mui/material/Typography';
//
import FaqsHero from '../faqs-hero';
import FaqsList from '../faqs-list';
import FaqsCategory from '../faqs-category';
import HomeContactUsForm from 'src/sections/home/home-contact-us-form';

// ----------------------------------------------------------------------

export default function FaqsView() {
  return (
    <>
      <FaqsHero />

      <Container
        sx={{
          pb: 10,
          pt: { xs: 10, md: 15 },
          position: 'relative',
        }}
      >
        <FaqsCategory />

        <Typography
          variant="h3"
          sx={{
            mt: {
              xs: 5,
              md: 10,
            },
          }}
        >
          Preguntas Frecuentes
        </Typography>
        <Typography
          sx={{
            mb: {
              xs: 5,
              md: 10,
            },
            fontSize: '30px',
          }}
        >
          Financiamiento, Logística y Proyectos Internacionales
        </Typography>

        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <FaqsList />

          <HomeContactUsForm color="secondary" />
        </Box>
      </Container>
    </>
  );
}

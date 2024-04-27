// @mui
import { alpha } from '@mui/material/styles';
import { m } from 'framer-motion';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
// components
import { Stack, Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import CarouselCenterMode from '../_examples/extra/carousel-view/carousel-center-mode';
import { useState } from 'react';
import { homeServicesProductsData } from './home-service-producst';

// ----------------------------------------------------------------------

export default function HomeServices() {
  const [categorie, setCategorie] = useState('services');

  return (
    <Box
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <m.div variants={varFade().in}>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{ mb: 5 }}
          divider={<Box sx={{ width: '1px', height: 56, bgcolor: 'grey.500' }} />}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 5,
              color: categorie === 'services' ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
            }}
            onClick={() => setCategorie('services')}
          >
            Servicios
          </Typography>
          <Typography
            variant="h3"
            align="center"
            onClick={() => setCategorie('products')}
            sx={{
              mb: 5,
              color: categorie === 'products' ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
            }}
          >
            Productos
          </Typography>
        </Stack>
      </m.div>
      <m.div variants={varFade().inRight}>
        <CarouselCenterMode data={homeServicesProductsData[categorie]} />
      </m.div>
    </Box>
  );
}

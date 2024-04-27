// @mui
import { alpha } from '@mui/material/styles';
import { m } from 'framer-motion';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
// components
import { Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import CarouselCenterMode from 'src/sections/_examples/extra/carousel-view/carousel-center-mode';

// ----------------------------------------------------------------------

interface ServicesViewProps {
  imageList: {
    id: string;
    image: string;
  }[];
}

export default function ServicesCarrusel({ imageList }: ServicesViewProps) {
  return (
    <Box
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 5,
          }}
        >
          Somos una empresa 100% mexicana con un amplio arsenal de productos
        </Typography>
      </m.div>
      <m.div variants={varFade().inRight}>
        <CarouselCenterMode data={imageList} />
      </m.div>
    </Box>
  );
}

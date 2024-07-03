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
        py: { xs: 5, md: 15 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <m.div
        variants={varFade().in}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
            fontSize: { xs: 19, md: 32 },
            maxWidth: '80%',
          }}
        >
          Somos una empresa 100% mexicana con una amplia gama de servicios para resolver tus
          necesidades de mantenimiento. Atendemos servicios de mantenimiento correctivo y preventivo
          para así lograr una imagen de calidad en el punto de venta.
        </Typography>
      </m.div>
      <m.div variants={varFade().inRight}>
        <CarouselCenterMode data={imageList} />
      </m.div>
    </Box>
  );
}

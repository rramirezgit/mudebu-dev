// @mui
import { alpha } from '@mui/material/styles';
import { m } from 'framer-motion';
import Box from '@mui/material/Box';
// components
import { Typography } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import { _mock } from 'src/_mock';
import CarouselCenterMode from '../_examples/extra/carousel-view/carousel-center-mode';

// ----------------------------------------------------------------------

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));

// ----------------------------------------------------------------------

export default function HomeServices() {
  return (
    <Box
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <m.div variants={varFade().in}>
        <Typography variant="h3" align="center" sx={{ mb: 5 }}>
          Servicios
        </Typography>
      </m.div>
      <m.div variants={varFade().inRight}>
        <CarouselCenterMode data={_carouselsExample.slice(8, 16)} />
      </m.div>
    </Box>
  );
}

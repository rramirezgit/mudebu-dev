import { Typography } from '@mui/material';
import { m } from 'framer-motion';
import { Box } from 'src/components/Box/box-component';
import { varFade } from 'src/components/animate';
import Carouseldoble from 'src/sections/mudebu-ai/mudebu-ai-blend/carrusel-doble';

export default function MudebuAiblend() {
  return (
    <Box sx={{ width: 1, textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          mb: 3,
        }}
      >
        Con IA Generamos Estos Modelos
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
        }}
      >
        Elige el modelo final para hacer cambios individuales, o genera más hasta que encuentres uno
        de tu agrado.
      </Typography>

      <m.div variants={varFade().inRight}>
        <Carouseldoble />
      </m.div>
    </Box>
  );
}

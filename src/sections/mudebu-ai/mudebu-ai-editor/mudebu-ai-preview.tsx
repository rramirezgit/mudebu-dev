import { Typography } from '@mui/material';
import { Box } from 'src/components/Box/box-component';
import Image from 'src/components/image/image';

export default function MudebuAiPreview() {
  const image = {
    url: 'https://source.unsplash.com/random/1',
  };

  return (
    <Box sx={{ width: 1, textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          mb: 3,
        }}
      >
        Ajusta A Tus Medidas
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
        }}
      >
        Esta será la imagen base para su cotización ¿Quiere hacer alguna edición con IA?
      </Typography>
      <Image
        src={image.url}
        sx={{
          width: {
            xs: '70%',
            sm: '80%',
          },
          height: {
            xs: 239,
            sm: 594,
          },
          borderRadius: 2,

          overflow: 'hidden',
          transition: (theme) => theme.transitions.create('transform'),
          boxSizing: 'border-box',
        }}
      />
    </Box>
  );
}

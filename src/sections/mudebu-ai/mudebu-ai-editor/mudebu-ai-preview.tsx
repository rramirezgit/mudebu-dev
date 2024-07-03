import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Box } from 'src/components/Box/box-component';
import Image from 'src/components/image/image';
import { RootState } from 'src/store';

export default function MudebuAiPreview() {
  const imageSelectedFinishing = useSelector(
    (state: RootState) => state.mudebuAi.imageSelectedFinishing
  );
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
        src={imageSelectedFinishing?.b64 || imageSelectedFinishing?.image}
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

import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Box } from 'src/components/Box/box-component';
import ImageEraser from './editor';
import ImageEraserMenu from './editor-image-menu/edito-image-menu-brush';

export default function MudebuAiEditor() {
  const image = {
    url: 'https://source.unsplash.com/random/1',
  };

  const reloadEditor = useSelector((state: RootState) => state.mudebuAi.reloadEditor);

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
        Con ayuda de Inteligencia Artificial, haremos iteraciones con tus cambios deseados
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mb: 3,
          width: 1,
          padding: 3,
          backgroundColor: 'primary.contrastText',
          borderRadius: 2,
          textAlign: 'initial',
          boxSizing: 'border-box',
        }}
      >
        Edición AI
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <ImageEraserMenu />
        </Grid>
        <Grid item xs={12} sm={9}>
          <ImageEraser imageUrl={image.url} reload={reloadEditor} />
        </Grid>
      </Grid>
    </Box>
  );
}

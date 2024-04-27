import { ArrowRotateRight, Brush2 } from 'iconsax-react';
import { alpha, useTheme } from '@mui/material/styles';
import { Button, IconButton, Slider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Box } from 'src/components/Box/box-component';
import { setBrushRadius, setBrushRadiusEditor, setReloadEditor } from 'src/store/slices/mudebu-ai';
import ImageEraserMenuLayout from './editor-image-menu-layout';

export default function ImageEraserMenu() {
  const theme = useTheme();

  const brushRadius = useSelector((state: RootState) => state.mudebuAi.brushRadius);
  const reloadEditor = useSelector((state: RootState) => state.mudebuAi.reloadEditor);

  const dispatch = useDispatch();

  const handleRadiusChange = (e: any) => {
    const newRadius = parseInt(e.target.value, 10);
    dispatch(setBrushRadius(newRadius));
  };

  function valueLabelFormat(value: number) {
    return `${value}px`;
  }

  return (
    <ImageEraserMenuLayout>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '12px',
          backgroundColor: alpha(theme.palette.secondary.main, 0.5),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <Brush2 size="24" color={theme.palette.primary.light} />
      </Box>
      <IconButton
        onClick={() => {
          dispatch(setReloadEditor(!reloadEditor));
        }}
        sx={{
          position: 'absolute',
          top: 20,
          right: 15,
          mb: 2,
        }}
      >
        <ArrowRotateRight size="24" color={theme.palette.primary.light} />
      </IconButton>
      <Box
        sx={{ width: '100%' }}
        onMouseEnter={(e) => {
          dispatch(setBrushRadiusEditor(true));
        }}
        onMouseLeave={(e) => {
          dispatch(setBrushRadiusEditor(false));
        }}
      >
        <Typography id="non-linear-slider" gutterBottom>
          Tamaño del pincel: {valueLabelFormat(brushRadius)}
        </Typography>
        <Slider
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
          min={5}
          max={50}
          onChange={handleRadiusChange}
          value={brushRadius}
        />
      </Box>
      <Button variant="contained" color="secondary" sx={{ mt: 3 }} fullWidth>
        Continuar
      </Button>
    </ImageEraserMenuLayout>
  );
}

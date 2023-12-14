import Container from '@mui/material/Container';
import { MotionViewport } from 'src/components/animate';

export default function HomeGallery() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      Prueba
    </Container>
  );
}

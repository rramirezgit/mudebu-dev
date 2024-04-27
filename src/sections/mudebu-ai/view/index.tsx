import { Container } from '@mui/material';
import { Box } from 'src/components/Box/box-component';
import MudebuAiStepper from './mudebu-ai-steper';

export default function MudebuAiView() {
  return (
    <Container>
      <Box
        sx={{
          my: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <MudebuAiStepper />
      </Box>
    </Container>
  );
}

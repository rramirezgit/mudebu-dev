import { Avatar, Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CarDataUser from './CarDaataUser';
import CarInfoOnboarding from './CarInfoOnboarding';
import CardImgData from './CardImgData';

export default function ListDetailPage() {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12}>
          <CarDataUser />
        </Grid>
        <Grid xs={12} sm={7}>
          <CarInfoOnboarding />
        </Grid>
        <Grid xs={12} sm={5}>
          <CardImgData />
        </Grid>
      </Grid>
    </Container>
  );
}

import { Avatar, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { Box } from 'src/components/Box/box-component';

export default function CarDataUser() {
  return (
    <Card>
      <CardHeader title="Datos del cliente" />

      <CardContent>
        <Box sx={{ p: 3, pb: 1 }}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={1}>
              <Box>
                <Avatar sx={{ mr: 2 }} />
              </Box>
            </Grid>
            <Grid xs={12} sm={4}>
              <Typography variant="h6">Juan Perez</Typography>
              <Stack spacing={1}>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Correo:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Celular:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Empresa:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Puesto:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Acerca de:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Stack spacing={1} sx={{ mt: 3 }}>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Dirección:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">País:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Estado:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Ciudad:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Código Postal:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

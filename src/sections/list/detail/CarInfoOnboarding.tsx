import { Avatar, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from 'src/components/Box/box-component';

export default function CarInfoOnboarding() {
  return (
    <Card>
      <CardHeader title="Onboarding" />

      <CardContent>
        <Box sx={{ p: 3, pb: 1 }}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6}>
              <Stack spacing={3}>
                <Stack spacing={2}>
                  <Typography variant="button">Giro de la Empresa:</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="button">Colores:</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="button">Funcionalidad Específica::</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="button">Material Preferido:</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack spacing={2}>
                  <Typography variant="button">Estilos:</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="button">Tipos De Muebles::</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="button">Dimensiones:</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="button">Ubicación del Proyecto:</Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      color: '#919EAB',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Typography variant="button">Comentarios Adicionales</Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#919EAB',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

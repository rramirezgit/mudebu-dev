import { Avatar, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from 'src/components/Box/box-component';

export default function CarInfoOnboarding({ data }: any) {
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
                    {data?.business_orientation}
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
                    {data?.colors?.join(', ')}
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
                    {data?.specification}
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
                    {data?.preferred_material}
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
                    {data?.styles?.join(', ')}
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
                    {data?.types_of_furniture?.join(', ')}
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
                    {data?.dimensions}
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
                    {data?.project_location}
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
                {data?.additional_details}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

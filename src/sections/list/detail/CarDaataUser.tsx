import { Avatar, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { Box } from 'src/components/Box/box-component';

export default function CarDataUser({ user }: any) {
  return (
    <Card>
      <CardHeader title="Datos del cliente" />

      <CardContent>
        <Box sx={{ p: 3, pb: 1 }}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={1}>
              <Box>
                <Avatar sx={{ mr: 2 }} src={user?.avatar} />
              </Box>
            </Grid>

            <Grid xs={12} sm={4}>
              <Typography variant="h6">{user?.name}</Typography>
              <Stack spacing={1}>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Correo:</Typography>
                  <Typography variant="body2"> {user?.email || '-'}</Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Celular:</Typography>
                  <Typography variant="body2"> {user?.cellphone || '-'}</Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">country:</Typography>
                  <Typography variant="body2"> {user?.country || '-'}</Typography>
                </Stack>
                {/* <Stack spacing={1} direction="row">
                  <Typography variant="body2">address:</Typography>
                  <Typography variant="body2"> {user?.jobaddressTitle || '-'}</Typography>
                </Stack> */}
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Acerca de:</Typography>
                  <Typography variant="body2"> {user?.about || '-'}</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Stack spacing={1} sx={{ mt: 3 }}>
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">City:</Typography>
                  <Typography variant="body2"> {user?.city}</Typography>
                </Stack>
                {/* <Stack spacing={1} direction="row">
                  <Typography variant="body2">País:</Typography>
                  <Typography variant="body2"> - </Typography>
                </Stack> */}
                {/* <Stack spacing={1} direction="row">
                    <Typography variant="body2">Estado:</Typography>
                    <Typography variant="body2"> - </Typography>
                  </Stack>
                  <Stack spacing={1} direction="row">
                    <Typography variant="body2">Ciudad:</Typography>
                    <Typography variant="body2"> - </Typography>
                  </Stack> */}
                <Stack spacing={1} direction="row">
                  <Typography variant="body2">Código Postal:</Typography>
                  <Typography variant="body2">{user?.zipCode} </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

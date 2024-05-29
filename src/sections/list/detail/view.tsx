/* eslint-disable no-nested-ternary */

'use client';

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Grid from '@mui/material/Unstable_Grid2';
import { useAxios } from 'src/axios/axios-provider';
import { endpoints_api } from 'src/axios/endpoints';
import { SplashScreen } from 'src/components/loading-screen';
import Iconify from 'src/components/iconify/iconify';
import { useRouter } from 'src/routes/hooks';
import { Box } from 'src/components/Box/box-component';
import Label from 'src/components/label/label';
import CarDataUser from './CarDaataUser';
import CarInfoOnboarding from './CarInfoOnboarding';
import CardImgData from './CardImgData';

interface props {
  id: any;
}

export default function ListDetailPage({ id }: props) {
  const axiosInstace = useAxios();

  const [loading, setLoading] = useState(true);

  const [cardInfo, setCardInfo] = useState<any>(null);

  const router = useRouter();

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstace.get(`${endpoints_api.onboarding.findOne}/${id}`).then((response) => {
      if (response.status === 200) {
        setCardInfo({
          ...response.data,
        });
        setLoading(false);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeStatus = (event: any) => {
    axiosInstance
      .patch(`${endpoints_api.onboarding.update}/${id}/status`, {
        status: event.target.value,
      })
      .then((response) => {
        if (response.status === 200) {
          setCardInfo({
            ...cardInfo,
            status: event.target.value as string,
          });
        }
      });
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              pb: 3,
            }}
          >
            <IconButton onClick={() => router.push('/dashboard/list')}>
              <Iconify icon="ic:round-arrow-back-ios-new" />
            </IconButton>
            <Box>
              <Typography variant="h5">Order {cardInfo?.orderId}</Typography>
              <Typography variant="body2" color="#919EAB">
                {format(new Date(cardInfo?.createdAt), 'd MMM y h:m aaa')}
              </Typography>
            </Box>
            <Label
              color={
                cardInfo?.status === 'NEW'
                  ? 'success'
                  : cardInfo?.status === 'COMPLETADO'
                  ? 'primary'
                  : 'error'
              }
              sx={{
                alignSelf: 'baseline',
              }}
            >
              {cardInfo?.status}
            </Label>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Select
                variant="outlined"
                size="small"
                value={cardInfo?.status}
                onChange={handleChangeStatus}
              >
                <MenuItem value="NEW">NEW</MenuItem>
                <MenuItem value="PENDING">PENDIENTE</MenuItem>
                <MenuItem value="COMPLETED">COMPLETADO</MenuItem>
                <MenuItem value="CANCELADO">CANCELADO</MenuItem>
              </Select>
            </Box>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <CarDataUser user={cardInfo.author} />
        </Grid>
        <Grid xs={12} sm={7}>
          <CarInfoOnboarding data={cardInfo} />
        </Grid>
        <Grid xs={12} sm={5}>
          <CardImgData />
        </Grid>
      </Grid>
    </Container>
  );
}

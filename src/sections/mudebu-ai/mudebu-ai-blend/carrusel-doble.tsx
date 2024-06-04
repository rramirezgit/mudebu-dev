'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
// theme
import { Button, Skeleton, Typography } from '@mui/material';
import { bgGradient } from 'src/theme/css';
// components
import Carousel, { CarouselDots, useCarousel } from 'src/components/carousel';
import { useRouter } from 'next/navigation';
import { Magicpen } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setBlendList, setimageSelectedFinishing } from 'src/store/slices/mudebu-ai';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image/image';
import { endpoints_api } from 'src/axios/endpoints';
import { useAxios } from 'src/axios/axios-provider';
import LinearBuffer from 'src/components/progresBarBuffer';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { storageKeys } from 'src/sections/onboarding/form/form-layaout';

// ----------------------------------------------------------------------

export default function Carouseldoble({
  mesageLoading,
  setMesageLoading,
}: {
  mesageLoading: string;
  setMesageLoading: any;
}) {
  const blendList = useSelector((state: RootState) => state.mudebuAi.blendList);
  const benchmarkList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);
  const imageSelectedFinishing = useSelector(
    (state: RootState) => state.mudebuAi.imageSelectedFinishing
  );
  const [counter, setcounter] = useState(1);
  const [dataBlend, setDataBlend] = useState<any>([]);
  const [loading, setLoadingF] = useState(true);

  const dispatch = useDispatch();

  const axiosInstace = useAxios();

  const upSm = useResponsive('up', 'sm');

  const settings = {
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
    centerMode: true,
    centerPadding: '10px',
    Infinity: false,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
  };

  const carousel = useCarousel(settings);

  const handleSelectImage = (image: any) => {
    dispatch(
      setimageSelectedFinishing({
        ...image,
      })
    );
  };

  const handleClickMoreImages = () => {
    if (counter < 5) {
      setcounter(counter + 1);
      setLoadingF(true);

      const prompt = benchmarkList
        .map((image: any) => image.s3Url)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .join(' ');

      axiosInstace.post(endpoints_api.mudebuAi.blend, { prompt }).then((response) => {
        const interval = setInterval(() => {
          axiosInstace
            .get(`${endpoints_api.mudebuAi.get_blend}/${response.data.id}`)
            .then((res2) => {
              if (res2.data?.status === 'completed') {
                setLoadingF(false);
                setMesageLoading('completed');
                const dataStorage = getStorage(storageKeys.mudebuAiBlend);
                dispatch(setBlendList([...dataStorage, ...res2.data.upscaled_urls]));
                setStorage(storageKeys.mudebuAiBlend, [...dataStorage, ...res2.data.upscaled_urls]);
                clearInterval(interval);
              } else if (res2.data?.status === 'pending') {
                setMesageLoading('Esperando respuesta de la IA...');
              } else if (res2.data?.status === 'in-progress') {
                setMesageLoading('Procesando imagenes...');
              } else {
                setMesageLoading('Enviando Imagenes...');
              }
            })
            .catch((error) => {
              console.error(error);
              clearInterval(interval);
            });
        }, 5000);
      });
    }
  };

  useEffect(() => {
    if (blendList.length > 0) {
      if (blendList.length > 4) {
        setcounter(2);
      } else if (blendList.length > 8) {
        setcounter(3);
      } else if (blendList.length > 12) {
        setcounter(4);
      } else if (blendList.length > 16) {
        setcounter(5);
      }
      setDataBlend(blendList.map((image: any, index) => ({ image, id: index })));
      setLoadingF(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blendList]);

  useEffect(() => {
    if (mesageLoading === 'completed') {
      setLoadingF(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesageLoading]);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {loading &&
          dataBlend.length === 0 &&
          [1, 2, 3, 4].map((index) => (
            <Box key={index} sx={{ px: 1 }}>
              <Skeleton
                sx={{
                  margin: '0 auto',
                  width: {
                    xs: 150,
                    sm: '80%',
                  },
                  height: {
                    xs: 139,
                    sm: 331,
                  },
                  borderRadius: 2,
                }}
              />
            </Box>
          ))}
        {dataBlend.map((item: any) => (
          <Box key={item.id} sx={{ px: 1 }}>
            {loading ? (
              <Skeleton
                sx={{
                  margin: '0 auto',
                  width: {
                    xs: 150,
                    sm: '80%',
                  },
                  height: {
                    xs: 139,
                    sm: 331,
                  },
                  borderRadius: 2,
                }}
              />
            ) : (
              <CarouselItem
                item={item}
                onClickImage={handleSelectImage}
                selected={imageSelectedFinishing?.id === item.id}
                loading={loading && !imageSelectedFinishing?.id === item.id}
              />
            )}
          </Box>
        ))}
      </Carousel>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            {mesageLoading}
          </Typography>
          <LinearBuffer />
        </Box>
      ) : (
        <>
          {upSm ? (
            <>
              <Button
                variant="contained"
                sx={{ mt: 3, mr: 2 }}
                onClick={carousel.onPrev}
                disabled={counter === 0}
                color="secondary"
              >
                Pagina anterior
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                startIcon={<Magicpen size="24" color="white" />}
                onClick={handleClickMoreImages}
              >
                {`Generar mas ${counter}/5`}
              </Button>
              <Button
                variant="contained"
                disabled={counter === 0}
                sx={{ mt: 3, ml: 2 }}
                onClick={carousel.onNext}
                color="secondary"
              >
                Pagina siguiente
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ mt: 3, width: '90%' }}
                startIcon={<Magicpen size="24" color="white" />}
                onClick={handleClickMoreImages}
              >
                {`Generar mas ${counter}/5`}
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mr: 2 }}
                disabled={counter === 0}
                onClick={carousel.onPrev}
                color="secondary"
              >
                Pagina anterior
              </Button>
              <Button
                variant="contained"
                disabled={counter === 0}
                sx={{ mt: 3, ml: 2 }}
                onClick={carousel.onNext}
                color="secondary"
              >
                Pagina siguiente
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    title?: string;
    to?: string;
    description?: string;
    image: string;
  };
  loading?: boolean;
  selected?: boolean;
  onClickImage: (item: { image: string }) => void;
};

function CarouselItem({ item, selected, loading, onClickImage }: CarouselItemProps) {
  const theme = useTheme();

  const { image } = item;

  return (
    <Image
      onClick={() => onClickImage(item)}
      sx={{
        overflow: 'hidden',
        position: 'relative',
        margin: '10px auto',
        width: {
          xs: 150,
          sm: '80%',
        },
        height: {
          xs: 139,
          sm: 331,
        },
        cursor: 'pointer',
        ':hover': {
          border: `solid 4px ${theme.palette.secondary.main}`,
        },
        transition: theme.transitions.create('transform'),
        backgroundImage: `url(${image}) `,
        backgroundSize: 'cover',
        borderRadius: '14px',
        boxSizing: 'border-box',
        border: selected ? `solid 4px ${theme.palette.secondary.main}` : 'none',
      }}
    />
  );
}

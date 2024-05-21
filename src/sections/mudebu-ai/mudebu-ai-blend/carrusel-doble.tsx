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

// ----------------------------------------------------------------------

export default function Carouseldoble() {
  const blendList = useSelector((state: RootState) => state.mudebuAi.blendList);
  const benchmarkList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);
  const imageSelectedFinishing = useSelector(
    (state: RootState) => state.mudebuAi.imageSelectedFinishing
  );
  const [counter, setcounter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataBlend, setDataBlend] = useState<any>([]);

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
      setLoading(true);

      const prompt = benchmarkList.map((image: any) => image.s3Url).join(' ');
      axiosInstace.post(endpoints_api.mudebuAi.blend, { prompt }).then((response) => {
        setLoading(false);
        dispatch(setBlendList(response.data.upscaled_urls));
        setDataBlend([
          ...response.data.upscaled_urls.map((image: any, index: number) => ({ image, id: index })),
          ...dataBlend,
        ]);
      });
    }
  };

  useEffect(() => {
    setDataBlend(blendList.map((image: any, index) => ({ image, id: index })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
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

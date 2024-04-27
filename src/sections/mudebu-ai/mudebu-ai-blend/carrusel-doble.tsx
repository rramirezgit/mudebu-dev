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
import { setBlendList } from 'src/store/slices/mudebu-ai';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image/image';

// ----------------------------------------------------------------------

export default function Carouseldoble() {
  const [counter, setcounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataBlend, setDataBlend] = useState<any>([]);

  const blendList = useSelector((state: RootState) => state.mudebuAi.blendList);
  const dispatch = useDispatch();

  const upSm = useResponsive('up', 'sm');

  const data: any = [
    { image: 'https://source.unsplash.com/random/1', id: '1' },
    { image: 'https://source.unsplash.com/random/2', id: '2' },
    { image: 'https://source.unsplash.com/random/3', id: '3' },
    { image: 'https://source.unsplash.com/random/4', id: '4' },
  ];

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
    if (blendList.includes(image)) {
      dispatch(setBlendList(blendList.filter((selected: any) => selected.id !== image.id)));
    } else {
      dispatch(setBlendList([...blendList, image]));
    }
  };

  const handleClickMoreImages = () => {
    if (counter < 5) {
      setcounter(counter + 1);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        setDataBlend([
          { image: 'https://source.unsplash.com/random/5', id: '5' },
          { image: 'https://source.unsplash.com/random/6', id: '6' },
          { image: 'https://source.unsplash.com/random/7', id: '7' },
          { image: 'https://source.unsplash.com/random/8', id: '8' },
          ...dataBlend,
        ]);
      }, 3000);
    }
  };

  useEffect(() => {
    setDataBlend(data);
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
                selected={blendList.includes(item)}
                loading={loading && !blendList.includes(item)}
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

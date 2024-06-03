'use client';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
// theme
import { Button, Typography } from '@mui/material';
import { bgGradient } from 'src/theme/css';
// components
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title?: string;
    to?: string;
    image: string;
    description?: string;
  }[];
};

export default function CarouselCenterMode({ data }: Props) {
  const carousel = useCarousel({
    slidesToShow: 1,
    className: 'slider variable-width',
    swipeToSlide: true,
    variableWidth: true,
    centerMode: true,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 2000,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  });

  const handleNext = () => {
    carousel.onNext();
  };

  const handlePrev = () => {
    carousel.onPrev();
  };
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows filled icon="mingcute:right-line" onNext={handleNext} onPrev={handlePrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item, index) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <CarouselItem item={item} isActive={index === carousel.currentIndex} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    id: any;
    title?: string;
    to?: string;
    description?: string;
    miniDescription?: string;
    image: string;
  };
  isActive: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const theme = useTheme();

  const router = useRouter();

  const { image, title, to, description } = item;

  const onlyimage = !title && !description && !to;

  return (
    <Paper
      sx={{
        borderRadius: onlyimage ? 10 : 300,
        overflow: 'hidden',
        position: 'relative',
        width: onlyimage
          ? {
              xs: '287px',
              sm: '510px',
            }
          : {
              xs: '287px',
              sm: '310px',
            },
        height: {
          xs: '500px',
          sm: '539px',
        },
        backgroundImage: `url(${image}) `,
        backgroundSize: 'cover',
      }}
    >
      {title && description && to && (
        <CardContent
          id={`item-carrusel-${item.id}`}
          sx={{
            zIndex: 9,
            width: '100%',
            opacity: isActive ? 1 : 0,
            height: '100%',
            textAlign: 'left',
            transition: 'all 0.5s ease-in-out',
            position: 'absolute',
            color: 'common.white',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            ...bgGradient({
              direction: 'to top',
              startColor: `${theme.palette.grey[900]} 0%`,
              endColor: `${alpha(theme.palette.grey[900], 0.3)} 100%`,
            }),
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
            {item.miniDescription}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push(to)}
            sx={{
              width: '40%',
            }}
          >
            Ver más
          </Button>
        </CardContent>
      )}
    </Paper>
  );
}

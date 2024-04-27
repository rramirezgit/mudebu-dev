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
    slidesToShow: 3,
    className: 'slider variable-width',
    swipeToSlide: true,
    variableWidth: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  });
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows
        filled
        icon="mingcute:right-line"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <CarouselItem item={item} />
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
    title?: string;
    to?: string;
    description?: string;
    image: string;
  };
};

function CarouselItem({ item }: CarouselItemProps) {
  const theme = useTheme();

  const router = useRouter();

  const { image, title, to, description } = item;

  console.log(image);

  return (
    <Paper
      sx={{
        borderRadius: 300,
        overflow: 'hidden',
        position: 'relative',
        width: {
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
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0';
          }}
          sx={{
            zIndex: 9,
            width: '100%',
            opacity: 0,
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
              endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
            }),
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
            {description}
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

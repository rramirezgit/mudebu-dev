// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
// theme
import { Button, Typography } from '@mui/material';
import { bgGradient } from 'src/theme/css';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
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
    title: string;
    description: string;
    coverUrl: string;
  };
};

function CarouselItem({ item }: CarouselItemProps) {
  const theme = useTheme();

  const { coverUrl, title } = item;

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
        backgroundImage: `url(${coverUrl}) `,
        backgroundSize: 'cover',
      }}
    >
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
        <TextMaxLine variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          {title}
        </TextMaxLine>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          {item.description}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: '40%',
          }}
        >
          Ver más
        </Button>
      </CardContent>
    </Paper>
  );
}

/* eslint-disable no-nested-ternary */
import { m, useAnimate } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
// hooks
import { Box, Dialog, SxProps } from '@mui/material';
import { Theme } from '@mui/system';
import { MotionViewport, varFade } from 'src/components/animate';
import { useResponsive } from 'src/hooks/use-responsive';
/* eslint-disable import/order */

const images = [
  {
    id: 1,
    url: '/assets/images/Products/carpinteria/1.webp',
  },
  {
    id: 2,
    url: '/assets/images/Products/POP/1.webp',
  },
  {
    id: 3,
    url: '/assets/images/Products/techos/4.webp',
  },
  {
    id: 4,
    url: '/assets/images/Products/Superficies_solidas/3.webp',
  },
  {
    id: 5,
    url: '/assets/images/Products/POP/5.webp',
  },
  {
    id: 6,
    url: '/assets/images/Products/impresion/9.webp',
  },
  {
    id: 7,
    url: '/assets/images/Products/Anuncios/1.webp',
  },
  {
    id: 8,
    url: '/assets/images/Products/techos/3.webp',
  },
  {
    id: 10,
    url: '/assets/images/Services/Planificación_Mantenimiento/3.webp',
  },
  {
    id: 11,
    url: '/assets/images/Services/Inovacion/2.webp',
  },
  {
    id: 12,
    url: '/assets/images/Services/Tecnología_Avanzada/1.webp',
  },
  {
    id: 13,
    url: '/assets/images/Services/Consultoria_y_Real/3.png',
  },
];

interface BoxProps {
  handleMouseEnter: (back: boolean) => void;
  handleMouseLeave: (back: boolean) => void;
  hanldeClick: (item: any) => void;
  item: any;
  back?: boolean;
  zIndexColums: number;
  sx?: SxProps<Theme> | undefined;
}
const heightImage = 466;

const BoxComponent = ({
  handleMouseEnter,
  handleMouseLeave,
  hanldeClick,
  item,
  back = false,
  zIndexColums,
  sx,
}: BoxProps) => {
  const smDown = useResponsive('down', 'md');

  return (
    <Box
      component={m.div}
      sx={{
        marginTop: 2,
        backgroundImage: `url(${item.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: 10,
        width: zIndexColums !== 1 && smDown ? 50 : smDown ? 300 : 300,
        height: heightImage,
        borderRadius: '5%',
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.07), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
        '&:hover': {
          transform: 'scale(1.1)',
          transition: 'all 0.5s ease',
          zIndex: 100,
          ' & > div': {
            opacity: 1,
          },
        },
        ...sx,
      }}
      onMouseEnter={() => handleMouseEnter(back)}
      onMouseLeave={() => handleMouseLeave(back)}
      onClick={() => hanldeClick(item)}
    >
      <Box
        component={m.div}
        sx={{
          position: 'absolute',
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: '84px',
          bottom: 15,
          left: 15,
          color: '#fff',
          padding: 2,
          textAlign: 'center',
          borderRadius: '12px',
          opacity: 0,
          transition: 'all 0.5s ease',
        }}
      >
        Lorem ipsu dolor sit amet
      </Box>
    </Box>
  );
};

const BoxAnimate = ({ animationY, duration, zIndexColums, sx }: any) => {
  const [animation1, setAnimation1] = useState<any>(null);
  const [scope1, animate1] = useAnimate();
  const [zIndex1, setZIndex1] = useState<number>(0);

  const [animation2, setAnimation2] = useState<any>(null);
  const [scope2, animate2] = useAnimate();
  const [zIndex2, setZIndex2] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [indexSelected, setindexSelected] = useState<any>(0);

  const handleClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    if (!scope1?.current) return;
    if (!scope2?.current) return;
    setAnimation1(
      animate1(
        scope1?.current,
        {
          y: animationY[0],
        },
        { duration, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
      )
    );
    setAnimation2(
      animate2(
        scope2?.current,
        {
          y: animationY[1],
        },
        { duration, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = (back: boolean) => {
    animation1.pause();
    animation2.pause();
    setZIndex1(back ? 0 : 1);
    setZIndex2(back ? 1 : 0);
  };

  const handleMouseLeave = (back: boolean) => {
    animation1.play();
    animation2.play();
    setZIndex1(back ? 1 : 0);
    setZIndex2(back ? 0 : 1);
  };

  const handleClick = (item: any) => {
    setOpen(true);
    setindexSelected(item);
  };

  return (
    <>
      <Stack
        component={m.div}
        variants={varFade().in}
        alignItems="center"
        sx={{
          width: '38%',
          position: 'relative',
          height: '100%',
          zIndex: zIndexColums,
        }}
      >
        <Box component="div" ref={scope1} sx={{ position: 'absolute', mt: -0.2, zIndex: zIndex1 }}>
          {images.map((item, index) => (
            <BoxComponent
              key={index}
              item={item}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hanldeClick={handleClick}
              zIndexColums={zIndexColums}
              sx={sx}
            />
          ))}
        </Box>
        <Box component="div" ref={scope2} sx={{ position: 'absolute', zIndex: zIndex2 }}>
          {images.map((item, index) => (
            <BoxComponent
              key={index}
              item={item}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hanldeClick={handleClick}
              zIndexColums={zIndexColums}
              back
              sx={sx}
            />
          ))}
        </Box>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <img
          src={`${indexSelected?.url}`}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Dialog>
    </>
  );
};

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const abajo = [
    ['0%', '100%'],
    ['-100%', '0%'],
  ];

  const arriba = [
    ['100%', '0%'],
    ['0%', '-100%'],
  ];

  const renderSlides = (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <BoxAnimate
        animationY={arriba}
        duration={80}
        zIndexColums={0}
        sx={{ opacity: { xs: 0.3, md: 1 } }}
      />
      <BoxAnimate animationY={abajo} duration={100} zIndexColums={1} />
      <BoxAnimate
        animationY={arriba}
        duration={50}
        zIndexColums={0}
        sx={{ opacity: { xs: 0.3, md: 1 } }}
      />
    </Stack>
  );

  return (
    <StyledRoot ref={heroRef}>
      <StyledWrapper>
        <Container component={MotionViewport}>{renderSlides}</Container>
      </StyledWrapper>
    </StyledRoot>
  );
}

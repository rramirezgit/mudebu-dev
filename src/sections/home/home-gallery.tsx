/* eslint-disable no-nested-ternary */
import { m, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { Dialog } from '@mui/material';
import { varFade } from 'src/components/animate';
import { useResponsive } from 'src/hooks/use-responsive';

interface BoxProps {
  handleMouseEnter: (back: boolean) => void;
  handleMouseLeave: (back: boolean) => void;
  hanldeClick: (item: any) => void;
  item: any;
  back?: boolean;
  zIndexColums: number;
}
const heightImage = 466;

const BoxComponent = ({
  handleMouseEnter,
  handleMouseLeave,
  hanldeClick,
  item,
  back = false,
  zIndexColums,
}: BoxProps) => {
  const smDown = useResponsive('down', 'md');

  return (
    <Box
      sx={{
        marginTop: 2,
        backgroundImage: `url(https://assets.codepen.io/721952/${item}.jpg)`,
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
      }}
      onMouseEnter={() => handleMouseEnter(back)}
      onMouseLeave={() => handleMouseLeave(back)}
      onClick={() => hanldeClick(item)}
    >
      <Box
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

const BoxAnimate = ({ animationY, duration, zIndexColums }: any) => {
  const [animation1, setAnimation1] = useState<any>(null);
  const [scope1, animate1] = useAnimate();
  const [zIndex1, setZIndex1] = useState<number>(0);

  const [animation2, setAnimation2] = useState<any>(null);
  const [scope2, animate2] = useAnimate();
  const [zIndex2, setZIndex2] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [indexSelected, setindexSelected] = useState<number>(0);

  const smDown = useResponsive('down', 'xl');

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAnimation1(
      animate1(
        scope1.current,
        {
          y: animationY[0],
        },
        { duration, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
      )
    );
    setAnimation2(
      animate2(
        scope2.current,
        {
          y: animationY[1],
        },
        { duration, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
      )
    );
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
        <Box ref={scope1} sx={{ position: 'absolute', mt: -0.2, zIndex: zIndex1 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <BoxComponent
              key={index}
              item={item}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hanldeClick={handleClick}
              zIndexColums={zIndexColums}
            />
          ))}
        </Box>
        <Box ref={scope2} sx={{ position: 'absolute', zIndex: zIndex2 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <BoxComponent
              key={index}
              item={item}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              hanldeClick={handleClick}
              zIndexColums={zIndexColums}
              back
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
          src={`https://assets.codepen.io/721952/${indexSelected}.jpg`}
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
      <BoxAnimate animationY={arriba} duration={80} zIndexColums={0} />

      <BoxAnimate animationY={abajo} duration={100} zIndexColums={1} />

      <BoxAnimate animationY={arriba} duration={50} zIndexColums={0} />
    </Stack>
  );

  return (
    <StyledRoot ref={heroRef}>
      <StyledWrapper>
        <Container>{renderSlides}</Container>
      </StyledWrapper>
    </StyledRoot>
  );
}

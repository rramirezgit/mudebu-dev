'use client';

import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'src/components/Box/box-component';
import Iconify from 'src/components/iconify/iconify';
import { RootState } from 'src/store';
import { setContentStep, setStep } from 'src/store/slices/onBoarding';
import { TSeccionForm } from '../form/types';

const degreesPerSection = 13;

export default function AnimationOnboarding() {
  const step = useSelector((state: RootState) => state.OnBoarding.step);
  const [rotation, setrotation] = useState(0);

  const theme = useTheme();

  const dispatch = useDispatch();

  const seccionesForm = Object.entries(TSeccionForm).map(([key, value]) => value);

  const rotateToSection = (index: number) => {
    dispatch(setContentStep(0));
    dispatch(setStep(index));
    setrotation(index * degreesPerSection);
  };

  useEffect(() => {
    setrotation(step * degreesPerSection);
  }, [step]);

  const getRotationDegree = (index: number) => {
    const activePositionDegree = -rotation;
    return activePositionDegree + degreesPerSection * index;
  };

  const Lines = (
    <>
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '66vh',
            height: '69vh',
            transition: 'all 0.3s ease-in-out',
            border: `0.5px solid ${theme.palette.primary.main}`,
            borderRadius: '50%',
            left: `${index * 2}%`,
            top: '-18px',
            zIndex: -1,
            animation: 'floatingLines 0.6s ease-in-out',
            '@keyframes floatingLines': {
              '0%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: `scale(1.1)`,
              },
              '100%': {
                transform: 'scale(1)',
              },
            },
            animationDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </>
  );

  const arrow = (
    <Box
      sx={{
        position: 'absolute',
        transition: 'all 1s ease-in-out',
        width: '45px',
        height: '45px',
        right: '-15%',
        top: '49%',
        // animacion flotando
        animation: 'floating',
        '@keyframes floating': {
          '0%': {
            transform: 'translateX(0px)',
          },
          '50%': {
            transform: `translateX(-${7}px)`,
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationPlayState: 'running',
      }}
    >
      <Iconify
        icon="gravity-ui:triangle-left"
        color={theme.palette.primary.main}
        width={30}
        height={30}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        borderRadius: '50%',
        width: '65vh',
        height: '65vh',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        left: {
          md: '-40%',
          lg: '-30%',
          xl: '-30%',
        },
        '@media (max-width: 1062px)': {
          left: '-65%',
        },
      }}
    >
      {seccionesForm.map((name, index) => (
        <Box
          key={name}
          // onClick={() => rotateToSection(index)}
          sx={{
            color: step === index ? 'white' : 'secondary.main',
            fontWeight: step === index ? 'bold' : 'normal',
            // cursor: 'pointer',
            textAlign: 'end',
            position: 'absolute',
            transition: 'all 0.3s ease-in-out',
            top: '50%',
            fontSize: {
              md: 13,
              lg: 13,
              xl: 15,
            },
            transform: `rotate(${getRotationDegree(index)}deg) translate(${
              (-index * 3) / 2
            }px, 0px)`,
            width: '95%',
            // '&:hover': {
            //   color: 'white',
            //   fontWeight: 'bold',
            // },
          }}
        >
          {name}
        </Box>
      ))}
      {Lines}
      {arrow}
    </Box>
  );
}

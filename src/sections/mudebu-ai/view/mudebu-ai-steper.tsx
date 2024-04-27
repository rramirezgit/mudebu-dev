'use client';

import { useState } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import MudebuAiUpload from '../mudebu-ai-benchmarking/m-ai-upload';
import MudebuAiGetAi from '../mudebu-ai-benchmarking/m-ai-get-ai';
import { styled } from '@mui/system';
import { StepIconProps } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Iconify from 'src/components/iconify/iconify';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setEditImage, setHaveBenchmarks } from 'src/store/slices/mudebu-ai';
import MudebuAiblend from '../mudebu-ai-blend/mudebu-ai-blend';
import MudebuAiPreview from '../mudebu-ai-editor/mudebu-ai-preview';
import { Magicpen } from 'iconsax-react';
import MudebuAiEditor from '../mudebu-ai-editor/mudebu-ai-editor';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

type styledProps = {
  ownerState: { active?: boolean };
};

const QontoStepIconRoot = styled('div')<styledProps>(({ theme, ownerState }) => ({
  color: ownerState?.active ? theme.palette.primary.main : theme.palette.grey[300],
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {}),
  '& .QontoStepIcon-completedIcon': {
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const theme = useTheme();

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify icon="mdi:check" color={theme.palette.primary.main} />
      ) : (
        <Iconify icon="mdi:circle" width={12} height={12} />
      )}
    </QontoStepIconRoot>
  );
}

// ----------------------------------------------------------------------

const steps = ['Benchmarking', 'Inteligencia Artificial', 'Edición IA'];

export default function MudebuAiStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const haveBenchmarks = useSelector((state: RootState) => state.mudebuAi.haveBenchmarks);
  const blendList = useSelector((state: RootState) => state.mudebuAi.blendList);
  const benchmarkList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);
  const editImage = useSelector((state: RootState) => state.mudebuAi.editImage);

  const dispatch = useDispatch();

  const isStepOptional = (step: number) => step === 0;

  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (!haveBenchmarks && activeStep === 0) {
      dispatch(setHaveBenchmarks(true));
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    dispatch(setEditImage(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped((prevSkipped) => {
    //   const newSkipped = new Set(prevSkipped.values());
    //   newSkipped.add(activeStep);
    //   return newSkipped;
    // });

    dispatch(setHaveBenchmarks(false));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClickEditImage = () => {
    dispatch(setEditImage(!editImage));
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} StepIconComponent={QontoStepIcon}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              minHeight: 120,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
          >
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              my: 3,
              minHeight: 120,
            }}
          >
            {activeStep === 0 && <>{haveBenchmarks ? <MudebuAiUpload /> : <MudebuAiGetAi />}</>}
            {activeStep === 1 && <MudebuAiblend />}
            {activeStep === 2 && <>{editImage ? <MudebuAiEditor /> : <MudebuAiPreview />}</>}
          </Box>

          <Box sx={{ display: 'flex' }}>
            {!haveBenchmarks && (
              <Button
                color="inherit"
                disabled={activeStep === 0 && haveBenchmarks}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atras
              </Button>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {activeStep === steps.length - 1 && !editImage && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 1 }}
                onClick={handleClickEditImage}
                startIcon={<Magicpen size="24" color="white" />}
              >
                Edición IA
              </Button>
            )}
            {benchmarkList.length !== 0 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && benchmarkList.length === 0) ||
                  (activeStep === 1 && blendList.length === 0)
                }
              >
                {activeStep === steps.length - 1 ? 'Finalizar Cotización' : 'Siguiente'}
              </Button>
            )}
            {haveBenchmarks && benchmarkList.length === 0 && (
              <>
                {isStepOptional(activeStep) && (
                  <Button variant="contained" onClick={handleSkip} sx={{ ml: 1 }}>
                    No tengo benchmarks
                  </Button>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
}

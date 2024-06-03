/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */

'use client';

import { useEffect, useState } from 'react';
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
import {
  setActiveStep,
  setBlendList,
  setEditImage,
  setHaveBenchmarks,
  setimageSelectedFinishing,
} from 'src/store/slices/mudebu-ai';
import MudebuAiblend from '../mudebu-ai-blend/mudebu-ai-blend';
import MudebuAiPreview from '../mudebu-ai-editor/mudebu-ai-preview';
import { Magicpen } from 'iconsax-react';
import MudebuAiEditor from '../mudebu-ai-editor/mudebu-ai-editor';
import { useAxios } from 'src/axios/axios-provider';
import { useRouter } from 'src/routes/hooks';
import { endpoints_api } from 'src/axios/endpoints';
import { setImagesData } from 'src/store/slices/onBoarding';
import { LoadingButton } from '@mui/lab';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { storageKeys } from 'src/sections/onboarding/form/form-layaout';
import { convertImageToBase64 } from './tob64';

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
  const [skipped, setSkipped] = useState(new Set<number>());
  const [loading, setLoading] = useState(false);
  const [showGetAi, setShowGetAi] = useState(false);
  const [mesageLoading, setMesageLoading] = useState('Enviando imagenes a la IA...');

  const haveBenchmarks = useSelector((state: RootState) => state.mudebuAi.haveBenchmarks);
  const activeStep = useSelector((state: RootState) => state.mudebuAi.activeStep);
  const blendList = useSelector((state: RootState) => state.mudebuAi.blendList);
  const benchmarkList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);
  const editImage = useSelector((state: RootState) => state.mudebuAi.editImage);
  const info = useSelector((state: RootState) => state.OnBoarding.onoardingInfo);
  const imageSelectedFinishing = useSelector(
    (state: RootState) => state.mudebuAi.imageSelectedFinishing
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const axiosInstace = useAxios();

  const isStepOptional = (step: number) => step === 0;

  const isStepSkipped = (step: number) => skipped.has(step);

  const nextStep = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    dispatch(setActiveStep(activeStep + 1));
    setSkipped(newSkipped);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const mudebuAiBlend = getStorage(storageKeys.mudebuAiBlend);
    const uploadedImages = getStorage(storageKeys.uploadedImages);
    if (mudebuAiBlend) {
      dispatch(setBlendList(mudebuAiBlend));
      dispatch(setActiveStep(1));
    }
    if (uploadedImages) dispatch(setHaveBenchmarks(true));
  }, []);

  const handleNext = () => {
    if (haveBenchmarks && benchmarkList.length <= 1) {
      return;
    }

    if (activeStep === 0) {
      setLoading(true);

      const imgBlended = getStorage(storageKeys.mudebuAiBlend);

      if (imgBlended) {
        dispatch(setBlendList(imgBlended));
        setLoading(false);
        nextStep();
        return;
      }

      // tomar de forma random solo dos imagenes del array de promt

      const prompt = benchmarkList
        .map((image: any) => image.s3Url)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .join(' ');

      nextStep();

      axiosInstace.post(endpoints_api.mudebuAi.blend, { prompt }).then((response) => {
        // dispatch(setBlendList(response.data.upscaled_urls));
        // nextStep();
        const interval = setInterval(() => {
          axiosInstace
            .get(`${endpoints_api.mudebuAi.get_blend}/${response.data.id}`)
            .then((res2) => {
              if (res2.data?.status === 'completed') {
                setLoading(false);
                setMesageLoading('completed');
                dispatch(setBlendList(res2.data.upscaled_urls));
                setStorage(storageKeys.mudebuAiBlend, res2.data.upscaled_urls);
                clearInterval(interval);
              } else if (res2.data?.status === 'pending') {
                setMesageLoading('Esperando respuesta de la IA...');
              } else if (res2.data?.status === 'in-progress') {
                setMesageLoading('Procesando imagenes...');
              } else {
                setMesageLoading(res2.data?.status);
              }
            })
            .catch((error) => {
              console.error(error);
              clearInterval(interval);
            });
        }, 5000);
      });
    }

    if (activeStep === 1) {
      setLoading(true);
      convertImageToBase64({
        url: imageSelectedFinishing.image,
        split: '/assets/',
      }).then((data) => {
        dispatch(setimageSelectedFinishing({ ...imageSelectedFinishing, b64: data }));
        setLoading(false);
        nextStep();
      });
    }

    if (activeStep === 2) {
      try {
        setLoading(true);
        const base64WithoutPrefix = imageSelectedFinishing?.b64.split(',')[1]; // Eliminar el prefijo si existe
        const binary = atob(base64WithoutPrefix);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        const resultBlob = new Blob([new Uint8Array(array)], { type: 'image/png' });

        const file = new File([resultBlob], 'selected.png', { type: 'image/png' });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('source', 'USER_UPLOAD');

        let idOnboarding = getStorage(storageKeys.onboardingId);

        if (!storageKeys) {
          idOnboarding = info?.savedOnboarding?.id;
        }

        axiosInstace
          .post(`${endpoints_api.mudebuAi.media}/${idOnboarding}`, formData)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              const imgS3 = response.data?.s3Url;
              axiosInstace
                .patch(`${endpoints_api.onboarding.update}/${idOnboarding}`, {
                  imagesResult: imgS3,
                })
                .then((response2) => {
                  if (response2.status === 200 || response2.status === 201) {
                    setLoading(false);
                    router.push('/onboarding/ended-process/');
                  }
                });
            }
          });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleBack = () => {
    if (!haveBenchmarks && activeStep === 0) {
      dispatch(setHaveBenchmarks(true));
    } else {
      dispatch(setActiveStep(activeStep - 1));
    }

    const uploaBenchmarks = getStorage(storageKeys.uploadedImages);
    if (uploaBenchmarks) {
      dispatch(setHaveBenchmarks(true));
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

    setShowGetAi(true);
  };

  const handleReset = () => {
    dispatch(setActiveStep(0));
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
            {activeStep === 0 && <>{showGetAi ? <MudebuAiGetAi /> : <MudebuAiUpload />}</>}
            {activeStep === 1 && (
              <MudebuAiblend mesageLoading={mesageLoading} setMesageLoading={setMesageLoading} />
            )}
            {activeStep === 2 && <>{editImage ? <MudebuAiEditor /> : <MudebuAiPreview />}</>}
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0 && haveBenchmarks}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {activeStep === steps.length - 1 && !editImage && (
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ mr: 1 }}
                loading={loading}
                onClick={handleClickEditImage}
                startIcon={<Magicpen size="24" color="white" />}
              >
                Edición IA
              </LoadingButton>
            )}
            {benchmarkList.length !== 0 && (
              <LoadingButton
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && benchmarkList.length < 2) ||
                  (activeStep === 1 && !imageSelectedFinishing)
                }
                variant="contained"
                loading={loading}
              >
                {activeStep === steps.length - 1 ? 'Finalizar Cotización' : 'Siguiente'}
              </LoadingButton>
            )}
            {haveBenchmarks && benchmarkList.length === 0 && (
              <>
                {isStepOptional(activeStep) && (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={handleSkip}
                    sx={{ ml: 1 }}
                    loading={loading}
                  >
                    No tengo benchmarks
                  </LoadingButton>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  PaperProps,
} from '@mui/material';
import { m } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, removeStorage } from 'src/hooks/use-local-storage';
import getVariant from 'src/sections/_examples/extra/animate-view/get-variant';
import { useRouter } from 'src/routes/hooks';
import { RootState } from 'src/store';
import { cleanStorage } from 'src/sections/mudebu-ai/view/clean';
import { SplashScreen } from 'src/components/loading-screen';
import FormSteps from './form-steps';
import OnboardingFormLayout, { storageKeys } from './form-layaout';
import { FormDataSteps } from './form-data';

export default function OnboardingForm() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [position, setPosition] = useState('');
  const dispatch = useDispatch();

  const initialText = useSelector((state: RootState) => state.OnBoarding.initialText);

  const handleContinue = (setValues: any) => {
    if (position === '0') {
      const data = getStorage(storageKeys.onboardingProgress);
      if (data) {
        setValues(data);
      } else {
        const dataInitialValues: any = {};
        FormDataSteps.forEach((step) => {
          step.content.forEach((c) => {
            if (!c.fields) return;
            c?.fields.forEach((input: any) => {
              dataInitialValues[input.nameFORMIK] = '';
            });
          });
        });
        dataInitialValues.descripcion = initialText;
        setInitialValues(dataInitialValues);
      }
    }
    if (position === '1') {
      router.push('/onboarding-info');
    }
    if (position === '2') {
      router.push('/mudebu-ai');
    }
    if (position === '3') {
      router.push('/mudebu-ai');
    }
    if (position === '4') {
      router.push('/mudebu-ai');
    }
    setOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    const onboardingResult = getStorage(storageKeys.onboardingResult);
    const onboardingId = getStorage(storageKeys.onboardingId);
    const uploadedImages = getStorage(storageKeys.uploadedImages);
    const mudebuIaBenchmarkAi = getStorage(storageKeys.mudebuIaBenchmarkAi);
    const mudebuAiBlend = getStorage(storageKeys.mudebuAiBlend);

    const onboardingProgress = getStorage(storageKeys.onboardingProgress);
    // Determina el paso en base a la existencia de las variables
    let postionResult = '';
    if (onboardingProgress) {
      postionResult = '0';
    }
    if (onboardingResult || onboardingId) {
      postionResult = '1';
    }
    if (uploadedImages) {
      postionResult = '2';
    }
    if (mudebuIaBenchmarkAi) {
      postionResult = '3';
    }
    if (mudebuAiBlend) {
      postionResult = '4';
    }
    setPosition(postionResult);
    // Asumiendo que 0 es el paso inicial

    if (postionResult) {
      setOpen(true);
      setLoading(false);
    } else {
      const dataInitialValues: any = {};
      FormDataSteps.forEach((step) => {
        step.content.forEach((c) => {
          if (!c.fields) return;
          c?.fields.forEach((input: any) => {
            dataInitialValues[input.nameFORMIK] = '';
          });
        });
      });

      dataInitialValues.descripcion = initialText;
      setInitialValues(dataInitialValues);
      setLoading(false);
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      return 'You have unsaved changes. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
      }}
      validationSchema={Yup.object().shape({
        descripcion: Yup.string()
          .min(10, 'Debe tener al menos 10 caracteres')
          .required('Campo requerido'),
        benchmarks: Yup.string()
          .min(10, 'Debe tener al menos 10 caracteres')
          .required('Campo requerido'),
        mobiliario: Yup.string()
          .min(10, 'Debe tener al menos 10 caracteres')
          .required('Campo requerido'),
      })}
    >
      {({ setValues, setFieldValue }) => (
        <>
          <Form>
            <OnboardingFormLayout>
              <FormSteps />
            </OnboardingFormLayout>
          </Form>
          <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={() => setOpen(false)}
            PaperComponent={(props: PaperProps) => (
              <m.div initial="initial" animate="enter" exit="leave" variants={getVariant('scale')}>
                <Paper {...props}>{props.children}</Paper>
              </m.div>
            )}
          >
            <DialogTitle id="alert-dialog-title">Progreso guardado</DialogTitle>

            <DialogContent>Tienes un progreso guardado, ¿quieres continuar?</DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                  // limpiar el local storage
                  cleanStorage(dispatch);

                  if (initialText) {
                    setFieldValue('descripcion', initialText);
                  }
                }}
              >
                Cancelar
              </Button>
              <Button variant="contained" onClick={() => handleContinue(setValues)} autoFocus>
                Continuar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Formik>
  );
}

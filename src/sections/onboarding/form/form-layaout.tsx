/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { m } from 'framer-motion';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { Box } from 'src/components/Box/box-component';
import { nextStep, setContentStep, setStep } from 'src/store/slices/onBoarding';
import { RootState } from 'src/store';
import { useRouter } from 'src/routes/hooks';
import { MotionViewport, varFade } from 'src/components/animate';
import { FormDataSteps } from './form-data';
import { TSeccionForm } from './types';

interface OnboardingFormLayoutProps {
  children: React.ReactNode;
}
export default function OnboardingFormLayout({ children }: OnboardingFormLayoutProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [prevOptions, setprevOptions] = useState<any>({});

  const { values } = useFormikContext();
  const dispatch = useDispatch();

  const router = useRouter();

  const seccionesForm = Object.entries(TSeccionForm).map(([key, value]) => value);
  const step = useSelector((state: RootState) => state.OnBoarding.step);
  const contentStep = useSelector((state: RootState) => state.OnBoarding.contentStep);

  useEffect(() => {
    currentStepIsComplete();
  }, []);

  useEffect(() => {
    currentStepIsComplete();
  }, [values, step, contentStep]);

  const currentStepIsComplete = () => {
    const currentStep = FormDataSteps[step];

    if (currentStep) {
      const { fields } = currentStep.content[contentStep];
      const valuesForm = values as any;

      const value = fields.every((field: any) => valuesForm[field?.nameFORMIK]);
      setIsComplete(value);
    }
  };

  const setPreviusOptions = (currentStep: any) => {
    setprevOptions({
      ...prevOptions,
      [FormDataSteps[step + 1].content[0].name]: currentStep.content[contentStep].name,
    });
  };

  const handleClickNext = () => {
    const valuesForm = values as any;
    const currentStep = FormDataSteps[step];

    let nextStepIndex = 0;

    if (step <= seccionesForm.length - 1) {
      if (currentStep?.content[contentStep]?.nextCondition) {
        const { nextCondition } = currentStep.content[contentStep];

        if (nextCondition === 'nextStep') {
          dispatch(nextStep());
          setPreviusOptions(currentStep);
          return;
        }

        if (nextCondition === 'nextContent') {
          const currentContet = currentStep.content[contentStep];
          const value = valuesForm[currentContet.name];

          nextStepIndex = currentStep.content.findIndex((c) => c.name === value);

          if (nextStepIndex === -1) {
            dispatch(nextStep());
            setPreviusOptions(currentStep);
            return;
          }

          dispatch(setContentStep(nextStepIndex));
          setprevOptions({
            ...prevOptions,
            [FormDataSteps[step].content[nextStepIndex].name]:
              currentStep.content[contentStep].name,
          });
          return;
        }

        if (nextCondition === 'finish') {
          router.replace('/onboarding-info');
          return;
        }

        const valueCondition = nextCondition?.condition(values);

        if (valueCondition) {
          if (nextCondition?.true === 'nextStep') {
            dispatch(nextStep());
            setPreviusOptions(currentStep);
            return;
          }
          nextStepIndex = currentStep.content.findIndex((c) => c.name === nextCondition?.true);
        } else {
          if (nextCondition?.false === 'nextStep') {
            dispatch(nextStep());
            setPreviusOptions(currentStep);
            return;
          }
          nextStepIndex = currentStep.content.findIndex((c) => c.name === nextCondition?.false);
        }

        dispatch(setContentStep(nextStepIndex));
        setprevOptions({
          ...prevOptions,
          [FormDataSteps[step].content[nextStepIndex].name]: currentStep.content[contentStep].name,
        });
      }
    }
  };

  const handleClickPrev = () => {
    const currentStep = FormDataSteps[step];

    if (step !== 0) {
      FormDataSteps.forEach((stepData, index) => {
        if (index <= step) {
          const indexPrevContent = stepData.content.findIndex(
            (content) => content.name === prevOptions[currentStep.content[contentStep].name]
          );
          const indexStep = index;

          if (indexPrevContent !== -1) {
            dispatch(setStep(indexStep));
            dispatch(setContentStep(indexPrevContent));
          }
        }
      });
    }
  };

  return (
    <Box component={MotionViewport}>
      <m.div variants={varFade().inRight}>
        <Box
          sx={{
            padding: '0 20px',
          }}
        >
          {children}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 0',
            }}
          >
            <Button
              onClick={handleClickPrev}
              variant="outlined"
              sx={{
                width: '156px',
              }}
            >
              Anterior
            </Button>
            <Button
              onClick={handleClickNext}
              variant="contained"
              disabled={!isComplete}
              sx={{
                width: '156px',
                height: '48px',
              }}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </m.div>
    </Box>
  );
}

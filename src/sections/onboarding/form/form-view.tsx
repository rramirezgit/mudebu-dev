'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { getStorage } from 'src/hooks/use-local-storage';
import FormSteps from './form-steps';
import OnboardingFormLayout, { storageKeys } from './form-layaout';
import { FormDataSteps } from './form-data';

export default function OnboardingForm() {
  let initialValues: any = {};

  const savedOnboardingProgress = getStorage(storageKeys.onboardingProgress);

  if (savedOnboardingProgress) {
    initialValues = savedOnboardingProgress;
  } else {
    FormDataSteps.forEach((step) => {
      step.content.forEach((c) => {
        if (!c.fields) return;
        c?.fields.forEach((input) => {
          initialValues[input.nameFORMIK] = '';
        });
      });
    });
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
        detalles: Yup.string()
          .min(10, 'Debe tener al menos 10 caracteres')
          .required('Campo requerido'),
      })}
    >
      <Form>
        <OnboardingFormLayout>
          <FormSteps />
        </OnboardingFormLayout>
      </Form>
    </Formik>
  );
}

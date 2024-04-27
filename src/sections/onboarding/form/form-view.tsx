'use client';

import { Form, Formik } from 'formik';
import FormSteps from './form-steps';
import OnboardingFormLayout from './form-layaout';
import { FormDataSteps } from './form-data';

export default function OnboardingForm() {
  const initialValues: any = {};
  FormDataSteps.forEach((step) => {
    step.content.forEach((c) => {
      if (!c.fields) return;
      c?.fields.forEach((input) => {
        initialValues[input.nameFORMIK] = '';
      });
    });
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
      }}
    >
      <Form>
        <OnboardingFormLayout>
          <FormSteps />
        </OnboardingFormLayout>
      </Form>
    </Formik>
  );
}

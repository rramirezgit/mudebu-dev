import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { FormDataSteps } from './form-data';
import InputsView from './inputs/inputs-view';
import OnboardingTextView from './texts/text-view';

export default function FormSteps() {
  const step = useSelector((state: RootState) => state.OnBoarding.step);
  const contentStep = useSelector((state: RootState) => state.OnBoarding.contentStep);

  const currentStep = FormDataSteps[step];

  return (
    <>
      {currentStep?.content &&
        currentStep.content[contentStep].texts.map((text) => (
          <OnboardingTextView key={text.id} text={text} />
        ))}

      {currentStep?.content &&
        currentStep.content[contentStep].fields.map((field) => (
          <InputsView key={field.id} field={field} />
        ))}
    </>
  );
}

import { Box } from 'src/components/Box/box-component';
import OnBoardingTextArea from './text-area';
import OnBoardingButtons from './buttons';
import { FieldOnboarding, inputsOnboarding } from '../types';
import OnBoardingMultiButtons from './multi-buttons';
import OnBoardingTextAndImage from './text-image';

interface InputsViewProps {
  field: FieldOnboarding;
}

export default function InputsView({ field }: InputsViewProps) {
  if (field.type === inputsOnboarding.textArea) {
    return <OnBoardingTextArea {...field} />;
  }

  if (field.type === inputsOnboarding.buttons) {
    return <OnBoardingButtons options={field.options as string[]} {...field} />;
  }

  if (field.type === inputsOnboarding.select) {
    return <Box>{field.nameFORMIK}</Box>;
  }

  if (field.type === inputsOnboarding.multiButtons) {
    return <OnBoardingMultiButtons options={field.options as string[]} {...field} />;
  }

  if (field.type === inputsOnboarding.textAndImage) {
    return <OnBoardingTextAndImage {...field} />;
  }
}

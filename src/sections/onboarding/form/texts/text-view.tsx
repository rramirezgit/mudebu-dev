import { Typography } from '@mui/material';
import { TextOnboarding, textTypeOnboarding } from '../types';

interface TextViewProps {
  text: TextOnboarding;
}
export default function OnboardingTextView({ text }: TextViewProps) {
  if (text.type === textTypeOnboarding.title) {
    return (
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 1,
        }}
      >
        {text.value}
      </Typography>
    );
  }

  if (text.type === textTypeOnboarding.subtitle) {
    return (
      <Typography
        sx={{
          fontSize: 24,
          marginBottom: 1,
        }}
      >
        {text.value}
      </Typography>
    );
  }

  if (text.type === textTypeOnboarding.text) {
    return (
      <Typography
        sx={{
          fontSize: 16,
          marginBottom: 1,
        }}
      >
        {text.value}
      </Typography>
    );
  }
}

import { TextField } from '@mui/material';
import { useField } from 'formik';

interface OnBoardingTextAreaProps {
  nameFORMIK: string;
  rows?: number;
}

export default function OnBoardingTextArea({ rows = 7, nameFORMIK }: OnBoardingTextAreaProps) {
  const [field] = useField(nameFORMIK);
  return <TextField fullWidth multiline rows={rows} variant="filled" {...field} />;
}

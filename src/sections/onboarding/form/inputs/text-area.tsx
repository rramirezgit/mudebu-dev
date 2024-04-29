import { TextField } from '@mui/material';
import { useField } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'src/components/Box/box-component';
import { RootState } from 'src/store';
import { setIsValidDataForm } from 'src/store/slices/onBoarding';

interface OnBoardingTextAreaProps {
  nameFORMIK: string;
  rows?: number;
}

export default function OnBoardingTextArea({ rows = 7, nameFORMIK }: OnBoardingTextAreaProps) {
  const [field, meta] = useField(nameFORMIK);

  const dispatch = useDispatch();

  const isvalidDataform = useSelector((state: RootState) => state.OnBoarding.isvalidDataform);

  useEffect(() => {
    if (meta.error && isvalidDataform) {
      dispatch(setIsValidDataForm(false));
    } else if (!meta.error && !isvalidDataform) {
      dispatch(setIsValidDataForm(true));
    }
  }, [dispatch, field, isvalidDataform, meta]);

  return (
    <Box>
      <TextField fullWidth multiline rows={rows} variant="filled" {...field} />
      {meta.error ? <Box className="errorMessageFormik">{meta.error}</Box> : null}
    </Box>
  );
}

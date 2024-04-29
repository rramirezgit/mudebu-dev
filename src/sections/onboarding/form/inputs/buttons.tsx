/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { BoxProps, TextField } from '@mui/material';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useField, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { Box } from 'src/components/Box/box-component';
// components
import Image from 'src/components/image';
import { varHover, varTranHover } from 'src/components/animate';
import { snakeCase } from 'src/utils/change-case';
import { RootState } from 'src/store';
import { FormDataSteps } from '../form-data';

type Props = {
  options: string[];
  nameFORMIK: string;
};

export default function OnBoardingButtons({ options, nameFORMIK }: Props) {
  const [showTextField, setShowTextField] = useState(false);

  const [field, , helper] = useField(nameFORMIK);

  const { setFieldValue, values } = useFormikContext();

  const valuesData = values as any;

  const step = useSelector((state: RootState) => state.OnBoarding.step);
  const contentStep = useSelector((state: RootState) => state.OnBoarding.contentStep);

  const handleClickOption = (nameItem: string) => {
    if (contentStep === 0) {
      const currentStep = FormDataSteps[step];
      const listValues = currentStep.content.map((c) => c.name);

      listValues.forEach((value) => {
        setFieldValue(value, '');
      });
    }

    helper.setValue(nameItem);

    if (nameItem === 'Otro') {
      setShowTextField(true);
    }
  };

  useEffect(() => {
    if (valuesData[`${nameFORMIK}_Otro`] && field.value === 'Otro') {
      setShowTextField(true);
    }

    if (field.value !== 'Otro') {
      setShowTextField(false);
      setFieldValue(`${nameFORMIK}_Otro`, '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  return (
    <>
      <Grid>
        {options.map((item) => (
          <Paper
            key={item}
            variant="outlined"
            sx={{
              overflow: 'hidden',
              width: 109,
              height: 139,
              textDecoration: 'none',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'white' : theme.palette.text.primary,
              borderColor: (theme) => alpha(theme.palette.grey[500], 0.08),
              backgroundColor: (theme) =>
                field.value === item
                  ? theme.palette.primary.main
                  : alpha(theme.palette.primary.lighter, 0.9),
            }}
          >
            <CardActionArea
              component={m.div}
              onClick={() => handleClickOption(item)}
              whileHover="hover"
              sx={{
                p: 2,
                borderRadius: 0,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              }}
            >
              <m.div variants={varHover(1.1)} transition={varTranHover()}>
                <Image alt={item} src={`/assets/icons/onboarding/${snakeCase(item)}.svg`} />
              </m.div>
            </CardActionArea>

            <Typography sx={{ p: 1, textAlign: 'center', fontSize: 10 }}>{item}</Typography>
          </Paper>
        ))}
      </Grid>
      {showTextField && (
        <TextField
          variant="outlined"
          value={valuesData[`${nameFORMIK}_Otro`]}
          fullWidth
          sx={{ mt: 3 }}
          placeholder="Describenos un poco más"
          onChange={(e) => {
            setFieldValue(`${nameFORMIK}_Otro`, e.target?.value);
          }}
        />
      )}
    </>
  );
}

function Grid({ children }: BoxProps) {
  return (
    <Box
      display="grid"
      justifyContent="center"
      justifyItems="center"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      gap={2.5}
    >
      {children}
    </Box>
  );
}

import { Button } from '@mui/material';
import { alpha, styled } from '@mui/system';
import { useField } from 'formik';
import { use, useEffect, useState } from 'react';
import { Box } from 'src/components/Box/box-component';

type StyledButtonsProps = {
  active?: boolean;
};

const StyledButtons = styled(Button)<StyledButtonsProps>(({ active, theme }) => ({
  height: 41,
  backgroundColor: active ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.7),
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

type Props = {
  options: string[];
  nameFORMIK: string;
};

export default function OnBoardingMultiButtons({ options, nameFORMIK }: Props) {
  const [field, , helper] = useField(nameFORMIK);
  const [optionsSelected, setOptionsSelected] = useState<string>(field.value as string);

  const handleClickOption = (nameItem: string) => {
    if (optionsSelected.includes(nameItem)) {
      setOptionsSelected(optionsSelected.replace(`;${nameItem}`, ''));
      return;
    }
    setOptionsSelected(`${optionsSelected};${nameItem}`);
  };

  const isOptionActive = (nameItem: string) => optionsSelected.includes(nameItem);

  useEffect(() => {
    helper.setValue(optionsSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsSelected]);

  return (
    <Box
      sx={{
        flexWrap: 'wrap',
        display: 'flex',
        gap: 2,
      }}
    >
      {options.map((item) => (
        <StyledButtons
          key={item}
          variant="contained"
          onClick={() => handleClickOption(item)}
          active={isOptionActive(item)}
        >
          {item}
        </StyledButtons>
      ))}
    </Box>
  );
}

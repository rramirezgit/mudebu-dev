import { Button } from '@mui/material';
import { alpha, styled } from '@mui/system';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
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
  const [optionsSelected, setOptionsSelected] = useState<string>(field.value || '');

  const handleClickOption = (nameItem: string) => {
    let newValue;
    if (optionsSelected.includes(nameItem)) {
      const optionsArray = optionsSelected.split(';').filter((option) => option !== nameItem);
      newValue = optionsArray.join(';');
    } else {
      newValue = optionsSelected ? `${optionsSelected};${nameItem}` : nameItem;
    }
    setOptionsSelected(newValue);
  };

  const isOptionActive = (nameItem: string) => optionsSelected.split(';').includes(nameItem);

  useEffect(() => {
    helper.setValue(optionsSelected);
  }, [optionsSelected, helper]);

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

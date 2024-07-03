import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { setInitialText } from 'src/store/slices/onBoarding';
import { useResponsive } from 'src/hooks/use-responsive';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[100],
}));

const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  border: 'none',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[100],
  color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
  '&:focus': {
    outline: 'none',
  },
  '&::placeholder': {
    color: theme.palette.grey[500],
  },
}));

const SearchField = () => {
  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const dispatch = useDispatch();

  const handleclickSearch = () => {
    router.push('/onboarding');
  };

  return (
    <Container>
      <StyledInput
        type="text"
        onChange={(e) => {
          dispatch(setInitialText(e?.target?.value));
        }}
        placeholder={
          smUp
            ? 'Descríbenos tus necesidades para generar una cotización con Inteligencia Artificial'
            : 'Descríbenos tus necesidades'
        }
      />
      <Button variant="contained" onClick={handleclickSearch} color="primary">
        Generate
      </Button>
    </Container>
  );
};

export default SearchField;

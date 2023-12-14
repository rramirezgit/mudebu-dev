import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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
  const handleclickSearch = () => {
    console.log('search');
  };

  return (
    <Container>
      <StyledInput type="text" placeholder="e.g: Quiero una topografía para mi terreno de 15Ha" />
      <Button variant="contained" onClick={handleclickSearch} color="primary">
        Generate
      </Button>
    </Container>
  );
};

export default SearchField;

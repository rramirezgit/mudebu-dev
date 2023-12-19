import { useMediaQuery, useTheme } from '@mui/material';

/* 
  breakpoins MUI  
  xs, extra-small: 0px
  sm, small: 600px
  md, medium: 900px
  lg, large: 1200px
  xl, extra-large: 1536px 
  */

export const useMedia = () => {
  let size = '';
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.only('xs')) || false;

  const medium = useMediaQuery(theme.breakpoints.down('md')) || false;

  const large = useMediaQuery(theme.breakpoints.down('lg')) || false;

  switch (true) {
    case mobile:
      size = '-mobile';
      break;
    case medium:
      size = '-medium';
      break;
    case large:
      size = '-large';
      break;
    default:
      size = '';
      break;
  }

  return { mobile, medium, large, size };
};

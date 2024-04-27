import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function skeleton(theme: Theme) {
  return {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.action.focus,
        },
        rounded: {
          borderRadius: theme.shape.borderRadius * 2,
        },
      },
    },
  };
}

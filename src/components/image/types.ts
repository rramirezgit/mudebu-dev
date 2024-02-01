import { LazyLoadImageProps } from 'react-lazy-load-image-component';
// @mui
import { BoxProps } from '@mui/material/Box';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';

// ----------------------------------------------------------------------

export type ImageRatio = '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';

export type ImageProps = BoxProps &
  LazyLoadImageProps & {
    overlay?: string;
    ratio?: ImageRatio;
    disabledEffect?: boolean;
  };

import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { BoxProps } from '@mui/material/Box';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
//
import { IconifyProps } from './types';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: IconifyProps;
}

const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;

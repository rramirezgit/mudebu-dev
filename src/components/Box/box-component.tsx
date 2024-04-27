import { Box as MuiBox, BoxProps, Theme } from '@mui/material';
import { SystemProps } from '@mui/system';

export interface CustomBoxProps extends SystemProps<Theme> {
  sx?: BoxProps['sx'];
  children?: React.ReactNode;
  onMouseEnter?: BoxProps['onMouseEnter'];
  onMouseLeave?: BoxProps['onMouseLeave'];
  id?: string;
  ref?: BoxProps['ref'];
  [x: string]: any;
}

export function Box(props: CustomBoxProps) {
  return <MuiBox component="div" {...props} />;
}

export function Main(props: CustomBoxProps) {
  return <MuiBox component="main" {...props} />;
}

export function Svg(props: CustomBoxProps) {
  return <MuiBox component="svg" {...props} />;
}

export function Span(props: CustomBoxProps) {
  return <MuiBox component="span" {...props} />;
}

export function Footer(props: CustomBoxProps) {
  return <MuiBox component="footer" {...props} />;
}

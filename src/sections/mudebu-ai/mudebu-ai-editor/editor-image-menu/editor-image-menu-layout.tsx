import { Paper } from '@mui/material';

interface ImageEraserMenuLayoutProps {
  children: React.ReactNode;
}

export default function ImageEraserMenuLayout({ children }: ImageEraserMenuLayoutProps) {
  return (
    <Paper
      sx={{
        padding: '21px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        backgroundColor: 'primary.contrastText',
        height: '100%',
        position: 'relative',
      }}
    >
      {children}
    </Paper>
  );
}

import { m } from 'framer-motion';
// @mui
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from '@mui/material/ListItemButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFaqsSelected } from 'src/store/slices/onBoarding';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    id: 1,
    label: 'Informacion General y servicios',
    icon: '/assets/icons/faqs/Information.png',
    href: '#',
  },
  {
    id: 2,
    label: 'Financiamiento y Logística',
    icon: '/assets/icons/faqs/financiamiento.png',
    href: '#',
  },
  {
    id: 3,
    label: 'Calidad, Tecnología e Innovación',
    icon: '/assets/icons/faqs/calidad.png',
    href: '#',
  },
  {
    id: 4,
    label: 'Mobiliario y Personalización',
    icon: '/assets/icons/faqs/mobiliario.png',
    href: '#',
  },
  {
    id: 5,
    label: 'Proceso de Diseño',
    icon: '/assets/icons/faqs/diseno.png',
    href: '#',
  },
  {
    id: 6,
    label: 'Mantenimiento, Postventa y Sostenibilidad',
    icon: '/assets/icons/faqs/mantenimiento.png',
    href: '#',
  },
];

// ----------------------------------------------------------------------

export default function FaqsCategory() {
  const mdUp = useResponsive('up', 'md');

  const nav = useBoolean();

  if (!mdUp) {
    return (
      <>
        <AppBar position="absolute">
          <Toolbar>
            <Button startIcon={<Iconify icon="solar:list-bold" />} onClick={nav.onTrue}>
              Categories
            </Button>
          </Toolbar>
          <Divider />
        </AppBar>

        <Drawer open={nav.value} onClose={nav.onFalse}>
          <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 1 }}>
            {CATEGORIES.map((category) => (
              <CardMobile key={category.label} category={category} />
            ))}
          </Box>
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component={MotionViewport}
      gap={3}
      display="grid"
      gridTemplateColumns={{
        md: 'repeat(3, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
    >
      {CATEGORIES.map((category) => (
        <m.div key={category.label} variants={varFade().in}>
          <CardDesktop category={category} />
        </m.div>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

type CardDesktopProps = {
  category: {
    label: string;
    icon: string;
    id: number;
  };
};

function CardDesktop({ category }: CardDesktopProps) {
  const { label, icon } = category;
  const distpach = useDispatch();
  return (
    <Paper
      onClick={() => distpach(setFaqsSelected(category.id))}
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        height: 212,
        bgcolor: 'unset',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z20,
        },
        position: 'relative',
      }}
    >
      <Image disabledEffect alt={icon} src={icon} sx={{ mb: 2, mx: 'auto' }} />

      <Typography
        variant="subtitle2"
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
}

// ----------------------------------------------------------------------

function CardMobile({ category }: CardDesktopProps) {
  const { label, icon } = category;

  const distpach = useDispatch();

  return (
    <ListItemButton
      onClick={() => distpach(setFaqsSelected(category.id))}
      key={label}
      sx={{
        py: 2,
        maxWidth: 140,
        borderRadius: 1,
        textAlign: 'center',
        alignItems: 'center',
        typography: 'subtitle2',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: 'background.neutral',
      }}
    >
      <Image alt={icon} src={icon} sx={{ width: 48, height: 48, mb: 1 }} />

      {category.label}
    </ListItemButton>
  );
}

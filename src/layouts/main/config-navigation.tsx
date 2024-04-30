// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Catalogo',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.catalogo,
  },
  {
    title: 'Cotizar',
    icon: <Iconify icon="solar:bill-list-bold" />,
    path: paths.onboarding,
    mobile: true,
  },
  {
    title: 'Dashboard',
    icon: <Iconify icon="bxs:dashboard" />,
    path: paths.dashboard.root,
    mobile: true,
  },
  {
    title: 'Ajustes',
    icon: <Iconify icon="solar:settings-bold-duotone" />,
    path: paths.settings,
    mobile: true,
  },
];

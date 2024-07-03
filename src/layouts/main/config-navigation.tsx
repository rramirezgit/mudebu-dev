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
    title: 'Contacto',
    icon: <Iconify icon="mdi:telephone" />,
    path: paths.contact,
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
    path: paths.dashboard.general.list,
    mobile: true,
  },
  {
    title: 'Admin',
    icon: <Iconify icon="solar:settings-bold-duotone" />,
    path: paths.settings,
    mobile: true,
  },
];

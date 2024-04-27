import { m } from 'framer-motion';
// @mui
import { Theme, SxProps } from '@mui/material/styles';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
// components
import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function SettingsButton({ sx }: Props) {
  // const settings = useSettingsContext();

  return (
    <Box
      component={m.div}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 12,
        ease: 'linear',
        repeat: Infinity,
      }}
      sx={{
        marginRight: 1.5,
      }}
    >
      <IconButton
        component={RouterLink}
        href={paths.settings}
        aria-label="settings"
        onClick={() => {}}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify icon="solar:settings-bold-duotone" width={24} />
      </IconButton>
    </Box>
  );
}

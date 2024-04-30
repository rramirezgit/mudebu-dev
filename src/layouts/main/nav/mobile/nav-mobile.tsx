'use client';

import { useEffect } from 'react';
// @mui
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { usePathname } from 'src/routes/hooks';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar';
//
import { LoginButton } from 'src/layouts/_common';
import { useResponsive } from 'src/hooks/use-responsive';
import { useAuthContext } from 'src/auth/hooks';
import NavList from './nav-list';
import { NavProps } from '../types';

// ----------------------------------------------------------------------

export default function NavMobile({ offsetTop, data }: NavProps) {
  const pathname = usePathname();
  const { authenticated } = useAuthContext();

  const mdUp = useResponsive('up', 'md');
  const nav = useBoolean();

  useEffect(() => {
    if (nav.value) {
      nav.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: 0,
          ...(offsetTop && {
            color: 'text.primary',
          }),
        }}
      >
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
            display: 'flex',
          },
        }}
      >
        <Scrollbar
          sx={{
            flexGrow: 1,
          }}
        >
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>

        {!mdUp && !authenticated && (
          <LoginButton
            sx={{
              mt: 2,
              mx: 2,
            }}
          />
        )}
      </Drawer>
    </>
  );
}

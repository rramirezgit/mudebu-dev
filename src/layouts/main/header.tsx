// @mui
import { alpha, useTheme } from '@mui/material/styles';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// theme
// routes
import { paths } from 'src/routes/paths';
// components
import Logo from 'src/components/logo';
//
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { useRouter } from 'src/routes/hooks';
//
import { SettingsButton, HeaderShadow, LoginButton, AccountPopover } from '../_common';
import { RouterLink } from 'src/routes/components';
import { useAuthContext } from 'src/auth/hooks';
import { bgBlur } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const { authenticated, user } = useAuthContext();
  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const router = useRouter();

  return (
    <AppBar
      sx={{
        padding: '0px !important',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {authenticated && (
              <Box
                sx={{
                  ml: 1,
                }}
              >
                <AccountPopover />
              </Box>
            )}

            {mdUp && (
              <Stack alignItems="center" direction={{ xs: 'row', md: 'row' }} gap={1}>
                <Button component={RouterLink} href={paths.onboarding} variant="contained">
                  Cotizar
                </Button>
                {user?.role === 'admin' && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => router.push(paths.dashboard.general.list)}
                  >
                    Dashboard
                  </Button>
                )}
              </Stack>
            )}

            {mdUp && !authenticated && (
              <LoginButton
                sx={{
                  mr: {
                    xs: 0,
                    md: 1,
                  },
                }}
              />
            )}
            {authenticated && (
              <>
                {mdUp && (
                  <SettingsButton
                    sx={{
                      ml: { xs: 1, md: 0 },
                      mr: { md: 2 },
                    }}
                  />
                )}
              </>
            )}

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}

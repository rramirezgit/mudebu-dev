'use client';

// @mui
/* eslint-disable import/order */
import { Box, Main } from 'src/components/Box/box-component';
// routes
import { usePathname } from 'src/routes/hooks';
//
import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Main
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Main>

      <Footer />
    </Box>
  );
}

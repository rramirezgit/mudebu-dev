'use client';

import { Box } from 'src/components/Box/box-component';
import { useRouter } from 'src/routes/hooks';
import HomeContactUs from 'src/sections/home/home-contact-us';
import ServicesCarrusel from './services-carrousel';
import ServicesHome from './services-home';

// ----------------------------------------------------------------------

interface ServicesViewProps {
  serviceProducstSelected: any;
}
export default function ServicesProductsView({ serviceProducstSelected }: ServicesViewProps) {
  const router = useRouter();

  if (!serviceProducstSelected) {
    router.push('/404');
    return null;
  }

  return (
    <>
      <ServicesHome currentData={serviceProducstSelected} />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <ServicesCarrusel imageList={serviceProducstSelected.imageList} />;
        <HomeContactUs />
      </Box>
    </>
  );
}

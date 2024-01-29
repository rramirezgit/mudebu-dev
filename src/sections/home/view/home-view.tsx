'use client';

import { useScroll } from 'framer-motion';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import HomeHero from '../home-hero';
import HomeGallery from '../home-gallery';
import HomeServices from '../home-services';
import HomeContactUs from '../home-contact-us';
import HomeModel from '../home-model';

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeServices />
        <HomeModel />
        <HomeGallery />
        <HomeContactUs />
      </Box>
    </MainLayout>
  );
}

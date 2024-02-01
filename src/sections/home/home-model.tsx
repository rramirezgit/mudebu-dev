/* eslint-disable react/no-unknown-property */
import { useTheme } from '@mui/material/styles';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Suspense, use, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { m } from 'framer-motion';
import { Model } from 'src/components/SceneCo';
import { varFade } from 'src/components/animate';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
// components

// ----------------------------------------------------------------------

export default function HomeModel() {
  const theme = useTheme();

  const [render, setRender] = useState(false);

  setTimeout(() => {
    setRender(true);
  }, 1000);

  if (!render) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.neutral,
      }}
    >
      <m.div variants={varFade().inUp}>
        <Box
          sx={{
            width: '100%',
            height: '50vh',
          }}
        >
          <Suspense fallback={null}>
            <Canvas shadows camera={{ zoom: 1, position: [15, 10, 30], fov: 25 }}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                shadow-mapSize={2048}
                castShadow
              />

              <Model />
              <OrbitControls />
              <ContactShadows
                position={[0, -1.4, 0]}
                opacity={0.75}
                scale={10}
                blur={2.5}
                far={4}
              />
              <Environment preset="city" />
            </Canvas>
          </Suspense>
        </Box>
      </m.div>
    </Box>
  );
}

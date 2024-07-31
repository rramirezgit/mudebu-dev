/* eslint-disable react/no-unknown-property */
import { useTheme } from '@mui/material/styles';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { m } from 'framer-motion';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import { Container } from '@mui/system';
import { Button, Switch, FormControlLabel, ButtonGroup } from '@mui/material';
import * as THREE from 'three';
import { varFade } from 'src/components/animate';
import { Model } from 'src/components/SceneCo';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const CameraController = ({ cameraPosition, enableMouseControls }: any) => {
  const orbitControlsRef = useRef();
  const targetPosition = useRef(new THREE.Vector3(...cameraPosition));

  useFrame(({ camera }) => {
    if (orbitControlsRef.current) {
      targetPosition.current.lerp(new THREE.Vector3(...cameraPosition), 0.3); // Ajusta la velocidad de interpolación
      camera.position.lerp(targetPosition.current, 0.3); // Ajusta la velocidad de interpolación
      // @ts-ignore
      orbitControlsRef.current.enabled = enableMouseControls;
      // @ts-ignore
      orbitControlsRef.current.update();
    }
  });
  // @ts-ignore
  return <OrbitControls ref={orbitControlsRef} />;
};

export default function HomeModel() {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');
  const [render, setRender] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([15, 15, 30]);
  const [enableMouseControls, setEnableMouseControls] = useState(true);
  const leftLimit = -50;
  const rightLimit = 50;
  const upLimit = 50;
  const downLimit = -50;

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMoveLeft = () => {
    setCameraPosition((prev) => [
      Math.max(prev[0] - 10, leftLimit), // Aplica el límite izquierdo
      prev[1],
      prev[2],
    ]);
  };

  const handleMoveRight = () => {
    setCameraPosition((prev) => [
      Math.min(prev[0] + 10, rightLimit), // Aplica el límite derecho
      prev[1],
      prev[2],
    ]);
  };

  const handleMoveUp = () => {
    setCameraPosition((prev) => [
      prev[0],
      Math.min(prev[1] + 10, upLimit), // Aplica el límite superior
      prev[2],
    ]);
  };

  const handleMoveDown = () => {
    setCameraPosition((prev) => [
      prev[0],
      Math.max(prev[1] - 10, downLimit), // Aplica el límite inferior
      prev[2],
    ]);
  };

  const toggleControls = () => {
    setEnableMouseControls((prev) => !prev);
  };

  if (!render) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          cursor: enableMouseControls ? 'grab' : 'auto',
        }}
      >
        <m.div variants={varFade().inUp}>
          <Box
            sx={{
              width: '100%',
              height: '50vh',
              position: 'relative',
            }}
          >
            <Suspense fallback={null}>
              <Canvas
                shadows
                camera={{ position: cameraPosition, fov: 25, zoom: isMobile ? 2 : 4 }}
                style={{ backgroundColor: theme.palette.background.paper }}
              >
                <ambientLight intensity={0.5} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  shadow-mapSize={2048}
                  castShadow
                />
                <Model />
                {enableMouseControls ? (
                  <OrbitControls />
                ) : (
                  <CameraController
                    cameraPosition={cameraPosition}
                    enableMouseControls={enableMouseControls}
                  />
                )}
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
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Switch checked={enableMouseControls} onChange={toggleControls} color="primary" />
                }
                label={isMobile ? 'Touch Controls' : 'Mouse Controls'}
              />
              {!enableMouseControls && (
                <ButtonGroup
                  orientation={isMobile ? 'horizontal' : 'vertical'}
                  aria-label="outlined button group"
                  sx={{ mt: 2 }}
                >
                  <Button variant="outlined" onClick={handleMoveLeft}>
                    Left
                  </Button>
                  <Button variant="outlined" onClick={handleMoveRight}>
                    Right
                  </Button>
                  <Button variant="outlined" onClick={handleMoveUp}>
                    Up
                  </Button>
                  <Button variant="outlined" onClick={handleMoveDown}>
                    Down
                  </Button>
                </ButtonGroup>
              )}
            </Box>
          </Box>
        </m.div>
      </Box>
    </Container>
  );
}

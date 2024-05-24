/* eslint-disable no-plusplus */
import { ArrowRotateRight, Brush2 } from 'iconsax-react';
import { alpha, useTheme } from '@mui/material/styles';
import { Button, IconButton, Slider, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { RootState } from 'src/store';
import { useAxios } from 'src/axios/axios-provider';
import { Box } from 'src/components/Box/box-component';
import {
  setBrushRadius,
  setBrushRadiusEditor,
  setEditImage,
  setMask,
  setReloadEditor,
  setimageSelectedFinishing,
} from 'src/store/slices/mudebu-ai';
import Iconify from 'src/components/iconify/iconify';
import { endpoints_api } from 'src/axios/endpoints';
import ImageEraserMenuLayout from './editor-image-menu-layout';
import { convertImageToBase64 } from '../../view/tob64';

export default function ImageEraserMenu() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState('');
  const theme = useTheme();

  const AxiosInstance = useAxios();

  const brushRadius = useSelector((state: RootState) => state.mudebuAi.brushRadius);
  const reloadEditor = useSelector((state: RootState) => state.mudebuAi.reloadEditor);
  const imageFinish = useSelector((state: RootState) => state.mudebuAi.imageSelectedFinishing);
  const mask = useSelector((state: RootState) => state.mudebuAi.mask);

  const dispatch = useDispatch();

  const handleRadiusChange = (e: any) => {
    const newRadius = parseInt(e.target.value, 10);
    dispatch(setBrushRadius(newRadius));
  };

  function valueLabelFormat(value: number) {
    return `${value}px`;
  }

  const handleClickContinue = async () => {
    setLoading(true);

    // Datos de la imagen en base64
    const dataB64Mask = mask;

    // Convertir base64 a Blob
    const blob = await fetch(dataB64Mask).then((r) => r.blob());

    // Crear una imagen a partir del Blob
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    const newWidth = 800; // Ancho deseado
    const newHeight = 800; // Alto deseado
    img.width = newWidth;
    img.height = newHeight;

    img.onload = async () => {
      // Crear un canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Establecer las dimensiones deseadas
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Dibujar la imagen redimensionada en el canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convertir el canvas a Blob
        canvas.toBlob(async (resizedBlob) => {
          if (resizedBlob) {
            const file = new File([resizedBlob], 'mask.png', { type: 'image/png' });

            const options = {
              maxSizeMB: 3,
              fileType: 'image/png',
            };
            const compressedFile = await imageCompression(file, options);

            /// descargar imagen
            const a = document.createElement('a');
            a.href = URL.createObjectURL(compressedFile);
            a.download = 'mask.png';
            a.click();

            console.log('Original file size:', file.size);
            console.log('Compressed file size:', compressedFile.size);

            // Crear FormData y agregar el archivo

            // Despachar la acción con la máscara redimensionada
            dispatch(setMask(compressedFile));

            setLoading(false);
            setStep(step + 1);
          } else {
            console.error('No se pudo crear el Blob redimensionado');
            setLoading(false);
          }
        }, 'image/png');
      } else {
        console.error('No se pudo obtener el contexto 2D del canvas');
        setLoading(false);
      }
    };

    img.onerror = () => {
      console.error('No se pudo cargar la imagen');
      setLoading(false);
    };
  };

  function base64ToBlob(base64: any, mime: any) {
    // Decodificar base64 para obtener datos binarios
    const base64WithoutPrefix = base64.split(',')[1]; // Eliminar el prefijo si existe
    const binary = atob(base64WithoutPrefix);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
  }

  function appendBlobToFormData(blob: any) {
    const formData = new FormData();
    formData.append('file', blob, 'image.png'); // Puedes cambiar 'image.png' al nombre de archivo deseado
    return formData;
  }

  const handleClickFinish = async () => {
    setLoading(true);

    // Convertir base64 a Blob
    const blob = base64ToBlob(imageFinish.b64, 'image/png');

    // Crear una imagen a partir del Blob
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = async () => {
      // Crear un canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Establecer las dimensiones deseadas
        const newWidth = 800; // Ancho deseado
        const newHeight = 800; // Alto deseado
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Dibujar la imagen redimensionada en el canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convertir el canvas a Blob
        canvas.toBlob(async (resizedBlob) => {
          if (resizedBlob) {
            const file = new File([resizedBlob], 'selected.png', { type: 'image/png' });

            const formData = new FormData();

            const options = {
              maxSizeMB: 3,
              fileType: 'image/png',
            };
            const compressedFile = await imageCompression(file, options);

            /// descargar imagen
            const a = document.createElement('a');
            a.href = URL.createObjectURL(compressedFile);
            a.download = 'mask.png';
            a.click();

            console.log('Original file size: 2', file.size);
            console.log('Compressed file size: 2', compressedFile.size);

            formData.append('image', compressedFile, 'image.png');
            formData.append('mask', mask, 'mask.png');
            formData.append('prompt', prompt);

            /// headers autorizations token
            await AxiosInstance.post(endpoints_api.mudebuAi.openAi, formData, {
              headers: {
                Accept: '*/*',
                'Content-Type': 'multipart/form-data',
              },
            })
              .then(async (response) => {
                if (response.data?.data?.length > 0) {
                  await convertImageToBase64({
                    base: '/api/proxy/newImage/',
                    url: response.data.data[0].url,
                    split: '/private/',
                  }).then((data) => {
                    dispatch(
                      setimageSelectedFinishing({ b64: data, image: response.data.data[0].url })
                    );
                    dispatch(setEditImage(false));
                    setLoading(false);
                  });
                }
              })
              .finally(() => {
                setLoading(false);
              });
          } else {
            console.error('No se pudo crear el Blob redimensionado');
            setLoading(false);
          }
        }, 'image/png');
      } else {
        console.error('No se pudo obtener el contexto 2D del canvas');
        setLoading(false);
      }
    };

    img.onerror = () => {
      console.error('No se pudo cargar la imagen');
      setLoading(false);
    };
  };

  return (
    <ImageEraserMenuLayout>
      {step === 0 ? (
        <Box>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              backgroundColor: alpha(theme.palette.secondary.main, 0.5),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Brush2 size="24" color={theme.palette.primary.light} />
          </Box>
          <IconButton
            onClick={() => {
              dispatch(setReloadEditor(!reloadEditor));
            }}
            sx={{
              position: 'absolute',
              top: 20,
              right: 15,
              mb: 2,
            }}
          >
            <ArrowRotateRight size="24" color={theme.palette.primary.light} />
          </IconButton>
          <Box
            sx={{ width: '100%' }}
            onMouseEnter={(e) => {
              dispatch(setBrushRadiusEditor(true));
            }}
            onMouseLeave={(e) => {
              dispatch(setBrushRadiusEditor(false));
            }}
          >
            <Typography id="non-linear-slider" gutterBottom>
              Tamaño del pincel: {valueLabelFormat(brushRadius)}
            </Typography>
            <Slider
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
              min={5}
              max={50}
              onChange={handleRadiusChange}
              value={brushRadius}
            />
          </Box>
          <LoadingButton
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            loading={loading}
            fullWidth
            onClick={handleClickContinue}
          >
            Continuar
          </LoadingButton>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              width: 1,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <IconButton onClick={() => setStep(step - 1)}>
              <Iconify icon="ion:chevron-back-circle-outline" color={theme.palette.primary.light} />
            </IconButton>
          </Box>
          <Typography
            sx={{
              textAlign: 'start',
            }}
          >
            Describe lo que quieres cambiar o editar:
          </Typography>

          <TextField
            variant="outlined"
            multiline
            fullWidth
            placeholder="Escribe aqui..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mt: 1 }}
          />

          <LoadingButton
            variant="contained"
            color="secondary"
            loading={loading}
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleClickFinish}
          >
            Continuar
          </LoadingButton>
        </Box>
      )}
    </ImageEraserMenuLayout>
  );
}

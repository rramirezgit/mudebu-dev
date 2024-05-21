'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'src/components/Box/box-component';
import Iconify from 'src/components/iconify/iconify';
import { useRouter } from 'src/routes/hooks';
import { getStorage } from 'src/hooks/use-local-storage';
import { RootState } from 'src/store';
import { setloadingForm } from 'src/store/slices/onBoarding';
import { storageKeys } from '../form/form-layaout';
import { handleLoop } from '../../../layouts/_common/searchbar/utils';

export const onBoardingInfo = [
  {
    id: 1,
    title: 'Giro de la Empresa:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 2,
    title: 'Estilos:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    title: 'Colores:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 4,
    title: 'Tipos De Muebles:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 5,
    title: 'Funcionalidad Específica:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 6,
    title: 'Dimensiones:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 7,
    title: 'Material Preferido:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 8,
    title: 'Ubicación del Proyecto:',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const l: any = {
  business_orientation: 'Giro de la Empresa:',
  colors_ai: 'Colores:',
  specific_functionality: 'Funcionalidad Específica:',
  preferred_material: 'Material Preferido:',
  styles_ai: 'Estilos:',
  types_of_furniture: 'Tipos De Muebles:',
  dimensions: 'Dimensiones:',
  prompt_images: 'Imágenes:',
  project_location: 'Ubicación del Proyecto:',
};

export default function OnboardingInfo() {
  const [open, setOpen] = useState(false);
  const [idItemSelected, setIdItemSelected] = useState<any>(null);
  const [dataOnBoarding, setDataOnboardng] = useState<any>([]);
  const [newData, setNewData] = useState<any>('');

  const loadingForm = useSelector((state: RootState) => state.OnBoarding.loadingForm);

  const info = useSelector((state: RootState) => state.OnBoarding.onoardingInfo);

  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(false);
  };

  const Theme = useTheme();

  const handleClickEdit = (item: any) => {
    setIdItemSelected(item.id);
    setOpen(true);
  };
  const router = useRouter();

  useEffect(() => {
    const onboardingResult = getStorage(storageKeys.onboardingResult);
    if (onboardingResult) {
      const data = Object.entries(onboardingResult).map(([key, value]) => ({
        id: key,
        title: l[key],
        text: value,
      }));
      setDataOnboardng(data);
    }
  }, []);

  const handleClickEditData = () => {
    const newDataOnBoarding = dataOnBoarding.map((item: any) => {
      if (item.id === idItemSelected) {
        return { ...item, text: newData };
      }
      return item;
    });

    setDataOnboardng(newDataOnBoarding);
    setOpen(false);
  };

  const handleClickContinue = () => {
    dispatch(setloadingForm(true));
    router.push('/mudebu-ai/');
  };

  return (
    <>
      <Container
        sx={{
          pt: '65px',
          pb: 5,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" sx={{ mb: 6 }}>
          Según tu descripción, obtuvimos la siguiente información. Verifícala y, si estás de
          acuerdo, presiona &apos;Continuar&apos;.
        </Typography>

        <Box
          sx={{
            flexWrap: 'wrap',
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {dataOnBoarding.map((item: any, index: any) => (
            <Paper
              key={index}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 24px)',
                },
                p: '24px',
                backgroundColor: 'white',
                position: 'relative',
              }}
              elevation={4}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: Theme.palette.grey[600],
                }}
              >
                {item.text}
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 15,
                  width: '20px',
                }}
              >
                <IconButton
                  sx={{
                    padding: 0,
                    width: '30px',
                    height: '30px',
                  }}
                  onClick={() => handleClickEdit(item)}
                >
                  <Iconify icon="bxs:pencil" color={Theme.palette.secondary.main} />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            mt: 4,
          }}
        >
          <LoadingButton
            onClick={handleClickContinue}
            type="submit"
            variant="contained"
            sx={{
              width: '156px',
              height: '48px',
            }}
            loading={loadingForm}
          >
            Continuar
          </LoadingButton>
        </Box>
      </Container>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {dataOnBoarding.find((item: any) => item.id === idItemSelected)?.title}
          </DialogTitle>

          <TextField
            variant="outlined"
            multiline
            fullWidth
            defaultValue={dataOnBoarding.find((item: any) => item.id === idItemSelected)?.text}
            onChange={(e) => {
              setNewData(e.target?.value);
            }}
            rows={4}
          />
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            pb: 2,
          }}
        >
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleClickEditData} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

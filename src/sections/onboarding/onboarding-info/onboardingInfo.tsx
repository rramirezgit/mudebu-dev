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
import { Box } from 'src/components/Box/box-component';
import Iconify from 'src/components/iconify/iconify';

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

export default function OnboardingInfo() {
  const [open, setOpen] = useState(false);
  const [idItemSelected, setIdItemSelected] = useState<any>(null);
  const [dataOnBoarding, setDataOnboardng] = useState<any>([]);
  const [newData, setNewData] = useState<any>('');
  const onClose = () => {
    setOpen(false);
  };

  const Theme = useTheme();

  const handleClickEdit = (item: any) => {
    setIdItemSelected(item.id);
    setOpen(true);
  };

  useEffect(() => {
    setDataOnboardng(onBoardingInfo);
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
          <Button variant="contained">Continuar</Button>
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

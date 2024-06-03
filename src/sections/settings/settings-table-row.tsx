import { format } from 'date-fns';
// @mui
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'src/routes/hooks';

import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
// components
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Tooltip, Typography } from '@mui/material';
import Label from 'src/components/label/label';
import { useAxios } from 'src/axios/axios-provider';
import { endpoints_api } from 'src/axios/endpoints';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';
import { storageKeys } from '../onboarding/form/form-layaout';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected?: boolean;
  onViewRow: VoidFunction;
  onSelectRow?: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function SettingsTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  // const { items, status, orderNumber, createdAt, customer, totalQuantity, subTotal } = row;
  const {
    id,
    orderId,
    author,
    createdAt,
    status,
    business_orientation,
    colors_ai,
    specific_functionality,
    preferred_material,
    styles_ai,
    types_of_furniture,
    dimensions,
    project_location,
    additional_details,
  } = row;

  const items = [
    {
      title: 'Giro de la Empresa',
      text: business_orientation,
    },
    {
      title: 'Colores',
      text: colors_ai,
    },
    {
      title: 'Funcionalidad Específica',
      text: specific_functionality,
    },
    {
      title: 'Material Preferido',
      text: preferred_material,
    },
    {
      title: 'Estilos',
      text: styles_ai,
    },
    {
      title: 'Tipos de Muebles',
      text: types_of_furniture,
    },
    {
      title: 'Dimensiones',
      text: dimensions,
    },
    {
      title: 'Ubicación del Proyecto',
      text: project_location,
    },
    {
      title: 'Detalles Adicionales',
      text: additional_details,
    },
  ];

  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const axiosInstace = useAxios();

  const router = useRouter();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      {onSelectRow && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell>
        <Box
          onClick={onViewRow}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {orderId}
        </Box>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={author?.name} src={author?.avatar} sx={{ mr: 2 }} variant="circular" />

        <ListItemText
          primary={author?.name}
          secondary={author?.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'NEW' && 'success') ||
            (status === 'pending' && 'warning') ||
            (status === 'banned' && 'error') ||
            'default'
          }
        >
          {status}
        </Label>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(createdAt), 'dd MMM yyyy')}
          secondary={format(new Date(createdAt), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: 'action.hover',
            }),
          }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        {status === 'NEW' && (
          <Tooltip title="Continuar">
            <IconButton
              color={collapse.value ? 'inherit' : 'default'}
              onClick={() => {
                axiosInstace.get(`${endpoints_api.onboarding.findOne}/${id}`).then((res) => {
                  const { data } = res;
                  console.log(data);

                  //  const storageKeys = {
                  //   onboardingProgress: 'onboarding-progress',
                  //   onboardingResult: 'onboarding-result',
                  //   mudebuIaBenchmarkAi: 'mudebu-ia-benchmark',
                  //   onboardingId: 'onboarding-id',
                  //   uploadedImages: 'uploaded-images',
                  //   mudebuAiBlend: 'mudebu-ai-blend',
                  // };

                  removeStorage(storageKeys.onboardingProgress);
                  removeStorage(storageKeys.onboardingResult);
                  removeStorage(storageKeys.onboardingId);
                  removeStorage(storageKeys.uploadedImages);
                  removeStorage(storageKeys.mudebuAiBlend);

                  if (data?.description) {
                    setStorage(storageKeys.onboardingProgress, {
                      specification: data?.specification,
                      espacio: data?.space,
                      [data.space]: data[data?.space],
                      mobiliario: data?.decoration,
                      descripcion: data?.description,
                      estilos: data?.styles?.join(';'),
                      texturas: data?.textures?.join(';'),
                      materiales: data?.materials?.join(';'),
                      colores: data?.colors?.join(';'),
                      tonos: data?.tones?.join(';'),
                      benchmarks: data?.benchmark_text,
                      detalles: data?.additional_details,
                    });
                  }

                  if (data?.types_of_furniture) {
                    setStorage(storageKeys.onboardingResult, {
                      colors_ai: data?.colors_ai,
                      dimensions: data?.dimensions,
                      preferred_material: data?.preferred_material,
                      project_location: data?.project_location,
                      specific_functionality: data?.specific_functionality,
                      types_of_furniture: data?.types_of_furniture,
                      additional_details: data?.additional_details,
                    });

                    setStorage(storageKeys.onboardingId, data?.id);
                  }

                  if (data?.uploadedImages) {
                    setStorage(storageKeys.uploadedImages, data?.uploadedImages);
                  }

                  if (data?.mudebuAiBlend) {
                    setStorage(storageKeys.mudebuAiBlend, data?.mudebuAiBlend);
                  }

                  router.push('/onboarding');
                });
              }}
              sx={{
                ...(collapse.value && {
                  bgcolor: 'action.hover',
                }),
              }}
            >
              <Iconify icon="carbon:continue" />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Box
            sx={{
              padding: (theme) => theme.spacing(2, 3),
              display: 'grid',
              gridTemplateColumns: ' 1fr 1fr 1fr 1fr',
            }}
          >
            {items.map((item: any) => (
              <Box
                sx={{
                  p: (theme) => theme.spacing(1.5, 3, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  },
                }}
              >
                <Typography
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  style={{
                    fontSize: '10px',
                    color: '#919EAB',
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

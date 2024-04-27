import { useDropzone } from 'react-dropzone';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
/* eslint-disable import/order */
import { Box } from 'src/components/Box/box-component';
// assets

//
import Iconify from '../iconify';
//
import { UploadProps } from './types';
import RejectionFiles from './errors-rejection-files';
import MultiFilePreview from './preview-multi-file';
import SingleFilePreview from './preview-single-file';

// ----------------------------------------------------------------------

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = !!files && multiple && !!files.length;

  const hasError = isDragReject || !!error;

  const theme = useTheme();

  const renderMultiPreview = hasFiles && (
    <>
      <Box sx={{ my: 3 }}>
        <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
      </Box>

      <Stack direction="row" justifyContent="center" spacing={1.5}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            Eliminar todo
          </Button>
        )}

        {onUpload && (
          <Button
            size="small"
            variant="contained"
            onClick={onUpload}
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          >
            Subir archivos
          </Button>
        )}
      </Stack>
    </>
  );

  const renderPlaceholder = (
    <Stack spacing={3} alignItems="center" justifyContent="center" flexWrap="wrap">
      {hasFiles ? (
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          {renderMultiPreview}
        </Box>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="49"
            height="49"
            viewBox="0 0 49 49"
            fill="none"
          >
            <path
              d="M32.5 32.085L24.5 24.085L16.5 32.085"
              stroke="#55607D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.5 24.085V42.085"
              stroke="#55607D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M41.2799 36.8649C43.2306 35.8015 44.7716 34.1187 45.6597 32.0822C46.5477 30.0457 46.7323 27.7714 46.1843 25.6183C45.6363 23.4652 44.3869 21.556 42.6333 20.1918C40.8796 18.8277 38.7216 18.0864 36.4999 18.0849H33.9799C33.3745 15.7434 32.2462 13.5696 30.6798 11.7269C29.1134 9.88423 27.1496 8.42063 24.9361 7.44614C22.7226 6.47166 20.317 6.01165 17.9002 6.10069C15.4833 6.18974 13.1181 6.82553 10.9823 7.96026C8.84649 9.09499 6.99574 10.6991 5.56916 12.6521C4.14259 14.6051 3.1773 16.856 2.74588 19.2357C2.31446 21.6154 2.42813 24.062 3.07835 26.3915C3.72856 28.7209 4.8984 30.8727 6.49992 32.6849"
              stroke="#55607D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.5 32.085L24.5 24.085L16.5 32.085"
              stroke="#55607D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Stack spacing={1} sx={{ textAlign: 'center', maxWidth: '250px' }}>
            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              Puede cargar hasta 10 imágnes de benchmark
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              JPG, PNG or PDF, file size no more than 10MB
            </Typography>
            <Box
              component="span"
              sx={{
                fontSize: 10,
                padding: '12px',
                color: 'primary.main',
                borderRadius: 1,
                maxWidth: '150px',
                alignSelf: 'center',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.48)}`,
              }}
            >
              SELECCIONAR ARCHIVO
            </Box>
          </Stack>
        </>
      )}
    </Stack>
  );

  const renderSinglePreview = (
    <SingleFilePreview imgUrl={typeof file === 'string' ? file : file?.preview} />
  );

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: alpha(theme.palette.common.white, 0.8),
        bgcolor: alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <Box
        {...getRootProps()}
        sx={{
          p: {
            xs: hasFiles ? '10px 0px' : 10,
            sm: hasFiles ? '70px 0px' : 10,
          },
          outline: 'none',
          borderRadius: 1,
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          border: `1px dashed ${alpha(theme.palette.grey[600], 0.5)}`,
          transition: theme.transitions.create(['opacity', 'padding']),
          '&:hover': {},
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: '24% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? renderSinglePreview : renderPlaceholder}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />
    </Box>
  );
}

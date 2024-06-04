import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Box } from 'src/components/Box/box-component';
import { Upload } from 'src/components/upload';
import { setBenchmarkList } from 'src/store/slices/mudebu-ai';
import { RootState } from 'src/store';
import { useAxios } from 'src/axios/axios-provider';
import { endpoints_api } from 'src/axios/endpoints';
import { getStorage, removeStorage, setStorage } from 'src/hooks/use-local-storage';
import { storageKeys } from 'src/sections/onboarding/form/form-layaout';

export default function MudebuAiUpload() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<(File | string)[]>([]);

  const benchmarkList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);
  const onboardingInfo = useSelector((state: RootState) => state.OnBoarding.onoardingInfo);

  const dispatch = useDispatch();

  const axiosInstance = useAxios();

  const handleDropMultiFile = async (acceptedFiles: File[]) => {
    setLoading(true);

    const newFiles = [
      ...files,
      ...acceptedFiles.map((newFile) =>
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      ),
    ];
    setFiles(newFiles);

    // Array de promesas para cargar cada archivo
    const uploadPromises = acceptedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('source', 'USER_UPLOAD');

      let idOnboarding = getStorage(storageKeys.onboardingId);

      if (!storageKeys) {
        idOnboarding = onboardingInfo?.savedOnboarding?.id;
      }
      try {
        const response = await axiosInstance.post(
          `${endpoints_api.mudebuAi.media}/${idOnboarding}`,
          formData
        );

        return response.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        return null;
      }
    });

    // Espera que todas las cargas se completen
    const uploadedFiles = await Promise.all(uploadPromises);

    // Filtra los resultados nulos en caso de errores en alguna carga
    const successfulUploads = uploadedFiles.filter((file) => file !== null);
    // Actualizar el estado con los nuevos archivos cargados
    dispatch(setBenchmarkList([...benchmarkList, ...successfulUploads]));

    // Indicador de carga desactivado
    setLoading(false);

    // Guardar las imágenes en localStorage
    const storedFiles = getStorage(storageKeys.uploadedImages) || [];
    setStorage(storageKeys.uploadedImages, [...storedFiles, ...successfulUploads]);
    removeStorage(storageKeys.mudebuAiBlend);
  };

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);

    if (typeof inputFile === 'string') {
      const storedFiles = getStorage(storageKeys.uploadedImages) || [];
      const newStoredFiles = storedFiles.filter((file: any) => file.s3Url !== inputFile);
      setStorage(storageKeys.uploadedImages, newStoredFiles);
    }
    removeStorage(storageKeys.mudebuAiBlend);

    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = (e: any) => {
    e.preventDefault();
    setFiles([]);
    dispatch(setBenchmarkList([]));

    removeStorage(storageKeys.mudebuAiBlend);
  };

  useEffect(() => {
    // Cargar las imágenes guardadas desde localStorage
    const storedFiles = getStorage(storageKeys.uploadedImages) || [];
    if (files.length === 0 && storedFiles.length > 0) {
      setFiles(storedFiles.map((file: any) => file?.s3Url || file));
      dispatch(setBenchmarkList(storedFiles));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          mb: 3,
        }}
      >
        ¿Ya tienes idea de lo que quieres?
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
        }}
      >
        Sube las imágenes que tengas de tu diseño.
      </Typography>
      <Upload
        multiple
        loading={loading}
        thumbnail
        files={files}
        onDrop={(acceptedFiles: File[]) => {
          setLoading(true);
          handleDropMultiFile(acceptedFiles);
        }}
        onRemove={handleRemoveFile}
        onRemoveAll={handleRemoveAllFiles}
        setLoading={setLoading}
        onUpload={(e: any) => {
          setLoading(true);
        }}
      />
    </Box>
  );
}

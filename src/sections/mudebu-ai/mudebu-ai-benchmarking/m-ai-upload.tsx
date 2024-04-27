import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Box } from 'src/components/Box/box-component';
import { Upload } from 'src/components/upload';
import { setBenchmarkList } from 'src/store/slices/mudebu-ai';
import uuidv4 from 'src/utils/uuidv4';
import { RootState } from 'src/store';

export default function MudebuAiUpload() {
  const [files, setFiles] = useState<(File | string)[]>([]);

  const benchmarkList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);

  const dispatch = useDispatch();

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  useEffect(() => {
    if (files.length === 0) {
      dispatch(setBenchmarkList([]));
      return;
    }
    dispatch(
      setBenchmarkList([
        ...benchmarkList,
        files.map((file: File | string) => ({
          url: typeof file === 'string' ? file : URL.createObjectURL(file),
          id: uuidv4(),
        })),
      ])
    );

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
        thumbnail
        files={files}
        onDrop={handleDropMultiFile}
        onRemove={handleRemoveFile}
        onRemoveAll={handleRemoveAllFiles}
        onUpload={() => console.info('ON UPLOAD')}
      />
    </Box>
  );
}

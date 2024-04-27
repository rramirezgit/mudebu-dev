import { use, useCallback, useState } from 'react';
import { useField } from 'formik';
import { useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import { Box } from 'src/components/Box/box-component';
import { UploadBox } from 'src/components/upload';
import Image from 'src/components/image/image';
import Iconify from 'src/components/iconify/iconify';
import { varFade } from 'src/components/animate';
import OnBoardingTextArea from './text-area';

interface FieldOnboarding {
  nameFORMIK: string;
}

export default function OnBoardingTextAndImage({ nameFORMIK }: FieldOnboarding) {
  const [images, setImages] = useState<any[]>([]);
  const [field, , helper] = useField(nameFORMIK);

  const Theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      console.log('newFiles', newFiles);

      setImages([...images, ...newFiles]);
    },
    [images]
  );

  const handleClickDeleteImage = (image: any) => {
    const newImages = images.filter((i) => i !== image);
    setImages(newImages);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <OnBoardingTextArea nameFORMIK={nameFORMIK} rows={4} />
        <UploadBox
          onDrop={onDrop}
          sx={{
            height: 115,
            width: 115,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {images.map((image) => (
          <m.div key={image.preview} variants={varFade().in} initial="initial" animate="animate">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                width: 200,
                height: 95,
                gap: 1,
                backgroundColor: Theme.palette.primary.lighter,
                borderRadius: '16px',
                position: 'relative',
              }}
            >
              <Image
                src={image.preview}
                alt="image"
                width={100}
                height={70}
                sx={{
                  borderRadius: '8px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 12,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: 100,
                    height: 20,
                  }}
                >
                  {image.name}
                </Box>
                <Box
                  sx={{
                    color: 'white',
                    fontSize: 10,
                  }}
                >
                  {image.size} KB
                </Box>
              </Box>
              <Box
                onClick={() => handleClickDeleteImage(image)}
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  color: 'primary.main',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                <Iconify icon="iconamoon:close-fill" color="white" />
              </Box>
            </Box>
          </m.div>
        ))}
      </Box>
    </Box>
  );
}

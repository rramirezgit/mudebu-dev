/* eslint-disable no-restricted-syntax */
import { Button, Skeleton, Typography } from '@mui/material';
import { Magicpen } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box } from 'src/components/Box/box-component';
import Image from 'src/components/image/image';
import { RootState } from 'src/store';
import { setBenchmarkList, setHaveBenchmarks } from 'src/store/slices/mudebu-ai';
// import uuidv4 from '../../../utils/uuidv4';
import { useAxios } from 'src/axios/axios-provider';
import { endpoints_api } from 'src/axios/endpoints';
import { getStorage, setStorage } from 'src/hooks/use-local-storage';
import { setImagesData } from 'src/store/slices/onBoarding';
import { storageKeys } from 'src/sections/onboarding/form/form-layaout';

// const imagesData = {
//   imagesGoogle: Array.from({ length: 5 }, () => ({
//     url: `https://source.unsplash.com/featured/?real-estate&t=${Date.now() + Math.random()}`,
//     id: uuidv4(),
//   })),
//   imagesOpenAi: Array.from({ length: 3 }, () => ({
//     url: `https://source.unsplash.com/featured/?real-estate&t=${Date.now() + Math.random()}`,
//     id: uuidv4(),
//   })),
//   imagesPrintest: Array.from({ length: 3 }, () => ({
//     url: `https://source.unsplash.com/featured/?real-estate&t=${Date.now() + Math.random()}`,
//     id: uuidv4(),
//   })),
// };

export default function MudebuAiGetAi() {
  const [counter, setcounter] = useState(1);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(true);

  const benchmarksList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);
  const imagesData = useSelector((state: RootState) => state.OnBoarding.imagesData);
  const info = useSelector((state: RootState) => state.OnBoarding.onoardingInfo);
  const dispatch = useDispatch();

  const axiosInstance = useAxios();

  const handleClickMoreImages = () => {
    if (counter < 5) {
      setLoading(true);

      let prompt = info?.prompt_images;
      if (prompt === '' || prompt === undefined || prompt === ' ' || prompt === null) {
        prompt = getStorage(storageKeys.onboardingResult)?.prompt_images.split(',')[counter];
      } else {
        prompt = info?.prompt_images.split(',')[counter];
      }

      let idOnboarding = getStorage(storageKeys.onboardingId);

      if (!storageKeys) {
        idOnboarding = info?.savedOnboarding?.id;
      }

      axiosInstance
        .post(`${endpoints_api.mudebuAi.generations}/${idOnboarding}`, { prompt })
        .then((response) => {
          setLoading(false);
          if (response.status === 200 || response.status === 201) {
            if (response.data) {
              dispatch(setImagesData(response.data));
            }
          }
        })
        .finally(() => {
          setcounter(counter + 1);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    // const dataStorage = getStorage(storageKeys.mudebuIaBenchmark);

    // if (dataStorage) {
    //   dispatch(setImagesData(dataStorage));
    //   dispatch(setHaveBenchmarks(false));
    //   setLoading(false);
    //   return;
    // }
    setLoadingAll(true);

    let prompt = info?.prompt_images;
    if (prompt === '' || prompt === undefined || prompt === ' ' || prompt === null) {
      prompt = getStorage(storageKeys.onboardingResult)?.prompt_images.split(',')[0];
    } else {
      prompt = info?.prompt_images.split(',')[0];
    }

    let idOnboarding = getStorage(storageKeys.onboardingId);

    if (!storageKeys) {
      idOnboarding = info?.savedOnboarding?.id;
    }

    axiosInstance
      .post(`${endpoints_api.mudebuAi.generations}/${idOnboarding}`, {
        prompt,
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          if (response.data) {
            setStorage(storageKeys.mudebuIaBenchmark, response.data);
            dispatch(setImagesData(response.data));
            dispatch(setHaveBenchmarks(false));

            const data: any = [];

            if (response.data?.imagesDallE?.length > 0) {
              if (
                response.data.imagesDallE.length > 3 &&
                response.data?.imagesGoogle.length === 0
              ) {
                response.data.imagesDallE.forEach((image: any) => {
                  data.push(image);
                });
              } else {
                response.data.imagesDallE.slice(0, 3).forEach((image: any) => {
                  data.push(image);
                });
              }
            }

            if (response.data?.imagesPinterest?.length > 0) {
              if (
                response.data.imagesPinterest.length > 3 &&
                response.data?.imagesGoogle.length === 0
              ) {
                response.data.imagesPinterest.forEach((image: any) => {
                  data.push(image);
                });
              } else {
                response.data.imagesPinterest.slice(0, 3).forEach((image: any) => {
                  data.push(image);
                });
              }
            }

            if (response.data?.imagesGoogle?.length > 0) {
              response.data.imagesGoogle.forEach((image: any) => {
                data.push(image);
              });
            }

            setImages(data.slice(0, 9));
          }
        }
        setLoadingAll(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectImage = (image: any) => {
    if (benchmarksList.includes(image)) {
      dispatch(
        setBenchmarkList(benchmarksList.filter((selected: any) => selected.id !== image.id))
      );
    } else {
      dispatch(setBenchmarkList([...benchmarksList, image]));
    }
  };

  return (
    <Box sx={{ width: 1, textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          mb: 3,
        }}
      >
        Elige el que mejor se adapte a tus necesidades
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
        }}
      >
        Estos benchmarks creados con inteligencia artificial nos van a ayudar a generar el modelo
        perfecto para ti.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
          },
          gap: {
            xs: 2,
            sm: 5,
          },
          justifyContent: 'center',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        {!loadingAll &&
          images.map((image: any) => (
            <ItemImage
              key={image.id}
              image={image}
              onClickImage={handleSelectImage}
              selected={benchmarksList.includes(image)}
              loading={loading && !benchmarksList.includes(image)}
            />
          ))}
        {loadingAll &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
            <Skeleton
              sx={{
                width: {
                  xs: 187,
                  sm: 293,
                },
                height: {
                  xs: 139,
                  sm: 224,
                },
                borderRadius: 2,
              }}
            />
          ))}
      </Box>
      <Button
        variant="contained"
        disabled={loading || loadingAll}
        sx={{ mt: 3 }}
        startIcon={<Magicpen size="24" color="white" />}
        onClick={handleClickMoreImages}
      >
        {`Generar mas ${counter}/5`}
      </Button>
    </Box>
  );
}

interface ItemImageProps {
  image: any;
  loading?: boolean;
  selected?: boolean;
  onClickImage: (image: any) => void;
}

const ItemImage = ({ selected, image, loading, onClickImage }: ItemImageProps) => {
  if (loading) {
    return (
      <Skeleton
        sx={{
          width: {
            xs: 187,
            sm: 293,
          },
          height: {
            xs: 139,
            sm: 224,
          },
          borderRadius: 2,
        }}
      />
    );
  }

  return (
    <Image
      id={image.id}
      src={image.s3Url}
      onClick={() => onClickImage(image)}
      sx={{
        cursor: 'pointer',
        width: {
          xs: 187,
          sm: 293,
        },
        height: {
          xs: 139,
          sm: 224,
        },
        borderRadius: 2,
        ':hover': {
          transform: 'scale(1.05)',
        },
        overflow: 'hidden',
        transition: (theme) => theme.transitions.create('transform'),
        boxSizing: 'border-box',
        border: selected
          ? (theme) => `solid 4px ${theme.palette.secondary.main}`
          : 'solid 4px transparent',
      }}
    />
  );
};

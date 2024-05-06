/* eslint-disable no-restricted-syntax */
import { Button, Skeleton, Typography } from '@mui/material';
import { Magicpen } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'src/components/Box/box-component';
import Image from 'src/components/image/image';
import { RootState } from 'src/store';
import { setBenchmarkList } from 'src/store/slices/mudebu-ai';
import uuidv4 from '../../../utils/uuidv4';

const imagesData = {
  imagesGoogle: Array.from({ length: 5 }, () => ({
    url: `https://source.unsplash.com/featured/?real-estate&t=${Date.now() + Math.random()}`,
    id: uuidv4(),
  })),
  imagesOpenAi: Array.from({ length: 3 }, () => ({
    url: `https://source.unsplash.com/featured/?real-estate&t=${Date.now() + Math.random()}`,
    id: uuidv4(),
  })),
  imagesPrintest: Array.from({ length: 3 }, () => ({
    url: `https://source.unsplash.com/featured/?real-estate&t=${Date.now() + Math.random()}`,
    id: uuidv4(),
  })),
};

export default function MudebuAiGetAi() {
  const [counter, setcounter] = useState(0);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const benchmarksList = useSelector((state: RootState) => state.mudebuAi.benchmarkList);
  const dispatch = useDispatch();

  const handleClickMoreImages = () => {
    if (counter < 5) {
      setcounter(counter + 1);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    // const fetchImages = async () => {
    //   const images = await getImages();
    //   setImages(images);
    // };

    // fetchImages();

    const data: any = [];

    if (imagesData?.imagesPrintest?.length > 0) {
      imagesData.imagesPrintest.forEach((image: any) => {
        data.push(image);
      });
    }

    if (imagesData?.imagesOpenAi?.length > 0) {
      imagesData.imagesOpenAi.forEach((image: any) => {
        data.push(image);
      });
    }

    if (imagesData?.imagesGoogle?.length > 0) {
      imagesData.imagesGoogle.forEach((image: any) => {
        data.push(image);
      });
    }

    setImages(data.slice(0, 9));
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
        {images.map((image: any) => (
          <ItemImage
            key={image.id}
            image={image}
            onClickImage={handleSelectImage}
            selected={benchmarksList.includes(image)}
            loading={loading && !benchmarksList.includes(image)}
          />
        ))}
      </Box>
      <Button
        variant="contained"
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
  image: { url: string; id: string };
  loading?: boolean;
  selected?: boolean;
  onClickImage: (image: { url: string; id: string }) => void;
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
      src={image.url}
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

'use client';

import { LoadingButton } from '@mui/lab';
import { Avatar, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { useAxios } from 'src/axios/axios-provider';
import { endpoints_api } from 'src/axios/endpoints';
import { Box } from 'src/components/Box/box-component';
import Image from 'src/components/image/image';

export default function CardImgData({
  imagesResult = '/static/images/ai/mudebu-ai.png',
  benchmark_img = [],
}: any) {
  const axiosInstance = useAxios();

  const downloadImage = async (url: string, filename: string) => {
    try {
      await axiosInstance.get(`${endpoints_api.mudebuAi.b64}${url}`).then((response) => {
        const urlData = response.data;
        const a = document.createElement('a');
        a.href = urlData;
        a.download = filename;
        a.click();
      });
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  const handleDownload = () => {
    if (imagesResult !== '/static/images/ai/mudebu-ai.png') {
      downloadImage(imagesResult, 'result.png');
    }

    if (benchmark_img.length !== 0) {
      benchmark_img.forEach((item: any, index: any) => {
        downloadImage(item, `benchmark_img_${index}.png`);
      });
    }
  };

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3 }}>
        <CardHeader title="Mudebu AI" />
        <LoadingButton variant="contained" loading={false} onClick={handleDownload} sx={{ mt: 1 }}>
          Descargar Imágenes
        </LoadingButton>
      </Stack>

      <CardContent>
        <Box sx={{ p: 1, pb: 1 }}>
          <Image src={imagesResult} alt="Mudebu AI" height={400} width={1} />
        </Box>
        <CardHeader title="Benchmark" />
        <Box sx={{ p: 1, pb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {benchmark_img.map((item: any, index: any) => (
            <Image key={index} src={item} alt={`Benchmark ${index}`} height={70} width={70} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

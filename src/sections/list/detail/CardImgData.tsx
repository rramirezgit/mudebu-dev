'use client';

import { LoadingButton } from '@mui/lab';
import { Avatar, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from 'src/components/Box/box-component';
import Image from 'src/components/image/image';

export default function CardImgData() {
  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3 }}>
        <CardHeader title="Mudebu AI" />
        <LoadingButton variant="contained" loading={false} onClick={() => {}} sx={{ mt: 1 }}>
          Descargar Imagenes
        </LoadingButton>
      </Stack>

      <CardContent>
        <Box sx={{ p: 1, pb: 1 }}>
          <Image src="/static/images/ai/mudebu-ai.png" alt="Mudebu AI" height={400} width={1} />
        </Box>
        <CardHeader title="Benchmark" />
        <Box sx={{ p: 1, pb: 1 }}>
          <Box sx={{ flexWrap: 'wrap', gap: '10px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Image
                key={item}
                src="/static/images/ai/mudebu-ai.png"
                alt="Mudebu AI"
                margin={1}
                height={70}
                width={70}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

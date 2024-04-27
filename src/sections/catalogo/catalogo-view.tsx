'use client';

import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/system';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Box } from 'src/components/Box/box-component';
import { HEADER } from 'src/layouts/config-layout';
import Iconify from 'src/components/iconify/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from '../../theme/css';

const catalagoData = [
  {
    id: 1,
    img: '/assets/background/catalogo/catalogo1.png',
    title: 'Mobiliario con Superficies Sólidas',
    text: 'Madera: Mobiliario elegante y atemporal, disponible en una variedad de maderas nobles y acabados. Imagen recomendada: Fotografías de alta calidad que muestren la textura y el acabado de la madera, posiblemente en ambientes bien iluminados y estilizados. Metal: Piezas contemporáneas con un toque industrial, utilizando metales como acero, aluminio y hierro. Imagen recomendada: Imágenes que destaquen el brillo y la solidez del metal, idealmente en configuraciones modernas o urbanas. Acrílicos: Mobiliario moderno y versátil, perfecto para espacios vanguardistas. ',
    pdf: '',
  },
  {
    id: 2,
    img: '/assets/background/catalogo/catalogo2.png',
    title: 'Sillas y Bancos',
    text: 'Siéntate con estilo y confort con nuestra variada selección de Sillas y Bancos. Desde sillas de comedor que añaden un toque de clase a tus cenas hasta bancos que complementan perfectamente tu barra de desayuno, nuestras piezas están diseñadas para brindar comodidad y un toque contemporáneo a cualquier ambiente.',
    pdf: '',
  },
  {
    id: 3,
    img: '/assets/background/catalogo/catalogo3.png',
    title: 'Muebles Mudebu',
    text: 'Sumérgete en la elegancia y funcionalidad con nuestra exclusiva colección de Muebles Mudebu. Cada pieza ha sido cuidadosamente diseñada para fusionar estilo y comodidad, elevando la estética de cualquier espacio. Desde modernos sofás hasta versátiles mesas de centro, descubre muebles que transformarán tu hogar en un oasis de sofisticación.',
    pdf: '',
  },
  {
    id: 4,
    img: '/assets/background/catalogo/catalogo4.png',
    title: 'Muebles de Exterior',
    text: 'Haz que tus espacios al aire libre sean tan acogedores como los interiores con nuestros Muebles de Exterior. Desde elegantes conjuntos de sofás hasta robustas mesas de comedor para exteriores, nuestra colección está confeccionada con materiales resistentes a la intemperie que resisten el paso del tiempo, garantizando durabilidad y estilo duradero.',
    pdf: '',
  },
  {
    id: 5,
    img: '/assets/background/catalogo/catalogo5.png',
    title: 'Sombrillas',
    text: 'Disfruta del aire fresco sin sacrificar la sombra con nuestras Sombrillas. Diseñadas para brindar protección contra los rayos del sol, nuestras sombrillas son el complemento perfecto para tus espacios al aire libre. Desde sombrillas colgantes que crean un ambiente relajado hasta sombrillas de jardín que añaden un toque de elegancia, encuentra la opción que se adapte a tus necesidades de estilo y funcionalidad.',
    pdf: '',
  },
];

export default function CatalogoView() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(5, 1fr)' },
      }}
    >
      {catalagoData.map((item) => (
        <ItemCatalogo key={item.id} {...item} />
      ))}
    </Box>
  );
}

interface ItemCatalogoProps {
  img: string;
  text: string;
  title: string;
  pdf: string;
}

const ItemCatalogo = ({ img, text, pdf, title }: ItemCatalogoProps) => {
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const smUp = useResponsive('up', 'sm');

  const handleClik = () => {};

  const theme = useTheme();

  const overlayStyles = (
    <Box
      sx={{
        position: { xs: 'initial', md: 'absolute' },
        top: 0,
        left: 0,
        width: '100%',
        height: { xs: 'max-content', md: '100%' },
        background: {
          xs: alpha(theme.palette.primary.main, 0.9),
          md: alpha(theme.palette.grey[800], 0.8),
        },
        transition: 'all 0.3s ease-in-out',
        opacity: { xs: 1, md: overlayOpacity },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        gap: 2,
        textAlign: 'left',
        overflowY: 'auto',
        padding: { xs: '20px 10px', md: '0px 20px' },
        ...bgBlur,
      }}
    >
      <Box sx={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>{title}</Box>
      <Box sx={{ color: 'white', fontSize: 17 }}>{text}</Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: 14, width: 200 }}
        onClick={handleClik}
        startIcon={<Iconify icon="ph:arrow-down-bold" />}
      >
        Descargar catalogo
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        position: 'relative',
      }}
      onMouseEnter={() => {
        if (!smUp) return;
        setOverlayOpacity(1);
      }}
      onMouseLeave={() => {
        if (!smUp) return;
        setOverlayOpacity(0);
      }}
    >
      <Box
        sx={{
          height: { xs: '50vh', md: `calc(100vh - ${HEADER.H_DESKTOP}px)` },
          background: `url(${img}) no-repeat center`,
          backgroundSize: 'cover',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          transitionDelay: '0.3s',
        }}
      />
      {overlayStyles}
    </Box>
  );
};

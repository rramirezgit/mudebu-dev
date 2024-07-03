// sections

import ServicesProductsView from 'src/sections/services/view';
import { homeServicesProductsData } from 'src/sections/home/home-service-producst';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Mudebu | Servicios y Productos',
};

type Props = {
  params: {
    category: 'services' | 'products';
    name: string;
  };
};

export default function PostDetailsHomePage({ params }: Props) {
  const { name, category } = params;

  const dataSelected = homeServicesProductsData[category]?.find((item: any) =>
    item.to.includes(name)
  );

  return <ServicesProductsView serviceProducstSelected={dataSelected} />;
}

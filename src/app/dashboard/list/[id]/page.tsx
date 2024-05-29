// sections

import ListDetailPage from 'src/sections/list/detail/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard',
};

export default function DetailList({ params }: any) {
  const { id } = params;

  return <ListDetailPage id={id} />;
}

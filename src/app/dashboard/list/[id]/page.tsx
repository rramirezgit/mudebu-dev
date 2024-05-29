// sections

import ListDetailPage from 'src/sections/list/detail/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard',
};

export default function DetailList({ params }: any) {
  const { id, author } = params;

  return <ListDetailPage id={id} user={author} />;
}

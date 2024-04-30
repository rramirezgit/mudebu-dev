// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { useAuth0 } from '@auth0/auth0-react';

import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const { t } = useLocales();

  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="outlined"
      color="primary"
      sx={{
        ...sx,
      }}
    >
      {t('Login')}
    </Button>
  );
}

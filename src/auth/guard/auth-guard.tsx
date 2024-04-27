import { useEffect, useCallback, useState } from 'react';
// routes
import { useAuth0 } from '@auth0/auth0-react';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { loginWithRedirect } = useAuth0();

  const { authenticated, method } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    } else {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

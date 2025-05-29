import { RouterProvider } from 'react-router-dom';

/* project import */
import buildRouter from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
/* import RTLLayout from 'components/RTLLayout'; */
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

/* auth-provider */
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import useAuth from 'hooks/useAuth';
import { useMemo } from 'react';
/* ==============================|| APP - THEME, ROUTER, LOCAL ||============================== */

export default function App() {
  return (
    <ThemeCustomization>
      <Locales>
        <ScrollTop>
          <AuthProvider>
            <>
              <AppWithRouter />
              {/* <Notistack>
                <RouterProvider router={router} />
                <Snackbar />
              </Notistack> */}
            </>
          </AuthProvider>
        </ScrollTop>
      </Locales>
    </ThemeCustomization>
  );
}

function AppWithRouter() {
  const { user } = useAuth();

  /* const role = user?.role; */
  const role = 'admin';

  /* Memoize router so it only rebuilds when role changes */
  const router = useMemo(() => buildRouter(role), [role]);

  return (
    <Notistack>
      <RouterProvider router={router} />
      <Snackbar />
    </Notistack>
  );
}

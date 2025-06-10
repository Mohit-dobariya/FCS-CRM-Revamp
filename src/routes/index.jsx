// import { createBrowserRouter } from 'react-router-dom';

// // project import
// import MainRoutes from './MainRoutes';
// import LoginRoutes from './LoginRoutes';

// // ==============================|| ROUTING RENDER ||============================== //

// const router = createBrowserRouter([LoginRoutes, MainRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

// export default router;

// src/routes/index.jsx

import { createBrowserRouter } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import adminRoutes from './adminRoutes';
import staffRoutes from './StaffRoutes';
import studentRoutes from './StudentRoutes';
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import PagesLayout from 'layout/Pages';
import SimpleLayout from 'layout/Simple';
import { SimpleLayoutType } from 'config';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));
const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));

const router = createBrowserRouter(
  [
    LoginRoutes,
    adminRoutes,
    staffRoutes,
    studentRoutes,
    {
      path: '/',
      element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
      children: [{ path: 'contact-us', element: <AppContactUS /> }]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        { path: '404', element: <MaintenanceError /> },
        { path: '500', element: <MaintenanceError500 /> },
        { path: 'under-construction', element: <MaintenanceUnderConstruction /> },
        { path: 'coming-soon', element: <MaintenanceComingSoon /> }
      ]
    },
    { path: '*', element: <MaintenanceError /> }
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;

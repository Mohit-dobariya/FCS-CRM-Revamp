import { lazy } from 'react';
import RoleProtectedRoute from './RoleProtectedRoute';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const StaffDashboard = Loadable(lazy(() => import('pages/staff/index')));

const StaffRoutes = {
  path: '/staff',
  element: <DashboardLayout />,
  children: [
    {
      path: 'dashboard',
      element: (
        <RoleProtectedRoute allowedRoles={['staff']}>
          <StaffDashboard />
        </RoleProtectedRoute>
      )
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default StaffRoutes;

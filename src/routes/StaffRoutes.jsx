import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AuthGuard from 'utils/route-guard/AuthGuard';

const StaffDashboard = Loadable(lazy(() => import('pages/staff/dashboard')));
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));

const staffRoutes = {
  path: '/staff',
  element: (
    <AuthGuard role="staff">
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    { path: 'dashboard', element: <StaffDashboard /> },
    { path: '*', element: <MaintenanceError /> }
  ]
};

export default staffRoutes;

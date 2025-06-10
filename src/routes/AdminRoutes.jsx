import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AuthGuard from 'utils/route-guard/AuthGuard';

const AdminDashboard = Loadable(lazy(() => import('pages/admin/dashboard')));
const OfficeAdminTools = Loadable(lazy(() => import('pages/admin/officeAdminTools')));
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));

const adminRoutes = {
  path: '/admin',
  element: (
    <AuthGuard role="admin">
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    { path: 'dashboard', element: <AdminDashboard /> },
    { path: 'office_admin_tools', element: <OfficeAdminTools /> },
    { path: '*', element: <MaintenanceError /> }
  ]
};

export default adminRoutes;

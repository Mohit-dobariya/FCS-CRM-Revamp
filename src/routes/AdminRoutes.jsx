import { lazy } from 'react';
import RoleProtectedRoute from './RoleProtectedRoute';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const AdminDashboard = Loadable(lazy(() => import('pages/admin/index')));

const AdminRoutes = {
  path: '/admin',
  element: <DashboardLayout />,
  children: [
    {
      path: 'dashboard',
      element: (
        <RoleProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleProtectedRoute>
      )
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default AdminRoutes;

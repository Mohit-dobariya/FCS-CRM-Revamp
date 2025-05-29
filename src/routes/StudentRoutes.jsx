import { lazy } from 'react';
import RoleProtectedRoute from './RoleProtectedRoute';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const StudentDashboard = Loadable(lazy(() => import('pages/student/index')));

const StudentRoutes = {
  path: '/student',
  element: <DashboardLayout />,
  children: [
    {
      path: 'dashboard',
      element: (
        <RoleProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </RoleProtectedRoute>
      )
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default StudentRoutes;

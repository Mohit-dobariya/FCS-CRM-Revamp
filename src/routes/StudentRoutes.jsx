import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AuthGuard from 'utils/route-guard/AuthGuard';

const StudentDashboard = Loadable(lazy(() => import('pages/student/dashboard')));
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));

const studentRoutes = {
  path: '/student',
  element: (
    <AuthGuard role="student">
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    { path: 'dashboard', element: <StudentDashboard /> },
    { path: '*', element: <MaintenanceError /> }
  ]
};

export default studentRoutes;

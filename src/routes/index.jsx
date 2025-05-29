import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import StaffRoutes from './StaffRoutes';
import StudentRoutes from './StudentRoutes';

export default function buildRouter(role) {
  let RoleBasedRoutes;
  if (role === 'admin') RoleBasedRoutes = AdminRoutes;
  if (role === 'staff') RoleBasedRoutes = StaffRoutes;
  if (role === 'student') RoleBasedRoutes = StudentRoutes;

  const routes = [LoginRoutes, RoleBasedRoutes].filter(Boolean);

  return createBrowserRouter(routes, { basename: import.meta.env.VITE_APP_BASE_NAME });
}

// import { createBrowserRouter } from 'react-router-dom';

// // project import
// import MainRoutes from './MainRoutes';
// import LoginRoutes from './LoginRoutes';
// import AdminRoutes from './AdminRoutes';
// import StaffRoutes from './StaffRoutes';
// import StudentRoutes from './StudentRoutes';

// // ==============================|| ROUTING RENDER ||============================== //
// const role = localStorage.getItem('userType');
// let RoleBasedRoutes;
// if (role && role == 'admin') RoleBasedRoutes = AdminRoutes;
// if (role && role == 'staff') RoleBasedRoutes = StaffRoutes;
// if (role && role == 'student') RoleBasedRoutes = StudentRoutes;
// if (!role && role == null) RoleBasedRoutes = LoginRoutes;
// console.log(role);

// const router = createBrowserRouter([RoleBasedRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

// export default router;

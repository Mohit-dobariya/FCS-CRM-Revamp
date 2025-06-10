import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const AuthGuard = ({ children, role }) => {
  const { isLoggedIn, user } = useAuth();
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.userRole !== role) {
    return <Navigate to="/maintenance/404" replace />;
  }
  return children;
};

export default AuthGuard;

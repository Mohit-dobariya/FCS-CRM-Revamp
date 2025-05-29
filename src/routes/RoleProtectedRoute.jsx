import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const role = localStorage.getItem('userType') || '';
  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

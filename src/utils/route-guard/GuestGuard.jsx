import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

export default function GuestGuard({ children }) {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  if (isLoggedIn && user) {
    const redirectTo =
      user.userRole == 'admin'
        ? '/admin/dashboard'
        : user.userRole == 'staff'
          ? '/staff/dashboard'
          : user.userRole == 'student'
            ? '/student/dashboard'
            : '/';

    /* Prevent rendering children if redirecting */
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  return children;
}

GuestGuard.propTypes = { children: PropTypes.any };

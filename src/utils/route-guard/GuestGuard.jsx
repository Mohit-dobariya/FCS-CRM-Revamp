import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      const redirectPath = location?.state?.from || APP_DEFAULT_PATH;
      navigate(redirectPath, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
}

GuestGuard.propTypes = { children: PropTypes.any };

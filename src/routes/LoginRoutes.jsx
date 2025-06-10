// src/routes/LoginRoutes.jsx
import { lazy } from 'react';
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';
import GuestGuard from 'utils/route-guard/GuestGuard';

const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

const LoginRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <AuthLogin />
        </GuestGuard>
      )
    },
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthLogin />
        </GuestGuard>
      )
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <AuthRegister />
        </GuestGuard>
      )
    },
    {
      path: 'forgot-password',
      element: (
        <GuestGuard>
          <AuthForgotPassword />
        </GuestGuard>
      )
    },
    {
      path: 'check-mail',
      element: (
        <GuestGuard>
          <AuthCheckMail />
        </GuestGuard>
      )
    },
    {
      path: 'reset-password',
      element: (
        <GuestGuard>
          <AuthResetPassword />
        </GuestGuard>
      )
    },
    {
      path: 'code-verification',
      element: (
        <GuestGuard>
          <AuthCodeVerification />
        </GuestGuard>
      )
    }
  ]
};

export default LoginRoutes;

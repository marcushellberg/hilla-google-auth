import { ReactElement, ReactNode } from 'react';
import { useAuth } from 'Frontend/useAuth.js';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { REDIRECT_PATH } from 'Frontend/routes.js';

interface ProtectedRouteProps {
  redirectPath?: string;
  component: ReactElement;
}

export function ProtectedRoute({
  redirectPath = '/login',
  component,
}: ProtectedRouteProps): ReactElement {
  const { authenticated, authInitialized } = useAuth();
  const location = useLocation();

  if (!authInitialized) {
    return <div></div>;
  }

  if (!authenticated) {
    // Store the requested path, so we can redirect to it after logging in (in App.tsx)
    localStorage.setItem(REDIRECT_PATH, location.pathname);

    return <Navigate to={redirectPath} replace />;
  }

  return component ? component : <Outlet />;
}

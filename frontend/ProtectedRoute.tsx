import {ReactElement, ReactNode} from "react";
import {useAuth} from "Frontend/useAuth.js";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {REDIRECT_PATH} from "Frontend/routes.js";

interface ProtectedRouteProps {
  redirectPath?: string;
  children: ReactElement
}

export function ProtectedRoute({redirectPath = '/login', children}: ProtectedRouteProps): ReactElement {
  const {authenticated, authInitialized} = useAuth();
  const location = useLocation();

  if(!authInitialized) {
    console.log('Waiting for auth to init');
    return <div></div>;
  }

  if(!authenticated) {
    // Store the requested path, so we can redirect to it after logging in (in App.tsx)
    localStorage.setItem(REDIRECT_PATH, location.pathname);
    console.log('Not authenticated, redirecting.');

    return <Navigate to={redirectPath} replace/>
  }

  return children ? children : <Outlet/>;
}
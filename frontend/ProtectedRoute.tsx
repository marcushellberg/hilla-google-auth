import {ReactElement, ReactNode} from "react";
import {useAuth} from "Frontend/useAuth.js";
import {Navigate, Outlet} from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath?: string;
  children: ReactElement
}

export function ProtectedRoute({redirectPath = '/login', children}: ProtectedRouteProps): ReactElement {
  const {authenticated} = useAuth();

  if(!authenticated) {
    console.log('Not authenticated, redirecting.')
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet/>;
}
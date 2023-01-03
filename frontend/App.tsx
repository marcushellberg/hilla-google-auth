import {RouterProvider, useNavigate} from 'react-router-dom';
import router, {REDIRECT_PATH} from './routes';
import {AuthProvider} from "Frontend/useAuth.js";
import {useEffect} from "react";

export function App() {

  /**
   * Redirects a user back to the view they attempted to access before login
   */
  useEffect(() => {
    const redirectPath = localStorage.getItem(REDIRECT_PATH);

    if (redirectPath) {
      localStorage.removeItem(REDIRECT_PATH);
      location.href = `${location.origin}${redirectPath}`;
    }
  },[]);

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}
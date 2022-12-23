import { RouterProvider } from 'react-router-dom';
import router from './routes';
import {AuthProvider} from "Frontend/useAuth.js";

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}
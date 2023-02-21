import { createBrowserRouter } from 'react-router-dom';
import { LoginView } from 'Frontend/views/LoginView';
import { MainView } from 'Frontend/views/MainView';
import { ProtectedRoute } from 'Frontend/ProtectedRoute.js';
import { SecretView } from 'Frontend/views/SecretView.js';

export const REDIRECT_PATH_KEY = 'redirectPath';

const router = createBrowserRouter([
  { path: '/login', element: <LoginView /> },
  { path: '/secret', element: <ProtectedRoute component={<SecretView />} /> },
  { path: '', element: <ProtectedRoute component={<MainView />} /> },
]);

export default router;

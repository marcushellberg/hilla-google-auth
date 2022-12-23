import { createBrowserRouter } from 'react-router-dom';
import {LoginView} from "Frontend/views/LoginView";
import {MainView} from "Frontend/views/MainView";
import {ProtectedRoute} from "Frontend/ProtectedRoute.js";

const router = createBrowserRouter([
  { path: '/login', element: <LoginView /> },
  { path: '', element: <ProtectedRoute><MainView/></ProtectedRoute>}
]);

export default router;

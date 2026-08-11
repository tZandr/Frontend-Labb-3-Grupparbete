import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Support from './pages/Support';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/profile', element: <Profile /> },
          {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [{ index: true, element: <Dashboard /> }],
          },
          { path: '/settings', element: <Settings /> },
          { path: '/support', element: <Support /> },
        ],
      },
    ],
  },
]);

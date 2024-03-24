import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { AuthEvent, AuthGuard } from '@/providers/AuthProvider'
import RegisterPage from '@/pages/RegisterPage'
import ActiveAccountPage from '@/pages/ActiveAccountPage'
import HandleAccountLayout from '@/layouts/HandleAccountLayout'
import CreatorCenterLayout from '@/layouts/CreatorCenterLayout'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    element: (
      <AuthGuard>
        <AuthEvent />
      </AuthGuard>
    ),
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      {
        path: 'creator-center',
        element: <CreatorCenterLayout />,
        children: [],
      },
    ],
  },
  {
    element: <AuthenticationLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <HandleAccountLayout />,
    children: [
      {
        path: 'active-account',
        element: <ActiveAccountPage />,
      },
    ],
  },
])

export default router

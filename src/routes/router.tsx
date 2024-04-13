import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import CreatorHomePage from '@/pages/CreatorCenter/HomePage'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { AuthEvent, AuthGuard } from '@/providers/AuthProvider'
import RegisterPage from '@/pages/RegisterPage'
import ActiveAccountPage from '@/pages/ActiveAccountPage'
import HandleAccountLayout from '@/layouts/HandleAccountLayout'
import CreatorCenterLayout from '@/layouts/CreatorCenterLayout'
import CreatorStoriesPage from '@/pages/CreatorCenter/StoriesPage'
import CreatorCreateStoryPage from '@/pages/CreatorCenter/CreateStoryPage'
import CreatorUpdateStoryPage from '@/pages/CreatorCenter/UpdateStoryPage'
import CreatorChapterLayout from '@/layouts/CreatorCenterLayout/ChapterLayout'
import CreatorChaptersPage from '@/pages/CreatorCenter/ChaptersPage'
import CreatorCreateChapterPage from '@/pages/CreatorCenter/CreateChapterPage'
import CreatorUpdateChapterPage from '@/pages/CreatorCenter/UpdateChapterPage'

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
        children: [
          {
            index: true,
            element: <CreatorHomePage />,
          },
          {
            path: 'stories',
            children: [
              {
                index: true,
                element: <CreatorStoriesPage />,
              },
              {
                path: 'create',
                element: <CreatorCreateStoryPage />,
              },
              {
                path: ':slugId',
                children: [
                  {
                    path: 'update',
                    element: <CreatorUpdateStoryPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'chapters',
            element: <CreatorChapterLayout />,
            children: [
              {
                path: ':slugId',
                children: [
                  {
                    index: true,
                    element: <CreatorChaptersPage />,
                  },
                  {
                    path: 'create',
                    element: <CreatorCreateChapterPage />,
                  },
                  {
                    path: 'update/:id',
                    element: <CreatorUpdateChapterPage />,
                  },
                ],
              },
            ],
          },
        ],
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

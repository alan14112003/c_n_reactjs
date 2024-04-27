import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import AuthenticationLayout from '@/layouts/AuthenticationLayout'
import HandleAccountLayout from '@/layouts/HandleAccountLayout'
import CreatorCenterLayout from '@/layouts/CreatorCenterLayout'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ActiveAccountPage from '@/pages/ActiveAccountPage'
import { AuthEvent, AuthGuard } from '@/providers/AuthProvider'
import CreatorHomePage from '@/pages/CreatorCenter/HomePage'
import CreatorStoriesPage from '@/pages/CreatorCenter/StoriesPage'
import CreatorCreateStoryPage from '@/pages/CreatorCenter/CreateStoryPage'
import CreatorUpdateStoryPage from '@/pages/CreatorCenter/UpdateStoryPage'
import CreatorChaptersPage from '@/pages/CreatorCenter/ChaptersPage'
import CreatorCreateChapterPage from '@/pages/CreatorCenter/CreateChapterPage'
import CreatorUpdateChapterPage from '@/pages/CreatorCenter/UpdateChapterPage'
import HomePage from '@/pages/Root/HomePage'
import StoryPage from '@/pages/Root/StoryPage'
import ChapterPage from '@/pages/Root/ChapterPage'
import CoinInPage from '@/pages/Root/Auth/CoinInPage'
import FavoritePage from '@/pages/Root/FavoritePage'

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
          {
            path: 'favorite',
            element: <FavoritePage />,
          },
          {
            path: 'stories',
            children: [
              {
                path: ':slugId',
                element: <StoryPage />,
              },
              {
                path: ':slugId/:chapterId',
                element: <ChapterPage />,
              },
            ],
          },
          {
            path: 'auth',
            children: [
              {
                path: 'coin',
                children: [
                  {
                    path: 'in',
                    element: <CoinInPage />,
                  },
                ],
              },
            ],
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
            // element: <CreatorChapterLayout />,
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

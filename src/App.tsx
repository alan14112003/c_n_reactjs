import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import queryClient from './config/reactQuery'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { ThemeProvider } from './components/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { AuthProvider } from './providers/AuthProvider'
import { Suspense } from 'react'
import LoaderPage from './components/LoaderPage'
import SocketProvider from './providers/SocketProvider'

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<LoaderPage />}>
        <Provider store={store}>
          <AuthProvider>
            <SocketProvider>
              <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <RouterProvider router={router} />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </SocketProvider>
          </AuthProvider>
        </Provider>
      </Suspense>
    </ThemeProvider>
  )
}

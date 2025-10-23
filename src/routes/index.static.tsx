import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SignIn from './pages/SignIn'
import TanStackQuery from './pages/TanStackQuery'
import Immer from './pages/Immer'
import DefaultLayout from './layouts/Default'
import { requiresAuth } from './loaders/requiresAuth'
import { guestOnly } from './loaders/guestOnly'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/', // http://localhost:5173/
        Component: Home
      },
      {
        path: '/about', // http://localhost:5173/about
        Component: About
      },
      {
        path: '/movies',
        Component: Movies,
        loader: requiresAuth,
        children: [
          {
            path: '/movies/:movieId',
            Component: MovieDetails
          }
        ]
      },
      {
        path: '/signin',
        loader: guestOnly,
        Component: SignIn
      },
      {
        path: '/api/*',
        element: null // /api 경로는 React Router가 처리하지 않음
      },
      {
        path: '/tanstack',
        Component: TanStackQuery
      },
      {
        path: '/immer',
        Component: Immer
      },
      {
        path: '*',
        element: <h1>404 Not Found</h1>
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}

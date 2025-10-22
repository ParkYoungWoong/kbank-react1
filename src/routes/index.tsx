import { createBrowserRouter, RouterProvider } from 'react-router'
// import Home from './pages/Home'
// import About from './pages/About'
// import Movies from './pages/Movies'
// import MovieDetails from './pages/MovieDetails'
// import SignIn from './pages/SignIn'
import DefaultLayout from './layouts/Default'
import { requiresAuth } from './loaders/requiresAuth'
import { guestOnly } from './loaders/guestOnly'
import { dynamic } from './dynamic'
import Loader from '@/components/Loader'

// const Home = lazy(() => import('./pages/Home'))
// const About = lazy(() => import('./pages/About'))
// const Movies = lazy(() => import('./pages/Movies'))
// const MovieDetails = lazy(() => import('./pages/MovieDetails'))
// const SignIn = lazy(() => import('./pages/SignIn'))

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/', // http://localhost:5173/
        Component: dynamic(() => import('./pages/Home'))
      },
      {
        path: '/about', // http://localhost:5173/about
        Component: dynamic(() => import('./pages/About'), {
          loading: <Loader />,
          error: () => <h2>에러 발생~😘</h2>
        })
      },
      {
        path: '/movies',
        Component: dynamic(() => import('./pages/Movies')),
        loader: requiresAuth,
        children: [
          {
            path: '/movies/:movieId',
            Component: dynamic(() => import('./pages/MovieDetails'))
          }
        ]
      },
      {
        path: '/signin',
        loader: guestOnly,
        Component: dynamic(() => import('./pages/SignIn'))
      },
      {
        path: '/api/*',
        element: null // /api 경로는 React Router가 처리하지 않음
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

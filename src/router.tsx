import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import PageNotFound from '@/layout/pageNotFound/pageNotFound'
import { Profile } from '@/pages/auth/profile'
import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/signUp'
import { Cards } from '@/pages/cards/cards'
import Decks from '@/pages/decs/decks'
import { useMeQuery } from '@/services/auth/auth.sevice'

function PrivateRoutes() {
  const { isError } = useMeQuery()

  const isAuthenticated = !isError

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}

const publicRoutes: RouteObject[] = [
  { element: <SignUp />, path: '/login' },
  { element: <SignIn />, path: '/sign-in' },
  {
    element: <PageNotFound />,
    path: '/*',
  },
]

const privateRoutes: RouteObject[] = [
  { element: <Decks />, path: '/' },
  { element: <Profile email={'asdasd'} nickname={'asdasd'} />, path: '/profile' },
  {
    element: <Cards />,
    path: '/cards/:id?',
  },
]

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  const { isLoading: meIsLoading } = useMeQuery()

  if (meIsLoading) {
    return <div>Me is loading</div>
  }

  return <RouterProvider router={router} />
}

import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import PageNotFound from '@/layout/pageNotFound/pageNotFound'
import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/signUp'
import Cards from '@/pages/cards/cards'
import Decks from '@/pages/decs/decks'
import { useAppSelector } from '@/services/store'

function PrivateRoutes() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}

const publicRoutes: RouteObject[] = [
  { element: <SignUp />, path: '/login' },
  { element: <SignIn />, path: '/sign-in' },
  {
    element: <Cards />,
    path: '/cards/:id?',
  },
  { element: <Decks />, path: '/' },
  {
    element: <PageNotFound />,
    path: '/*',
  },
]

const privateRoutes: RouteObject[] = [
  // { element: <Decks />, path: '/' },
  // {
  //   element: <Cards />,
  //   path: '/cards/:id?',
  // },
]
const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

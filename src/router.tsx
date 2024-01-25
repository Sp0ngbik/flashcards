import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { SignIn } from '@/components/auth/signIn'
import { SignUp } from '@/components/auth/signUp'
import Cards from '@/components/cards/cards'
import PageNotFound from '@/services/pageNotFound/pageNotFound'
import { useAppSelector } from '@/services/store'

import Decks from './components/decs/decks'

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

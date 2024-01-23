import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { SignIn } from '@/components/auth/signIn'
import { SignUp } from '@/components/auth/signUp'
import { useAppSelector } from '@/services/store'

import Decks from './components/decs/decks'

function PrivateRoutes() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const publicRoutes: RouteObject[] = [
  { element: <SignUp />, path: '/login' },
  { element: <SignIn />, path: '/sign-in' },
]

const privateRoutes: RouteObject[] = [{ element: <Decks />, path: '/' }]
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

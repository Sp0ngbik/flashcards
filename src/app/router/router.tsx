import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useOutletContext,
} from 'react-router-dom'

import { AuthContext, Header } from '@/layout/header'
import PageNotFound from '@/layout/pageNotFound/pageNotFound'
import CheckEmail from '@/pages/auth/checkEmail/checkEmail'
import CreateNewPassword from '@/pages/auth/createNewPassword/createNewPassword'
import { ForgotPassword } from '@/pages/auth/forgotPassword'
import { Profile } from '@/pages/auth/profile'
import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/signUp'
import { Cards } from '@/pages/cards/ui/cards/cards'
import Decks from '@/pages/decs/ui/decks/decks'
import Learn from '@/pages/learn/learn'

const useAuthContext = () => {
  return useOutletContext<AuthContext>()
}

function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}

function PublicRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}

const publicRoutes: RouteObject[] = [
  { element: <SignUp />, path: '/sign-up' },
  { element: <SignIn />, path: '/sign-in' },
  { element: <CreateNewPassword />, path: '/recover-password/:token' },
  { element: <ForgotPassword />, path: '/forgot-password' },
  { element: <CheckEmail />, path: '/check-email' },
]

const privateRoutes: RouteObject[] = [
  { element: <Decks />, path: '/' },
  { element: <Profile />, path: '/profile' },
  {
    element: <Cards />,
    path: '/cards/:id?',
  },
  { element: <Learn />, path: '/cards/:id?/learn' },
]

const appRoutes: RouteObject[] = [
  { children: privateRoutes, element: <PrivateRoutes /> },
  { children: publicRoutes, element: <PublicRoutes /> },
]

export const router = createBrowserRouter([
  { children: appRoutes, element: <Header /> },
  { element: <PageNotFound />, path: '/*' },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

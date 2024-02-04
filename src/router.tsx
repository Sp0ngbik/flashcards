import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useOutletContext,
} from 'react-router-dom'

import { Loader } from '@/common/ui/loader'
import { AuthContext, Header } from '@/layout/header'
import PageNotFound from '@/layout/pageNotFound/pageNotFound'
import CheckEmail from '@/pages/auth/checkEmail/checkEmail'
import CreateNewPassword from '@/pages/auth/createNewPassword/createNewPassword'
import { ForgotPassword } from '@/pages/auth/forgotPassword'
import { Profile } from '@/pages/auth/profile'
import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/signUp'
import { Cards } from '@/pages/cards/ui/cards/cards'
import Decks from '@/pages/decs/ui/decs/decks'
import Learn from '@/pages/learn/learn'
import { useMeQuery } from '@/services/auth/auth.sevice'

const useAuthContext = () => {
  return useOutletContext<AuthContext>()
}

function PrivateRoutes() {
  const { isLoading } = useMeQuery()
  const { isAuthenticated } = useAuthContext()

  if (isLoading) {
    return <Loader />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}

function PublicRoutes() {
  // const { isAuthenticated } = useAuthContext()

  // return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
  return <Outlet />
}

const publicProtectedRoutes: RouteObject[] = [
  {
    children: [
      { element: <SignUp />, path: '/sign-up' },
      { element: <SignIn />, path: '/sign-in' },
      { element: <ForgotPassword />, path: '/forgot-password' },
      { element: <CreateNewPassword />, path: '/recover-password/:token?' },
      { element: <CheckEmail />, path: '/check-email' },
      {
        element: <PageNotFound />,
        path: '/*',
      },
    ],
  },
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

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicProtectedRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <Header />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import Cards from '@/components/cards/cards'

import Decks from './components/decs/decks'

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const publicRoutes: RouteObject[] = [{ element: <div>login</div>, path: '/login' }]

const privateRoutes: RouteObject[] = [
  { element: <Decks />, path: '/' },
  {
    element: <Cards />,
    path: '/cards/:id?',
  },
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

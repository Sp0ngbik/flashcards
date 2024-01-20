import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useGetDecksQuery } from '@/services/baseApi'

function PrivateRoutes() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const publicRoutes: RouteObject[] = [{ element: <div>login</div>, path: '/login' }]

const privateRoutes: RouteObject[] = [{ element: <div>hello</div>, path: '/' }]
const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  const result = useGetDecksQuery()

  console.log(result)

  return <RouterProvider router={router} />
}

import { createBrowserRouter, Outlet } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductPage from './pages/Product/ProductPage'
import CustomizeSneakers from './components/CustomizeSneakers/CustomizeSneakers'
import Admin from './pages/Admin/Admin'
import RouterErrorPage from './pages/RouterError/RouterError'

const Layout = () => {
  return <Outlet />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouterErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'product/:id/custom', element: <CustomizeSneakers /> },
      { path: 'admin', element: <Admin /> }
    ]
  },
])
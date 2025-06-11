import { createBrowserRouter } from 'react-router'
import App from './pages/Home/Home'
import ProductPage from './pages/Product/ProductPage'
import CustomizeSneakers from './components/CustomizeSneakers/CustomizeSneakers'
import Admin from './pages/Admin/Admin'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/product/:id',
    Component: ProductPage,
  },
  {
    path: '/product/:id/custom',
    Component: CustomizeSneakers
  },
  {
    path: '/admin',
    Component: Admin
  }
])
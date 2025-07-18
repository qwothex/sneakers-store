import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductPage from './pages/Product/ProductPage'
import CustomizeSneakers from './components/CustomizeSneakers/CustomizeSneakers'
import Admin from './pages/Admin/Admin'
import RouterErrorPage from './pages/RouterError/RouterError'
import AuthPage from './pages/Auth/Auth'
import UserPage from './pages/UserProfile/UserPage'
import ProductList from './components/ProductsList/ProductsList'
import NavLayout from './pages/NavLayout'
import FilteredProducts from './pages/FilteredProducts/FilteredProducts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NavLayout />,
    errorElement: <RouterErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'product/:id/custom', element: <CustomizeSneakers /> },
      { path: 'admin', element: <Admin /> },
      { path: 'auth', element: <AuthPage /> },
      { path: 'search', element: <FilteredProducts /> },
      {
        path: 'profile/:userId',
        element: <UserPage />,
        children: [
          { index: true, element: <ProductList /> },
          { path: 'stats', element: <div>STATS</div> },
        ]
      },
    ]
  },
])
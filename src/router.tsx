import { createBrowserRouter, Outlet } from 'react-router-dom'
import Home from './pages/Home/Home'
import ProductPage from './pages/Product/ProductPage'
import CustomizeSneakers from './components/CustomizeSneakers/CustomizeSneakers'
import Admin from './pages/Admin/Admin'
import RouterErrorPage from './pages/RouterError/RouterError'
import AuthPage from './pages/Auth/Auth'
import UserPage from './pages/UserProfile/UserPage'
import { useUser } from './context/UserContext'
import { supabase } from './utils/supabase'
import { useEffect } from 'react'
import ProductList from './components/ProductsList/ProductsList'

const Layout = () => {

  const { setUser, setLoading } = useUser()

  useEffect(() => {
    const getUser = async() =>{
      const { data: { session }, error } = await supabase.auth.getSession()

      if(error){
        console.log('failed to got the user: ' + error.message)
        return
      }
      
      if(session?.user){
        const {data: loginData, error: loginError} = await supabase.from('users')
          .select('*')
          .eq('id', session?.user.id)
          .single()

        if(loginError){
          console.log('failed to select user from table: ' + loginError.message)
          return
        }

        if(loginData){
          setUser({
            id: loginData.id,
            username: loginData.username,
            email: session.user.email!,
            avatarUrl: loginData.avatar_url,
            admin: loginData.admin,
            sales: loginData.sales
          })
        }
      }

      setLoading(false);
    }

    getUser()
  }, [setUser])

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
      { path: 'admin', element: <Admin /> },
      { path: 'auth', element: <AuthPage /> },
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
import { useEffect, useState, type FC } from "react";
import NavBar from "../components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import LoadingScreen from "./Loading/LoadingScreen";
import { supabase } from "../utils/supabase";
import { useUser } from "../context/UserContext";
import type { SearchProduct } from "../types/product";

const NavLayout:FC = () => {

  const [searchProducts, setSearchProducts] = useState<SearchProduct[]>([])
  const [loading, setLoading] = useState(true)

  const { setUser, setLoading: setUSerLoading } = useUser()

  useEffect(() => {
    const getUser = async() => {
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
            description: loginData.description,
            email: session.user.email!,
            avatarUrl: loginData.avatar_url,
            bannerUrl: loginData.banner_url,
            admin: loginData.admin,
            sales: loginData.sales,
            achievements: loginData.achievements,
          })
        }
      }

      setUSerLoading(false);
    }

    getUser()
  }, [setUser])

  useEffect(() => {
    const getSearchProducts = async() => {
      const { data, error } = await supabase.from('search_products')
        .select('id, name, manufacturer, thumbnail')

      if(error){
        throw new Error('Error fetching search products: ' + error.message)
      }

      setSearchProducts(data);
    }

    getSearchProducts().then(() => setLoading(false))
  }, [])

  if(loading) return <LoadingScreen />

  return (
    <div style={{maxWidth: 1440, margin: 'auto'}}>
      <NavBar searchProducts={searchProducts} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default NavLayout
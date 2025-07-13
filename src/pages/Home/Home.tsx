import CustomizeAdvertisement from '../../components/CustomizeAdvertisement/CustomizeAdvertisement'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/Navbar/NavBar'
import ProductList from '../../components/ProductsList/ProductsList'
import { supabase } from '../../utils/supabase'
import LoadingScreen from '../Loading/LoadingScreen'
import s from './home.module.scss'
import { useEffect, useState, type FC } from 'react'

const Home:FC = () => {

  // const { isError, isLoading } = useQuery({
  //   queryKey: ['search_products'],
  //   queryFn: getSearchProducts
  // })

  // if(isError){
  //   console.log('an error occured while sending tanstack request')
  // }

  // if(isLoading) return <LoadingScreen />

  return (
    <>
      <div className={s.mainPage}>
        <CustomizeAdvertisement />
        <ProductList />
      </div>
    </>
  )
}

export default Home
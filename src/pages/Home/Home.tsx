import CustomizeAdvertisement from '../../components/CustomizeAdvertisement/CustomizeAdvertisement'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/Navbar/NavBar'
import ProductList from '../../components/ProductsList/ProductsList'
import s from './home.module.scss'
import type { FC } from 'react'

const Home:FC = () => {

  return (
    <>
      <div className={s.mainPage}>
        <NavBar />
        <CustomizeAdvertisement />
        <ProductList />
      </div>
      <Footer />
    </>
  )
}

export default Home
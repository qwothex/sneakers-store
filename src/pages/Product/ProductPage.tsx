import { useEffect, useState, type FC } from "react"
import { useNavigate, useParams } from "react-router"
import type { Product } from "../../types/productEntry"
import { productsList } from "../../constants/mochSneakersData"
import NavBar from "../../components/Navbar/NavBar"
import s from './productPage.module.scss'

const ProductPage:FC = () => {

  const [product, setProduct] = useState<Product>()

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setProduct({...productsList[+id! - 1], sizes: [36,37,38,39,40,41]})
  }

  return(
    <div className={s.productPage}>
			<NavBar />
      <div>
        <img src={product?.thumbnail} width='50%' />
      </div>
      <h2>{product?.name}</h2>
      <button onClick={() => navigate('custom', {replace: false})} >customize</button>
    </div>
  )
}

export default ProductPage
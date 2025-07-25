import { useState, type FC } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import s from './productPage.module.scss'
import { supabase } from "../../utils/supabase"
import { useQuery } from "@tanstack/react-query"
import type { Product } from "../../types/product"
import Price from "../../components/Price/Price"
import ErrorPage from "../ErrorPage/ErrorPage"
import { priceWithDiscount } from "../../utils/priceWithDiscount"
import LoadingScreen from "../Loading/LoadingScreen"
import Slider from "../../components/Slider/Slider"

const ProductPage:FC = () => {

  const navigate = useNavigate()
  const {id} = useParams()

  const [ selectedSize, setSelectedSize ] = useState<number>()
  const [ sizeType, setSizeType ] = useState<'EU' | 'US'>('EU')
  const [ deliverTo, setDeliverTo ] = useState<'store' | 'home'>()

  const fetchData = async() => {
    const { data, error } = await supabase.from('products')
      .select('*')
      .eq("id", +id!)
      .single()

    if(data){
      return data as Product
    }

    if(error){
      console.log(error.message)
    }
  }

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchData(),
  })

  if(isError){
    return <ErrorPage message={'product error'} />
  }

  if(isLoading){
    return <LoadingScreen />
  }

  if(!product){
    return <ErrorPage message={'Product is missing'} />
  }

  return(
		<>

      <main className={s.productPage}>

        <div className={s.image_container}>
          <Slider images={product.images} />
        </div>

        <section className={s.data}>

          <div className={s.data_header}>
            <h1>{product.name}</h1>

            {product?.customizable && <div className={s.customizable_title_container}>
                <span className={s.customizable_title}>CUSTOMIZABLE</span>
            </div>}

            <Link to={'/search?brand=' + product.manufacturer} className={s.more}>more from {product.manufacturer}</Link>
            <Link to={'/profile/' + product.seller_id} className={s.more}>more from {product.seller_username}</Link>

            <ul className={s.filters}>
              {product.filters.map(el => <li onClick={() => navigate('/search?category=' + el)} key={el}>{el}</li>)}
            </ul>
          </div>

          <div className={s.price_container}>
            <Price price={product.price} discount={product.discount || null} includeOriginalPriceNumber />
            <p className={s.interestFree}>
              or 4 interest-free payments of {
              !product.discount 
                ? (product.price / 4).toString()
                : (priceWithDiscount(product.price, product.discount) / 4).toString()}$
            </p>
          </div>

          {product.customizable && <button className={s.customizeButton} onClick={() => navigate('custom', {replace: false})}>customize</button>}

          <select id='selectSize' onChange={() => setSizeType(sizeType == 'EU' ? 'US' : 'EU')}>
            <option value='EU'>
              EU
            </option>
            <option value='US'>
              US
            </option>
          </select>

          <p style={{margin: 5}}>select a size</p>

          <div className={s.sizes}>
              {product.sizes 
                && product.sizes.map((el) => (
                  <button 
                    key={el} 
                    className={selectedSize === el ? s.size_selected : s.size}
                    onClick={() => setSelectedSize(el)}
                  >
                    {sizeType == 'EU' ? el : el - 33}
                  </button>
                ))
              }
          </div>

          <fieldset className={s.deliveryOptions}>
            <input
              id="store"
              className={s.deliveryInput}
              type="radio" 
              value="store" 
              checked={deliverTo === 'store'} 
              onChange={() => setDeliverTo('store')} 
            />
            <label htmlFor="store" className={s.deliveryOption}>
              <div className={s.checked_status} />
              <span>
                <span>Deliver to store</span>
                <br />
                <span className={s.deliveryOption_description}>Pick your order up in preferred store</span>
              </span>
            </label>

            <input 
              id="me"
              className={s.deliveryInput}
              type="radio" 
              value="me" 
              checked={deliverTo === 'home'} 
              onChange={() => setDeliverTo('home')} 
            />
            <label htmlFor="me" className={s.deliveryOption}>
              <div className={s.checked_status} />
              <span>
                <span>Deliver To Me</span>
                <br />
                <span className={s.deliveryOption_description}>Free shipping from 1000$</span>
              </span>
            </label>
          </fieldset>

          <button className={s.cart_button}>
            Add to cart
          </button>

        </section>

      </main>
    </>
  )
}

export default ProductPage
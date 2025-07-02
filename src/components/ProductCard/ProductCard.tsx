import { type FC } from 'react'
import s from './productCard.module.scss'
import type { ProductPreview } from '../../types/product'
import { useNavigate } from 'react-router-dom'
import Price from '../Price/Price'

const ProductCard:FC<{product: ProductPreview}> = ({product}) => {

  const navigate = useNavigate()

  return(
    <div className={s.productCard}>
      
      <div className={s.labels}>
        { product.discount
          ? <div className={s.label_left}>
              <span>
                -{product.discount}%
              </span>
            </div> 
          : <></>
        }
        { product.customizable 
          ? <div className={s.label_right}>
              <span>
                customizable
              </span>
            </div>
          : <></>
        }
      </div>

      <div className={s.overlay} />
      <img src={product.thumbnail} loading='lazy' />

      <Price price={product.price} discount={product.discount || null} includeOriginalPriceText={true} />

      <h2>{product.name}</h2>
      <h5>{product.seller_username}</h5>
      <button onClick={() => navigate('/product/' + product.id)}>More info</button>
    </div>
  )
}

export default ProductCard
import { type FC } from 'react'
import s from './productCard.module.scss'
import type { ProductPreview } from '../../types/product'
import { useNavigate } from 'react-router-dom'
import Price from '../Price/Price'

const ProductCard:FC<{product: ProductPreview}> = ({product}) => {

  const navigate = useNavigate()

  return(
    <div className={s.productCard_container}>
      <div className={s.productCard} onClick={() => navigate('/product/' + product.id)}>

        <div className={s.top}>
          <div className={s.labels}>
            { product.discount &&
              <div className={s.label_left}> <span> -{product.discount}% </span> </div>
            }
            { product.customizable &&
              <div className={s.label_right}> <span> customizable </span> </div>
            }
          </div>

          <img src={product.thumbnail} loading='lazy' />
        </div>

        <div className={s.bottom}>

          <div className={s.labels_bottom}>
            { product.discount &&
              <div className={s.label_left}> <span> -{product.discount}% </span> </div>
            }
            { product.customizable &&
              <div className={s.label_right}> <span> customizable </span> </div>
            }
          </div>

          <h2>{product.name}</h2>
          <h5>{product.seller_username}</h5>

          <div className={s.filterItems_container}>
            {product.filters.map(el => <span key={el} className={s.filterItem}>{el}</span>)}
          </div>

          <Price price={product.price} discount={product.discount || null} includeOriginalPriceNumber={true} />

        </div>
      </div>
    </div>
  )
}

export default ProductCard
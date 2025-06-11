import { useEffect, type FC } from 'react'
import s from './productCard.module.scss'
import type { ProductPreview } from '../../types/productEntry'
import { useNavigate } from 'react-router'
import { price } from '../../utils/discountedPrice'

const ProductCard:FC<{product: ProductPreview}> = ({product}) => {

  const navigate = useNavigate()

  useEffect(() => {
    console.log(product)
  }, [])

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
      <img src={product.thumbnail} />


      <h3 className={product.discount ? s.discountedPrice : s.price}>
        {price(product.price, product.discount || null)}
      </h3>


      <h2>{product.name}</h2>
      <h5>{product.manufacturer}</h5>
      <button onClick={() => navigate('/product/' + product.id)}>More info</button>
    </div>
  )
}

export default ProductCard
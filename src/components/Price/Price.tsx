import type { FC } from "react"
import s from './price.module.scss'

const Price:FC<{price: number, discount: number | null, includeOriginalPriceText?: boolean, includeOriginalPriceNumber?: boolean}> = ({price, discount, includeOriginalPriceText, includeOriginalPriceNumber}) => {
  if(!discount){
    return <h3 style={{margin: 0}}>{price}$</h3>
  }
  return (
    <div className={s.discountedPrice} style={{display: includeOriginalPriceNumber ? 'flex' : 'block'}}>
      <h3 className={s.price}>{(price * (1 - discount / 100.0)).toFixed()}$</h3>
      {includeOriginalPriceNumber && <span className={s.originalPrice}>{price}$</span>}
      {includeOriginalPriceText && <h5>{price} original price -{discount}%</h5>}
    </div>
  )
}

export default Price
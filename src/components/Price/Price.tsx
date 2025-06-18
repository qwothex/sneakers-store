import type { FC } from "react"
import s from './price.module.scss'

const Price:FC<{price: number, discount: number | null, includeOriginalPriceText?: boolean}> = ({price, discount, includeOriginalPriceText}) => {
  if(!discount){
    return <h3>{price}$</h3>
  }
  return (
      <div className={s.discountedPrice}>
        <h3>{(price - (discount / 100 * price)).toFixed()}$</h3>
        {includeOriginalPriceText ? <h5>{price} original price -{discount}%</h5> : <></>}
      </div>
  )
}

export default Price
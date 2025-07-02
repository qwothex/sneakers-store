import type { FC } from 'react'
import s from './popUp.module.scss'

const PopUp:FC<{message: string}> = ({message}) => {
  return (
    <div className={s.popUp_container}>
      <h3>{message}</h3>
    </div>
  )
}

export default PopUp
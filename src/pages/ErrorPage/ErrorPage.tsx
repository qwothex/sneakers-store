import type { FC } from 'react'
import s from './errorPage.module.scss'

const ErrorPage:FC<{message: string}> = ({message}) => {
  return (
    <div className={s.error_container}>
      <h1>{message}</h1>
    </div>
  )
}

export default ErrorPage
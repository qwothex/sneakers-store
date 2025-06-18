import type { FC } from 'react'
import s from './routerError.module.scss'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Link } from 'react-router-dom'

const RouterErrorPage:FC = () => {
  return <div className={s.error_container}>
      <div className={s.animation_container}>
        <DotLottieReact
          src="/error.lottie"
          loop
          autoplay
        />
      </div>
      <h1>PAGE IS UNDER DEVELOPMENT</h1>
      <Link to={'/'}>back to home</Link>
    </div>
}

export default RouterErrorPage
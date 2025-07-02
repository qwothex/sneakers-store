import { type FC } from 'react'
import s from './auth.module.scss'
import background from '../../assets/videos/background.mp4'
import AuthForm from '../../components/AuthForm/AuthForm'

const AuthPage:FC = () => {

  return (
    <main className={s.auth_container}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={s.form_container_wrapper}>
        <div className={s.form_container}>
          <AuthForm />
        </div>
      </div>
      <div className={s.content_container}>

      </div>
    </main>
  )
}

export default AuthPage
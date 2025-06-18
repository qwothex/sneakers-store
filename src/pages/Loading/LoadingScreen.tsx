import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { FC } from 'react';
import s from './loadingScreen.module.scss'

const LoadingScreen:FC = () => {
  return (
    <div className={s.loadingScreen}>
      <div className={s.anim_container}>
        <DotLottieReact
          src="/src/assets/animations/loading.lottie"
          loop
          autoplay
        />
      </div>
      <div className={s.loading_bar}>
        <div className={s.segment} />
      </div>
    </div>
  );
};

export default LoadingScreen
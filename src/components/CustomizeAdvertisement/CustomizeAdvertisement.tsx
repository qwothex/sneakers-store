import s from './customizeAdvertisement.module.scss'
import animation from '../../assets/animations/animation.webp'

const CustomizeAdvertisement = () => {
  return(
    <div className={s.customizeAd}>
      <img 
        src={animation} 
        alt='animation'
        width={'100%'}
        // height={'100%'}
      />
      <h2>Your Kicks - Your Canvas.</h2>
      <h3>
        Design your dream sneakers with endless optimization options.
        From colors to materials, explore our new 3D customization feature and make it uniquely yours
      </h3>
      <button>start customizing</button>
    </div>
  )
}

export default CustomizeAdvertisement
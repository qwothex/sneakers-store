import { type FC } from 'react'
import s from './sideBar.module.scss'
import { mainFilters } from '../../constants/mainFilters'
import { CiSearch } from 'react-icons/ci'
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher'
import { GrFavorite } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const SideBar:FC = () => {

  const navigate = useNavigate()

  return (
    <>
      <label htmlFor='burger' className={s.burger}></label>
      <input id='burger' className={s.burger_input} type='checkbox' />
      <div className={s.sidebar_container}>
        <ul>
          <div className={s.inputWrapper}>
            <CiSearch size={20} style={{position: 'absolute', left: '10px'}} />
            <input type='text' className={s.searchInput} placeholder='Search' /> 
          </div>
          <div className={s.actions}>
            <ThemeSwitcher />
            <button onClick={() => navigate('/favourite')}>
              <GrFavorite size={'100%'} />
            </button>
          </div>
          {mainFilters.map((el) => (
            <li key={el}>
              {el}
            </li>
          ))}
        </ul>
      </div>
      <label htmlFor='burger' className={s.sidebar_wrapper}></label>
    </>
  )
}

export default SideBar
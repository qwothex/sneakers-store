import type { FC } from 'react'
import s from './navBar.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import { mainFilters } from '../../constants/mainFilters';
import SideBar from '../sideBar/SideBar';

const NavBar:FC = () => {

  const navigate = useNavigate()

  return (
    <nav className={s.navbar}>
      <div className={s.title_container}>
        <SideBar/>
        <Link to='/'> 
          <h1>Sneakers store</h1>
        </Link>
      </div>
      <ul className={s.navFilters}>
        {mainFilters.map( name => 
          <li key={name}> 
            <button>
              { name }
            </button>
          </li> 
        )}
      </ul>
      <div className={s.inputWrapper}>
        <CiSearch size={20} style={{position: 'absolute', left: '10px'}} />
        <input type='text' className={s.searchInput} placeholder='Search' /> 
      </div>
      <div className={s.userInfo}>
        <div className={s.secondary}>
          <ThemeSwitcher />
          <button onClick={() => navigate('/favourite')}>
            <GrFavorite size={'100%'} />
          </button>
        </div>
        <button onClick={() => navigate('/cart')}>
          <HiOutlineShoppingBag size={'100%'} />
        </button>
        <button onClick={() => navigate('/admin')}>
          <FaRegUser size={'100%'} />
        </button>
      </div>
    </nav>
  )
}

export default NavBar
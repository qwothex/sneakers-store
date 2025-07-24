import { useEffect, useRef, useState, type FC } from 'react'
import s from './navBar.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { SlArrowRightCircle } from "react-icons/sl";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import { mainFilters } from '../../constants/mainFilters';
import SideBar from '../sideBar/SideBar';
import { useUser } from '../../context/UserContext';
import type { SearchProduct } from '../../types/product';

const NavBar:FC<{searchProducts: SearchProduct[]}> = ({searchProducts}) => {
  
  const wrapperRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate()

  const [searchProductsCopy, setSearchProductsCopy] = useState<SearchProduct[]>(searchProducts)
  const [search, setSearch] = useState<string>('')

  const [searchModal, setSearchModal] = useState<boolean>(false);

  const { user } = useUser()
  
  const searchItem = (product: SearchProduct) => {
    return (
      <li onClick={() => {
        navigate('/product/' + product.id)
        setSearchModal(false)
        setSearch('')
      }} key={product.id}>
        <img src={product.thumbnail} height='100%' />
        <h3>{product.name}</h3>
      </li>
    )
  }

  useEffect(() => {
    // const params = new URLSearchParams(searchParams)
    // search ? params.set('query', search) : params.delete('query')
    // setSearchParams(params)
    setSearchProductsCopy(searchProducts.filter(el => el.name.toLowerCase().includes(search.toLowerCase()) || el.manufacturer.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSearchModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <button 
              onClick={() => {
                // const params = new URLSearchParams(searchParams)
                // params.set('category', name)
                // setSearchParams(params)
                // setSearchParams({'category': name})
                navigate('/search?category=' + name)
              }}
            >
              { name }
            </button>
          </li>
        )}
      </ul>
      <div ref={wrapperRef} className={s.inputWrapper}>
        <CiSearch size={20} style={{position: 'absolute', left: '10px'}} />
        <input type='text' className={s.searchInput} placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setSearchModal(true)} />
        {search && <SlArrowRightCircle size={20} style={{position: 'absolute', right: '10px'}} onClick={() => {navigate('/search/?query=' + search), setSearchModal(false)}} />}
        {searchModal && <ul> {searchProductsCopy.slice(0,3).map(el => searchItem(el))} </ul>}
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
        <button onClick={() => navigate('/profile/' + user?.id)}>
          <FaRegUser size={'100%'} />
        </button>
      </div>
    </nav>
  )
}

export default NavBar
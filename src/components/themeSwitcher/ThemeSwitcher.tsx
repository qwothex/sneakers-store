import { useEffect, useState, type FC } from 'react'
import s from './themeSwitcher.module.scss'
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const ThemeSwitcher:FC = () => {

  type themeType = 'light' | 'dark'
  
  const [theme, setTheme] = useState<themeType>(localStorage.getItem('theme') as themeType || 'light')

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button 
      className={s.switcher}
      onClick={() => {
        setTheme(theme == 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' 
        ? <MdOutlineLightMode size={'100%'} />
        : <MdOutlineDarkMode size={'100%'} />
      }
    </button>
  )
}

export default ThemeSwitcher
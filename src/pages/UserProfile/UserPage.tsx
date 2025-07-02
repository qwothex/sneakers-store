import { useEffect, useState, type FC } from 'react'
import s from './userProfile.module.scss'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../context/UserContext';
import { MdLogout, MdEdit } from "react-icons/md";
import { supabase } from '../../utils/supabase';
import PopUp from '../../components/PopUp/PopUp';
import LoadingScreen from '../Loading/LoadingScreen';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useQuery } from '@tanstack/react-query';

const UserPage:FC = () => {

  const navigate = useNavigate();
  const { user, setUser } = useUser()

  const [popup, setPopup] = useState<boolean>(false)
  const {userId} = useParams()

  useEffect(() => {

    if(userId === 'undefined'){
      navigate('/auth', {replace: true})
    }
  }, [])

  const isOwnProfile = userId == user?.id

  const fetchUserData = async() => {
    const { data, error } = await supabase.from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if(error){
      return <ErrorPage message={error.message} />
    }

    if(data) return data
  }

  const logout = async() => {
    const { error } = await supabase.auth.signOut();

    if(error){
      return <PopUp message='An arror occured while logging out' />
    }else{
      navigate('/', {replace: true})
      setUser(null)
    }
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: fetchUserData
  })

  if(isError) console.log('Error fetching user')

  if(isLoading) return <LoadingScreen />

  // const onEditProfile = () => {

  // }

  if(popup){
    setTimeout(() => setPopup(false), 4000)
  }

  return (
    <>
    <NavBar />
    {popup && <PopUp message='profile updated successfully.' />}
    <div className={s.profile_container}>
      <header>
        <img alt='profile banner' width='100%' height='100%' src='https://www.mikereyfman.com/wp-content/gallery/panoramic-1-to-2-ratio/D1C7772-80_pano_bright.jpg' />
        {isOwnProfile && 
          <>
            <button className={s.logout_button} onClick={logout}><MdLogout /></button>
            <button className={s.edit_button} onClick={() => setPopup(true)}><MdEdit /></button>
          </>
        }
      </header>
      <main>
        <section className={s.user_info}>
          <img className={s.profile_picture} width={250} height={250} src={'https://www.mikereyfman.com/wp-content/gallery/panoramic-1-to-2-ratio/LF-MRD1E0616-27_Contrast_Crop_1x2_Lofoten-Archipelago.jpg'} /> {/* src={user?.avatarUrl} */}
          <div className={s.second_column}>
            <h2>{data?.username}</h2>
            <p>{data?.description || 'no description yet'}</p>
          </div>
          <div className={s.third_column}>
            <div className={s.achievements}>

            </div>
          </div>
        </section>
        <section className={s.user_data}>
          <span className={s.navigation}>
            <NavLink className={({ isActive }) => isActive ? s.active : null} end to=''>products</NavLink>
            <NavLink className={({ isActive }) => isActive ? s.active : null} to='stats'>stats</NavLink>
          </span>
          <Outlet />
        </section>
      </main>
    </div>
    <Footer />
    </>
  )
}

export default UserPage;
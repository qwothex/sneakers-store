import { useState, type FC } from 'react'
import s from './authForm.module.scss'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { supabase } from '../../utils/supabase'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const AuthForm:FC = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<String>('')

  const { setUser, setLoading: setUserLoading } = useUser();

  const navigate = useNavigate()

  type Inputs = {
    username: string
    email: string
    password: string
    agreement: boolean
  }

  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()

  const submitForm: SubmitHandler<Inputs> = async(formData) => {
    setLoading(true)
    setUserLoading(true)
    try{
      if(isLogin){

        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password.trim()
        })

        if(error){
          setErrorMessage(error.message)
        }

        if(data.user){
          const {data: loginData, error: loginError} = await supabase.from('users')
            .select('*')
            .eq('id', data.user.id)
            .single()

          if(loginError){
            setErrorMessage(loginError.message)
          }

          if(loginData){
            setUser({
              id: loginData.id,
              username: loginData.username,
              avatarUrl: loginData.avatar_url,
              admin: loginData.admin,
              email: data.user.email!,
              sales: loginData.sales
            })
          }
          navigate('/profile/' + loginData.id, {replace: true})
        }

      }else{

        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password.trim(),
        })

        if(error){
          setErrorMessage(error.message)
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('Failed to retrieve user:', userError?.message);
          return;
        }

        if(user){
          const {error: signUpError} = await supabase.from('users')
            .insert([
              {
                'id': user.id,
                'admin': false,
                'username': formData.username.trim()
              }
            ])

            if(signUpError){
              setErrorMessage(signUpError.message)
              return;
            }

            setUser( { id: data.user!.id, admin: false, email: data.user?.email!, sales: 0, username: formData.username.trim() } )
            setUserLoading(false);
            navigate('/profile/' + data.user!.id, {replace: true})
        }

      }
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
      setUserLoading(false)
    }

  } 

  return (
    <div>
      <h1 className={s.form_title}>
        {isLogin ? 'SIGN IN' : 'SIGN UP'}
      </h1>
      <form className={s.form} onSubmit={handleSubmit(submitForm)}>
        {!isLogin && 
        <>
          <label htmlFor='usernameInput'>Username</label>
          <input id='usernameInput' type='text' {...register('username', {required: true })} />
        </>
        }
        {errors.email && <span style={{color: 'red'}}>This field is required</span>}
        
        <label htmlFor='emailInput'>Email</label>
        <input id='emailInput' type='email' {...register('email', {required: true })} />
        {errors.email && <span style={{color: 'red'}}>This field is required</span>}

        <label htmlFor='passInput'>Password</label>
        <input id='passInput' type='password' {...register('password', {required: true, minLength: 6})} />
        {errors.password && <span style={{color: 'red'}}>Password must be at least 6 characters</span>}

        {!isLogin &&
          <div className={s.agreement_container}>
            <input id='agreement' type='checkbox' {...register('agreement', {required: true})} />
            <label htmlFor='agreement' className={s.checkbox_label} />
            <span>I agree to the <a href=''>terms</a> and <a href=''>conditions</a></span>
          </div>
        }
        {errors.agreement && <span style={{color: 'red'}}>You should accept agreement</span>}

        <span>
          {
            isLogin
              ? <span>New here? <span onClick={() => setIsLogin(false)}> sign up</span> </span>
              : <span>Already have an account? <span onClick={() => setIsLogin(true)}> sign in</span> </span>
          }
          <button type='submit'>
            {loading ? 'Wait...' : isLogin ? 'sign in' : 'sign up'}
          </button>
        </span>
        {errorMessage ?? <span style={{color: 'red'}}>{errorMessage}</span>}
      </form>
    </div>
  )
}

export default AuthForm;
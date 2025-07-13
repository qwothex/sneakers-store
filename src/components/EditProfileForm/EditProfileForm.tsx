import type { FC } from 'react'
import s from './editProfileForm.module.scss'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUser } from '../../context/UserContext'
import { supabase } from '../../utils/supabase'

const EditProfileForm:FC<{closeForm: () => void, callPopUp: (message: string) => void}> = ({closeForm, callPopUp}) => {

  type Inputs = {
    username: string,
    avatar: FileList,
    banner: FileList,
    description: string
  }

  const { user, setUser, loading, setLoading } = useUser();

  const {register, watch, handleSubmit, formState: {errors}} = useForm<Inputs>()

  const uploadImage = async(image: File): Promise<string | null> => {
    if(image){

      const path = 'profile-pictures/' + Date.now()

      const { error } = await supabase.storage
        .from('images')
        .upload(path, image)

      if(error){
        console.error('Image upload error:', error.message);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(path)

      return urlData?.publicUrl ?? null;
    }

    return null
  }

  const submit: SubmitHandler<Inputs> = async(formData) => {

    try{
      setLoading(true);

      const [pfp, banner] = await Promise.all([
        formData.avatar[0] ? uploadImage(formData.avatar[0]) : null,
        formData.banner[0] ? uploadImage(formData.banner[0]) : null
      ]);

      console.log(formData.description)
      console.log(user?.id)

      const { data, error } = await supabase
        .from('users')
        .update({ username: formData.username.trim(), avatar_url: pfp ?? user?.avatarUrl, banner_url: banner ?? user?.bannerUrl, description: formData.description })
        .eq('id', user?.id)
        .select()

      if(error){
        console.log(error)
        callPopUp('Failed to update profile' + error);
      }

      if(data){
        setUser({
          ...user!,
          username: formData.username.trim(),
          avatarUrl: pfp ?? user?.avatarUrl,
          bannerUrl: banner ?? user?.bannerUrl,
          description: formData.description
        })
        callPopUp('Profile update successfully');
      }

      setLoading(false);
      closeForm()
    }catch(e){
      console.log('error updating profile: ' + e)
    }

  }

  const MAX_LENGTH = 300;

  const description = watch('description', user?.description ?? '')

  return (
    <div className={s.modal_wrapper}>
      <form onSubmit={handleSubmit(submit)}>

        <button type='button' onClick={closeForm}>x</button>

        <label htmlFor='editusername'>username</label>
        <input id='editusername' type='text' {...register('username', {minLength: 3})} defaultValue={user?.username} />
        {errors.username && <span>username should be at least 3 chars</span>}

        <label htmlFor='editdescription'>description</label>
        <span>{description.length}/{MAX_LENGTH}</span>
        <textarea 
          rows={6}
          maxLength={MAX_LENGTH}
          id='editdescription' 
          {...register('description', {maxLength: MAX_LENGTH})} 
          defaultValue={user?.description}
        />
        {errors.username && <span>maximum {MAX_LENGTH} characters allowed.</span>}

        <label htmlFor='editpfp'>profile picture</label>
        <span>1/1</span>
        <input id='editpfp' type='file' accept='image/*' {...register('avatar')} />

        <label htmlFor='editbanner'>profile banner</label>
        <span>3/1</span>
        <input id='editbanner' type='file' accept='image/*' {...register('banner')} />

        <button disabled={loading} type='submit'>Save</button>

      </form>
    </div>
  )
}

export default EditProfileForm
import { useState, type FC, type FormEvent } from 'react'
import s from './admin.module.scss'
import type { Filters } from '../../types/productEntry'
import NavBar from '../../components/Navbar/NavBar'
import { mainFilters } from '../../constants/mainFilters'
import { supabase } from '../../utils/supabase'

const Admin:FC = () => {

  const [name, setName] = useState<string>('')
  const [manufacturer, setManufacturer] = useState<string>('')
  const [images, setimages] = useState<File[]>([])
  const [filters, setFilters] = useState<Filters[]>([])
  const [model, setModel] = useState<File | null>(null)
  const [price, setPrice] = useState<string>('')
  const [customizable, setCustomizable] = useState<boolean>(false)

  const uploadModel = async () => { //execute under condition if(model)
    
    const modelPath = `${Date.now()}${model!.name}`

    const { data, error } = await supabase.storage
      .from("models")
      .upload(modelPath, model!)

    if(error){
      console.log('error while uploading model: ' + error)
    }

    return modelPath

  }

  const uploadImages = async () => {

    const uploads = images.map(async(image) => {
      const imagePath = `${Date.now()}-${image.name}`

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(imagePath, image)

      if(error){
        console.error('Image upload error:', error.message);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(imagePath)

      return urlData?.publicUrl ?? null;
    })

    const results = await Promise.all(uploads)

    return results.filter((url): url is string => Boolean(url));
  }

  const submit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const imageUrls = await uploadImages();
    const modelUrl = model ? await uploadModel() : null

    const { data, error } = await supabase.from('products').insert([{
      name,
      manufacturer,
      images: imageUrls,
      customizable,
      price,
      filters,
      model_url: modelUrl
    }])

    if(data){
      console.log('product ins res: ' + data);
    }

    if(error){
      console.log('error occured while creating product: ' + error.message);
    }

  }

  return (
    <div className={s.admin_container}>
      <NavBar />
      <form onSubmit={(e) => submit(e)}>

        <label htmlFor='name'>
          Name:
        </label>
        <input id='name' type='text' value={name} onChange={(e) => setName(e.currentTarget.value)} />

        <label htmlFor='manufacturer'>
          Manufacturer:
        </label>
        <input
          id='manufacturer'
          type='text'
          value={manufacturer}
          onChange={(e) => setManufacturer(e.currentTarget.value)}
        />

        <label htmlFor='price'>
          Price:
        </label>
        <input 
          id='price'
          value={price}
          type='text' 
          inputMode='numeric' 
          pattern="[0-9]*"
          onChange={(e) => {
            const value = e.currentTarget.value;
            if (/^\d*$/.test(value)) {
              setPrice(value);
            }
          }}
        />

        <label htmlFor='image'>
          Images:
          <h6>First image will be used as thumbnail</h6>
        </label>
        <input id='image' type="file" accept='image/webp' multiple onChange={(e) => setimages(Array.from(e.target.files!))} />

        <label htmlFor='checkbox' className={s.checkbox_label}>
          Customizable:
          <input id='checkbox' type='checkbox' checked={customizable} onChange={(e) => setCustomizable(e.target.checked)} />
        </label>

        <label>
          Tags:
        </label>
        <div>
          {mainFilters.map((attr) => {
            const isSelected = filters.includes(attr);
            return (
              <button type='button'
                key={attr}
                onClick={() => {
                  setFilters((prev) =>
                    isSelected
                      ? prev.filter((a) => a !== attr)
                      : [...prev, attr]
                  );
                }}
                style={{
                  backgroundColor: isSelected ? '#333' : '#eee',
                  color: isSelected ? 'white' : 'black',
                  marginRight: '8px'
                }}
              >
                {attr}
              </button>
            );
          })}
        </div>
        <label htmlFor='model'>
          model:
        </label>
        <input 
          id='model'
          type='file' 
          onChange={(e) => setModel(e.target.files![0])} 
        />

        <button type='submit'>
          Create product
        </button>

      </form>
    </div>
  )
}

export default Admin
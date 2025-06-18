import s from './productsList .module.scss'
import ProductCard from '../ProductCard/ProductCard'
import { supabase } from '../../utils/supabase'
import { useQuery } from '@tanstack/react-query'
// import { useSearchParams } from 'react-router-dom';
import ProductCardLoader from '../ProductCard/ProductCardLoader';

  const pageSize = 9;

  const fetchProducts = async (page: number) => {

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const {data, error, count} = await supabase.from('products')
      .select('*', {count: 'exact'})
      .range(from, to)

    if(error) console.log('error fetching the products: ' + error.message)
    
    return {data, count}
  }

const ProductList = () => {

  // const [searchParams, setSearchParams] = useSearchParams()
  // const page = parseInt(searchParams.get('page') || '1')

  // const goToPage = (page: number) => {
  //   setSearchParams({ page: String(page)})
  // }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', 1],
    queryFn: () => fetchProducts(1),
    staleTime: 1000 * 60 * 5
  })

  if(isLoading){
    return (
      <div className={s.productsList}>
        {
          Array.from({ length: 3 }).map((_, i) => <ProductCardLoader key={i} />)
        }
      </div>
    )
  }

  if(isError){
    console.log('query error: ' + isError)
  }

  return (
    <div className={s.productsList}>
      {
        data?.data?.length 
          ? data?.data?.map(el => <ProductCard product={{...el, thumbnail: el.images[0]}} key={el.id} />)
          : <p>No products Founded</p>
      }
    </div>
  )
}

export default ProductList
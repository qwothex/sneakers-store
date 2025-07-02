import s from './productsList .module.scss'
import ProductCard from '../ProductCard/ProductCard'
import { supabase } from '../../utils/supabase'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCardLoader from '../ProductCard/ProductCardLoader';
import type { FC } from 'react';

const ProductList:FC = () => { 

  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')

  const {userId} = useParams()

  const pageSize = 9;

  const fetchProducts = async (page: number) => {

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const {data, error, count} = await (
    userId
      ? supabase.from('products')
      .select('*', {count: 'exact'})
      .eq('seller_id', userId)
      .range(from, to)

      : supabase.from('products')
      .select('*', {count: 'exact'})
      .range(from, to)
    )

    if(error) console.log('error fetching the products: ' + error.message)
    
    return {data, count}
  }

  const goToPage = (page: number) => {
    page > 0 && setSearchParams({ page: String(page)})
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', page, userId],
    queryFn: () => fetchProducts(page),
    staleTime: 1000 * 60 * 5
  })

  const pagesCount = Math.ceil(data?.count! / pageSize)

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
    console.log('products list request error: ' + isError)
  }

  return (
    <>
      <div className={s.productsList}>
        {
          data?.data!.length 
            ? data?.data?.map(el => <ProductCard product={{...el, thumbnail: el.images[0]}} key={el.id} />)
            : <p>No products Founded</p>
        }
      </div>
      <div className={s.pageSwitcher}>
        <button onClick={() => goToPage(page-1)} disabled={page == 1}>&lt;</button>
        <div className={s.currentPage}>
          {page}
        </div>
        <button onClick={() => goToPage(page+1)} disabled={page == pagesCount}>&gt;</button>
      </div>
    </>
  )
}

export default ProductList
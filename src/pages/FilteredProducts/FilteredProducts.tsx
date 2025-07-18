import type { FC } from 'react'
import s from './filteredProducts.module.scss'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../utils/supabase';
import { useQuery } from '@tanstack/react-query';
import ProductList from '../../components/ProductsList/ProductsList';
import ProductCard from '../../components/ProductCard/ProductCard';

const FilteredProducts:FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category')
  const query = searchParams.get('query')
  const brand = searchParams.get('brand')

  const fetchProducts = async() => {

    let queryBuilder = supabase.from('products').select('*');

    if (query) {
      queryBuilder = queryBuilder.ilike('name', `%${query}%`);
    }

    if (brand) {
      queryBuilder = queryBuilder.eq('manufacturer', brand);
    }

    if (category) {
      queryBuilder = queryBuilder.contains('filters', [category]);
    }

    const { data, error } = await queryBuilder;

    if(error){
      console.log('error fetching filtered products: ' + error)
    }

    return data
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['filterProducts', brand, category, query],
    queryFn: fetchProducts
  })

  if(isError){
    console.log('error fetching products from tanstack')
  }

  return (
    <div className={s.container}>
      {/* <header>
        
      </header> */}
      <main>
        <div className={s.sidebar}>

        </div>
        <div>
          {data && data.map(el => <ProductCard product={el} />)}
        </div>
      </main>
    </div>
  )
}

export default FilteredProducts;
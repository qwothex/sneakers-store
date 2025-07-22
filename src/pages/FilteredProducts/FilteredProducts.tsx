import { type FC } from 'react'
import s from './filteredProducts.module.scss'
import { useSearchParams } from 'react-router-dom'
import ProductList from '../../components/ProductsList/ProductsList';
import FiltersDropdown from '../../components/FiltersDropdown/FiltersDropdown';

const FilteredProducts:FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const categories = searchParams.get('category')?.split(',')
  const query = searchParams.get('query')
  const brands = searchParams.get('brand')?.split(',')
  const order = searchParams.get('order')

  return (
    <div className={s.container}>
      <header>
        <h1>HEADER</h1>
      </header>
      <main>
        <div className={s.sidebar}>
          <ul className={s.list}>
            <FiltersDropdown title='Categories' options={['men', 'women', 'customizable']} param='category' />
            <FiltersDropdown title='Brands' options={['Nike', 'Adidas', 'New Balance', 'Asics', 'Dior']} param='brand' />
            {/* <FiltersDropdown title='Price' options={['0-100$', '100-200$', '200-300$']} param='range' /> */}
          </ul>
        </div>
        <div className={s.products}>
          <div className={s.filters}>
            <ul>
              {query && 
                <li>
                  <button onClick={() => {searchParams.delete('query'), setSearchParams(searchParams)}}>
                    {query}
                  </button>
                </li>
              }
              {brands && 
                brands.map(brand => 
                  <li key={brand}>
                    <button onClick={() => {
                      const newBrands = brands.filter(b => b !== brand).join(',')
                      newBrands.length < 1 ? searchParams.delete('brand') : searchParams.set('brand', newBrands)
                      setSearchParams(searchParams)
                    }}>
                      {brand}
                    </button>
                  </li>
                )
              }
              {categories && 
                categories.map(category => 
                  <li key={category}>
                    <button onClick={() => {
                      const newCategories = categories.filter(b => b !== category).join(',')
                      newCategories.length < 1 ? searchParams.delete('category') : searchParams.set('category', newCategories)
                      setSearchParams(searchParams)
                    }}>
                      {category}
                    </button>
                  </li>
                )
              }
            </ul>
            <select value={order || ''} onChange={(e) => {
              e.target.value ? searchParams.set('order', e.target.value) : searchParams.delete('order')
              setSearchParams(searchParams)
            }}>
                <option value=''>
                    Featured
                </option>
                <option value='asc'>
                  Ascending
                </option>
                <option value='desc'>
                  Descending
                </option>
            </select>
          </div>
          <ProductList filtered />
        </div>
      </main>
    </div>
  )
}

export default FilteredProducts;
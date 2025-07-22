import { useState, type FC } from 'react'
import s from './filtersDropdown.module.scss'
import { useSearchParams } from 'react-router-dom'

const FiltersDropdown:FC<{title: string, options: string[], param: string}> = ({title, options, param}) => {

  const [expanded, setExpanded] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const paramValues = searchParams.get(param)?.split(',');
  
  const changeParams = (value: string) => {

    if(paramValues?.includes(value)){
      const newParams =  paramValues.filter(el => el !== value).join(',')
      newParams.length > 0 ? searchParams.set(param, newParams) : searchParams.delete(param)
    }else[
      searchParams.set(param, paramValues ? paramValues + ',' + value : value)
    ]

    setSearchParams(searchParams)
  }

  return (
    <li className={`${s.container} ${expanded ? s.expanded : ''}`}>
      <div>
        <button className={s.expandButton} onClick={() => setExpanded(!expanded)}>
          <h4>
            {title}
          </h4>
        </button>
        <ul>
          {options.map(el => 
            <li key={el}>
              <button onClick={() => changeParams(el)}>
                {el}
              </button>  
            </li>
          )}
        </ul>
      </div>
    </li>
  )

}

export default FiltersDropdown
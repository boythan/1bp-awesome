import React from 'react'
import './SearchInput.css'
import _ from 'lodash'

function SearchInput({
  placeholder = 'Search',
  onChange,
  value,
  containerClassName
}) {
  return (
    <div className={'searchInputContainer ' + containerClassName}>
      <input placeholder={placeholder} className='h4 searchInput' />
      <ion-icon name={'search-outline'} class='searchIcon' />
    </div>
  )
}

export default SearchInput

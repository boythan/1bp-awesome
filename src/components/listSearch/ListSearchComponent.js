import React from 'react'
import './ListSearchComponent.css'
import SearchInput from '../searchinput/SearchInput'
import ItemListBase from '../itemlist/ItemListBase'

const ListSearchComponent = (props) => {
  const {
    containerClassName,
    placeholderSearch = 'Search',
    data = [],
    selectedIndex = 0,
    onClickAdd,
    addText = 'Add'
  } = props
  return (
    <div className={'listSearchContainer ' + containerClassName}>
      <div className='headerListSearchContainer'>
        {/* <input
                className="inputSearch"
                placeholder={placeholderSearch}
            /> */}
        <SearchInput containerClassName='inputSearch' />
        {onClickAdd && (
          <button
            className='buttonDefault buttonAdd'
            onClick={() => onClickAdd()}
          >
            {addText}
          </button>
        )}
      </div>
      <div className='contentListSearchContainer'>
        {data.map((item, index) => {
          const isSelected = index === selectedIndex
          return (
            <ItemListBase
              content={item.name}
              avatar={item.avatar}
              isSelected={isSelected}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ListSearchComponent

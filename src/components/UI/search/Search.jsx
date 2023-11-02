/* eslint-disable react/prop-types */

import { 
  FaCircleXmark
} from 'react-icons/fa6'

export function Search({
  searchValue,
  setSearchValue
}) {
  // clear fields
  const handleClear = (e) => {
    e.preventDefault()
    const input = e.target.previousSibling.previousSibling
    input.value = ''
  }

  return (
    <div className="todo__search">
      <input 
        type="text" 
        name="search"
        id="search"
        placeholder='Search...'
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value)
        }}
      />
      <label htmlFor="search">Search...</label>
      <button
        onClick={handleClear}
      >
        <FaCircleXmark />
      </button>
    </div>
  )
}
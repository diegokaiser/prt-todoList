/* eslint-disable react/prop-types */

import {
  FaSun,
  FaMoon ,
  FaRegHandPointLeft
} from 'react-icons/fa6'
import { 
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
  FaSort
} from 'react-icons/fa'
import { useEffect, useState } from 'react'

export function Header({ 
  userObj,
  onChangeTheme,
  orderByAscending,
  orderByDescending,
  orderAsc,
  orderByCompleted,
  onHandleLogout
}) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(prefersDark)
  const [menu, setMenu] = useState(false)


  useEffect(() => {
    if(dark) {
      document.documentElement.setAttribute('scheme', `${dark ? 'dark-mode' : 'light-mode'}`)
    }
  }, [])

  const handleToggle = (e) => {
    e.preventDefault()
    setMenu(!menu)
  }

  const handleTheme = (e) => {
    e.preventDefault()
    if(dark === true) {
      setDark(false)
      document.documentElement.setAttribute('scheme', 'light-mode')
    } else {
      setDark(true)
      document.documentElement.setAttribute('scheme', 'dark-mode')
    }
  }

  return (
    <>
      <header className="header">
        <div className="header__content">
          <div className="header__logo"></div>
          <nav className="header__nav">
            <button
              className={`menuTrigger ${menu ? 'active' : ''}`}
              onClick={handleToggle}
            >
              <span></span><span></span><span></span>
            </button>
            <ul
              className={`${menu ? 'active' : ''}`}
            >
              <li>
                <button
                  type='button'
                  onClick={handleTheme}
                >
                  {
                    dark ?
                    <>
                      <FaMoon /> Theme: dark
                    </> :
                    <>
                      <FaSun /> Theme: light
                    </>
                  }
                </button>
              </li>
              <li>
                {
                  !orderAsc ?
                  <button 
                    type="button"
                    onClick={(e) => orderByAscending(e)}
                  >
                    <FaSortAlphaDown />
                    Order Ascending
                  </button> :
                  <button 
                    type="button"
                    onClick={(e) => orderByDescending(e)}
                  >
                    <FaSortAlphaUpAlt />
                    Order Descending
                  </button>
                }
              </li>
              <li>
                <button 
                  type="button"
                  onClick={(e) => orderByCompleted(e)}
                >
                  <FaSort />
                  Order completed
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={(e) => onHandleLogout(e, userObj.uid)}
                >
                  <FaRegHandPointLeft />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
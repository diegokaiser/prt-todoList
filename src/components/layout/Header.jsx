import {
  FaSun,
  FaMoon ,
  FaRegHandPointLeft
} from 'react-icons/fa6'
import { auth } from '../../config/firebase.config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Header() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(prefersDark)
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()

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

  const handleLogout = (e) => {
    e.preventDefault()
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
      })
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
                <button
                  type='button'
                  onClick={handleLogout}
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
import { useLayoutEffect, useState } from 'react'
import { 
  FaSun,
  FaMoon 
} from 'react-icons/fa6'

export function ThemeSwitcher() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [dark, setDark] = useState(prefersDark)

  const handleToggle = () => {
    console.log('toggle called')
    const root = document.getElementsByTagName('html')[0]
    root.style.cssText = 'transition: background .5s ease'
    setDark(!dark)
  }

  return (
    <>
      <div className={`themeSwitcher ${dark ? 'dark' : 'light'}`}>
        <button
          onClick={handleToggle}
        >
          {
            dark ?
            <FaSun /> :
            <FaMoon />
          }
        </button>
      </div>
    </>
  )
}
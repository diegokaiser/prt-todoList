import './App.scss'
import { 
  auth, 
  googleProvider 
} from './config/firebase.config'
import { 
  GoogleAuthProvider,
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Login } from './components/UI/login/Login'
import { AppUI } from './components/AppUI'
import { useNavigate } from 'react-router-dom'

function App() {
  const [userObj, setUserObj] = useState({})
  const [errorObj, setErrorObj] = useState({})
  const navigate = useNavigate()

  // is user logged?
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserObj({...user})
      } else {
        setUserObj({})
      }
    })
  }, [])

  // sign in
  const signIn = async (e, email, password) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserObj({...userCredential.user})
      })
      .catch((error) => {
        setErrorObj(
          {
            code: error.errorCode,
            message: error.message
          }
        )
      })
  }

  // google sign in
  const signInGoogle = async (e) => {
    e.preventDefault()
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUserObj({
          credential: GoogleAuthProvider.credentialFromResult(result),
          token: GoogleAuthProvider.credentialFromResult(result).credential,
          user: result.user
        })
      })
      .catch((error) => {
        setErrorObj(
          {
            code: error.errorCode,
            message: error.message,
            email: error.customData.email,
            credential: GoogleAuthProvider.credentialFromError(error)
          }
        )
      })
  }

  // sign up

  // log out
  const onLogout = (e) => {
    e.preventDefault()
    signOut(auth)
      .then(() => {
        navigate("/")
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      {
        Object.keys(userObj).length > 0 ?
        <AppUI 
          userObj={userObj} 
          errorObj={errorObj}
          logout={onLogout}
        /> :
        <Login 
          signIn={signIn} 
          signInGoogle={signInGoogle}
        />
      }
    </>
  )
}

export default App

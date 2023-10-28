import './App.scss'
import { 
  auth, 
  googleProvider 
} from './config/firebase.config'
import { 
  GoogleAuthProvider,
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Login } from './components/UI/login/Login'
import { AppUI } from './components/AppUI'

function App() {
  const [userObj, setUserObj] = useState({})
  const [errorObj, setErrorObj] = useState({})

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

  return (
    <>
      {
        Object.keys(userObj).length > 0 ?
        <AppUI 
          userObj={userObj} 
          errorObj={errorObj}
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

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA-FziWIdGq69C7bw3dDh2ORK_XZjI9M54",
  authDomain: "react--todo-list.firebaseapp.com",
  databaseURL: "https://react--todo-list-default-rtdb.firebaseio.com",
  projectId: "react--todo-list",
  storageBucket: "react--todo-list.appspot.com",
  messagingSenderId: "151561974946",
  appId: "1:151561974946:web:f4369a72d57708d93a93fb"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
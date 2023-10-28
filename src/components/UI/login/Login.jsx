/* eslint-disable react/prop-types */

import { 
  FaCircleXmark,
  FaRegEnvelope,
  FaGoogle
} from 'react-icons/fa6'
import { useState } from 'react'

export function Login({
  signIn,
  signInGoogle
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formActive, setFormActive] = useState('signin')
  
  // formActive
  const handleSignIn = (e) => {
    e.preventDefault()
    setFormActive('signin')
  }
  const handleForgot = (e) => {
    e.preventDefault()
    setFormActive('forgotpassword')
  }
  const handleSignUp = (e) => {
    e.preventDefault()
    setFormActive('signup')
  }

  /* 
  // forgot
  const handleRecovery = async (e) => {
    e.preventDefault()
  }

  // sign up  
  const handleSignup = async (e) => {
    e.preventDefault()
  }
  */
  
  // clear fields
  const handleClear = (e) => {
    e.preventDefault()
    const input = e.target.previousSibling.previousSibling
    input.value = ''
  }

  return (
    <>
      <div className="login">
        <div className="login__content">
          <div className={`login__signin ${formActive === 'signin' ? '' : 'inactive'}`}>
            <h3>SIGN IN</h3>
            <form>
              <div className="input__field">
                <input 
                  type="text" 
                  name="email" 
                  id="email" 
                  placeholder='Email' 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <button
                  onClick={handleClear}
                >
                  <FaCircleXmark />
                </button>
              </div>
              <div className="input__field">
                <input 
                  type="password" 
                  name="pwd" 
                  id="pwd" 
                  placeholder='Password' 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="pwd">Password</label>
                <button
                  onClick={handleClear}
                >
                  <FaCircleXmark />
                </button>
              </div>
              <div className="input__actions">
                <button 
                  className='btn-success'
                  onClick={(e) => signIn(e, email, password)}
                >
                  <FaRegEnvelope />
                  Sign in
                </button>
                <button 
                  className='btn-success'
                  onClick={(e) => signInGoogle(e)}
                >
                  <FaGoogle />
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
          <div className={`login__signup ${formActive === 'signup' ? '' : 'inactive'}`}>
            <h3>SIGN UP</h3>
            <form>
              <div className="input__field">
                <input 
                  type="text" 
                  name="signUpEmail" 
                  id="signUpEmail" 
                  placeholder='Email' 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <button
                  onClick={handleClear}
                >
                  <FaCircleXmark />
                </button>
              </div>
              <div className="input__field">
                <input 
                  type="password" 
                  name="signUpPwd" 
                  id="signUpPwd" 
                  placeholder='Password' 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="signUpPwd">Password</label>
                <button
                  onClick={handleClear}
                >
                  <FaCircleXmark />
                </button>
              </div>
              <div className="input__actions">
                <button 
                  className='btn-success'
                >
                  <FaRegEnvelope />
                  Sign up with email
                </button>
                <button 
                  className='btn-primary'
                >
                  <FaGoogle />
                  Sign up with Google
                </button>
              </div>
            </form>
          </div>
          <div className={`login__forgot ${formActive === 'forgotpassword' ? '' : 'inactive'}`}>
            <h3>RECOVER PASSWORD</h3>
            <form>
              <div className="input__field">
                <p>Please enter your email address.</p>
                <p>Instructions for resetting the password will be immediately emailed to you.</p>
              </div>
              <div className="input__field">
                <input 
                  type="text" 
                  name="forgotEmail" 
                  id="forgotEmail" 
                  placeholder='Email' 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="forgotEmail">Email</label>
                <button
                  onClick={handleClear}
                >
                  <FaCircleXmark />
                </button>
              </div>
              <div className="input__actions">
                <button 
                  className='btn-primary'
                >
                  Recover password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="login__alternatives">
          <h4
            className='c-pointer'
            onClick={handleForgot}
          >
            Forgot your password?
          </h4>
          <h4>
            {
              formActive === 'signup' ?
              "Do you have an account?" :
              "Don't have an account yet?"
            }          
          </h4>
          <div className="input__actions">
            {
              formActive === 'signup' ?
              <>
                <button 
                  type="button"
                  className='btn-primary'
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </> :
              <>
                <button 
                  type="button"
                  className='btn-primary'
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}
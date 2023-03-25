import React from 'react';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import './Login.css'

const Login = (props) => {
  return (
    <>
        <div className="flex-container">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/logo-full.png" className="logo sm:border-none" alt="Vite logo" />
            </a>
          </div>
          <div>
            <form>
              <h1 className='text-4xl subpixel-antialiased font-medium'>Login</h1>
              <Textfield text="Your Email" src="/email.svg" alt="Email logo" width='30rem' height='30rem' id="email" type="text" placeholder="roller123@gmail.com" />
              <Textfield text="Password" src="/lock_closed.svg" alt="pass logo" width='30rem' height='30rem' id="password" type="password" placeholder="password" />
              <Button/>
            </form>
          </div>
        </div>
    </>
  )
}

export default Login
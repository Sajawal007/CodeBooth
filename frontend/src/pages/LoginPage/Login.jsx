import React from 'react';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import './Login.css'

const Login = (props) => {
  return (
    <>
        <div className="flex-container">
          <div>
            <a href="/" target="_blank">
              <img src="/logo-full.png" className="logo sm:border-none" alt="Vite logo" />
            </a>
          </div>
          <div>
            <form>
              <h1 className='text-offwhite-100 text-4xl subpixel-antialiased font-medium'>Login</h1>
              <Textfield text="Your Email" src="/email.svg" alt="Email logo" width='30rem' height='30rem' id="email" type="text" placeholder="roller123@gmail.com" />
              <Textfield text="Password" src="/lock_closed.svg" alt="pass logo" width='30rem' height='30rem' id="password" type="password" placeholder="password" />
              <Button text="Submit"/>
              <p className='mt-2'>Not Registered? 
                <a className='underline' href='/signup'>Click here to signup!</a>
              </p>
            </form>
          </div>
        </div>
    </>
  )
}

export default Login
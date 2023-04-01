import React from 'react';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import '../LoginPage/Login.css'
const Signup = () => {
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
                        <h1 className='text-4xl text-offwhite-100 subpixel-antialiased font-medium'>SIGN UP</h1>
                        <Textfield text="Your Email" src="/email.svg" alt="Email logo" width='30rem' height='30rem' id="email" type="text" placeholder="roller123@gmail.com" />
                        <Textfield text="Username" src="/username.svg" alt="user logo" width='30rem' height='30rem' id="username" type="text" placeholder="roller123" />
                        <Textfield text="Password" src="/lock_closed.svg" alt="pass logo" width='30rem' height='30rem' id="password" type="password" placeholder="hEllo@123" />
                        <Textfield text="Re-Enter Password" src="/lock_closed.svg" alt="pass logo" width='30rem' height='30rem' id="re-password" type="password" placeholder="re-enter password" />
                        <Button text="Submit"/>
                        <p className='mt-2'>Already have an account? 
                            <a className='underline' href='/login'>Click here to login!</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
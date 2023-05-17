import React from 'react';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import axios from 'axios';
import Popup from "../../components/Popup";
import { useState } from 'react';
import '../LoginPage/Login.css'
const Signup = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responce, setResponce] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [repassword, setRepassword] = useState("");


    const toggleModal = () => {
        setShowModal(!showModal);
    }


    const onSubmit = (event) => {

        event.preventDefault();

        if (email && username && password) {
            const newUser = {
                email: email,
                username: username,
                password: password
            }
            
            axios.post('http://127.0.0.1:3000/register', newUser)
                .then(res => {
                    setResponce(res.data.status);
                    toggleModal();
                })
        }
        else{
            setResponce("Error: Please Check Credentials!!");
            toggleModal();
        }

    }

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

                        <Textfield text="Your Email" src="/email.svg" alt="Email logo" width='30rem' height='30rem' id="email" type="email" placeholder="roller123@gmail.com" setValue={setEmail} />
                        <Textfield text="Username" src="/username.svg" alt="user logo" width='30rem' height='30rem' id="username" type="text" placeholder="roller123" setValue={setUsername} />
                        <Textfield text="Password" src="/lock_closed.svg" alt="pass logo" width='30rem' height='30rem' id="password" type="password" placeholder="hEllo@123" setValue={setPassword} />
                        <Textfield text="Re-Enter Password" src="/lock_closed.svg" alt="pass logo" width='30rem' height='30rem' id="re-password" type="password" placeholder="re-enter password" setValue={setRepassword} />

                        <Button text="Submit" askResponce={onSubmit} />

                        <p className='mt-2'>Already have an account?
                            <a className='underline' href='/login'>Click here to login!</a>
                        </p>
                    </form>
                    <Popup showModal={showModal} toggleModal={toggleModal} status="Status">{responce}</Popup>
                </div>
            </div>
        </>
    )
}

export default Signup
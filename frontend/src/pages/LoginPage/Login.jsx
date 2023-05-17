import React, { useState } from 'react';
import Textfield from '../../components/Textfield';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import axios from 'axios';
import './Login.css'

const Login = (props) => {

  const [email, setEmail] = useState("hello");
  const [password, setPass] = useState("");
  const [responce, setResponce] = useState("");
  const [showModal, setShowModal] = useState(false);



  const toggleModal = () => {
    setShowModal(!showModal);
  }


  const onSubmit = (e) =>{
    e.preventDefault();
    if(email && password)
    {
      axios.post('http://127.0.0.1:3000/login', {email,password})
      .then((res) => {
        
        
        if(res.data.status == "OK"){
          console.log(res.data.data);
          window.localStorage.setItem("token", res.data.data);
          window.location.href = './feed';
        }
        else if(res.data.status == "Account Doesn\'t Exists")
        {
          setResponce(res.data.status);
          toggleModal();
        }
        
      })
    }
    else{
      setResponce("Check Email & Password");
      toggleModal();
    }

  }


  

  return (
    <>
        <div className="flex-container">
          <div>
            <a href="/" target="_blank">
              <img src="/logo-full.png" className="logo sm:border-none" alt="codebooth logo" />
            </a>
          </div>
          <div>
            <form>
              <h1 className='text-offwhite-100 text-4xl subpixel-antialiased font-medium'>Login</h1>
              <Textfield text="Your Email" src="/email.svg" alt="Email logo" width='30rem' height='30rem' id="email" type="text" placeholder="roller123@gmail.com" setValue={setEmail}/>
              <Textfield text="Password" src="/lock_closed.svg" alt="pass logo" width='30rem' height='30rem' id="password" type="password" placeholder="password" setValue={setPass}/>
              <Button text="Submit" askResponce={onSubmit}/>
              <p className='mt-2'>Not Registered? 
                <a className='underline' href='/signup'>Click here to signup!</a>
              </p>
            </form>
          </div>
          <Popup showModal={showModal} toggleModal={toggleModal} status="MessageBox">{responce}</Popup>
        </div>
    </>
  )
}

export default Login
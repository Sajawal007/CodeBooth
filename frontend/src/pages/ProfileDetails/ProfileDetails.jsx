import React from 'react';
import Heading from '../../components/Heading';
import NavBar from '../../components/NavBar';
import axios from 'axios';
import './ProfileDetails.css'


const IDSection = (props) => {
    return (
        <div className="leftSection bg-gray-400 p-10 rounded-md drop-shadow-2xl mr-20 mb-10">
            <h1 class="text-2xl font-bold italic">♨ {props.username} ♨ </h1>
            <h1 class="font-bold italic">{props.level}</h1>
            <a href="/"><img className="mt-10" src='/roller.png' height="100rem" width="100rem" /></a>
        </div>
    );
}

const ProfileDetails = (props) => {

    const token = window.localStorage.getItem("token");
    if (token) {
        axios.post('http://127.0.0.1:3000/userLogged', { token }).then(res => {
            if (res.data.status == 'ok') {
                console.log(res.data.data);
            }
            else{
                window.location.href='./login'
            }
        })
    }
    else{
        window.location.href='./login'
    }


    return (<>
        <div className="container mx-auto p-10">
            <NavBar />
            <Heading className="pt-10 text-start" text="Profile Info" />
            <div className="inner-container flex md:flex-row lg:flex-row max-sm:flex-col p-10 text-offwhite-100">
                <IDSection username="Roller" level="Regular Member" />
                <div className="rightSection p-10 rounded-md text-left bg-gray-400 drop-shadow-2xl text-offwhite-100">
                    <p><b>UserName: </b> Roller123</p>
                    <p><b>Email: </b> <a href="mailto:">thatroller123@gmail.com</a></p>
                    <p><b>Posts: </b> 1</p>
                    <p><b>Respect: </b> 12</p>
                    <hr className="border border-gray-700 m-10"></hr>
                    <p><b>Personal Text: </b></p><br />
                    <p className="personal-text">Loyality is everything, without loyality we are nothing</p>
                </div>

            </div>
        </div>
    </>);
}

export { ProfileDetails, IDSection };
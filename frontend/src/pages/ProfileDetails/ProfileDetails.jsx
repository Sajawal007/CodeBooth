import React, { useState } from 'react';
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

const decideRank = (respect) => {
    if(respect < 10)
    {
        return "Newbie"
    }
    else if(respect >= 10 && respect < 50)
    {
        return "Regular Member"
    }
    else if(respect >= 50)
    {
        return "Experienced"
    }
}
const ProfileDetails = (props) => {

    const [user, setUserDetails] = useState({});


    const token = window.localStorage.getItem("token");
    if (token) {
        axios.post('http://127.0.0.1:3000/userLogged', { token }).then(res => {
            if (res.data.status == 'ok') {
                const {email, username, password, posts ,respect , personal_text} = res.data.data;
                
                setUserDetails({email: email, username: username, 
                    posts: posts,respect: respect, personal_text: personal_text});
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
        <div className="mx-auto p-10 bg-fav_dark-100">
            <NavBar />
            <Heading className="pt-10 text-start" text="Profile Info" />
            <div className="inner-container flex md:flex-row lg:flex-row max-sm:flex-col p-10 text-offwhite-100">
                <IDSection username={user.username} level={decideRank(user.respect)} />
                <div className="rightSection p-10 rounded-md text-left bg-gray-400 drop-shadow-2xl text-offwhite-100">
                    <p><b>UserName: </b> {user.username}</p>
                    <p><b>Email: </b> <a href="mailto:">{user.email}</a></p>
                    <p><b>Posts: </b>{user.posts}</p>
                    <p><b>Respect: </b>{user.respect}</p>
                    <hr className="border border-gray-700 m-10"></hr>
                    <p><b>Personal Text: </b></p><br />
                    <p className="personal-text">{user.personal_text}</p>
                </div>

            </div>
        </div>
    </>);
}

export { ProfileDetails, IDSection };
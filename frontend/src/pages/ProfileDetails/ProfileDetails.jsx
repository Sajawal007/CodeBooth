import React, { useEffect, useState } from 'react';
import Heading from '../../components/Heading';
import NavBar from '../../components/NavBar';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import Postcard from '../../components/Postcard';
import './ProfileDetails.css'


const IDSection = (props) => {
    const arr=[0];
    if(props.level == "Newbie")
    {
        arr.push(0,0);
    }
    else if(props.level== "Regular Member")
    {
        arr.push(0,0,0,0);
    }
    else if(props.level == "Experienced")
    {
        arr.push(0,0,0,0,0,0,0);
    }
    return (
        <>
        <div className="leftSection bg-gray-400 p-10 rounded-md drop-shadow-2xl mr-20 mb-10">
            <h1 class="text-2xl font-bold italic">♨ {props.username} ♨ </h1>
            <h1 class="font-bold italic">{props.level}</h1>
            <div className="flex flex-row">
            {
                arr.map(i => {
                    return <img src="/star.gif" alt="*"></img>
                })
            }
            </div>
            <a href="/"><img className="mt-10" src='/roller.png' height="100rem" width="100rem" /></a>
        </div>
        </>
    );
}

const SearchSection = (props) =>{
    return(<>
    <div className="leftSection bg-gray-400 p-10 rounded-md drop-shadow-2xl mb-10">
        <h1 className="text-offwhite-100 text-2xl p-2">Enter Keyword</h1>
            <input type="text" className='border-solid border-2 border-offwhite text-black' onChange={(e)=>props.setSearchKey(e.target.value)}/>
        </div>
        </>)
}

const decideRank = (respect) => {
    if (respect < 10) {
        return "Newbie"
    }
    else if (respect >= 10 && respect < 50) {
        return "Regular Member"
    }
    else if (respect >= 50) {
        return "Experienced"
    }
}
const ProfileDetails = (props) => {

    const location = useLocation()
    
    const [posts, setPosts] = useState([]);

    const [user, setUserDetails] = useState({});
    const [mainUser, setMainUserDetails] = useState({});

    const [deletePost, setDeletePost] = useState(null);

    const token = window.localStorage.getItem("token");
    if (location.state) {
        const {email} = location.state;

        useEffect(() => {
            axios.post('http://127.0.0.1:3000/userLogged', { token }).then(res => {
            if (res.data.status == 'ok') {
                const { email, username, password, posts, respect, personal_text } = res.data.data;

                setMainUserDetails({
                    email: email, username: username,
                    posts: posts, respect: respect, personal_text: personal_text
                });
            }
            else {
                window.location.href = './login'
            }})
            axios.post('http://127.0.0.1:3000/fetchuser/' + email, {})
                .then((res) => {
                    console.log(res.data);
                    const { email, username, password, posts, respect, personal_text } = res.data;

                    setUserDetails({
                        email: email, username: username,
                        posts: posts, respect: respect, personal_text: personal_text
                    });
                })
                .catch(error => {
                    console.log(error);
                })

            axios.post('http://127.0.0.1:3000/fetchuserposts/'+email,{})
                .then(res => {
                    setPosts(res.data);
                }).catch(error => {
                    console.log(error);
                })
        },[])
    }
    else if (token) {
        useEffect(()=>{
        axios.post('http://127.0.0.1:3000/userLogged', { token }).then(res => {
            if (res.data.status == 'ok') {
                const { email, username, password, posts, respect, personal_text } = res.data.data;

                setUserDetails({
                    email: email, username: username,
                    posts: posts, respect: respect, personal_text: personal_text
                });
            }
            else {
                window.location.href = './login'
            }})
            console.log(user.email);
            axios.post('http://127.0.0.1:3000/fetchuserposts/'+user.email,{})
            .then(res => {
                setPosts(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    }
    else {
        window.location.href = './login'
    }


    useEffect(()=>{
        function matchID(post){
            return post._id != deletePost;
        }
        let newArr = posts;
        newArr = newArr.filter(matchID);
        console.log(newArr);
        let userCopy = user;
        userCopy.posts = newArr.length;
        setUserDetails(userCopy);
        setPosts(newArr);

    },[deletePost])

    return (<>
        <div className="mx-auto p-10 bg-fav_dark-100 overflow-auto h-screen">
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
                    <p><b>All Posts: </b></p><br />
                    {posts.map(sP => {
                    return <Postcard key= {sP._id} keys={sP._id} email={mainUser.email} email_={sP.email} username={sP.username} title = {sP.title} content={sP.content_} votes={sP.votelist.length} deleteMode={"true"} setDeletePost={setDeletePost}/>
                })}
                </div>
            </div>

        </div>
    </>);
}

export { ProfileDetails, IDSection, SearchSection};
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { IDSection } from "../ProfileDetails/ProfileDetails";
import Postcard from "../../components/Postcard";
import { Link } from "react-router-dom";
import '../ProfileDetails/ProfileDetails.css'
import axios from 'axios';
import NewPost from "../../components/NewPost";


const FeedPage = () => {


    const [user, setUserDetails] = useState({});
    const [newPost, setNewPost]  = useState(null);


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

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        axios.post('http://127.0.0.1:3000/fetchall',{})
    .then(res => {
        setPosts(res.data);
    }).catch(error => {
        console.log(error);
    });
    }, []);

    useEffect(() => {
        newPost && setPosts(prev => [newPost, ...prev])
    }, [newPost])


    return (<>
        <div className="max-sm:h-fit h-full p-5 mx-auto bg-fav_dark-100 overflow-auto">
            <NavBar />
            <div className="flex md:flex-row lg:flex-row max-sm:flex-col p-10 text-offwhite-100">
                <Link to="/profiledetails" state={{"email":user.email}}>
                <IDSection username={user.username} level={decideRank(user.respect)} />
                </Link>
                <div className="rightSection max-sm:w-full p-10 rounded-md text-left bg-gray-400 drop-shadow-2xl text-offwhite-100">
                <NewPost email={user.email} username={user.username} setNewPost={setNewPost}/>
                {posts.map(sP => {
                    return <Postcard key= {sP._id} keys={sP._id} email={user.email} email_={sP.email} username={sP.username} title = {sP.title} content={sP.content_} votes={sP.votelist.length} deleteMode={"false"}/>
                })}

{/* <Postcard username="Roller" title="rust over c++" content="Well most of the startups who have upscaled are now heading for Rust. For the performance perks that comes handy with rust. Also, the data is so high and things are so complex that nobody got time to write garbage collection in C++"/>
                <Postcard username="FarhanAly" title="i like deep learning" content="I like to train Deep Neural Nets on large datasets.++"/> */}
                </div>
            </div>

        </div>
    </>)
}

export default FeedPage;
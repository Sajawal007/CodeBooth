import React, { useState, useEffect } from "react";
import { SearchSection } from "../ProfileDetails/ProfileDetails";
import NavBar from "../../components/NavBar";
import axios from "axios";
import Postcard from "../../components/Postcard";

const SearchAndVote = () =>{

    const [user, setUserDetails] = useState({});
    const [newPost, setNewPost]  = useState(null);

    const [searchKey, setSearchKey] = useState("");
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

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
       axios.post('http://127.0.0.1:3000/fetchall',{})
    .then((res) => {
        setPosts(res.data);
        console.log(res.data);
    }).catch(error => {
        console.log(error);
    });
    }, []);

    return (
        <div className="max-sm:h-fit h-full p-5 mx-auto bg-fav_dark-100 overflow-auto">
            <NavBar />
            <div className="flex flex-col p-10 text-offwhite-100" style={{justifyContent:"center", alignItems:"center"}}>
                 <SearchSection setSearchKey = {setSearchKey}/>
                <div className="rightSection max-sm:w-full p-10 rounded-md text-left bg-gray-400 drop-shadow-2xl text-offwhite-100">
                {posts.filter(post => post.title.toLowerCase().includes(searchKey.toLowerCase())).map(sP => {
                    return <Postcard key= {sP._id} keys={sP._id} email={user.email} email_={sP.email} username={sP.username} title = {sP.title} content={sP.content_} votes={sP.votelist.length} deleteMode={"false"}/>
                })}
                </div>
            </div>

        </div>
    )
}

export default SearchAndVote;
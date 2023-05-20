import React, {useState} from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";

// const newPostStyle = {
//     padding:"0.8rem 10rem 5rem 0rem",
//     width:"100%"
// };

// const titleInput = {
//     padding:"0.6rem 5rem 1rem 0rem",
//     width:"100%"
// };




const NewPost = (props) => {
    const [title,setTitle] = useState("");
    const [content_,setContent] = useState("");
    
    const handlePost = async (e) =>{

        const newPost = {
            email: props.email,
            username: props.username,
            title: title,
            content_: content_,
            votelist: [props.email]
        };
        if(title && content_)
    {
        axios.post('http://127.0.0.1:3000/post', newPost).then((response) => {
            console.log(response)
            props.setNewPost(response.data)
        })
    }
    }
    return <>
        <div className="container flex flex-row m-5 rounded-md border border-solid" style={{backgroundImage:"url(\"email.svg\")"}}>
            <div className="inner-container w-full">
                <div className="flex align-middle p-5">
                    <img src="./roller.png" className="rounded-full mr-2" width="60rem" height="60rem"></img>
                    <Link><p className="mr-2 font-bold text-white">{props.username}</p></Link>
                    <p>what's on you mind?</p>
                </div>
                <div className="flex flex-col pl-5 pr-5 pb-5">
                    <input className="font-bold text-white rounded-lg bg-fav_blue-100 border-solid border-2 border-offwhite-100 mb-3 p-3"  placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)}/>
                    <textarea className="rounded-lg text-offwhite-100 bg-fav_blue-100 border-solid border-2 border-white mb-3 p-5"  placeholder="Explain Briefly" onChange={(e)=>setContent(e.target.value)}/>
                    <Button className="border-solid border-2 border-offwhite-100" text="Post" askResponce={handlePost}/>
                </div>
            </div>
        </div>
    </>
}



export default NewPost;
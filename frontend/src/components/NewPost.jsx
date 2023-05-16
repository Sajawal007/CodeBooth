import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const newPostStyle = {
    padding:"0.8rem 10rem 5rem 0rem",
};

const titleInput = {
    padding:"0.6rem 5rem 1rem 0rem",
};

const handleClick = (event) =>{
    
}

const NewPost = (props) =>{
    return (<>
        <div className="container flex flex-row m-5 rounded-md border border-solid justify-between" style={{ alignItems: "center" }}>
            <div className="inner-container">
                <div className="flex align-middle p-5">
                    <img src="./roller.png" className="rounded-full mr-2" width="60rem" height="60rem"></img>
                    <Link><p className="mr-2 font-bold text-white">{props.username}</p></Link>
                    <p>what's on you mind?</p>
                </div>
                <div className="flex flex-col pl-5 pr-5 pb-5">
                    <input className="mr-2 font-bold text-white rounded-lg bg-fav_blue-100" style={titleInput} placeholder="Enter Title"/>
                    <input className="rounded-lg text-offwhite-100 bg-fav_blue-100" style={newPostStyle} placeholder="Explain Briefly"/>
                    <Button text="Post" askResponce={handleClick}/>
                </div>
            </div>
        </div>
    </>);
}


export default NewPost;
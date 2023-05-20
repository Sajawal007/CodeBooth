import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Postcard = (props) => {

    const[votes, setVotes] = useState(props.votes);
    const[deleteMode, setDeleteMode] = useState(false);

    const handleUp = () =>{
        const str = 'http://127.0.0.1:3000/post/addVote/' + props.email + '/' + props.keys
        
        axios.post(str, {})
        .then(res => {
        
            if(res.data == 'Voted')
            {
                console.log('in');
                setVotes(votes+1);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleDown = () =>{
        const str = 'http://127.0.0.1:3000/post/removeVote/' + props.email + '/' + props.keys
        
        axios.post(str, {})
        .then(res => {
            
            if(res.data == 'Deleted')
            {
                setVotes(votes-1);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
   
    const handleDelete = () =>{
        if(props.email_ == props.email)
        {axios.post('http://127.0.0.1:3000/post/delete/'+props.email_+'/'+props.keys, {})
        .then((res)=>{
            if(res.data == "Post Deleted!")
            {
                props.setDeletePost(props.keys);
            }
        })}
    }

    return (<>
        <div className="container flex flex-row m-5 rounded-md border border-solid justify-between" style={{ alignItems: "center" }}>
            <div className="inner-container">
                <div className="flex align-middle p-5">
                    <img src="./roller.png" className="rounded-full mr-2" width="60rem" height="60rem"></img>
                    <Link to="/profiledetails" state={{"email": props.email_}}><p className="mr-2 font-bold text-white">{props.username}</p></Link>
                    <p>posted this</p>
                </div>
                <div className="flex flex-col pl-5 pr-5 pb-5">
                    <p className="mr-2 font-bold text-white">{props.title}</p>
                    <p className="text-offwhite-100">{props.content}</p>
                </div>
            </div>
            {props.deleteMode == "false"  && <div className="vote pr-5">
                <img src="./triangle.svg" width="20px" height="20px" onClick={handleUp}/>
                <p className="pl-0.5">{votes}</p>
                <img style={{ rotate: "180deg" }} src="./triangle.svg" width="20px" height="20px" onClick={handleDown}/>
            </div> }
            {props.deleteMode == "true"  && <div className="vote pr-5">
                <img src="./delete.svg" width="20rem" height="20rem" onClick={handleDelete}/>
            </div>}
        </div>
    </>)
}

export default Postcard
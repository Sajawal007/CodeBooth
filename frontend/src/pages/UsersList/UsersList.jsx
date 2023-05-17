import React, { useState, useEffect } from "react";
import { IDSection, SearchSection } from "../ProfileDetails/ProfileDetails";
import NavBar from "../../components/NavBar";
import axios from "axios";
import Postcard from "../../components/Postcard";
import { Link } from "react-router-dom";


const UsersList = () =>{

    const [users,setUsers] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    useEffect(()=>{
        axios.post('http://127.0.0.1:3000/fetchallusers',{})
     .then((res) => {
        setUsers(res.data);
     }).catch(error => {
         console.log(error);
     });
     }, []);


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

    return(

        <div className="max-sm:h-fit h-full p-5 mx-auto bg-fav_dark-100 overflow-auto">
            <NavBar />
            <div className="flex flex-col p-10 text-offwhite-100" style={{justifyContent:"center", alignItems:"center"}}>
                 <SearchSection setSearchKey = {setSearchKey}/>
                 {/* {md:grid md:grid-cols-3 sm:grid sm:grid-flow-col }  */}
                <div className="grid md:grid-cols-3 sm:grid-cols-1 justify-center drop-shadow-2xl overflow-auto text-offwhite-100">
                {users.filter(user => user.username.toLowerCase().includes(searchKey.toLowerCase())).map(u => {
                    return <Link to="/profiledetails" state={{"email":u.email}}>
                    <IDSection username={u.username} level={decideRank(u.respect)} />
                    </Link>
                })}
                </div>
            </div>

        </div>
    );

}

export default UsersList
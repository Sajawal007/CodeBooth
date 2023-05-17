import React from 'react';
import Button from './Button';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const signOut = (e) => {
    window.localStorage.removeItem("token");
}

const NavBar = () => {

    const [menuClicked, setMenu] = useState(false);

    return (<>
        <div className="flex flex-row justify-between align-middle">
            <a href="/">
            <img src='/logo-full.png' width="200rem" height="100rem"/>
            </a>
            <div className="flex flex-row">
            <NavLink to="/feed" activeStyle={{ color: "white" }} 
            style={({ isActive, isPending }) => {
                return {
                  fontStyle: isActive ? "italic" : "",
                };
              }}
            >
            <div className="flex flex-col max-sm:hidden mr-8">
                <h className='text-[#566071] font-bold text-lg tracking-wider'>Feed</h>
                <hr className='mt-4'></hr>
            </div>
            </NavLink>
            <NavLink to="/searchandvote" activeStyle={{ color: "blue" }} 
            style={({ isActive, isPending }) => {
                return {
                  fontStyle: isActive ? "italic" : "",
                };
              }}
            >
            <div className="flex flex-col max-sm:hidden mr-8">
            <h className='text-[#566071] font-bold text-lg tracking-wider'>Search&Vote</h>
                <hr className='mt-4'></hr>
            </div>
            </NavLink>
            <NavLink to="/userslist" activeStyle={{ color: "blue" }} 
            style={({ isActive, isPending }) => {
                return {
                  fontStyle: isActive ? "italic" : "",
                };
              }}
            >
            <div className="flex flex-col max-sm:hidden">
            <h className='text-[#566071] font-bold text-lg tracking-wider'>Users</h>
                <hr className='mt-4'></hr>
            </div>
            </NavLink>
            </div>
            <Link to="/login">
            <button>
                <div className="flex flex-row bg-black rounded-lg max-sm:hidden">
                    <Button text="Fin " askResponce={signOut}/>
                    <img src='/log_out.svg' height='30rem' width='30rem'></img>
                </div>
            </button>
            </Link>
            <div className="lg:hidden md:hidden" style={{marginLeft:"70vw"}}>
                {!menuClicked &&
                    <div className="list sm:hidden hover:bg-gray-300 hover:rounded-lg">
                        <button onClick={() => setMenu(!menuClicked)}><img src='/menu-outline.svg' height='50rem' width='50rem'></img></button>
                    </div>
                }
                {menuClicked && <div className="list sm:hidden border rounded-lg">
                    <button className='hover:bg-gray-300 hover:rounded-lg' onClick={() => setMenu(!menuClicked)}><img src='/close.svg' height='50rem' width='50rem'></img></button>
                    <ul className='p-5 bg-gray-400 text-fav_blue-100'>
                        <li className='border-b-4 p-3'><Link to="/feed">Feed</Link></li>
                        <li className='p-3'><Link to="/">Fin.</Link></li>
                    </ul>
                </div>
                }
            </div>
        </div>

    </>)
}

export default NavBar
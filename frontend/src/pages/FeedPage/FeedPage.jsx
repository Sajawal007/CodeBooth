import React from "react";
import NavBar from "../../components/NavBar";
import { IDSection } from "../ProfileDetails/ProfileDetails";
import Postcard from "../../components/Postcard";
import { Link } from "react-router-dom";
import '../ProfileDetails/ProfileDetails.css'

const FeedPage = () => {
    return (<>
        <div className="max-sm:h-fit h-full container p-5 mx-auto bg-fav_dark-100">
            <NavBar />
            <div className="flex md:flex-row lg:flex-row max-sm:flex-col p-10 text-offwhite-100">
                <Link to="/profiledetails">
                <IDSection username="Roller" level="Regular Member" />
                </Link>
                <div className="rightSection max-sm:w-full p-10 rounded-md text-left bg-gray-400 drop-shadow-2xl text-offwhite-100">
                <Postcard username="Roller" title="rust over c++" content="Well most of the startups who have upscaled are now heading for Rust. For the performance perks that comes handy with rust. Also, the data is so high and things are so complex that nobody got time to write garbage collection in C++"/>
                <Postcard username="FarhanAly" title="i like deep learning" content="I like to train Deep Neural Nets on large datasets.++"/>
                </div>
            </div>

        </div>
    </>)
}

export default FeedPage;
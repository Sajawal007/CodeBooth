import React from "react";
import { Link } from "react-router-dom";
const Postcard = (props) => {
    return (<>
        <div className="container flex flex-row m-5 rounded-md border border-solid justify-between" style={{ alignItems: "center" }}>
            <div className="inner-container">
                <div className="flex align-middle p-5">
                    <img src="./roller.png" className="rounded-full mr-2" width="60rem" height="60rem"></img>
                    <Link><p className="mr-2 font-bold text-white">{props.username}</p></Link>
                    <p>posted this</p>
                </div>
                <div className="flex flex-col pl-5 pr-5 pb-5">
                    <p className="mr-2 font-bold text-white">{props.title}</p>
                    <p className="text-fade_text-100">{props.content}</p>
                </div>
            </div>
            <div className="vote pr-5">
                <img src="./triangle.svg" width="20rem" height="20rem" />
                <p className="pl-0.5">{2}</p>
                <img style={{ rotate: "180deg" }} src="./triangle.svg" width="20rem" height="20rem"
                />
            </div>
        </div>
    </>)
}

export default Postcard
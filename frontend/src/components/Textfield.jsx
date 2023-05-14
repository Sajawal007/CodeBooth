import React from 'react';


const Textfield = (props) => {
    return (
        <>
            <div className='textAlign p-3'>
                <label for={props.id} className="text-offwhite-100">{props.text}</label>
                <div className="flex flex-row border border-gray-300 text-gray-400 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <img src={props.src} alt={props.alt} width={props.width} height={props.height}></img>
                    <input className="bg-gray-700 pl-2" id={props.id} type={props.type} placeholder={props.placeholder} onChange={(e)=> {props.setValue(e.target.value)}}/>
                </div>
            </div>
        </>
    );
}
export default Textfield;
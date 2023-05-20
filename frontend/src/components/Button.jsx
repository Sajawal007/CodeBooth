import React from 'react';

const Button = (props) => {
    return(<>
        <button className='bg-black text-white rounded-lg p-3 tracking-wider transition-all ease-linear enabled:active:scale-95' onClick={(e) => props.askResponce(e)}>
        {props.text}
        </button>
    </>
    );
}
export default Button
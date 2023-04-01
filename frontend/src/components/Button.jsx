import React from 'react';

const Button = (props) => {
    return(<>
        <button className='bg-black text-white rounded-lg p-3 tracking-wider'>
        {props.text}
        </button>
    </>
    );
}
export default Button
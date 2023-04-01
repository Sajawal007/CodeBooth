import React from 'react'


const Heading = (props) => {
    var style_str = "pt-2 mb-4 text-4xl font-extrabold leading-none tracking-tight text-offwhite-100 md:text-5xl lg:text-6xl dark:text-offwhite-100" + props.className
    return (
        <h1 className={style_str}>{props.text}</h1>
    );
}

export default Heading;
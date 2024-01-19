import React, { useState, useEffect } from 'react';
import './vegetable.scss'

function Vegetable({name}) {
    const [state, setState] = useState('');

    useEffect(() => {
       ;
    }, []);

    return (
        <>
           <div className='vegetable'>
            <p>{name}</p>
           </div>
        </>
    )
}

export default Vegetable;
import React, { useState, useEffect } from 'react';
import './vegetable.scss'

function Vegetable(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <>
           <div className='vegetable'>
            O
           </div>
        </>
    )
}

export default Vegetable;
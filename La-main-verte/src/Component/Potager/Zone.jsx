import React, { useState, useEffect } from 'react';
import './Zone.scss'

function Zone({nom}) {
    const [name, setState] = useState("");



    useEffect(() => {
        return () => {

        }
    }, []);


    

    return (
        <>
           <div className='zone' >
            <h3>{nom}</h3>
           </div>
        </>
    )
}

export default Zone;
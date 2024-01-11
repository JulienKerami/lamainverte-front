import React, { useState, useEffect } from 'react';

function Home(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <>
           <h1>Home</h1>
        </>
    )
}

export default Home;
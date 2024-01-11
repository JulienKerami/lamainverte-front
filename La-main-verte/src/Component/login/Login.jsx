import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

import './login.scss'

function Login(props) {
    const [error, setError] = useState("")

    let navigate = useNavigate()

    // async function handleSubmit(e) {
    //     e.preventDefault()
        
    // const user = await fetchUser(e).then((res) => {
        
       
    //     if(res.statusText == "OK") {
            
    //         console.log(res.data);
    //         const authentification = async () => {await localStorage.setItem('name', res.data );
    //         console.log(localStorage.data);
    //         navigate('/')}
    //         authentification()
    //         return
    //         }
    //     else ( 
    //         setError(res.response.data))})
   

    // }

    return (
        <>
           <form className='login'action="submit" onSubmit={(e) => handleSubmit(e)}>
            {error?<p style={{color:"red"}}>{error}</p>: null}

            <input type="text" placeholder='email' />
            <input type="password" placeholder='mot de passe' />
            <button>connexion</button>
           </form>
        </>
    )
}

export default Login;
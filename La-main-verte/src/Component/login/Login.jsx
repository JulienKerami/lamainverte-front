import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

import './login.scss'
import { fetchUser } from '../Apicall/Apicall';

function Login(props) {
    const [error, setError] = useState("")

    let navigate = useNavigate()

    async function handleSubmit(e) {
     
        let userInfos = {email: e.target[0].value,
                        password:e.target[1].value }

       

    const user = await fetchUser(userInfos).then((res) => {
        
       
        if(res.statusText == "OK") {
            
            console.log(res.data.token);
            const authentification = async () => { localStorage.setItem('name', res.data.token );
            console.log(localStorage.data);
            navigate('/')}
            authentification()
            window.location.reload();
            return
            }
        else ( 
            setError(res.response.data))})
    }

    return (
        <>
           <form className='login'action="submit" onSubmit={(e) =>{e.preventDefault(); handleSubmit(e)}}>
            {error?<p style={{color:"red"}}>{error}</p>: null}

            <input type="text" placeholder='email' />
            <input type="password" placeholder='mot de passe' />
            <button>connexion</button>
           </form>
        </>
    )
}

export default Login;
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

         console.log(userInfos);

    const user = await fetchUser(userInfos).then((res) => {
        
       console.log(res);

        if(res.status == 200) {

            console.log(res);
            console.log(res.data.token);
            const authentification = async () => { localStorage.setItem('name', res.data.token );
            console.log(localStorage.data);
            navigate('/potager')}
            authentification()
            window.location.reload();
            return
            }
        else ( 
            setError("email ou mot de passe invalide"))})

        console.log(user);
    }

    

    return (
        <><section className='form-container'>
           <form className='login'action="submit" onSubmit={(e) =>{e.preventDefault(); handleSubmit(e)}}>
            {error?<p style={{color:"red", fontSize:"1rem"}}>{error}</p>: null}

            <input type="text" placeholder='email' />
            <input type="password" placeholder='mot de passe' />
            <button>connexion</button>
           </form>
           </section>
        </>
    )
}

export default Login;
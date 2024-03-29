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
        
       console.log(res);

        if(res.status == 200) {

           
            const authentification = async () => { localStorage.setItem('name', res.data.token );
         
            navigate('/potager')}
            authentification()
            window.location.reload();
            return
            }
        else ( 
            setError("email ou mot de passe invalide"))})

    }

    

    return (
        <><section className='form-container'>
           <form className='login'action="submit" onSubmit={(e) =>{e.preventDefault(); handleSubmit(e)}}>
            {error?<p style={{color:"red", fontSize:"1rem"}}>{error}</p>: null}

            <input type="text" placeholder='email' />
            <input type="password" placeholder='mot de passe' />
            <button className="button-login">connexion</button>
           </form>
           </section>
        </>
    )
}

export default Login;
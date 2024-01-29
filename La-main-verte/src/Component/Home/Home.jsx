import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import './Home.scss'

function Home(props) {
    const [state, setState] = useState('');

    useEffect(() => {
       decodeJWT()
    }, []);

    const [userInfos, setUserInfos] = useState({id: "", lastname: ""});

    const decodeJWT = () => {
        const token = localStorage.getItem('name')
        if(token){
            const decodedToken = jwtDecode(token)
            console.log(decodedToken);
            
            setUserInfos({id: decodedToken.id, lastname : decodedToken.lastname})
        }
       
        }

    return (

        <>
        <section className='home'>
           {localStorage.name?
           <h2 className='WelcomeUser'>Bienvenue {userInfos.lastname}</h2>:null}
           <h2 className='home__title'>Faites pousser vos légumes en toute sérénité</h2>
           <p className='home__paragraph'>Quand semer? Quand récolter? Comment entretenir son potager?
            Des semis à la récolte, la main verte vous aide à chaque étape
           </p>

           {localStorage.name?null:<><Link to='/signin' className='home__button'>Inscription</Link></>}

           <h3 className='home__subtitle'>une to-do list personalisé</h3>
           <h3 className='home__subtitle'>une vue d'ensemble de votre potager</h3>
           </section>
        </>
    )
}

export default Home;
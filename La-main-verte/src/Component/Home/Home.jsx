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
           <h2 className='home_texte1'>Faites pousser vos légumes en toute sérénité. {userInfos.lastname}</h2>:null}
           <p className='home_texte2'>Quand semer ? Quand récolter ? Comment entretenir son potager ? Des semis à la récolte, la main verte vous aide à chaque étape.</p>
           <Link to='/signin' className='home__inscription-button'>Inscription</Link>
           <img src="/src/assets/fiche.png" alt="icone fiche" className='icone_fiche' /> 
           <p className='home_texte3'>une to-do list personalisé</p>
           <img src="/src/assets/camera.png" alt="icone camera" className='icone_camera' /> 
           <p className='home_texte3'>une vue d'ensemble de votre potager</p>
           </section>
        </>
    )
}

export default Home;
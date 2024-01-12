import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import './Home.scss'

function Home(props) {
    const [state, setState] = useState('');

    useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <>
        <section className='home'>
           <h2 className='home__title'>Faites pousser vos légumes en toute sérénité</h2>
           <p className='home__paragraph'>Quand semer? Quand récolter? Comment entretenir son potager?
            Des semis à la récolte, la main verte vous aide à chaque étape
           </p>

           <Link to='/signin' className='home__button'>Inscription</Link>

           <h3 className='home__subtitle'>une to-do list personalisé</h3>
           <h3 className='home__subtitle'>une vue d'ensemble de votre potager</h3>
           </section>
        </>
    )
}

export default Home;
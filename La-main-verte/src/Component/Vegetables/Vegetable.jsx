import React, { useState, useEffect } from 'react';
import './vegetable.scss'
import { switchVegeInfoModale } from '../store/slices/vegetableSlice';
import { useDispatch, useSelector } from 'react-redux'


function Vegetable({name, plant}) {
    const [state, setState] = useState('');

    useEffect(() => {
       ;
    }, []);

    const vegetableModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const dispatch = useDispatch()

    const switchModale = () => {
        console.log(plant);
        dispatch(switchVegeInfoModale(!vegetableModaleSwitch))
        console.log(vegetableModaleSwitch);
    }

    return (
        <>
           <div className='vegetable' onClick={(e) =>{switchModale()}}>
            <p></p>
           </div>
        </>
    )
}

export default Vegetable;
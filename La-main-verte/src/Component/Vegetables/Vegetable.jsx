import React, { useState, useEffect } from 'react';
import './vegetable.scss'
import { switchVegeInfoModale, selectVegetable } from '../store/slices/vegetableSlice';
import { useDispatch, useSelector } from 'react-redux'


function Vegetable({name, plant}) {
    const [state, setState] = useState('');

    useEffect(() => {
       ;
    }, []);

    const vegetableModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const zoneValue = useSelector((state)=> state.zones.value)
    const dispatch = useDispatch()

    const switchModale = () => {
        dispatch(switchVegeInfoModale(true))
        
        const zoneTofind = zoneValue.find((e) => e.id == plant.zone_id)
        const vegetableToFind = zoneTofind.vegetable.find((e) => e.id == plant.id)
        console.log(vegetableToFind);
        dispatch(selectVegetable(vegetableToFind))
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
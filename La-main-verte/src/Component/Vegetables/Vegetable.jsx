import React, { useState, useEffect } from 'react';
import './vegetable.scss'
import { switchVegeInfoModale, selectVegetable, selectFamily } from '../store/slices/vegetableSlice';
import { useDispatch, useSelector } from 'react-redux'



function Vegetable({name, plant}) {
    const [state, setState] = useState('');

    useEffect(() => {
       ;
    }, []);
    const SelectedVegetable = useSelector((state) => state.vegetable.vegetableSelected )
    const vegetableModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const vegetableFamily = useSelector((state) => state.vegetable.familyValue)
    const zoneValue = useSelector((state)=> state.zones.value)
    const dispatch = useDispatch()

    const switchModale = () => {
       
        
        const zoneTofind = zoneValue.find((e) => e.id == plant.zone_id)
        const vegetableToFind = zoneTofind.vegetable.find((e) => e.id == plant.id)
        console.log(vegetableToFind);
        dispatch(selectVegetable(vegetableToFind))
        
        const selectedFamily = vegetableFamily.find((e) => e.id == vegetableToFind.family_id)

        console.log(selectedFamily);
        dispatch(selectFamily(selectedFamily))

        dispatch(switchVegeInfoModale(true))
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
import React, { useState, useEffect } from 'react';
import './vegetable.scss'
import { switchVegeInfoModale, selectVegetable, selectFamily } from '../store/slices/vegetableSlice';
import { useDispatch, useSelector } from 'react-redux'



function Vegetable({name, plant}) {
    const [FamilyName, setFamilyName] = useState('');
    const [vegetableVariety, setVegetableVariety] = useState('')
    const SelectedVegetable = useSelector((state) => state.vegetable.vegetableSelected )
    const vegetableModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const vegetableFamily = useSelector((state) => state.vegetable.familyValue)
    const zoneValue = useSelector((state)=> state.zones.value)
    const dispatch = useDispatch()

    useEffect(() => {
       
      
        
        const family = vegetableFamily.find((e) => e.id === plant.family_id )
        setTimeout(()=> {
          
            if(family.name === "Pomme de terre")
            {
                setFamilyName("pomme de terre")}

            else if(family.name === "Blette / bette")
            {setFamilyName("blette")}

            else if (family.name === "Ail de Printemps")
            {setFamilyName('ail')}
           
           
            else {setFamilyName(family.name.toLowerCase())}
            
        }, "1")
        

    }, [vegetableFamily, zoneValue]);


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
            
           {FamilyName? <img  src={`image-graphiste/imglegumes/legume-${FamilyName}-200.webp`} alt={`${FamilyName}`} className='vegetableImg' />:null }
           <p>{FamilyName}</p>
           </div>
        </>
    )
}

export default Vegetable;
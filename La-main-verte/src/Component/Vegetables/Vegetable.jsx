import React, { useState, useEffect } from 'react';
import './vegetable.scss'
import { switchVegeInfoModale, selectVegetable, selectFamily } from '../store/slices/vegetableSlice';
import { useDispatch, useSelector } from 'react-redux'




function Vegetable({keyIndex ,name, plant}) {
    const [FamilyName, setFamilyName] = useState('');
    const [vegetableVariety, setVegetableVariety] = useState('')
    const SelectedVegetable = useSelector((state) => state.vegetable.vegetableSelected )
    const vegetableModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const vegetableFamily = useSelector((state) => state.vegetable.familyValue)
    const zoneValue = useSelector((state)=> state.zones.value)
    const dispatch = useDispatch()

    
    useEffect(() => {
       
        
      
        const family = vegetableFamily.find((e) => e.id === plant.family_id )
        family?setTimeout(()=> {
            
            if(family.name === "Pomme de terre")
            {
                setFamilyName("pomme de terre")}

            else if(family.name === "Blette / bette")
            {setFamilyName("blette")}

            else if (family.name === "Ail de Printemps")
            {setFamilyName('ail')}

            else if (family.name === "Potirron")
            {setFamilyName('potiron')}
           
           
            else {setFamilyName(family.name.toLowerCase())}
            
        }, "1"): null
        
      
    }, [vegetableFamily, zoneValue]);



    const switchModale = () => {
       
       
        const zoneTofind = zoneValue.find((e) => e.id == plant.zone_id)
      
        const vegetableToFind = zoneTofind.vegetable.find((e) => e.id == plant.id)
      
        dispatch(selectVegetable(vegetableToFind))
        
        const selectedFamily = vegetableFamily.find((e) => e.id == vegetableToFind.family_id)

      
        dispatch(selectFamily(selectedFamily))

        dispatch(switchVegeInfoModale(true))
    }

    return (
        <>
           <div className='vegetable' onClick={(e) =>{switchModale()}}>
            

            {FamilyName?<>
            <div className='vegetableVisuals'>
                <img  src={`image-graphiste/imglegumes/${plant.Family.img_small}`} alt="logo laMainVerte" className='vegetableImg' /> 
                <div className='progressBar'>

                {/* Affichage conditionnel de la progressBar si le légume a des semis */}
                {plant.task.length == 3?<>
                
                {plant.status_code == 2 || plant.status_code == 4 || plant.status == null?<span className='barSemi'></span>:null}
                {plant.status_code == 4 || plant.status == null?<span className='barPlant'></span>:null}
                {plant.status == null? <span className='barHarvest'></span>: null}</>:null }   
                
                {/* Affichage conditionnel de la progressBar si le légume n'a pas de semiss */}
                {plant.task.length == 2?<>
                
                {plant.status_code == 4 || plant.status == null?<span className='barPlant'></span>:null}
                {plant.status == null? <span className='barHarvest'></span>: null}</>:null }  

            
    {/* 
                    {plant.status == 2 && plant.task[2]?<span className='barSemi'></span>:null }

                    {plant.task[1].status_code == 2? <span className='barPlant'></span>:null}

                    {plant.task[2]?<>{plant.task[2].status_code == 2 ? <span className='barHarvest'></span>: null}</>:null}  */}

                    </div>
            </div></> 
            :null }
                <p>{FamilyName}</p>
        </div>
        </>
    )
}

export default Vegetable;
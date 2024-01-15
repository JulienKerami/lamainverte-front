import  { useState} from 'react';
import Zone from './Zone';
import { zoneArray } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux'
import  {addZone}  from '../store/slices/zonesSlice'
import "./Potager.scss"



function Potager(props) {
    const [zones, setZone] = useState(zoneArray);
    const dispatch = useDispatch()
    const zoneValue = useSelector((state)=> state.zones)
    
    console.log(zoneValue);
 
    
    const AddZoneHandle = () => {
      console.log('Une nouvelle zone à été ajoutée');
  }

    return (
     <>
    <h3>Potager</h3>

    <section className='zone-container'>
        {zones.map((zone, index) => (
          <Zone key={index} nom={zone.name} />
        ))}
    </section>
    
    <section className='zone-container'>
       <button className='zoneToAdd' onClick={()=> AddZoneHandle()}>+</button>  
    </section>



  </>
    )
}

export default Potager;
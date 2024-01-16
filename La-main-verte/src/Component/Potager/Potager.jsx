import  { useState, useEffect} from 'react';
import Zone from './Zone';
import { zoneArray } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux'
import  {addZone, editZone}  from '../store/slices/zonesSlice'
import { jwtDecode } from 'jwt-decode'
import "./Potager.scss"
import Vegetable from '../Vegetables/Vegetable';
import { createZone } from '../Apicall/Apicall';



function Potager(props) {
    const [zones, setZone] = useState(zoneArray);

    const [zoneModale, setZoneModale] = useState(false)
    const dispatch = useDispatch()
    const zoneValue = useSelector((state)=> state.zones.value)
    

    useEffect(() => {
      
  
      dispatch(editZone(zones))
      console.log(zoneValue);
    }, []);



    const AddZoneHandle = (e) => {
      
      console.log('Une nouvelle zone à été ajoutée');
      const zoneName = e.target.form[0].value
      
      setZoneModale(false)
      const token = localStorage.getItem('name')
        const decodedToken = jwtDecode(token)
        console.log(decodedToken.id);
        createZone()
  }



    return (
     <>
    <h3 className='title'>Potager</h3>

    <section className='zone-container'>
        {zoneValue.map((zone, index) => (
          <Zone key={index} nom={zone.name} />
        ))}
    </section>
    
    <section className='zone-container'>
    {zoneModale?<div className='zoneModale'>
      <form className='ModalForm' action="">
        <input className='formInput'  placeholder='Nom de zone' type="text" />
        <div className='ModalButtons'>
        <button type='submit' onClick={(e) => {e.preventDefault(); AddZoneHandle(e)}}>valider</button>
        <button onClick={(e)=>{e.preventDefault(); setZoneModale(false)}} >annuler</button>
        </div>
      </form>
    </div>:null}
       <button className='zoneToAdd' onClick={()=> setZoneModale(true)}>+</button>  
    </section>
  </>
    )
}

export default Potager;
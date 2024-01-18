import  { useState, useEffect} from 'react';
import Zone from './Zone';
import { zoneArray } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux'
import  zonesSlice, {addZone, editZone}  from '../store/slices/zonesSlice'
import { jwtDecode } from 'jwt-decode'
import "./Potager.scss"
import Vegetable from '../Vegetables/Vegetable';
import { GetAllZones, createZone } from '../Apicall/Apicall';



function Potager(props) {
    // const [zones, setZone] = useState(zoneArray);

    const [zoneModale, setZoneModale] = useState(false)
    const [sameNameModale, setSameNameModale] = useState(false)
    const [emptyNameModale, setEmptyNameModale] = useState(false)
    const dispatch = useDispatch()
    const zoneValue = useSelector((state)=> state.zones.value)
    

    useEffect( () => {
      GetZonesFromBDD()
      
    
    }, []);


    const GetZonesFromBDD = async () => {
      
      const token = localStorage.getItem('name')                                  // On récupère l'ID de l'utilisateur avec JWT token
      const decodedToken = jwtDecode(token)                       
      const userId = decodedToken.id

      const zones =  await GetAllZones(userId)       
      console.log(zones.data);                                        
      dispatch(editZone(zones.data))
    }



    const AddZoneHandle = async (e) => {
      
      
      console.log('Une nouvelle zone à été ajoutée');
      const name = e.target.form[0].value
      if(name ==="") {setEmptyNameModale(true); return}
      const searchForSameName = zoneValue.find((e) => e.name === name)
      if(searchForSameName) {
        setSameNameModale(true)
        return}
        setSameNameModale(false)
      setZoneModale(false)

      const token = localStorage.getItem('name')       // On récupère l'ID de l'utilisateur avec JWT token
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.id

      const zonecreated = await createZone( userId, name)
      console.log(zonecreated.data);
      dispatch(addZone(zonecreated.data))

  }



    return (
    <>
     {localStorage.name?<>
    <main className='potager-container'> 
    <h2 className='title'>Potager</h2>
    <section className='zone-container'>
      {zoneValue?<>{zoneValue.map((zone, index) => (
        <Zone key={index} nom={zone.name} id={zone.id} />
        ))}</>:null}
    </section>
    
    <section className='zone-container'>
    {zoneModale?<div className='zoneModale'>
      <form className='ModalForm' action="">
        {sameNameModale?<><span className='sameNameMessage'>Vous avez déja une zone à ce nom</span></>:null}
        {emptyNameModale?<><span className='sameNameMessage'> Au moins une lettre?</span></>:null}
        <input className='formInput'  placeholder='Nom de zone' type="text" />
        <div className='ModalButtons'>
        <button type='submit' onClick={(e) => {e.preventDefault(); AddZoneHandle(e)}}>valider</button>
        <button onClick={(e)=>{e.preventDefault(); setZoneModale(false);setSameNameModale(false) }} >annuler</button>
        </div>
      </form>
    
    </div>:null}
       <button className='zoneToAdd' onClick={()=> setZoneModale(true)}>+</button>  
    </section>
    </main>
  </>:<><h3>veuillez vous créer un compte</h3></>}
    </>)
}

export default Potager;
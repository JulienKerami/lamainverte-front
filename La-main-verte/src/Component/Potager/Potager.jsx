import  { useState, useEffect} from 'react';
import Zone from './Zone';
import { zoneArray } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux'
import {addZone, editZone}  from '../store/slices/zonesSlice'
import { jwtDecode } from 'jwt-decode'
import "./Potager.scss"
import Vegetable from '../Vegetables/Vegetable';
import { GetAllZones, createZone, getFamily } from '../Apicall/Apicall';
import { addFamily } from '../store/slices/vegetableSlice';
import { switchVegetableModale } from '../store/slices/vegetableSlice';



function Potager(props) {
    //

    const zoneValue = useSelector((state)=> state.zones.value)
    const vegetableSwitch = useSelector((state) => state.vegetable.switch)
    const vegetableFamily = useSelector((state) => state.vegetable.familyValue)
    const dispatch = useDispatch()

    const [zoneModale, setZoneModale] = useState(false)
    const [sameNameModale, setSameNameModale] = useState(false)
    const [emptyNameModale, setEmptyNameModale] = useState(false)
    const [addVarietyModale, setAddVarietyModale] = useState(false)
    const [addVegetableModale, setAddVegetableModale] = useState(false)
  
    const [oneFamily, setOneFamily] = useState("")
    const [family, setFamily] = useState([])
    const [croissance, setCroissance] = useState("")
    

    useEffect( () => {
     const Data = GetZonesFromBDD()
     getFamilies()
    }, []);

    useEffect(() => {
      setAddVarietyModale(vegetableSwitch);
      console.log(vegetableFamily);
      setFamily(vegetableFamily)
    }, [vegetableSwitch])

    useEffect(()=> {
      console.log(family);
    }, [family])



    const getFamilies = async () => {
      const legumes = await getFamily()
      console.log(legumes.data);
      let legumesArray = legumes.data
      dispatch(addFamily(legumesArray))
      
      }

    const GetZonesFromBDD = async () => {
      
      const token = localStorage.getItem('name')                                  // On récupère l'ID de l'utilisateur avec JWT token
      const decodedToken = jwtDecode(token)                       
      const userId = decodedToken.id

      const zones =  await GetAllZones(userId)       
      console.log(zones.data.zone);                                        
      dispatch(editZone(zones.data.zone))
    }

    const AddZoneHandle = async (e) => {
      
      
      console.log('Une nouvelle zone à été ajoutée');
      const name = e.target.form[0].value
      if(name ==="") {setEmptyNameModale(true); return}
      
      if(zoneValue){
      const searchForSameName = zoneValue.find((e) => e.name === name)
      if(searchForSameName) {
        setSameNameModale(true)
        return}
        setSameNameModale(false)
        setZoneModale(false)
      }
      const token = localStorage.getItem('name')       // On récupère l'ID de l'utilisateur avec JWT token
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.id

      const zonecreated = await createZone( userId, name)
      console.log(zonecreated);
      dispatch(addZone(zonecreated.data))

  }

    const addVegetable = async (e) => {
      console.log(e.target.textContent);

      setOneFamily(e.target.textContent)
      const vegetable = vegetableFamily.find((element)=> element.name === e.target.textContent)
      console.log(vegetable);
      setAddVegetableModale(true)
    }
   


    return (
    <>
     {localStorage.name?<>
    <main className='potager-container'> 
      <h2 className='title'>Potager</h2>


      {vegetableSwitch?<><div className='vegetableModale'>
        <div className='family-container'>
          {family.map((e)=> {return(
          <>
          <button className='family' onClick={(e) => {e.preventDefault(); dispatch(switchVegetableModale(false)); addVegetable(e)}}>
            {e.name}
            </button>
          </>
          )})}
        </div>
          <div className='validation'>
            <button onClick={(e) => {dispatch(switchVegetableModale(false))}}>fermer</button>
          </div>
        </div></>:null}


      {addVegetableModale?<><div className='vegetableModale'>
        <form action="submit" className='addVegetableForm'>
            <label htmlFor="family">légume</label>
            <input name='family' type="text" value={oneFamily} placeholder='' onChange={(e) => setOneFamily(e.target.value)} />
            <label htmlFor="croissance">temps de croissance</label>
            <input name="croissance" type="text" placeholder=''/>
            <label htmlFor=""></label>
            <input type="text" />
        </form>
        </div></>:null}


      <section className='zone-container'>
        {zoneValue?<>{zoneValue.map((zone, index) => (
          <Zone key={index} nom={zone.name} id={zone.id} plant={zone.vegetable} />
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
      {vegetableSwitch||addVegetableModale? null: <><button className='zoneToAdd' onClick={()=> setZoneModale(true)}>+</button></>}  
      </section>
    </main>
  </>:<><h3>veuillez vous créer un compte</h3></>}
    </>)
}

export default Potager;
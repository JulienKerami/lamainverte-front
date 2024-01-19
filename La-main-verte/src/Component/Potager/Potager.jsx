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
    const [dateArray, setDateArray] = useState([])

    const [startDateHarvest, setStartDateHarvest] = useState("2024-11-05")
    const [endDateHarvest, setEndDateHarvest] = useState("2024-11-05")
    const [startDateSeeding, setStartDateSeeding] = useState("")
    const [endDateSeeding, setEndDateSeeding] = useState("")
    const [startDatePlanting, setStartDatePlanting] = useState("2024-11-05")
    const [endDatePlanting, setEndDatePlanting] = useState("2024-11-05")
 
    useEffect( () => {
     const Data = GetZonesFromBDD()
     getFamilies()
    }, []);

    useEffect(() => {
      setAddVarietyModale(vegetableSwitch);
      
      setFamily(vegetableFamily)
    }, [vegetableSwitch])

    useEffect(()=> {
      
    }, [family])



    const getFamilies = async () => {
      const legumes = await getFamily()
     
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
      const vegetable = vegetableFamily.find((element)=> element.name === e.target.textContent) // recupère le vegetable grâce au nom
      console.log(vegetable);

    
      let date = new Date()
      let year = date.getFullYear()
     
      if(vegetable.start_date_day_seeding)
      {
        const startSeedingDate = "2024-03-22"
        //`${vegetable.start_date_day_seeding }/${vegetable.start_date_month_seeding}/${year}`
        const endSeedingDate= "2024-04-12"
        // `${vegetable.end_date_day_seeding}/${vegetable.end_date_month_seeding}/${year}`
        console.log(startSeedingDate);
        // DateArray.push({startSeedDate:startSeedingDate, endSeedDate: endSeedingDate })

      }

      const startPlantingdDate = "2024-11-04"
             //`${vegetable.start_date_day_planting}/${vegetable.start_date_month_planting}/${year}`
      const endPlantingDate = "2024-11-05"
      //`${vegetable.end_date_d2024-planting}/${vegetable.end_date_month_planting}/${year}`

     

      const startRecoltingDate = "2024-05-04"
      // `${vegetable.start_date_day_harvest}/${vegetable.start_date_month_harvest}/${year}`
      const endRecoltingDate = "2024-06-04"
      // `${vegetable.end_date_day_harvest}/${vegetable.end_date_month_harvest}/${year}`

      // DateArray.push({startPlantDate: startPlantingdDate, endPlantDate: endPlantingDate },{startRecoltDate: startRecoltingDate, endRecoltDate: endRecoltingDate })

      // setDateArray(DateArray)

      
 
        
      

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
            <label htmlFor="">Légume :
            <input  type="text" value={oneFamily} placeholder='' onChange={(e) => setOneFamily(e.target.value)} />
            </label>
           
            {startDateSeeding?<> <label htmlFor="seeding">Semage (debut/fin): <div className='creneau' >
              <input type="date" value={startDateSeeding} onChange={(e)=> setStartDateHarvest(e.target.value)} />
              <input type="date" value={endDateSeeding} onChange={(e)=> setEndDateSeeding(e.target.value)}/>
              </div> 
              </label></>:null}
              <label htmlFor="seeding">plantation (debut/fin): 
              <div className='creneau' >
                <input type="date" value={startDatePlanting} onChange={(e)=> setStartDatePlanting(e.target.value)} />
                <input type="date" value={endDatePlanting} onChange={(e)=> setEndDatePlanting(e.target.value)}/>
              </div>
              </label>
              <label htmlFor="seeding">recolte (debut/fin): 
              <div className='creneau' >
                <input type="date" value={startDateHarvest} onChange={(e)=> setStartDateHarvest(e.target.value)}/>
                <input type="date" value={endDateHarvest} onChange={(e)=> setEndDateHarvest(e.target.value)}/>
              </div>
              </label>
            <button onClick={(e) => {e.preventDefault(); setAddVegetableModale(false)}}>fermer</button>
        <button>ajouter un plant</button>
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
  </>:<><h3>veuillez vous créer un compte :)</h3></>}
    </>)
}

export default Potager;
import  { useState, useEffect} from 'react';
import Zone from './Zone';
import { zoneArray } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux'
import {addZone, editZone}  from '../store/slices/zonesSlice'
import { jwtDecode } from 'jwt-decode'
import "./Potager.scss"
import Vegetable from '../Vegetables/Vegetable';
import { GetAllZones, createZone, getFamily, createVegetable } from '../Apicall/Apicall';
import { addFamily } from '../store/slices/vegetableSlice';
import { switchVegetableModale } from '../store/slices/vegetableSlice';
import { Audio } from 'react-loader-spinner'



function Potager(props) {
    //

    const zoneValue = useSelector((state)=> state.zones.value)
    const vegetableSwitch = useSelector((state) => state.vegetable.switch)
    const vegetableFamily = useSelector((state) => state.vegetable.familyValue)
    const selectedZoneId = useSelector((state) => state.zones.zoneId)
    const vegetableModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const dispatch = useDispatch()

    //States pour gérer les modales
    const [zoneModale, setZoneModale] = useState(false)
    const [sameNameModale, setSameNameModale] = useState(false)
    const [emptyNameModale, setEmptyNameModale] = useState(false)
    const [addVarietyModale, setAddVarietyModale] = useState(false)
    const [addVegetableModale, setAddVegetableModale] = useState(false)
    const [invalidVegetableFormModale, setInvalidVegetableFormModale] = useState(false)
    const [VegetableFormError, setVegetableFormError] = useState("")
  
    //States pour informations sur une famille de légume//
    const [oneFamily, setOneFamily] = useState('')
    const [oneVariety, setOneVariety] = useState("")
    const [depth, setDepth] = useState('')
    const [exposure, setExposure] = useState('')
    const [rowSpacing, setRowSpacing] = useState("")
    const [spacing, setSpacing] = useState(0)
    const [soilType, setSoilType] = useState("")
    const [family, setFamily] = useState([])
   
    //States pour gérer les dates d'un plant
    const [startDateSeeding, setStartDateSeeding] = useState("2024-11-05")
    const [endDateSeeding, setEndDateSeeding] = useState("2024-11-06")
    const [startDatePlanting, setStartDatePlanting] = useState("2024-11-05")
    const [endDatePlanting, setEndDatePlanting] = useState("2024-11-05")
    const [startDateHarvest, setStartDateHarvest] = useState("2024-11-05")
    const [endDateHarvest, setEndDateHarvest] = useState("2024-11-05")
   

    const [growthTime, setGrowthTime] = useState(30)
    const [emergenceTime, setEmergenceTime] = useState(20)
 
    useEffect( () => {
     const Data = GetZonesFromBDD()
     getFamilies()
    }, []);

    useEffect(() => {
      setAddVarietyModale(vegetableSwitch);
      
      setFamily(vegetableFamily)
    }, [vegetableSwitch])



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
      if(name ==="") {setEmptyNameModale(true)
        setSameNameModale(false); return}
      
      if(zoneValue){
      const searchForSameName = zoneValue.find((e) => e.name === name)
      if(searchForSameName) {
        setSameNameModale(true)
        setEmptyNameModale(false)
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
      
      setOneFamily(e.target.textContent)
      
      const vegetable = vegetableFamily.find((element)=> element.name === e.target.textContent) // recupère le vegetable grâce au nom
      console.log(vegetable);
      setDepth(vegetable.depth)
      setExposure(vegetable.exposure)
      setRowSpacing(vegetable.row_spacing)
      setSoilType(vegetable.soil_type)
      setSpacing(vegetable.spacing)

    
      let date = new Date()
      let year = date.getFullYear()
     
      if(vegetable.start_date_seeding)
      {

        const startSeedingDate = start_date_seeding
        
        const endSeedingDate= "2024-04-12"
        // `${vegetable.end_date_day_seeding}/${vegetable.end_date_month_seeding}/${year}`
       
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
   
    // const DateHandle = (earlyDate, lateDate, DateChanger, boolean) => { 
    
      
    // let parseNewDate = Date.parse(earlyDate)
    // let parseLateDate = Date.parse(lateDate)
    
    // if(boolean)
    //   {if(parseNewDate >= parseLateDate) {console.log("error");
    //   DateChanger(lateDate)}
      
    //   else if (parseNewDate < parseLateDate) {
    //     DateChanger(earlyDate)
    //   }}
    
    //   else if (!boolean)

      
    //     {if(parseNewDate >= parseLateDate) {console.log("error");
    //     DateChanger(earlyDate)}
        
    //     else if (parseNewDate < parseLateDate) {
    //       DateChanger(lateDate)
    //     }}

    // }

    // const DateHandle2 = (precedentDate, newDate, lateDate, DateChanger, boolean) => {
    //   let parsePrecedentDate = Date.parse(precedentDate)
    //   let parseNewDate = Date.parse(newDate)

    //   if(parsePrecedentDate>=parseNewDate)
    //   {console.log("error2");
    //     DateChanger(precedentDate)}

    //   else {DateHandle(newDate, lateDate, DateChanger, boolean)
    //   return}
    // }

    const SubmitVegetable = async (e) => {

      
      const vegetable = vegetableFamily.find((element)=> element.name === oneFamily) // recupère le vegetable grâce au nom
      
      
      setInvalidVegetableFormModale(false)
      setVegetableFormError('')
      

      let VegetableObj = {
        zoneId: selectedZoneId,
        familyId: vegetable.id,
        growthTime: growthTime,
        emergence: emergenceTime,
        variety: e.target[0].value,
        start_date_period_seeding: startDateSeeding,
        end_date_period_seeding: endDateSeeding,
        start_date_period_planting: startDatePlanting,
        end_date_period_planting: endDatePlanting,
        start_date_period_harvest: startDateHarvest,
        end_date_period_harvest: endDateHarvest,}

        console.log(Date.parse(VegetableObj.start_date_period_seeding) > Date.parse(VegetableObj.end_date_period_seeding));

        if(Date.parse(VegetableObj.start_date_period_seeding) > Date.parse(VegetableObj.end_date_period_seeding) || Date.parse(VegetableObj.end_date_period_seeding) > Date.parse(VegetableObj.start_date_period_planting) ||
           Date.parse(VegetableObj.end_date_period_planting) > Date.parse(VegetableObj.start_date_period_harvest)||
          Date.parse(VegetableObj.start_date_period_planting) > Date.parse(VegetableObj.end_date_period_planting)
          || Date.parse(VegetableObj.start_date_period_harvest) > Date.parse(VegetableObj.end_date_period_harvest) )
          {setInvalidVegetableFormModale(true)
            
            setVegetableFormError("les dates ne sont pas valides (les dates de debut et de fin doivent être cohérentes)") 
            return}

        if (VegetableObj.zoneId && VegetableObj.familyId && VegetableObj.growthTime && VegetableObj.start_date_period_seeding 
          && VegetableObj.end_date_period_seeding && VegetableObj.start_date_period_planting && VegetableObj.end_date_period_planting 
          && VegetableObj.start_date_period_harvest && VegetableObj.end_date_period_harvest   ) // vérifie que tout les inputs obligatoires sont remplis
        {console.log("vegetable created!");

        const ZoneToAddPlant = zoneValue.find((e)=> e.id === selectedZoneId)
        
        

        const zoneToModify = (element) => element.id === selectedZoneId;
        const index = zoneValue.findIndex(zoneToModify)

        const array = zoneValue[index].vegetable
        const arrayToModify = [...zoneValue, {...zoneValue[index], vegetable: [...array, VegetableObj ]}]
        console.log(arrayToModify);
        
       
        
        const newArray = [...array, VegetableObj]
        const FinalArray = {...arrayToModify[index], vegetable:newArray}
        
        const FinalValue = [...arraySpliced, FinalArray]
        
        console.log(FinalValue);


        console.log(ZoneToAddPlant);

        // const createdVegetable = await createVegetable(VegetableObj)
        
        

          console.log(createdVegetable);
        setInvalidVegetableFormModale(false)
        setAddVegetableModale(false)
      }

        else {
          setVegetableFormError("certains champs obligatoires ne sont pas remplis :'(")
          setInvalidVegetableFormModale(true)
          
          return} 
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

              
      {addVegetableModale?<>
      <div className='vegetableModale'>
        <form action="submit" onSubmit={(e)=> {e.preventDefault(); SubmitVegetable(e,)}} className='addVegetableForm'>
            <h4>{oneFamily}</h4>
            <div className='FamilyInfos'>
            <p>profondeur: {depth}</p>
            <p>exposition: {exposure}</p>
            <p>espacement entre les rangés: {rowSpacing}</p>
            <p>espacement entre les plants: {spacing}</p>
            <p>type de sol: {soilType}</p>

            </div>
           

            <label htmlFor="">variété :
            <input  type="text"  placeholder='' onChange={(e) => setOneVariety(e.target.value)} />
            </label>
           
            {startDateSeeding?<> <label htmlFor="seeding">* période de semis (début/fin): <div className='creneau' >
              <input type="date" value={startDateSeeding} onChange={(e)=> {setStartDateSeeding(e.target.value)}} />                
              <input type="date" value={endDateSeeding} onChange={(e)=> {setEndDateSeeding(e.target.value)}}/>
              </div> 
              </label></>:null}

              <label htmlFor="seeding">* période de plantation (début/fin): 
              <div className='creneau' >
                <input type="date" value={startDatePlanting} onChange={(e)=> {setStartDatePlanting(e.target.value)}} />
                <input type="date" value={endDatePlanting} onChange={(e)=> {setEndDatePlanting(e.target.value)}}/>
              </div>
              </label>
              <label htmlFor="seeding">* période de récolte (début/fin): 
              <div className='creneau' >
                <input type="date" value={startDateHarvest} onChange={(e)=> setStartDateHarvest(e.target.value)}/>
                <input type="date" value={endDateHarvest} onChange={(e)=> setEndDateHarvest(e.target.value)}/>
              </div>
              </label>
              <label htmlFor="seeding">* Temps de croissance (durée total de croissance): 
              <div className='creneau' >
                
                <input className='growthTimeInput' type="number" value={growthTime} onChange={(e)=> {setGrowthTime(parseInt(e.target.value))}}/> <p className='growthTimeInputLabel'>jours</p>
              </div>
              </label>
              <label htmlFor="seeding">* emergence (temps de croissance du semis):
              <div className='creneau' >
                <input className='growthTimeInput' type="number" value={emergenceTime} onChange={(e)=> {setEmergenceTime(e.target.value)}}/> <p className='growthTimeInputLabel'>jours</p>
              </div>
              </label>
              <label htmlFor="seeding"> commentaire
              <div className='' >
                
                <input className='commentInput' type="text" /> 
              </div>
              </label>
            <div className='formButton'>
            <button onClick={(e) => {e.preventDefault(); setAddVegetableModale(false)}}>fermer</button>
            <button>valider</button>
            </div>
            <p style={{fontSize: "0.8rem"}}>* tout les champ annoté par un * sont obligatoire</p>
            {invalidVegetableFormModale?<><p style={{fontSize: "0.8rem", color:"orange"}}>{VegetableFormError}</p></>:null}
            
        </form>
       
      </div></>:null}


      <section className='zone-container'>
        {zoneValue?<>{zoneValue.map((zone, index) => (
          <Zone key={index} nom={zone.name} id={zone.id} plant={zone.vegetable} />
          ))}</>: <><Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        /></>}

        {vegetableModaleSwitch?<><div className='VegeInfoSwitch'>
        <p>infos</p></div></>:null}
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
  </>:<><h3>veuillez vous créer un compte ou vous connecter :)</h3></>}


    </>)
}

export default Potager;
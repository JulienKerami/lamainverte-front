import  { useState, useEffect} from 'react';
import Zone from './Zone';
import { zoneArray } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux'
import {addZone, editZone}  from '../store/slices/zonesSlice'
import { jwtDecode } from 'jwt-decode'
import "./Potager.scss"
import Vegetable from '../Vegetables/Vegetable';
import { GetAllZones, createZone, getFamily, createVegetable, deleteVegetable } from '../Apicall/Apicall';
import { addFamily } from '../store/slices/vegetableSlice';
import { switchVegetableModale, switchVegeInfoModale } from '../store/slices/vegetableSlice';
import { Audio } from 'react-loader-spinner'



function Potager(props) {

    //DONNES REDUX
    const zoneValue = useSelector((state)=> state.zones.value)
    const vegetableSwitch = useSelector((state) => state.vegetable.switch)
    const vegetableFamily = useSelector((state) => state.vegetable.familyValue)
    const selectedZoneId = useSelector((state) => state.zones.zoneId)
    const vegetableInfosModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const SelectedVegetable = useSelector((state) => state.vegetable.vegetableSelected )
    const selectedFamily = useSelector((state) => state.vegetable.selectedFamily)
    const dispatch = useDispatch()

    //States pour gérer les MODALES
    const [zoneModale, setZoneModale] = useState(false)
    const [sameNameModale, setSameNameModale] = useState(false)
    const [emptyNameModale, setEmptyNameModale] = useState(false)
    const [addVarietyModale, setAddVarietyModale] = useState(false)
    const [addVegetableModale, setAddVegetableModale] = useState(false)
    const [invalidVegetableFormModale, setInvalidVegetableFormModale] = useState(false)
    const [VegetableFormError, setVegetableFormError] = useState("")
   
    //States pour INFORMATIONS sur une famille de légume//
    const [oneFamily, setOneFamily] = useState({})
    const [oneVariety, setOneVariety] = useState("")
    const [depth, setDepth] = useState('')
    const [exposure, setExposure] = useState('')
    const [rowSpacing, setRowSpacing] = useState("")
    const [spacing, setSpacing] = useState(0)
    const [soilType, setSoilType] = useState("")
    const [family, setFamily] = useState([])
   
    //States pour gérer les DATES d'un plant
    const [startDateSeeding, setStartDateSeeding] = useState("")
    const [endDateSeeding, setEndDateSeeding] = useState("")
    const [startDatePlanting, setStartDatePlanting] = useState("")
    const [endDatePlanting, setEndDatePlanting] = useState("")
    const [startDateHarvest, setStartDateHarvest] = useState("")
    const [endDateHarvest, setEndDateHarvest] = useState("")
   

    const [growthTime, setGrowthTime] = useState(30)
    const [emergenceTime, setEmergenceTime] = useState(20)
 
    //recupère toutes les zones et les légumes au chargement du composant
    useEffect( () => {
     const Data = GetZonesFromBDD()
     getFamilies()
     
    }, []);

    //Ajoute les familles de légumes au state family lorsqu'on qu'on clique sur le + dans le composant zone
    useEffect(() => {
      setAddVarietyModale(vegetableSwitch);
      
      setFamily(vegetableFamily)
    }, [vegetableSwitch])


    useEffect(()=> {
      console.log(SelectedVegetable.family_id);
   
    
      console.log(selectedFamily);
      
    }, [vegetableInfosModaleSwitch])



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

      let date = new Date()
      let year = date.getFullYear()
      console.log(vegetable);
      console.log(vegetable.start_date_seeding);
      console.log(`${year}-${vegetable.start_date_seeding}`);

      if(vegetable.start_date_seeding){setStartDateSeeding(`${year}-${vegetable.start_date_seeding}`)
      setEndDateSeeding(`${year}-${vegetable.end_date_seeding}`)}
    else {setStartDateSeeding(1);setEndDateSeeding(2)}
      
      setStartDatePlanting(`${year}-${vegetable.start_date_planting}`)
      setEndDatePlanting(`${year}-${vegetable.end_date_planting}`)
      setStartDateHarvest(`${year}-${vegetable.start_date_harvest}`)
      setEndDateHarvest(`${year}-${vegetable.end_date_harvest}`)

      setDepth(vegetable.depth)
      setExposure(vegetable.exposure)
      setRowSpacing(vegetable.row_spacing)
      setSoilType(vegetable.soil_type)
      setSpacing(vegetable.spacing)

    
    
     
  
 
        
      

      setAddVegetableModale(true)
    }
  
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

        if(Date.parse(VegetableObj.start_date_period_seeding) > Date.parse(VegetableObj.end_date_period_seeding) || 
            Date.parse(VegetableObj.start_date_period_seeding)> Date.parse(VegetableObj.start_date_period_planting)||
            Date.parse(VegetableObj.start_date_period_planting) > Date.parse(VegetableObj.start_date_period_harvest)||
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
        
        

        // const zoneToModify = (element) => element.id === selectedZoneId;
        // const index = zoneValue.findIndex(zoneToModify)

        // const array = zoneValue[index].vegetable
        // const arrayToModify = [...zoneValue, {...zoneValue[index], vegetable: [...array, VegetableObj ]}]
        // console.log(arrayToModify);
        
        // const newArray = [...array, VegetableObj]
        // const FinalArray = {...arrayToModify[index], vegetable:newArray}
        
        // const FinalValue = [...arraySpliced, FinalArray]
        
        // console.log(FinalValue);


        // console.log(ZoneToAddPlant);

        const createdVegetable = await createVegetable(VegetableObj)
        
        

          console.log(createdVegetable);
        setInvalidVegetableFormModale(false)
        setAddVegetableModale(false)
      }

        else {
          setVegetableFormError("certains champs obligatoires ne sont pas remplis :'(")
          setInvalidVegetableFormModale(true)
          
          return} 
    }

    const HandleDeleteVegetable = async (e) => {
      
      const vegetableDeleted = await deleteVegetable(SelectedVegetable.id)
      console.log(vegetableDeleted);
    }


    
    return (
    <>
     {localStorage.name?<>
    <main className='potager-container' onClick={(e)=> {
      console.log(e.target.className);
      if(!(e.target.className== "VegeInfoSwitch") && vegetableInfosModaleSwitch ) {dispatch(switchVegeInfoModale(false))}}}> 
     
      <h2 className='title'>Potager</h2>
     
      
      

      {/* Section qui contiens toutes les zones  */}
      <section className='zone-container'>
        {zoneValue?<>{zoneValue.map((zone, index) => (
          <Zone key={index} nom={zone.name} id={zone.id} plant={zone.vegetable} />
          ))}</>: null}

       {/* Modale d'infos sur un vegetable, qui s'affiche au clique sur l'icone d'un vegetable  */}

        {vegetableInfosModaleSwitch?<><div className='VegeInfoSwitch'>
          
          <h3><strong>{selectedFamily.name}</strong></h3>

          <ul style={{listStyle: "none"}}>
             
            {SelectedVegetable.variety?<li>variété : {SelectedVegetable.variety}</li>: null}
            <li>temps de croissance: {SelectedVegetable.growth_time} jours</li>
          </ul>
          <div className='tasks'>
          <h5>tâches à faire</h5> 
          {SelectedVegetable.task[0].type== "seeding"?<p>semer: {SelectedVegetable.task[0].status}</p>:<p>planter: {SelectedVegetable.task[0].status} </p>} 
          {SelectedVegetable.task[1].type =="planting"? <p>planter: {SelectedVegetable.task[1].status} </p>:<p>recolter: {SelectedVegetable.task[1].status} </p>} 
          
          {SelectedVegetable.task[2]? <>recolter: {SelectedVegetable.task[2].status} </>:null}
          </div>
          <div className='familyInfos'>
                  <p><h5>Informations sur la famille de légume</h5></p>
                  <p>profondeur: {selectedFamily.depth}</p>
                  <p>exposition: {selectedFamily.exposure}</p>
                  <p>espacement entre les rangés: {selectedFamily.row_spacing}</p>
                  <p>espacement entre les plants: {selectedFamily.spacing}</p>
                  <p>type de sol: {selectedFamily.soil_type}</p>
          </div>
          <button onClick={(e) => {HandleDeleteVegetable()}}>supprimer le plant</button>
        </div></>:null} 

      </section>


      {/* Modale pour choisir une famille de légume, qui s'affiche au clique sur le petit + d'une zone  */}    

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
            <button onClick={(e) => {dispatch(switchVegetableModale(false)) }}>fermer</button>
          </div>
        </div></>:null}


       {/* {Modale pour ajouter un vegetable après avoir choisis une famille de légume elle s'ouvre lorsqu'on clique
        sur le bouton d'un légume dans la modale de selection de légume */}

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
              
                {!(startDateSeeding == 1) ?<> <label htmlFor="seeding">* période de semis (début/fin): <div className='creneau' >
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
                <button onClick={(e) => {e.preventDefault(); setAddVegetableModale(false); setInvalidVegetableFormModale(false)}}>fermer</button>
                <button>valider</button>
                </div>
                <p style={{fontSize: "0.8rem"}}>* tout les champ annoté par un * sont obligatoire</p>
            {invalidVegetableFormModale?<><p style={{fontSize: "0.8rem", color:"orange"}}>{VegetableFormError}</p></>:null}
            
        </form>
       
      </div></>:null}
      
      {/* Modale d'ajout de zone, elle s'affiche au clique sur le gros +  */}
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
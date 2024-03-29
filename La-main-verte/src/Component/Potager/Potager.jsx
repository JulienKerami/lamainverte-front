import  { useState, useEffect} from 'react';
import Zone from './Zone';

import { useDispatch, useSelector } from 'react-redux'
import {addVegetableToZone, addZone, editZone}  from '../store/slices/zonesSlice'
import { jwtDecode } from 'jwt-decode'
import "./Potager.scss"

import { GetAllZones, createZone, createVegetable, deleteVegetable, getTasks } from '../Apicall/Apicall';

import { selectVegetable, switchAddFamilyModale, switchVegeInfoModale } from '../store/slices/vegetableSlice';
import { Oval } from 'react-loader-spinner'
import { toggleAddZoneModale } from '../store/slices/modaleSlice';
import { addTask } from '../store/slices/todoSlice';



function Potager(props) {

    //DONNES REDUX
    const zoneValue = useSelector((state)=> state.zones.value)
    const vegetableSwitch = useSelector((state) => state.vegetable.switch)
    const vegetableFamily = useSelector((state) => state.vegetable.familyValue)
    const selectedZoneId = useSelector((state) => state.zones.zoneId)
    const vegetableInfosModaleSwitch = useSelector((state) => state.vegetable.vegeInfoSwitch )
    const SelectedVegetable = useSelector((state) => state.vegetable.vegetableSelected )
    const selectedFamily = useSelector((state) => state.vegetable.selectedFamily)

    const addZoneModale = useSelector((state) => state.modale.addZoneModale)

    const dispatch = useDispatch()

    //States pour gérer les MODALES
    
    const [sameNameModale, setSameNameModale] = useState(false)
    const [emptyNameModale, setEmptyNameModale] = useState(false)

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

    useEffect(()=> {GetZonesFromBDD()}, []  )

    //Ajoute les familles de légumes au state family lorsqu'on qu'on clique sur le + dans le composant zone
    useEffect(() => {
      setFamily(vegetableFamily)
    }, [vegetableSwitch])

    useEffect(() => {
      console.log(SelectedVegetable);

    }, [SelectedVegetable])

   
    
    const GetZonesFromBDD = async () => {
       
      const token = localStorage.getItem('name')                                 
      const decodedToken = jwtDecode(token)                       
      const userId = decodedToken.id
     
      const zones =  await GetAllZones(userId)       
      console.log("zones: ", zones);                                     
      dispatch(editZone(zones.data.zones))
    }


    const AddZoneHandle = async (e) => {
      
      //on vérifie que l'utilisateur a bien rentré un nom sinon on lui envoie un message d'erreur
      const name = e.target.form[0].value
      if(name ==="") {setEmptyNameModale(true)
        setSameNameModale(false); return}
      
        //on vérifie que l'utilisateur n'a pas rentré le nom d'une zone qui existe déja en BDD
      if(zoneValue){
      const searchForSameName = zoneValue.find((e) => e.name === name)

      if(searchForSameName) {
        setSameNameModale(true)
        setEmptyNameModale(false)
        return}
        // si il n'y a pas d'erreur on ferme les modales d'erreur et la modale d'ajout de zone
        setSameNameModale(false)
        dispatch(toggleAddZoneModale(false))
      }
      const token = localStorage.getItem('name')       // On récupère l'ID de l'utilisateur avec JWT token
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.id

      const zonecreated = await createZone( userId, name)
      console.log(zonecreated);
      dispatch(addZone(zonecreated.data.zone))

    }

    //fonction qui s'active lorsqu'on choisit une famille de légume
    const addVegetable = async (e) => {

     //on va chercher la famille de  légume en base de données redux grâce à son nom
     const vegetable = vegetableFamily.find((element)=> element.name === e.target.textContent) // recupère le vegetable grâce au nom
         
      // on récupère l'année courante dans la variable year
      let date = new Date()
      let year = date.getFullYear()
    

      //on stocke le nom de la famille de légume qu'on a selectionné dans un state
      setOneFamily(e.target.textContent)
      
      
      //SI le légume qu'on a récupéré a une date de seeding, on la stocke dans un state
     if(vegetable.start_date_seeding){

           //on vérifie que la date de fin de seeding n'est pas dépassé, sinon on rajoute une année à l'année courante
            let EndSeedingCheck =new Date(`${year}-${vegetable.end_date_seeding}`).toISOString().slice(0,10)
            if (Date.parse(EndSeedingCheck)<Date.parse(date))
            {year = year+1}

        //on fait passer les dates reçus de la BDD dans la method new Date pour corriger les dates qui n'existent pas (ex: le 31 avril 2024 n'existe pas dans le calendrier) 
        let EndSeeding = new Date(`${year}-${vegetable.end_date_seeding}`).toISOString().slice(0,10)
        let StartSeeding = new Date(`${year}-${vegetable.start_date_seeding}`).toISOString().slice(0,10)
        
        setStartDateSeeding(StartSeeding)
        setEndDateSeeding(EndSeeding)}

     
     //SINON on mets 1 et 2 comme valeur par défault aux dates de seeding
     else {setStartDateSeeding(1);setEndDateSeeding(2)}


    //  On vérifie vérifie que la date de fin de planting (pour les légumes qui n'ont pas de semis) n'est pas dépassé, sinon on rajoute une année à l'année courante
     let EndPlantingCheck =new Date(`${year}-${vegetable.end_date_planting}`).toISOString().slice(0,10)
     if (Date.parse(EndPlantingCheck)<Date.parse(date))
     {year = year+1}
      
      // on stocke dans des states les dates de plantations et de récoltes de la famille de légume qu'on a récupéré 
   
        let StartPlanting = new Date(`${year}-${vegetable.start_date_planting}`).toISOString().slice(0,10)
        let EndPlanting = new Date(`${year}-${vegetable.end_date_planting}`).toISOString().slice(0,10)
      
        setStartDatePlanting(StartPlanting)
        setEndDatePlanting(EndPlanting)

        let StartHarvest = new Date(`${year}-${vegetable.start_date_harvest}`).toISOString().slice(0,10)
        let EndHarvest = new Date(`${year}-${vegetable.end_date_harvest}`).toISOString().slice(0,10)
      
        setStartDateHarvest(StartHarvest)
        setEndDateHarvest(EndHarvest)
      
        //  on stocke dans des states le restes des informations sur une famille de légumes.s
        setGrowthTime(vegetable.growth_time)
        setEmergenceTime(vegetable.emergence)
        setDepth(vegetable.depth)
        setExposure(vegetable.exposure)
        setRowSpacing(vegetable.row_spacing)
        setSoilType(vegetable.soil_type)
        setSpacing(vegetable.spacing)

        //on ouvre la modale d'ajout de vegetable
        setAddVegetableModale(true)
      }
  

    
    //fonction qui s'active lorsqu'on valide le formulaire de création de vegetable
    const SubmitVegetable = async (e) => {
     
     
      // on va chercher la famille de légume auquel correspond le nom qu'on a récupéré depuis la modale de
      // choix de famille de légumes
      const vegetable = vegetableFamily.find((element)=> element.name === oneFamily)
      setInvalidVegetableFormModale(false)
      setVegetableFormError('')
      
     // on stocke les valeurs des inputs dans un objet
      let VegetableObj = {
        zoneId: selectedZoneId,
        familyId: vegetable.id,
        growthTime: growthTime,
        emergence: emergenceTime,
        comment: startDateSeeding==1 ?e.target[6].value: e.target[9].value,
        variety: e.target[0].value,
        start_date_period_seeding: startDateSeeding,
        end_date_period_seeding: endDateSeeding,
        start_date_period_planting: startDatePlanting,
        end_date_period_planting: endDatePlanting,
        start_date_period_harvest: startDateHarvest,
        end_date_period_harvest: endDateHarvest,}

        

       // on contrôle si toutes les informations nécessaires sont bien fournis par l'utilisateur

        if(Date.parse(VegetableObj.start_date_period_seeding) > Date.parse(VegetableObj.end_date_period_seeding) || 
            Date.parse(VegetableObj.start_date_period_seeding)> Date.parse(VegetableObj.start_date_period_planting)||
            Date.parse(VegetableObj.start_date_period_planting) > Date.parse(VegetableObj.start_date_period_harvest)||
           Date.parse(VegetableObj.start_date_period_planting) > Date.parse(VegetableObj.end_date_period_planting)
          || Date.parse(VegetableObj.start_date_period_harvest) > Date.parse(VegetableObj.end_date_period_harvest) )

          {
            // si deux dates ne sont pas cohérentes entre elles on affiche un message d'erreur
            setInvalidVegetableFormModale(true)
            setVegetableFormError("les dates ne sont pas valides (les dates de debut et de fin doivent être cohérentes)") 
            return}

         // On vérifie que tout les inputs obligatoires sont remplis
        if (VegetableObj.zoneId && VegetableObj.familyId && VegetableObj.growthTime && VegetableObj.start_date_period_seeding 
          && VegetableObj.end_date_period_seeding && VegetableObj.start_date_period_planting && VegetableObj.end_date_period_planting 
          && VegetableObj.start_date_period_harvest && VegetableObj.end_date_period_harvest   )
        {
        const ZoneToAddPlant = zoneValue.find((e)=> e.id === selectedZoneId)
        
        setInvalidVegetableFormModale(false)
        setAddVegetableModale(false)

        // on crée le légume
        const createdVegetable = await createVegetable(VegetableObj)

        // On ajoute le vegetable en front, pour ne pas avoir de délais entre le submit du formulaire et l'affichage du vegetable

        const zoneToModify = (element) => element.id === selectedZoneId;
        
        const index = zoneValue.findIndex(zoneToModify)
        const array = zoneValue[index].vegetable
        let newArray = []
        if(array){newArray = [...array, VegetableObj]}
        else { newArray = [VegetableObj]}
        const FinalArray = {...zoneValue[index], vegetable: newArray }
        let Data = [index, FinalArray]
        dispatch(addVegetableToZone(Data))
        

        //On fait appel à la base de donnée pour incrementer les données redux pour
        // permettre à l'utilisateur d'accéder aux tasks du légumes directement après avoir créer le légume (les tasks sont crée en BDD)
        const token = localStorage.getItem('name')                             
        const decodedToken = jwtDecode(token)                       
        const userId = decodedToken.id
        const zones =  await GetAllZones(userId)       
        const zonesSorted = zones.data.zones.sort((a,b) => a.id - b.id )
        
        dispatch(editZone(zones.data.zones))

        const getTask = async () => {
          const tasks = await getTasks()
         console.log("tasks: ", tasks);
           dispatch(addTask(tasks.data))
         }
         getTask()
      }

      // si certains champ sont vides on affiche une erreur
        else {
          setVegetableFormError("certains champs obligatoires ne sont pas remplis :'(")
          setInvalidVegetableFormModale(true)
          
          return} 
    }

    //fonction qui s'active lorsqu'on clique sur la valider dans la modale de suppression 
    const HandleDeleteVegetable = async (e) => {
     
     // On delete le vegetable en BDD
      const vegetableDeleted = await deleteVegetable(SelectedVegetable.id)
      console.log(vegetableDeleted);

      // On appel la BDD pour updated les zones
      const token = localStorage.getItem('name')                             
      const decodedToken = jwtDecode(token)                       
      const userId = decodedToken.id
      const zones =  await GetAllZones(userId) 
      const zonesSorted = zones.data.zones.sort((a,b) => a.id - b.id )
      dispatch(editZone(zonesSorted))

    }
    
    return (
    <>
    
     {localStorage.name?<>

    <main className='potager-container' onClick={(e)=> {
      
      if(!(e.target.className== "VegeInfoSwitch") && vegetableInfosModaleSwitch ) {dispatch(switchVegeInfoModale(false))}}}> 
 
      <h2 className='title'>Mon Potager</h2>

      

      {/* Section qui contiens toutes les zones  */}
      <section className='zone-container'>
        {zoneValue?<>{zoneValue.map((zone, index) => (
          <Zone key={index} nom={zone.name} id={zone.id} plant={zone.vegetable} />
          ))}</>:   
          // Oval = Loader spinner (logo de chargement)
          <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />} 



       {/* Modale d'infos sur un vegetable, qui s'affiche au clique sur l'icone d'un vegetable  */}

        {vegetableInfosModaleSwitch?<><div className='VegeInfoSwitch'>
          
          <h3><strong>{selectedFamily.name}</strong></h3>

          <ul style={{listStyle: "none"}}>
             
            {SelectedVegetable.variety?<li>variété : {SelectedVegetable.variety}</li>: null}
            <li>temps de croissance: {SelectedVegetable.growth_time} jours</li>
          </ul>
          <div className='tasks'>
          <h5>état du légume:</h5>

          {/* Affichage conditionnel de l'état du légume en fonction du status de l'objet vegetable */}
          {SelectedVegetable.status == "En attente de la période de semis"?<>  en attente d'être semé </>:null}
          {SelectedVegetable.status == "En attente de la période de plantation" && SelectedVegetable.task.length == 3?<>  semis </>:null}
          {SelectedVegetable.status == "En attente de la période de plantation" && SelectedVegetable.task.length == 2?<>  en attente d'être planté </>:null}
          
          {SelectedVegetable.status == "En attente de la période de récolte"?<>  plant </>:null}
          {SelectedVegetable.status == null?<> récolté </>:null}

          </div>
          <div className='familyInfos'>
                  <h5>Informations sur la famille de légume</h5>
                  <p>profondeur: {selectedFamily.depth}</p>
                  <p>exposition: {selectedFamily.exposure}</p>
                  <p>espacement entre les rangés: {selectedFamily.row_spacing}</p>
                  <p>espacement entre les plants: {selectedFamily.spacing}</p>
                  <p>type de sol: {selectedFamily.soil_type}</p>
                  {SelectedVegetable.comment?<p>commentaire: {SelectedVegetable.comment}</p>:null}
          </div>
          <button className='deleteVegetableButton' onClick={(e) => {HandleDeleteVegetable(e)}}>supprimer le plant</button>
        </div></>:null} 

      </section>


      {/* Modale pour choisir une famille de légume, qui s'affiche au clique sur le petit + d'une zone  */}    

      {vegetableSwitch?<><div className='vegetableModale'>
      <h3>Choissisez une famille de légumes</h3>
        <div className='family-container'>
         
          {family.map((e, index)=> {return(
          
          <div key={index} className='FamilyToChoose'>
          <img  src={`image-graphiste/imglegumes/${e.img_small}`} alt="logo laMainVerte" className='vegetableImg' />
          <button className='family' onClick={(e) => {e.preventDefault(); dispatch(switchAddFamilyModale(false)); addVegetable(e)}}>
            {e.name}
            </button>
            </div>
          
          )})}
        </div>
          <div className='validation'>
            <button onClick={(e) => {dispatch(switchAddFamilyModale(false)) }}>fermer</button>
          </div>
        </div></>:null}

       {/* {Modale pour ajouter un vegetable après avoir choisis une famille de légume elle s'ouvre lorsqu'on clique
        sur le bouton d'un légume dans la modale de selection de légume */}

      {addVegetableModale?<>
          <div className='vegetableModale'>
            <form action="submit" onSubmit={(e)=> {e.preventDefault(); SubmitVegetable(e)}} className='addVegetableForm'>
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
                  {!(startDateSeeding == 1) ?<label htmlFor="seeding">* emergence (temps de croissance du semis):
                  <div className='creneau' >
                    <input className='growthTimeInput' type="number" value={emergenceTime} onChange={(e)=> {setEmergenceTime(e.target.value)}}/> <p className='growthTimeInputLabel'>jours</p>
                  </div>
                  </label>:null}

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
      <section className='.zone-add-button'>
      {addZoneModale?<div className='zoneModale'>
        <form className='ModalForm' action="">
          {sameNameModale?<><span className='sameNameMessage'>Vous avez déja une zone à ce nom</span></>:null}
          {emptyNameModale?<><span className='sameNameMessage'> Au moins une lettre?</span></>:null}
          <input className='formInput'  placeholder='Nom de zone' type="text" />
          <div className='ModalButtons'>
          <button className='button_valide' type='submit' onClick={(e) => {e.preventDefault(); AddZoneHandle(e)}}>valider</button>
          <button className='button_cancel' onClick={(e)=>{e.preventDefault(); dispatch(toggleAddZoneModale(false));setSameNameModale(false);setEmptyNameModale(false) }} >annuler</button>
          </div>
        </form>
      
      </div>:null}

      {vegetableSwitch||addVegetableModale? null: <><button className='zoneToAdd' onClick={()=> {dispatch(toggleAddZoneModale(true))}}>+</button></>}  
      </section>
    </main>
  </>:<><div className='NoTokenpage'><h3>veuillez vous créer un compte ou vous connecter :)</h3></div></>}


    </>)
}

export default Potager

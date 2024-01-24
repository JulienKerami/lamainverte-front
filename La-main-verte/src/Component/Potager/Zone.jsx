import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  {addZone, editZone, removeZone, selectZoneId}  from '../store/slices/zonesSlice'

import './Zone.scss';
import { vegetable } from '../Data/data';
import Vegetable from '../Vegetables/Vegetable';
import { deleteOneZone, modifyOneZone, } from '../Apicall/Apicall';
import { jwtDecode } from 'jwt-decode'
import { switchAddFamilyModale } from '../store/slices/vegetableSlice';
import { toggleAddZoneModale } from '../store/slices/modaleSlice';


function Zone({nom, id, plant}) {

  const vegetableSwitch = useSelector((state) => state.vegetable.switch)
  const zoneValue = useSelector((state)=> state.zones.value) 
  const deleteZoneModale = useSelector((state) => state.modale.deleteZoneModale)
// Accès aux données redux
  const dispatch = useDispatch()

  const [deleteModal, setDeleteModal] = useState(false)
  // État pour stocker le nom actuel de la zone
  const [name, setName] = useState("Jardin");
  // État pour stocker le nouveau nom pendant l'édition
  const [newName, setNewName] = useState(nom);
  // État pour suivre si l'édition est active ou non
  const [nameEdit, setNameEdit] = useState(false);
  const [sameNameModale, setSameNameModale] = useState(false)
  const [emptyNameModale, setEmptyNameModale] = useState(false)
  




  // Fonction pour supprimer la zone
  const deleteZone = async (e) => {
    
    const token = localStorage.getItem('name')                                  // On récupère l'ID de l'utilisateur avec JWT token
      const decodedToken = jwtDecode(token)                       
      const userId = decodedToken.id

    const zoneId = id         //on va chercher l'id de la zone, en remontant depuis le bouton jusqu'à la div principale
    
    const zoneDeleted = await deleteOneZone(userId, zoneId )
    dispatch(removeZone(zoneId))
    setDeleteModal(false)
    
  };

  const saveName = async () => {
    setSameNameModale(false)
    setEmptyNameModale(false)
    
    if(newName === "") {setEmptyNameModale(true); return}    // Fonction pour enregistrer le nouveau nom

    else{setName(newName)} // Mettre à jour le nom avec le nouveau nom
   
    const searchForSameName = zoneValue.find((e) => (e.name).toLowerCase() === newName.toLowerCase())
    
     // Réinitialiser newName après l'enregistrement
    if (searchForSameName && id !== searchForSameName.id ){setSameNameModale(true);
     return}

     setNameEdit(false)
     


     const token = localStorage.getItem('name')
     const decodedToken = jwtDecode(token)
     const userId = decodedToken.id
  
    const zoneModified = await modifyOneZone(id, newName)
    console.log(zoneModified);
    
        const NewArray = zoneValue.map(obj => {      //Création d'un nouveau tableau qui inclue la zone dont l'utilisateur a modifié le nom.
    if (obj.name === nom) {
          return { ...obj, name: newName };
      };
      ; // Désactiver le mode édition
      return obj;
  });

  dispatch(editZone(NewArray))         // remplace le tableau des zones qui est stockés dans le store par le nouveau tableau crée.
 console.log(zoneValue);
    
  };

  const addVegetable = () => {
    dispatch(switchAddFamilyModale(true))
    dispatch(toggleAddZoneModale(false))
    
    dispatch(selectZoneId(id))

  }



  useEffect(() => {
   
  }, []);



  // Rendu du composant
  return (
    <div className='zone' id={id}>
      {/* Si l'édition est active, afficher le champ de saisie et le bouton d'enregistrement */}

      {nameEdit ? (
        <>
          <input
          className='EditName'
            type="text"
            value={newName}
            placeholder={nom}
            onChange={(e)=> setNewName(e.target.value)}
          />
          {sameNameModale?<><span className='sameNameError'>vous avez déja une zone à ce nom</span></>:null}
          {emptyNameModale?<><span className='sameNameError'>Au moins une lettre plz?</span></>:null}
          <button className='saveNameButton' onClick={saveName}>enregistrer</button>
        </>
      ) : (
        // Sinon, afficher le nom actuel et le bouton pour activer l'édition
        nom?<h3 className='title' onClick={() => setNameEdit(true)}>{nom}</h3>:<h3 className='title' onClick={() => setNameEdit(true)}></h3>
      )}

      <div className='vegetable-container'>
       {plant?<>{plant.map((e, index)=> {
        return(
            <>
            <Vegetable key={index} variety={e.variety} plant={e} />
            </>
          )})}</>:null}
        
        <button className='addVegetableButton' onClick={(e)=>{e.preventDefault(e); addVegetable(e)}}>+</button>
      </div>

      {/* Bouton pour supprimer la zone */}
      <button className='zoneToDelete' onClick={() => setDeleteModal(true)}>
        Supprimer
      </button> 
      {deleteModal?<form className='deleteModal'>            
        <p>Voulez vous supprimer cette zone et ses légumes?</p>  
        <div className='Modalbuttons'>
        <button onClick={(e) =>{e.preventDefault();deleteZone(e)}}> supprimer</button>
        <button onClick={() => setDeleteModal(false)}>annuler</button>
        </div>
      </form>: null}
    </div>
  );
}

export default Zone;

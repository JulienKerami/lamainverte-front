import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  {addZone, editZone}  from '../store/slices/zonesSlice'
import './Zone.scss';

function Zone({nom}) {

 
  const zoneValue = useSelector((state)=> state.zones.value)
  const dispatch = useDispatch()
 
  const [deleteModal, setDeleteModal] = useState(false)
  // État pour stocker le nom actuel de la zone
  const [name, setName] = useState("Jardin");

  // État pour stocker le nouveau nom pendant l'édition
  const [newName, setNewName] = useState("");

  // État pour suivre si l'édition est active ou non
  const [nameEdit, setNameEdit] = useState(false);

  // Fonction pour supprimer la zone
  const deleteZone = () => {
    
    console.log(deleteModal);
    deleteZone(nom)
  };

  // Fonction pour activer l'édition du nom
  const changeName = () => {
    setNameEdit(true);
    
  };

  // Fonction pour enregistrer le nouveau nom
  const saveName = () => {
    if(newName === "") {setName(nom)}

    else{setName(newName)} // Mettre à jour le nom avec le nouveau nom
    setNameEdit(false); // Désactiver le mode édition
     // Réinitialiser newName après l'enregistrement

    const searchForSameName = zoneValue.find((e) => e.name === newName)
    if (searchForSameName){console.log("ce nom est déja utilisé pour une zone");
     return}
         //
    const NewArray = zoneValue.map(obj => {     //Création d'un nouveau tableau qui inclue la zone dont l'utilisateur a modifié le nom.
      if (obj.name === nom) {
          return { ...obj, name: newName };
      }
      return obj;
  });

  dispatch(editZone(NewArray))         // remplace le tableau des zones qui est stockés dans le store par le nouveau tableau crée.
 console.log(zoneValue);
    
  };

  // dispatch(addZone({name:newName, id:zoneValue[zoneValue.length-1].id+1}))

  // Fonction pour mettre à jour newName pendant l'édition
  const editName = (e) => {
    setNewName(e.target.value)
  };

  // Effet secondaire (vide pour l'instant, peut contenir des nettoyages si nécessaire)
  useEffect(() => {
  
  }, []);

  // Rendu du composant
  return (
    <div className='zone'>
      {/* Si l'édition est active, afficher le champ de saisie et le bouton d'enregistrement */}
      {nameEdit ? (
        <>
          <input
          className='EditName'
            type="text"
            placeholder={nom}
            
            onChange={(e)=> editName(e)}
          />
          <button onClick={saveName}>Enregistrer</button>
        </>
      ) : (
        // Sinon, afficher le nom actuel et le bouton pour activer l'édition
        nom?<h3 className='title' onClick={changeName}>{nom}</h3>:<h3 className='title' onClick={changeName}>...</h3>
      )}
      {/* Bouton pour supprimer la zone */}
      <button className='zoneToDelete' onClick={() => setDeleteModal(true)}>
        Supprimer
      </button> 
      {deleteModal?<form className='deleteModal'>            
        <p>Voulez vous supprimer cette zone et ses légumes?</p>  
        <div className='Modalbuttons'>
        <button onClick={deleteZone}> supprimer</button>
        <button onClick={() => setDeleteModal(false)}>annuler</button>
        </div>
      </form>: null}
    </div>
  );
}

export default Zone;

import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import  {addZone, editZone}  from '../store/slices/zonesSlice'

import './Zone.scss';

function Zone({nom}) {

 
  const zoneValue = useSelector((state)=> state.zones.value)
  const dispatch = useDispatch()
 
  // État pour stocker le nom actuel de la zone
  const [name, setName] = useState("Jardin");

  // État pour stocker le nouveau nom pendant l'édition
  const [newName, setNewName] = useState("");

  // État pour suivre si l'édition est active ou non
  const [nameEdit, setNameEdit] = useState(false);

  // Fonction pour supprimer la zone
  const deleteZone = () => {
    console.log(`Supprimer la zone : ${name}`);
  };

  // Fonction pour activer l'édition du nom
  const changeName = () => {
    setNameEdit(true);
    
  };

  // Fonction pour enregistrer le nouveau nom
  const saveName = () => {
    
    if(newName === "") {console.log("test");
    setName(nom)}
    else(setName(newName))
     // Mettre à jour le nom avec le nouveau nom
    setNameEdit(false); // Désactiver le mode édition

    const searchForSameName = zoneValue.find((e) => e.name === newName)
    console.log(searchForSameName);
    console.log(zoneValue);
    
    
    if (searchForSameName) {
      console.log("vous avez déja une zone nommé par ce nom");
      return}

    setNewName(""); // Réinitialiser newName après l'enregistrement

   
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
      <button className='zoneToDelete' onClick={deleteZone}>
        Supprimer
      </button>
    </div>
  );
}

export default Zone;
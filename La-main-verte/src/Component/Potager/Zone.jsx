import {useState, useEffect } from 'react';
import './Zone.scss';

function Zone() {
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
    setName(newName); // Mettre à jour le nom avec le nouveau nom
    setNameEdit(false); // Désactiver le mode édition
    setNewName(""); // Réinitialiser newName après l'enregistrement
  };

  // Fonction pour mettre à jour newName pendant l'édition
  const editName = (e) => {
    setNewName(e.target.value);
  };

  // Effet secondaire (vide pour l'instant, peut contenir des nettoyages si nécessaire)
  useEffect(() => {
    return () => {
      // Effectuer des nettoyages si nécessaire
    };
  }, []);

  // Rendu du composant
  return (
    <div className='zone'>
      {/* Si l'édition est active, afficher le champ de saisie et le bouton d'enregistrement */}
      {nameEdit ? (
        <>
          <input
            type="text"
            placeholder="Nouveau nom"
            value={newName}
            onChange={editName}
          />
          <button onClick={saveName}>Enregistrer</button>
        </>
      ) : (
        // Sinon, afficher le nom actuel et le bouton pour activer l'édition
        <h3 onClick={changeName}>{name}</h3>
      )}
      {/* Bouton pour supprimer la zone */}
      <button className='zoneToDelete' onClick={deleteZone}>
        Supprimer
      </button>
    </div>
  );
}

export default Zone;
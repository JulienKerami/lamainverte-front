import { useState, useEffect } from 'react';
import './Zone.scss';

function Zone(props) {
    // État pour stocker le nom actuel de la zone
    const [name, setName] = useState(props.nom);

    // État pour suivre si l'édition du nom est active ou non
    const [nameEdit, setNameEdit] = useState(false);

    // Fonction pour supprimer la zone
    const deleteZone = () => {
        console.log(`Supprimer la zone : ${name}`);
    };

    // Fonction pour activer l'édition du nom
    const changeName = () => {
        setNameEdit(true);
    };

    // Fonction pour enregistrer le nouveau nom et désactiver l'édition
    const saveName = () => {
        setNameEdit(false);
    };

    // Effet secondaire (vide pour l'instant, peut contenir des nettoyages si nécessaire)
    useEffect(() => {
        return () => {
            // Effectuer des nettoyages si nécessaire
        };
    }, []);

    // Rendu du composant
    return (
        <>
            <div className='zone'>
                {nameEdit ? (
                    // Si l'édition est active, afficher le champ de saisie et le bouton d'enregistrement
                    <>
                        <input 
                            type="text" 
                            placeholder="Nouveau nom" 
                            onChange={(e) => setName(e.target.value)} 
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
        </>
    );
}

export default Zone;




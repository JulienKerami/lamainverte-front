import { useState } from 'react';
import Zone from './Zone';
import { zoneArray } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux';
import './Potager.scss';

// Composant Potager qui gère la liste des zones
function Potager() {
  // État local pour stocker la liste des zones
  const [zones, setZones] = useState(zoneArray);

  // Fonction pour ajouter une nouvelle zone (simulation côté front-end)
  const addZone = () => {
    console.log('Une nouvelle zone a été ajoutée'); // Affiche un message dans la console (à des fins de débogage)
  };

  // Rendu du composant
  return (
    <>
      <h3>Potager</h3>

      {/* Section pour afficher la liste des zones */}
      <section className='zone-container'>
        {/* Mapping à travers la liste des zones et rendu de chaque zone avec le composant Zone */}
        {zones.map((zone, index) => (
          <Zone key={index} nom={zone.name} />
        ))}
      </section>

      {/* Section avec un bouton pour ajouter une nouvelle zone */}
      <section className='zone-container'>
        {/* Bouton avec une classe spécifique et événement de clic lié à la fonction addZone */}
        <button className='zoneToAdd' onClick={addZone}>
          +
        </button>
      </section>
    </>
  );
}

// Export du composant Potager pour qu'il puisse être utilisé ailleurs dans l'application
export default Potager;
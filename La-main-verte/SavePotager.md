import  { useState, useEffect} from 'react';
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

function Potager(props) {
    const [zones, setZone] = useState(zoneArray);
    const dispatch = useDispatch()
    const zoneValue = useSelector((state)=> state.zones.value)
    

    useEffect(() => {
      
  
      zones.map((e)=> {dispatch(addZone(e))})
      console.log(zoneValue);
    }, []);

  

    const AddZoneHandle = () => {
      console.log('Une nouvelle zone à été ajoutée');
  }

    return (
     <>
    <h3 className='title'>Potager</h3>

    <section className='zone-container'>
        {zoneValue.map((zone, index) => (
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
}}

// Export du composant Potager pour qu'il puisse être utilisé ailleurs dans l'application
export default Potager
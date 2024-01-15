import React, { useState, useEffect } from 'react';
import Zone from './Zone';
import { zone, task, vegetable } from '../Data/data';
import "./Potager.scss"

function Potager(props) {
    const [zones, setZone] = useState(zone);



    const AddZoneHandle = () => {
      console.log('test');
  }


    return (
     <>
    <h3>Potager</h3>
    <section className='zone-container'>
        {zones.map((e)=> 
        { return (<Zone nom={e.name}/>) })}
    </section>
    <section className='zone-container'>
       <button className='zoneToAdd' onClick={(e)=> AddZoneHandle()}>+</button>  
    </section>



  </>
    )
}

export default Potager;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask } from '../store/slices/todoSlice';
import './Todo.scss'; 
import { GetAllZones, getTasks, getFamily } from '../Apicall/Apicall';
import { editZone } from '../store/slices/zonesSlice';
import { jwtDecode } from 'jwt-decode'
import { addFamily } from '../store/slices/vegetableSlice';

const Todo = () => {
  const dispatch = useDispatch();
  const zones = useSelector((state) => state.zones.value); 
  const tasks = useSelector((state) => state.todo.tasks);
  const vegetableFamily = useSelector((state) => state.vegetable.familyValue);
  const [nameFound, setNameFound] = useState(false)
  const [task, setTask] = useState('');


  const handleAddTask = () => {
    if (task.trim() !== '') {
      
      setTask('');
    }
  };



  useEffect(()=> {}, [tasks])



  const handleRemoveTask = (index) => {
    dispatch(removeTask(index));
  };

  // const getFamilyName = (id) => {
  //   setTimeout(() => {
  //     console.log(id);
  //   console.log(vegetableFamily);
  //   const name = vegetableFamily.find((e)=> e.id === id)
  //   setNameFound(true)
  //   console.log(name.name)
  //   return name.name
  //   }, "2000");
    

  // }

  return (<>
    {localStorage.name?
   <div className="todo--container">
      <h2 className="title">ToDo </h2>


      <ul className="task-container">

        {vegetableFamily && tasks?<>{tasks.map((e)=> {return(
          <>
          <div className='task'>
          {e.Vegetable.variety== "variété orange"?
           null:<> <li>{e.Vegetable.varity? e.Vegetable.variety:e.Vegetable.Family.name} à {e.type==="planting"?<>planter</>:null}
           {e.type==="harvest"?<>recolter</>:null}{e.type==="seeding"?
            <>semer</>:null} dans {e.Vegetable.Zone.name} (entre le {e.end_date_period} et le {e.start_date_period} ) <input on type="checkbox" /></li>
              </> }
          </div></>
        )})}</>:null}


      </ul>
    </div>:null}</>
  );
};

export default Todo;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, addTask, removeTask } from '../store/slices/todoSlice';
import './Todo.scss'; 
import { GetAllZones, getTasks, getFamily, updateTask } from '../Apicall/Apicall';
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


  const getTask = async () => {
    const tasks = await getTasks()
   console.log("tasks: ", tasks);
     dispatch(addTask(tasks.data))
   }

  useEffect(() => { 
   
    
  }, [])



  const UpdateTask = async (idtask) => {
    console.log(idtask);
    const date = new Date()
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    
    const token = localStorage.getItem('name')                                  // On récupère l'ID de l'utilisateur avec JWT token
    const decodedToken = jwtDecode(token)                       
    const userId = decodedToken.id

    
   const task = tasks.find((e)=> e.id == idtask)

  
   let taskObj = {
    ...task, effective_date: formattedDate, status_code: 2
   }


   const taskUpdated = await updateTask(task.id,taskObj )
    
   getTask()
  }

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
    {localStorage.name && tasks?
   <div className="todo--container">
      <h2 className="title">ToDo </h2>


      <ul className="task-container">

      {/* si les données family et tasks de la BDD ont bien été stockés dans redux on affiche les tasks avec le "map" sinon on affiche null */}
       {vegetableFamily && tasks?<>{tasks.map((e)=> {return(
          <>
          <div className='task' >
          <li>{e.Vegetable.varity? e.Vegetable.variety:e.Vegetable.Family.name} à {e.type==="planting"?<>planter</>:null}

           {e.type==="harvest"?<>recolter</>:null}
           
           {e.type==="seeding"?
            <>semer</>:null} dans {e.Vegetable.Zone.name} (entre le {e.start_date_period}  et le {e.end_date_period} )
             <input id={`${e.id}`} on type="button" className='TaskChecker' onClick={(e)=>{UpdateTask(e.target.id)}} />
             
             </li>

             
          </div></>
        )})}</>:null} 


      </ul>
    </div>:null}</>
  );
};

export default Todo;
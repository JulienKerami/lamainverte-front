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
  
  const [TaskDisplay, setTaskDisplay] = useState(true);
  const [taskIndexSelected, setTaskIndexSelected] = useState(0)
  const [CheckerValue, setCheckerValue] = useState("X")


  const getTask = async () => {
    const tasks = await getTasks()
   console.log("tasks: ", tasks);
     dispatch(addTask(tasks.data))
   }

  useEffect(() => { 
   
    
  }, [])



  const UpdateTask = async (idtask) => {

    setTaskDisplay(false)
    setTaskIndexSelected(idtask)

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



  return (<>
    {localStorage.name && tasks?
   <div className="todo--container">
      <h2 className="title">ToDo </h2>


      <ul className="task-container">

      {/* si les données family et tasks de la BDD ont bien été stockés dans redux on affiche les tasks avec le "map" sinon on affiche null */}
       {vegetableFamily && tasks?<>{tasks.map((e)=> {return(
          <>
          <div className='task' >
        
            {/* si le vegetable de la tâche a une variété on l'affiche sinon on affiche le nom de la family*/}
          <li id={e.id} className={!TaskDisplay && e.id  == taskIndexSelected ? 'hideTask': ""}>{e.Vegetable.varity? e.Vegetable.variety:e.Vegetable.Family.name} à {e.type==="planting"?<><span className='planter'>planter</span></>:null}

          {/* on affiche le type de tâche en fonction de la propriété type de task */}
           {e.type==="harvest"?<><span className='recolter'>recolter</span></>:null}
           
           {e.type==="seeding"?
            <><span className='semer'>semer</span></>:null} dans {e.Vegetable.Zone.name} (entre le {e.start_date_period}  et le {e.end_date_period} )
             <input id={`${e.id}`} on type="button" className='TaskChecker'  onClick={(e)=>{UpdateTask(e.target.id)}} value={CheckerValue} />
             
             </li>

             
          </div></>
        )})}</>:null} 


      </ul>
    </div>:<><div className='NoTokenpage'><h3>veuillez vous créer un compte ou vous connecter :)</h3></div></>}</>
  );
};

export default Todo;
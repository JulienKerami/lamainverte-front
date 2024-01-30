import { useState, useEffect } from 'react'
import Navbar from './Component/Navbar/Navbar'
import Todo from './Component/Todo/Todo'
import Login from './Component/login/Login'
import Potager from './Component/Potager/Potager'

import './App.css'
import SignIn from './Component/SignIn/SignIn'
import Home from './Component/Home/Home'
import {Routes, Route, Link, NavLink, Router, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './Component/store/store'
import { GetAllZones, getFamily, getTasks } from './Component/Apicall/Apicall'
import { jwtDecode } from 'jwt-decode'
import { editZone } from './Component/store/slices/zonesSlice'
import { addFamily } from './Component/store/slices/vegetableSlice'
import { addTask,removeTask } from './Component/store/slices/todoSlice'
import TodoMonth from './Component/Todo/TodoMounth'



function App() {
    const [count, setCount] = useState(0);
    const [isNavbarOn, setIsNavbarOn] = useState(false); 
    const [pathLocation, setPathLocation] = useState(""); 


    useEffect(() => {
      GetZonesFromBDD();
      getTask();
      getFamilies();
    }, []);

    const location = useLocation();

    useEffect(() => {
      console.log('La route a changé ! en', location.pathname);
      setPathLocation(location.pathname);
    }, [location]);

  const dispatch = useDispatch();

  const getTask = async () => {
    const tasks = await getTasks()
   console.log("tasks: ", tasks);
     dispatch(addTask(tasks.data))
   }
  
   const GetZonesFromBDD = async () => {
       
     const token = localStorage.getItem('name')                                  // On récupère l'ID de l'utilisateur avec JWT token
     const decodedToken = jwtDecode(token)                       
     const userId = decodedToken.id
     console.log(localStorage.getItem('name'))
     const zones =  await GetAllZones(userId)       
     console.log("zones: ", zones);                                     
     dispatch(editZone(zones.data.zones))
   }
  
   const getFamilies = async () => {
     
     const legumes = await getFamily()
    console.log("family: ", legumes);
     let legumesArray = legumes.data
     dispatch(addFamily(legumesArray))
     
   } 

   const toggleNavbar = () => {
    setIsNavbarOn((prev) => !prev); 
   }

   return (
    <>
      <header className={`header ${pathLocation === "/" ? "header_home" : ""}`}>
      <Link to='/'>

        <div className={`logo ${pathLocation === "/" ? "logo_home" : ""}`}>
          <img src="/src/assets/logo.png" alt="logo laMainVerte" className={`logo-img ${pathLocation === "/" ? "logo-img_home" : ""}`}/>
          <div className={`logo-title ${pathLocation === "/" ? "logo-title_home" : ""}`}>

            <span>la</span>
            <span>main</span>
            <span className="logo-title_text">verte</span>
          </div>
        </div>
      </Link>
        <button className={`navbarToggle ${pathLocation === "/" ? "navbarToggle_home" : ""}`}>
          <div className={`navbarToggle-img ${pathLocation === "/" ? "navbarToggle-img_home" : ""}`}></div>
          <div className={`navbarToggle-img ${pathLocation === "/" ? "navbarToggle-img_home" : ""}`}></div>
          <div className={`navbarToggle-img ${pathLocation === "/" ? "navbarToggle-img_home" : ""}`}></div>
        </button>
      </header>
      {isNavbarOn && <Navbar/>}
        <Routes>
          <Route path='/potager' element={<Potager/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path="/" element={<Home setPathLocation={() => setPathLocation("/")} />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/todo' element={<Todo/>}/>
          <Route path='/todoMonth' element={<TodoMonth/>}/>
        </Routes>
    </>
  )
}

export default App


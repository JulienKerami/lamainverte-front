import { useState, useEffect } from 'react'
import Navbar from './Component/Navbar/Navbar'
import Todo from './Component/Todo/Todo'
import Login from './Component/login/Login'
import Potager from './Component/Potager/Potager'
import './reset.css'
import './App.css'
import SignIn from './Component/SignIn/SignIn'
import Home from './Component/Home/Home'
import {Routes, Route, Link, NavLink, Router} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './Component/store/store'
import { GetAllZones, getFamily, getTasks } from './Component/Apicall/Apicall'
import { jwtDecode } from 'jwt-decode'
import { editZone } from './Component/store/slices/zonesSlice'
import { addFamily } from './Component/store/slices/vegetableSlice'
import { addTask,removeTask } from './Component/store/slices/todoSlice'



function App() {
    const [count, setCount] = useState(0);
    const [isNavbarOn, setIsNavbarOn] = useState(false); 

  useEffect(() => {GetZonesFromBDD();getTask();getFamilies()}, [])
  const dispatch = useDispatch();

  const getTask = async () => {
    const tasks = await getTasks()
   console.log(tasks);
     dispatch(addTask(tasks.data))
   }
  
   const GetZonesFromBDD = async () => {
       
     const token = localStorage.getItem('name')                                  // On récupère l'ID de l'utilisateur avec JWT token
     const decodedToken = jwtDecode(token)                       
     const userId = decodedToken.id
  
     const zones =  await GetAllZones(userId)       
                                          
     dispatch(editZone(zones.data.zones))
   }
  
   const getFamilies = async () => {
     
     const legumes = await getFamily()
    console.log(legumes);
     let legumesArray = legumes.data
     dispatch(addFamily(legumesArray))
     
   } 

   const toggleNavbar = () => {
    setIsNavbarOn((prev) => !prev); 
   }

   return (
    <>
      <header className='header'>
      <Link to='/'>
        <div className="logo">
          <img src="logo.png" alt="logo laMainVerte" className='logo-img' /> 
          <div className="logo-title">
            <span>la</span>
            <span>main</span>
            <span className="logo-title_text">verte</span>
          </div>
        </div>
      </Link>
        <button className="navbarToggle" onClick={toggleNavbar}>
          <div className="navbarToggle-img"></div>
          <div className="navbarToggle-img"></div>
          <div className="navbarToggle-img"></div>
        </button>
      </header>
      {isNavbarOn && <Navbar/>}
        <Routes>
          <Route path='/potager' element={<Potager/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/todo' element={<Todo/>}/>
        </Routes>
    </>
  )
}

export default App


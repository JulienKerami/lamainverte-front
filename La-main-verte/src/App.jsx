import { useState } from 'react'
import Navbar from './Component/Navbar/Navbar'
import Login from './Component/login/Login'
import Potager from './Component/Potager/Potager'
import './App.css'
import SignIn from './Component/SignIn/SignIn'
import Home from './Component/Home/Home'
import {Routes, Route, Link, NavLink, Router} from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './Component/store/store'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <h1>La main verte</h1>
  
    <Provider store={store}>
    <Navbar/>
    <Routes>
      <Route path='/potager' element={<Potager/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    </Provider>
    </>
  )
}

export default App


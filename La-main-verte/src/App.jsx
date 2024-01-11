import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Component/Navbar/Navbar'
import './App.css'
import Signin from './Component/sign-up/SignIn'
import Home from './Component/Home/Home'
import {Routes, Route, Link, NavLink, Router} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/' element={<Home/>}/>
        
    </Routes>
       
    </>
  )
}

export default App

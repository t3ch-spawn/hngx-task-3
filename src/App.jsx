import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AuthDetails from './components/AuthDetails'
import { Route, Routes } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-black min-h-screen text-white flex flex-col items-center justify-between font-main'>
    <Routes>
      <Route path='/' element = {<SignIn/>}/>
      <Route path='/signup' element = {<SignUp/>}/>
    </Routes>
    </div>
  )
}

export default App

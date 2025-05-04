import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';


function App() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  } | null>(null)
  const navigate = useNavigate()
  const getUser = ()=>{
   const user = localStorage.getItem("insight-user")
   if(user){
    return JSON.parse(user)
   }
   return null
  }
useEffect(()=>{
  const user = getUser()
  if(user){
    setUser(user)
    navigate("/dashboard")
  }else{
    navigate("/")
  }
},[])
  return (

<div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
      </div>

  )
}

export default App

import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.tsx"

import Home from "./components/Home.tsx"
import { About } from "./components/About.tsx"
import { Login } from "./components/Login.tsx"
import { Season } from "./components/Season.tsx"
import { Register } from "./components/Register.tsx"


function App() {
  

  return (
    <>
   <Navbar title={"Hello"}/>
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/about/:key" element={<Season />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
   </Routes>
   </>
  )
}

export default App

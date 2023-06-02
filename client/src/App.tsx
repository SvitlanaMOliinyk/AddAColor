import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.tsx"
import { useEffect, useState } from "react"
import Home from "./pages/Home.tsx"
import { About } from "./pages/About.tsx"
import { Login } from "./components/Login.tsx"
import { Season } from "./components/Season.tsx"
import { Register } from "./components/Register.tsx"
import { UserModel } from "./components/models/userModel.ts"
import { Profile } from "./pages/Profile.tsx"


function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null);

  

  useEffect(() => {
  async function getLoggedInUser(){
    try {
    const response = await fetch("/api/user", { method: "GET" });
    const responseResult = await response.json()
        console.log("responseUser:", responseResult)
        setLoggedInUser(responseResult) 
} catch(error){
  console.error(error);
}
}
getLoggedInUser()
  }, [])

  

  return (
    <>
   <Navbar loggedInUser={loggedInUser}
					onLogout={() => setLoggedInUser(null)}/>
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/about/:key" element={<Season />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/profile" element={<Profile loggedInUser={loggedInUser}/>}/>
    <Route path="/register" element={<Register onRegisterSuccessful={(user) => {setLoggedInUser(user)}}/>}/>
    <Route path="/login" element={<Login onLoginSuccessful={(user) => {setLoggedInUser(user)}}/>}/>
   </Routes>
   </>
  )
}

export default App

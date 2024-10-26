import "./App.css";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useState } from "react";


function App() {
  const[isLoggedIn,setLoggedIn]=useState(false);
  return(
    <div>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></Navbar>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App;

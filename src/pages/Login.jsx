import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.png"

function Login({setLoggedIn}) {
  return (
    <Template
    title="welcome Back"
    desc1="build skills for,tomorrow and beyond."
    desc2="Education to future-proof your carrer."
    image={loginImg}
    formtype="login"
    setLoggedIn={setLoggedIn}
    />
    
  )
}

export default Login

import React from 'react'
import Template from '../components/Template'

function Login({setLoggedIn}) {
  return (
    <Template
    title="welcome Back"
    desc1="this is desc 1"
    desc2="this is desc 2"
    formtype="login"
    setLoggedIn={setLoggedIn}
    />
    
  )
}

export default Login

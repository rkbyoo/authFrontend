import React from 'react'
import Template from '../components/Template'

function Signup({setLoggedIn}) {
  return (
    <Template
    title="Join the dash dash "
    desc1="this is desc 2"
    desc2="this is desc 3"
    formtype="signup"
    setLoggedIn={setLoggedIn}
    />
  )
}

export default Signup

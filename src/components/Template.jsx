import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frameImage from "../assets/frame.png"

function Template({title,desc1,desc2,image,formtype,setLoggedIn}) {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>
            <span>{desc1}</span>
            <span>{desc2}</span>
        </p>
        {formtype==="signup"?(<SignupForm setLoggedIn={setLoggedIn}/>):(<LoginForm setLoggedIn={setLoggedIn}/>)}
        <div>
            <div></div>
            <p>OR</p>
            <div></div>

        </div>
        <button><p>Sign up with Google</p></button>
      </div>
      <div>
        <img src={frameImage} alt="pattern" width={558} height={504} loading='lazy' />
        <img src={image} alt="" width={558} height={490} loading='lazy' />
      </div>
    </div>
  )
}

export default Template

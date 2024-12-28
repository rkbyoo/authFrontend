import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'

function LoginForm(props) {
    let setLoggedIn=props.setLoggedIn;
    const[formData,setformData]=useState({email:"",password:""})
    const navigate=useNavigate();
    const[showPassword,setshowPassword]=useState(false)
    function chageHandler(event){
        setformData((prevData)=>(
        {
            ...prevData,
            [event.target.name]:event.target.value
        }
        ))
    }
    function submithandler(event){
        event.preventDefault();
        setLoggedIn(true);
        navigate("/dashboard")
        toast.success("logged In")
        console.log("printing the form data");
        console.log(formData)
    }
  return (
    <form onSubmit={submithandler}>
        <label htmlFor="email">Email Address <sup>*</sup></label>
        <input type="email" id='email' name='email' required value={formData.email} onChange={chageHandler} placeholder='enter the email' />
        <label>
            <p>Password</p>
            <input name='password' placeholder='Enter the Password' type={showPassword?("text"):("password")} value={formData.password} onChange={chageHandler} />
            <span onClick={()=>{setshowPassword((prev)=>!prev)}}>
                {showPassword?(<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
            </span>
            <Link to="#">
                <p>
                    Forgot Password
                </p>
            </Link>
        </label>
        <button>Sign in</button>
        
    </form>
  )
}

export default LoginForm

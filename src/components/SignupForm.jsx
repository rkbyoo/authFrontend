import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

function SignupForm({setLoggedIn}) {
    const[formData,setformData]=useState({firstname:"",lastname:"",email:"",password:"",confirmPassword:""})
    const[showPassword,setshowPassword]=useState(true)
    const navigate=useNavigate();
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
        if(formData.password!==formData.confirmPassword)
        {
            toast.error("passwords do not match");
            return;
        }
        else{
            toast.success("Account created")
            setLoggedIn(true);
            navigate("/dashboard")
        }

    }
  return (
    <div>
      {/* student-instructor tab */}
      <div>
        <button>student</button>
        <button>Instructor</button>
      </div>
      <form onSubmit={submithandler}>
        {/* first name and lastname */}
        <div>
            {/* firstname and lastname */}
            <label>
                <p>First Name <sup>*</sup></p>
                <input type="text" required name="firstname" onChange={chageHandler} placeholder='enter first name' value={formData.firstname} />

            </label>
            <label>
                <p>Last Name <sup>*</sup></p>
                <input type="text" required name="lastname" onChange={chageHandler} placeholder='enter Last name' value={formData.lastname} />

            </label>
        </div>
        {/* email added */}
        <label>
                <p>email</p>
                <input type="email" name="email" id="email" placeholder='enter your email' value={formData.email} onChange={chageHandler} />
        </label>
        {/* create password and confirm password */}
        <div>
            <label>
                <p>Create password <sup>*</sup></p>
                <input type={showPassword?("password"):("text")} required name="password" onChange={chageHandler} placeholder='enter password' value={formData.password} />
                <span onClick={()=>{setshowPassword((prev)=>!prev)}}>
                    {showPassword?(<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                </span>
            </label>
            <label>
                <p>Confirm password<sup>*</sup></p>
                <input type={showPassword?("password"):("text")} required name="confirmPassword" onChange={chageHandler} placeholder='confirm your password' value={formData.confirmPassword} />
                <span onClick={()=>{setshowPassword((prev)=>!prev)}}>
                    {showPassword?(<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                </span>

            </label>
        </div>
        <button>sign up</button>

      </form>
    </div>
  )
}

export default SignupForm

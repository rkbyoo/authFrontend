import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function SignupForm({ setLoggedIn }) {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [accountType, setAccountType] = useState("");
    const navigate = useNavigate();

    // Change handler to update form data state
    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    // Function to handle fetching user details after signup
    async function fetchUserDetails(token) {
        const response = await fetch("https://trekathon-cloud-backend.onrender.com/users/me/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Correctly add token in Authorization header
            },
        });

        if (response.ok) {
            const userData = await response.json();
            console.log("User details:", userData);
        } else {
            const error = await response.json();
            toast.error(error.message || "Failed to fetch user details");
            console.error("Error response from server:", error);
        }
    }

    // Submit handler for form data
    async function submitHandler(event) {
        event.preventDefault();

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Prepare data for API call
        const finalData = new URLSearchParams({
            username: formData.firstname,
            email: formData.email,
            password: formData.password,
        });

        try {
            const response = await fetch("https://trekathon-cloud-backend.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: finalData.toString(), // URL-encoded string
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Account created successfully!");
                
                // Store token and username in local storage
                localStorage.setItem("token", data.token.access_token);
                setLoggedIn(true);

                // Fetch user details after successful signup
                fetchUserDetails(data.token.access_token);
                console.log("Response from server:", data);

                // Navigate to the dashboard
                navigate("/dashboard");
            } else {
                const error = await response.json();
                toast.error(error.message || "Registration failed");
                console.error("Error response from server:", error);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Error during registration:", error);
        }
    }

    return (
        <div>
            {/* Student-Instructor Tab */}
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button
                    className={`${accountType === "user" 
                    ? "bg-richblack-900 text-richblack-5" 
                    : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("user")}
                >
                    User
                </button>
                <button
                    className={`${accountType === "admin" 
                    ? "bg-richblack-900 text-richblack-5" 
                    : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("admin")}
                >
                    Admin
                </button>
            </div>
            <form onSubmit={submitHandler} className='text-black'>
                {/* First Name and Last Name */}
                <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name <sup>*</sup></p>
                        <input
                            type="text"
                            required
                            name="firstname"
                            onChange={changeHandler}
                            placeholder="Enter first name"
                            value={formData.firstname}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name <sup>*</sup></p>
                        <input
                            type="text"
                            required
                            name="lastname"
                            onChange={changeHandler}
                            placeholder="Enter last name"
                            value={formData.lastname}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>
                {/* Email */}
                <div className='mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={changeHandler}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
                </div>
                {/* Password and Confirm Password */}
                <div className='w-full flex gap-x-4 mt-[20px]'>
                    <label className='w-full relative'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password <sup>*</sup></p>
                        <input
                            required
                            type={showPassword ? "password" : "text"}
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter password"
                            value={formData.password}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                        </span>
                    </label>

                    <label className='w-full relative'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password <sup>*</sup></p>
                        <input
                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
                            type={showConfirmPassword ? "password" : "text"}
                            required
                            name="confirmPassword"
                            onChange={changeHandler}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                        />
                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                        </span>
                    </label>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupForm;

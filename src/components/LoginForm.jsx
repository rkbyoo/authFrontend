import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'

function LoginForm(props) {
    let setLoggedIn = props.setLoggedIn;
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

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

    async function submitHandler(event) {
        event.preventDefault();

        const finalData = new URLSearchParams({
            username: formData.username,
            password: formData.password,
        });

        try {
            const response = await fetch("https://trekathon-cloud-backend.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: finalData.toString(), // URL-encoded string
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Login successful!");

                // Store token and username in local storage
                localStorage.setItem("token", data.token.access_token);
                localStorage.setItem("username", data.user.username);
                setLoggedIn(true);

                // Fetch user details after successful login
                fetchUserDetails(data.token.access_token);
                console.log("Response from server:", data);

                // Navigate to the dashboard
                navigate("/dashboard");
            } else {
                const error = await response.json();
                toast.error(error.message || "Login failed");
                console.error("Error response from server:", error);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Error during login:", error);
        }
    }

    return (
        <form onSubmit={submitHandler}>
    <div className='mt-5'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>
                Username<sup className='text-pink-200'>*</sup>
            </p>
            <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={changeHandler}
                placeholder="Enter the username"
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>
    </div>

    <div className='relative mt-5'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input
                name="password"
                placeholder="Enter the Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={changeHandler}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
            <span
                className='absolute right-3 top-[38px] cursor-pointer'
                onClick={() => setShowPassword(prev => !prev)}
            >
                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
            </span>
        </label>
    </div>

    <div className="mt-3">
        <Link to="#" className="text-sm text-richblack-5 underline">
            Forgot Password
        </Link>
    </div>

    <button
        type="submit"
        className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'
    >
        Sign In
    </button>
</form>

    );
}

export default LoginForm;

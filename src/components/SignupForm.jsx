import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function SignupForm({ setLoggedIn }) {
    const [formData, setformData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setshowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [accountType, setaccounType] = useState("");
    const navigate = useNavigate();

    function chageHandler(event) {
        setformData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    async function submithandler(event) {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const finalData = new URLSearchParams({
            username: `${formData.firstname}`,
            email: formData.email,
            password: formData.password,
        });
        console.log(finalData)
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
                setLoggedIn(true);
                console.log("Response from server:", data);
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
            <div>
                <button
                    className={accountType === "student" ? "bg-slate-400" : "bg-richblack-800"}
                    onClick={() => setaccounType("student")}
                >
                    Student
                </button>
                <button
                    className={accountType === "instructor" ? "bg-slate-400" : "bg-richblack-800"}
                    onClick={() => setaccounType("instructor")}
                >
                    Instructor
                </button>
            </div>
            <form onSubmit={submithandler}>
                {/* First Name and Last Name */}
                <div>
                    <label>
                        <p>First Name <sup>*</sup></p>
                        <input
                            type="text"
                            required
                            name="firstname"
                            onChange={chageHandler}
                            placeholder="Enter first name"
                            value={formData.firstname}
                        />
                    </label>
                    <label>
                        <p>Last Name <sup>*</sup></p>
                        <input
                            type="text"
                            required
                            name="lastname"
                            onChange={chageHandler}
                            placeholder="Enter last name"
                            value={formData.lastname}
                        />
                    </label>
                </div>
                {/* Email */}
                <label>
                    <p>Email</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={chageHandler}
                    />
                </label>
                {/* Password and Confirm Password */}
                <div>
                    <label>
                        <p>Create Password <sup>*</sup></p>
                        <input
                            type={showPassword ? "password" : "text"}
                            required
                            name="password"
                            onChange={chageHandler}
                            placeholder="Enter password"
                            value={formData.password}
                        />
                        <span onClick={() => setshowPassword((prev) => !prev)}>
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>
                    <label>
                        <p>Confirm Password <sup>*</sup></p>
                        <input
                            className="text-black"
                            type={showConfirmPassword ? "password" : "text"}
                            required
                            name="confirmPassword"
                            onChange={chageHandler}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;

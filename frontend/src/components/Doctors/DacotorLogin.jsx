import React, { useState } from "react";
import { doctorLogin } from "../../store/useDocStore";

const DoctorLogin = () => {

    const [state, setState] = useState('Doctor');

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [authUser, setAuthUser] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const {login, isLoggingIn} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(formData);
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 mx-80 item-start p-8 min-w-[340px] border rounded-xl text-gray-400 text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto"><span className="text-gray-600">{state}</span> Login</p>
                <div className="w-full">
                    <p>Email:</p>
                    <input onChange={handleChange} name="email" placeholder="Email" className="border-2 border-secondary rounded w-full p-2 mt-1" type='email' required/>
                </div>
                <div className="w-full">
                    <p>Password:</p>
                    <input onChange={handleChange} name="password" placeholder="Password" className="border-2 border-secondary rounded w-full p-2 mt-1" type='password' required/>
                </div>
                <button type="submit" className="bg-secondary text-white w-full py-2 rounded-md text-base">Login</button>
            </div>
        </form>
        </>
    );
};

export default DoctorLogin;
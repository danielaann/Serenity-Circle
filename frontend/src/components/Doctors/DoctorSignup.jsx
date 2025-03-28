import React, { useState } from "react";
import { doctorSignup } from "../../store/useDocStore";
import { assets } from "../../assets_doc/assets_admin/assets.js";
import { useAuthStore } from '../store/useAuthStore';

const DoctorSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        fee: "",
        address: "",
        image: "",
    });

    const [docImg, setDocImg] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await doctorSignup(formData);
            alert(response.message);
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="m-5 w-full">

                <p className="text-2xl font-semibold m-auto"><span className="text-gray-600">Doctor</span> Sign Up</p>

                <div className="bg-white px-8 py-8 border-2 shadow-lg rounded w-full max-w-4xl overflow-y-scroll scrollbar-hide">
                    <div className="flex items-center gap-4 mb-8 text-gray-500">
                        <label htmlFor="doc-img">
                            <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={assets.upload_area} />
                        </label>
                        <input onChange={(e) => {
                            handleChange(e); // Call the first function
                            setDocImg(e.target.files[0]); // Call the second function
                        }} type="file" id="doc-img" hidden />
                        <p>Upload doctor <br /> image</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-10 text-gray-600">
                        <div className="w-full lg:flex-1 flex flex-col gap-4">

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Your Name:</p>
                                <input onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="text" placeholder="Name" required />
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Email:</p>
                                <input onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="email" placeholder="Email" required />
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Password</p>
                                <input onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="password" placeholder="Password" required />
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Years of Experience:</p>
                                <select onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" name="">
                                    <option value='1 Year'>1 Year</option>
                                    <option value='2 Year'>2 Year</option>
                                    <option value='3 Year'>3 Year</option>
                                    <option value='4 Year'>4 Year</option>
                                    <option value='5 Year'>5 Year</option>
                                    <option value='6 Year'>6 Year</option>
                                    <option value='7 Year'>7 Year</option>
                                    <option value='8 Year'>8 Year</option>
                                    <option value='9 Year'>9 Year</option>
                                    <option value='10 Year'>10 Year</option>
                                </select>
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Fees:</p>
                                <input onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="number" placeholder="Fee" required />
                            </div>
                        </div>

                        <div className="w-full lg:flex-1 flex flex-col gap-4">

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Speciality:</p>
                                <select onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2">
                                    <option value='Psychiatrists'>Psychiatrists</option>
                                    <option value='Neurologist'>Neurologist</option>
                                    <option value='Pyscologist'>Pyscologist</option>
                                </select>
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Education</p>
                                <input onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="text" placeholder="Eduction" required />
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <p>Address</p>
                                <input onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="text" placeholder="Address 1" required />
                                <input className="border-4 border-gray-300 rounded px-3 py-2" type="text" placeholder="Address 2" required />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="mt-4 mb-2">About</p>
                        <textarea className="w-full px-4 pt-2 border-4 border-gray-300 rounded" placeholder="Short description" rows={5} required />
                    </div>

                    <button type="submit" className="bg-primary px-10 py-3 mt-4 text-primary-content rounded-full">Sign Up</button>
                </div>
            </form>


            {/* try */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="speciality" placeholder="Speciality" onChange={handleChange} required />
                <input type="text" name="degree" placeholder="Degree" onChange={handleChange} required />
                <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
                <textarea name="about" placeholder="About" onChange={handleChange} required />
                <input type="number" name="fee" placeholder="Fee" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
                <button type="submit">Signup</button>
            </form>
        </>
    );
};

export default DoctorSignup;
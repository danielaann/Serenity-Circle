import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { assets } from "../../assets_doc/assets_admin/assets.js";
import toast from "react-hot-toast";

const DoctorSignup = () => {
    const [formData, setFormData] = useState({
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        fee: "",
        address: "",
        image: "",
    });

    const [docImg, setDocImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const authUser = useAuthStore(state => state.authUser);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchDoctorData = async () => {
            if (!authUser?._id) return;

            try {
                const response = await axiosInstance.get(`/doctor/profile/${authUser._id}`);
                if (response.status === 200) {
                    setFormData(response.data); // Load profile data
                    setDocImg(response.data.image || null); // Set image preview
                    setIsUpdating(true);
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    console.warn("Doctor profile not found, allowing signup.");
                } else {
                    console.error("Error fetching doctor profile:", error);
                }
            }
        };

        fetchDoctorData();
    }, [authUser]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setDocImg(reader.result); // Preview
                setFormData(prev => ({ ...prev, image: reader.result })); // Base64 for backend
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (!formData.speciality) {
            toast.error("Speciality is required!");
            setLoading(false);
            return;
        }
    
        // Add userId to formData
        const dataToSend = { ...formData, userId: authUser._id };
    
        console.log("FormData before sending:", dataToSend);
    
        try {
            const response = await axiosInstance.post("/doctor/register-update", dataToSend); // Send formData directly
            toast.success(isUpdating ? "Profile updated successfully!" : "Signup successful!");
            setIsUpdating(true);
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
            console.error("API error:", error);
        }
    
        setLoading(false);
    };    

    return (
        <form onSubmit={handleSubmit} className="m-5 w-full">
            <p className="text-2xl font-semibold m-auto">
                <span className="text-gray-600">Doctor</span> {isUpdating ? "Update Profile" : "Sign Up"}
            </p>

            <div className="bg-white px-8 py-8 border-2 shadow-lg rounded w-full max-w-4xl overflow-y-scroll scrollbar-hide">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer"
                            src={docImg || assets.upload_area}
                            alt="Upload Preview"
                        />
                    </label>
                    <input type="file" id="doc-img" hidden onChange={handleImageChange} />
                    <p>Upload doctor <br /> image</p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Your Name:</p>
                            <input
                                value={authUser?.fullName || ""}
                                className="border-4 border-gray-300 rounded px-3 py-2 bg-gray-200 cursor-not-allowed"
                                type="text"
                                readOnly
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Years of Experience:</p>
                            <select name="experience" value={formData.experience} onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2">
                                {[...Array(10).keys()].map(year => (
                                    <option key={year + 1} value={`${year + 1} Year`}>{year + 1} Year</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees:</p>
                            <input name="fee" value={formData.fee} onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="number" placeholder="Fee" required />
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality:</p>
                            <select name="speciality" value={formData.speciality} onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2">
                                <option value="Psychiatrists">Psychiatrists</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Psychologist">Psychologist</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Education:</p>
                            <input name="degree" value={formData.degree} onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="text" placeholder="Education" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address:</p>
                            <input name="address" value={formData.address} onChange={handleChange} className="border-4 border-gray-300 rounded px-3 py-2" type="text" placeholder="Address" required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mt-4 mb-2">About</p>
                    <textarea name="about" value={formData.about} onChange={handleChange} className="w-full px-4 pt-2 border-4 border-gray-300 rounded" placeholder="Short description" rows={5} required />
                </div>

                <button type="submit" className="bg-primary px-10 py-3 mt-4 text-primary-content rounded-full">
                    {isUpdating ? "Update Profile" : "Sign Up"}
                </button>
            </div>
        </form>
    );
};

export default DoctorSignup;

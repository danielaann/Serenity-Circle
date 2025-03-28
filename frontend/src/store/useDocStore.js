import {axiosInstance} from "../lib/axios.js";

export const doctorSignup = async (formData) => {
    const response = await axiosInstance.post("/doctor/signup", formData);
    return response.data;
};

// Doctor Login
export const doctorLogin = async (formData) => {
    const response = await axiosInstance.post("/doctor/login", formData);
    return response.data;
};

// Check Doctor Auth
export const checkDoctorAuth = async () => {
    const response = await axiosInstance.get("/doctor/auth");
    return response.data;
};

// Doctor Signout
export const doctorSignout = async () => {
    const response = await axiosInstance.post("/doctor/signout");
    return response.data;
};
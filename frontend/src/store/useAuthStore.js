import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth:true,
    isUpdatingProfile: false,
    onlineUsers:[],

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
        } finally{
            set({ isCheckingAuth: false})
        }
    },

    signup: async (data) =>{
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            toast.success("Account created successfully!");

            set({ authUser: res.data});
            console.log(authUser);
        } catch (error) {
            toast.error(error.reponse.data.message);
        }finally{
            set({isSigningUp: false});
        }
    },

    logout: async () =>{
        try {
            await axiosInstance.post("/auth/signout");
            set({ authUser: null});
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.reponse.data.message);
        }
    },

    login: async (data) => {
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login",data);
            toast.success("Logged in successfully");
            set({authUser: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn: false});
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            toast.success("Profile updated successfully");
            set({ authUser: res.data});
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    },

}))
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import Drawer from "./components/Drawer";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Relaxation from "./pages/Relaxation";
import DisplayAlbum from "./components/Music/DisplayAlbum";
import { useContext } from "react";
import ShowNotes from "./components/Notes/ShowNotes";
import TaskPage from "./pages/TaskPage";
import Completed from "./components/Task/Completed";
import Pending from "./components/Task/Pending";
import Overdue from "./components/Task/Overdue";
import Doctors from "./pages/Doctors";
import Appointment from "./components/Doctors/Appointment";

const App = () =>{
  const {authUser,checkAuth, isCheckingAuth} = useAuthStore();
  const {theme}= useThemeStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  // console.log( {authUser});
  if(isCheckingAuth && !authUser) return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return(
    <div data-theme ={theme}>
      <Layout>
      <Routes> 
        {/* below first check if user is logged in and then direct to the page or go to login */}
        <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login"/>} /> 
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={authUser? <SettingsPage/> : <Navigate to="/login"/>}/>
        <Route path="/dashboard" element={authUser? <Dashboard/> : <Navigate to="/login"/>}/>
        <Route path="/relaxation" element={authUser? <Relaxation/> : <Navigate to="/login"/>}/>
        <Route path="/album/:id" element={authUser? <DisplayAlbum/> : <Navigate to="/login"/>}/>
        <Route path="/notes" element={authUser? <ShowNotes/> : <Navigate to="/login"/>}/>
        <Route path="/tasks/*" element={authUser? <TaskPage/> : <Navigate to="/login"/>}/>
        <Route path="/doctors" element={authUser? <Doctors/> : <Navigate to="/login"/>}/>
        <Route path="/appointment/:docId" element={authUser? <Appointment/> : <Navigate to="/login"/>}/>
      </Routes>
      </Layout>
      <Toaster/>

    </div>

  )
};

export default App;
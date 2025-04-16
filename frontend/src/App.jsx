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
import Contact from "./pages/Contact";
import DoctorLogin from "./components/Doctors/DacotorLogin";
import DoctorDashboard from "./components/Doctors/DoctorDashboard";
import DocSignUpPage from "./components/Doctors/DocSignup";
import WelcomePage from "./pages/WelcomePage";
import ProfilePage from "./pages/ProfilePage";
import GroupChat from "./pages/GroupMsg";
import SleepTracker from "./pages/Sleep";
import BookedAppointments from "./pages/BookedAppointments";
import DoctorAppointmentDashboard from "./components/Doctors/DocAppointments";
import DocProfile from "./pages/DocProfile";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/doc/signup"
            element={!authUser ? <DocSignUpPage /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/welcome" />}
          />

          {/* Conditional Routes Based on Role */}
          {authUser ? (
            authUser.role === "user" ? (
              <>
                {/* User-Specific Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/welcome" element={<WelcomePage/>}/>
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={ <ProfilePage /> } />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/relaxation" element={<Relaxation />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
                <Route path="/notes" element={<ShowNotes />} />
                <Route path="/tasks/*" element={<TaskPage />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/appointments/:userId" element={<BookedAppointments />} />
                <Route
                  path="/appointment/:docId"
                  element={<Appointment />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/grpchat" element={<GroupChat />} />
                <Route path="/sleep" element={<SleepTracker />} />
              </>
            ) : (
              <>
                {/* Doctor-Specific Routes */}
                <Route path="/welcome" element={<WelcomePage/>}/>
                <Route path="/" element={<HomePage />} />
                <Route path="/doctor/login" element={<DoctorLogin />} />
                <Route path="/doctor/signup" element={<DocProfile />} />
                <Route
                  path="/doctor/dashboard"
                  element={<DoctorDashboard />}
                />
                 <Route path="/doctor/appointments" element={<DoctorAppointmentDashboard />} />
              </>
            )
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
};

export default App;
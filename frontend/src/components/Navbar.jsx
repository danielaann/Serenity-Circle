import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import logo from "../assets/logo.png";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed top-0 left-0 w-[98rem] z-50 bg-secondary"
    >
      <div className="container mx-auto px-2 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src={logo} className="object-contain text- bg-slate-100 rounded-lg" />
              </div>
              <h1 className="text-lg font-bold">Serenity Circle</h1>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 ml-auto">
            {authUser && (
              <>
                <Link to="/settings" className="btn btn-sm gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>
                
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>


              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


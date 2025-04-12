import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, MessageSquare, User, Lock, Loader, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import img from '../assets/createacc.jpg';
import logo from "../assets/logo.png";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email:"",
    password: "",
  });

  const {signup , isSigningUp}= useAuthStore();

  const validateForm =()=>{
    if(!formData.fullName.trim()) return toast.error("Full name is required");

    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");

    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must be of 6 characters");

    return true;

  };

  const handleSubmit =(e)=>{
    e.preventDefault();

    const success = validateForm();
    if(success===true) signup(formData);
  };

  return (
    <div className='h-fit w-fit grid lg:grid-cols-2'>
      {/* left hand side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <img src={logo} className='object-contain text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'> Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>

            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40'/>
                </div>
                <input 
                  type='text' className='input input-bordered w-full pl-10' 
                  placeholder='Daniela Ann' value={formData.fullName} 
                  onChange={(e)=> setFormData({...formData, fullName: e.target.value})} 
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40'/>
                </div>
                <input 
                  type='email' className='input input-bordered w-full pl-10' 
                  placeholder='name@sample.com' value={formData.email} 
                  onChange={(e)=> setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40'/>
                </div>
                <input 
                  type={showPassword? "text":"password"} 
                  className={`input input-bordered w-full pl-10`} 
                  placeholder='*******' value={formData.password} 
                  onChange={(e)=> setFormData({...formData, password: e.target.value})} 
                />

                <button type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={()=> setShowPassword(!showPassword)}>

                    {showPassword ? (
                      <EyeOff className='size-5 text-base-content/40'/>
                    ) : (
                      <Eye className='size-5 text-base-content/40'/>
                    )
                    }
                </button>
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                <Loader2 className='size-5 animate-spin'/> Loading...
                </>
              ):( "Create Account")
              }
            </button>
          </form>

          <div className='text-center'> 
            <p className='text-base-content/68'>
              Already have an Account? <Link to="/login" className='link link-primary'> Sign in</Link>
            </p>
          </div>

        </div>
      </div>

      {/* right side */}
      <div className="hidden lg:flex flex-col justify-center mt-10 items-center p-6 sm:p-12 w-full h-full">
            <img src={img} alt="Login" className="w-full h-auto object-contain max-w-lg pr-4" />
            <h1 class="text-5xl mt-5 font-extrabold text-pink-400 drop-shadow-md">
              Serenity Circle
            </h1>
          </div>
      
    </div>
  )
}

export default SignUpPage;
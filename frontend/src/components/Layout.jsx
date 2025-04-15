import React from 'react';
import Navbar from './Navbar';
import Drawer from './Drawer';
import { useAuthStore } from '../store/useAuthStore';

const Layout = ({ children }) => {
  const { authUser } = useAuthStore();

  const menuItems = [
    { name: 'Mood Dashboard', link: '/dashboard' },
    { name: 'Sleep Dashboard', link: '/sleep' },
    { name: 'Relaxation', link: '/relaxation'},
    { name: 'Journal', link: '/notes'},
    { name: 'Task Manager', link: '/tasks'},
    { name: 'Book Doctors', link: '/doctors'},
    ...(authUser?._id ? [{ name: 'My Appointments', link: `/appointments/${authUser._id}` }] : []),
    { name: 'Chat with Doctors', link: '/' },
    { name: 'Connect with peers', link: '/grpchat' },
  ];


  return (
    <div className="flex h-screen">
      {authUser?.role === "user" && (
        <Drawer title="Serenity Circle" menuItems={menuItems} />
      )}

      <div className="flex-1">
        <Navbar />
        <main className="mx-56 px-2 mt-16 w-full h-fit overflow-x-hidden my-auto bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

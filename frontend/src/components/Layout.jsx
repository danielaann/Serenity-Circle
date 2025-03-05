import React from 'react';
import Navbar from './Navbar';
import Drawer from './Drawer';
import { useAuthStore } from '../store/useAuthStore';

const Layout = ({ children }) => {
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Settings', link: '/settings' },
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Relaxation', link: '/relaxation'},
    { name: 'Journal', link: '/notes'},
    { name: 'Task Manager', link: '/tasks'},
  ];

  const {authUser} = useAuthStore();

  return (
    <>
    <div className="flex h-screen">
      {authUser && (
        <Drawer title="Serenity Circle" menuItems={menuItems} />
      )}
      <div className="flex-1">
        <Navbar />
        <main className="mx-56 px-2 mt-16 w-full h-fit overflow-x-hidden my-auto bg-base-100">{children}</main>
      </div>
    </div>
    </>
  );
};

export default Layout;

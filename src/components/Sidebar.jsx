import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: 'home', label: 'Home', active: true },
    { icon: 'confirmation_number', label: 'My Tickets' },
    { icon: 'person', label: 'Profile' },
    { icon: 'settings', label: 'Settings' },
  ];

  const handleLogout = () => {
    // 1. Clear Local Storage
    localStorage.removeItem('token');
    // 2. Clear any other user data if stored
    localStorage.clear(); 
    // 3. Redirect to Login Page
    navigate('/', { replace: true });
  };

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#13182d] sticky top-0 h-screen hidden lg:flex flex-col justify-between p-6">
      <div className="flex flex-col gap-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary p-2 rounded-lg text-white">
            <span className="material-symbols-outlined">confirmation_number</span>
          </div>
          <div>
            <h1 className="text-primary dark:text-white text-lg font-extrabold">K&A</h1>
            <p className="text-xs text-gray-500 font-medium">Ticket Booking</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href="#" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* User Profile Card */}
        <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <div className="size-10 rounded-full bg-slate-300 border-2 border-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.name || 'Alex Morgan'}</p>
            <p className="text-xs text-gray-500 truncate">Premium Member</p>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-semibold text-sm group"
        >
          <span className="material-symbols-outlined text-[22px] group-hover:translate-x-1 transition-transform">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Music, LogOut, Music2, Settings, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { label: 'Songs', icon: Music2, path: '/songs' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={clsx(
          'bg-white border-r border-gray-300 flex flex-col justify-between transition-transform duration-300 z-40 w-64',
          sidebarOpen
            ? 'translate-x-0 fixed h-full left-0 top-0 md:relative'
            : '-translate-x-full md:translate-x-0 md:relative'
        )}
      >
        <div>
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <Music className="w-6 h-6 text-green-700" />
            <span className="text-xl font-semibold text-gray-900">Melofy</span>
          </div>
          <nav className="mt-6 flex flex-col space-y-1 px-4">
            {navItems.map(({ label, icon: Icon, path }) => (
              <button
                key={label}
                onClick={() => handleNavigate(path)}
                className={clsx(
                  'flex items-center gap-3 p-2 rounded-md text-sm transition',
                  location.pathname === path
                    ? 'bg-green-100 text-green-700 font-semibold'
                    : 'text-gray-700 hover:bg-green-50'
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded-md text-red-600 hover:bg-red-100 transition text-sm"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 py-3 bg-[#f8f8f8] border-b border-gray-300 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="block md:hidden p-2 rounded-md hover:bg-gray-200 transition"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-medium text-gray-800">Dashboard</h1>
          </div>
          <div className="bg-green-700 text-white py-2 px-4 rounded-full text-sm font-semibold">
            {currentUser?.username?.charAt(0).toUpperCase()}
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          
        </main>
      </div>
    </div>
  );
}

export default Navbar;

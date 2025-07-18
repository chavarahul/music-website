import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Music, LogOut, Music2, Menu } from 'lucide-react';
import { useNavigate, useLocation, } from 'react-router-dom';
import clsx from 'clsx';

function Layout({ children }) {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  };

  const navItems = [
    { label: 'Music Library', icon: Music2, path: '/' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f8]">
      <aside
        className={clsx(
          'border-r border-gray-300 flex flex-col justify-between transition-transform duration-300 z-50 w-64',
          sidebarOpen
            ? 'translate-x-0 fixed inset-y-0 left-0 bg-white'
            : 'hidden md:flex md:translate-x-0 md:static'
        )}
      >
        <div>
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <Music className="w-6 h-6 text-green-600" />
            <span className="text-xl font-semibold text-gray-900">Melofy</span>
          </div>
          <nav className="mt-6 flex flex-col space-y-1 px-4">
            {navItems.map(({ label, icon: Icon, path }) => (
              <button
                key={label}
                onClick={() => handleNavigate(path)}
                className={clsx(
                  'flex items-center gap-3 p-2 rounded-md text-sm transition-colors',
                  location.pathname === path
                    ? 'bg-green-100 text-green-600 font-semibold'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
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
            className="flex items-center gap-3 w-full p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors text-sm"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 py-[0.71rem]  border-b border-gray-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="block md:hidden p-2 rounded-md hover:bg-gray-200 transition-colors res"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-800">Dashboard</h1>
          </div>
          <div className="bg-green-600 text-white py-2 px-3.5  border rounded-full text-sm font-semibold">
            {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Layout;
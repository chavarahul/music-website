import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Navbar() {
  const { token, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Music Library</h1>
        <div className="space-x-4">
          {token ? (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => login('admin')}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Login as Admin
              </button>
              <button
                onClick={() => login('user')}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Login as User
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
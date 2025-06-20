import React from 'react';
import SongList from './components/SongList';

const App = () => {
  const currentUser = { role: 'admin' }; // Example user with admin role

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li className="mb-2"><a href="#" className="hover:text-gray-300">Songs</a></li>
          <li className="mb-2"><a href="#" className="hover:text-gray-300">Playlists</a></li>
          <li className="mb-2"><a href="#" className="hover:text-gray-300">Artists</a></li>
          <li className="mb-2"><a href="#" className="hover:text-gray-300">Settings</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <header className="bg-white shadow-md p-4 mb-4 rounded-lg">
          <h1 className="text-2xl font-bold">MusicApp Dashboard</h1>
        </header>
        <main>
          <SongList currentUser={currentUser} />
        </main>
      </div>
    </div>
  );
};

export default App;
import React from 'react';
import SongList from './components/SongList.jsx';

const App = () => {
  const currentUser = { role: 'admin' }; // Example user with admin role

  return (
    // <div className="flex h-screen bg-gray-100">
    //   <main className="flex-1 p-4 flex relative">
          <SongList currentUser={currentUser} />
    //   </main>
    // </div>
  );
};

export default App;
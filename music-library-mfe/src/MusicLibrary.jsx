import React from 'react';
import SongList from './components/SongList.jsx';

const App = ({currentUser}) => {
  const currentUserO = currentUser.role;

  return (
          <SongList currentUser={currentUserO} />
  );
};

export default App;
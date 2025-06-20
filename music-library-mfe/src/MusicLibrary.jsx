import React from 'react';
import SongList from './components/SongList.jsx';

const App = ({currentUser}) => {

  return (
          <SongList currentUser={currentUser} />
  );
};

export default App;
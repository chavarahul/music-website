import React, { Suspense } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom'

const MusicLibrary = React.lazy(() => import('music_library/MusicLibrary'));

function Home() {
  const { currentUser , token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to={"/auth"} replace />
  }
  return (
    <Suspense fallback={<div className="text-center text-gray-600">Loading Music Library...</div>}>
      <MusicLibrary currentUser={currentUser} />
    </Suspense>
  );
}

export default Home;
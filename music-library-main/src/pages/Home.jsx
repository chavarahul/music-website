import React, { Suspense } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom'
import Loader from '../components/common/Loader';

const MusicLibrary = React.lazy(() => import('music_library/MusicLibrary'));

function Home() {
  const { currentUser , token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to={"/auth"} replace />
  }
  return (
    <Suspense fallback={<div className="min-h-[94vh] border flex items-center justify-center"><Loader/></div>}>
      <MusicLibrary currentUser={currentUser} />
    </Suspense>
  );
}

export default Home;
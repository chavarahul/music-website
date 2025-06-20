import React from 'react'
import FilterControls from './components/FilterControls'
import SongList from './components/SongList'

const MusicLibrary = ({currentUser}) => {
  return (
    <div>
      <FilterControls/>
      <SongList currentUser={currentUser}/>
    </div>
  )
}

export default MusicLibrary
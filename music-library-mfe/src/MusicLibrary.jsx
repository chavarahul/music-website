import React from 'react'
import FilterControls from './components/FilterControls'
import SongList from './components/SongList'

const MusicLibrary = ({token}) => {
  return (
    <div>
      <FilterControls/>
      <SongList token={token}/>
    </div>
  )
}

export default MusicLibrary
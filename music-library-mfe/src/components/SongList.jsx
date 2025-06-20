import React, { useMemo, useState, useEffect } from 'react';
import Header from './Header.jsx';
import SongGrid from './SongGrid.jsx';
import AddSongModal from './AddSongModal.jsx';
import DeleteConfirmationModal from './DeleteSongModal.jsx';

const SongList = ({ currentUser }) => {
  const [addedSongs, setAddedSongs] = useState(() => {
    const savedSongs = localStorage.getItem('adminAddedSongs');
    return savedSongs ? JSON.parse(savedSongs) : [];
  });

  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', artist: '', album: '', duration: '', genre: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [error, setError] = useState('');

  const role = currentUser?.role;

  const displaySongs = useMemo(() => {
    return addedSongs;
  }, [addedSongs]);

  const filteredSongs = useMemo(() => {
    const uniqueSongs = Array.from(new Set(displaySongs.map(song => song.id)))
      .map(id => displaySongs.find(song => song.id === id));
    return uniqueSongs
      .filter((song) =>
        song.title.toLowerCase().includes(filter.toLowerCase()) ||
        (song.artist && song.artist.toLowerCase().includes(filter.toLowerCase())) ||
        (song.album && song.album.toLowerCase().includes(filter.toLowerCase()))
      )
      .sort((a, b) => {
        const valA = (a[sortBy] || 'zzz').toLowerCase();
        const valB = (b[sortBy] || 'zzz').toLowerCase();
        return valA.localeCompare(valB);
      });
  }, [displaySongs, filter, sortBy]);

  const groupedSongs = useMemo(() => {
    if (!groupBy) return null;
    return filteredSongs.reduce((acc, song) => {
      const key = song[groupBy] || 'Unknown';
      acc[key] = acc[key] || [];
      acc[key].push(song);
      return acc;
    }, {});
  }, [filteredSongs, groupBy]);

  useEffect(() => {
    localStorage.setItem('adminAddedSongs', JSON.stringify(addedSongs));
  }, [addedSongs]);

  const handleAddSong = () => {
    if (!newSong.title.trim() || !newSong.artist.trim() || !newSong.album.trim() || !newSong.duration.trim() || !newSong.genre.trim()) {
      setError('All fields are required.');
      return;
    }
    const id = addedSongs.length ? Math.max(...addedSongs.map((s) => s.id)) + 1 : 1;
    setAddedSongs([...addedSongs, { id, ...newSong }]);
    setNewSong({ title: '', artist: '', album: '', duration: '', genre: '' });
    setShowAddModal(false);
    setError('');
  };

  const handleDeleteSong = (id) => {
    setAddedSongs(addedSongs.filter((song) => song.id !== id));
    setDeleteConfirm(null);
  };

  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'artist', label: 'Artist' },
    { value: 'album', label: 'Album' },
    { value: 'genre', label: 'Genre' }
  ];

  const groupOptions = [
    { value: '', label: 'None' },
    { value: 'genre', label: 'By Genre' },
    { value: 'artist', label: 'By Artist' }
  ];

  return (
    <div className="bg-[#f8f8f8] px-6 py-4">
      <Header
        filteredSongsLength={filteredSongs.length}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortOptions={sortOptions}
        groupOptions={groupOptions}
        showSortDropdown={showSortDropdown}
        setShowSortDropdown={setShowSortDropdown}
        showGroupDropdown={showGroupDropdown}
        setShowGroupDropdown={setShowGroupDropdown}
        role={role}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
      {(showSortDropdown || showGroupDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowSortDropdown(false);
            setShowGroupDropdown(false);
          }}
        />
      )}
      <SongGrid
        filteredSongs={filteredSongs}
        groupedSongs={groupedSongs}
        groupBy={groupBy}
        role={role}
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        handleDeleteSong={handleDeleteSong}
      />
      <AddSongModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        newSong={newSong}
        setNewSong={setNewSong}
        handleAddSong={handleAddSong}
        error={error}
        setError={setError}
      />
      <DeleteConfirmationModal
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
        handleDeleteSong={handleDeleteSong}
      />
    </div>
  );
};

export default SongList;
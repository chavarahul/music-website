import React, { useMemo, useState } from 'react';
import { Search, ChevronDown, Grid, Plus, X, Trash2, SortAsc, Music } from 'lucide-react';

const SongList = ({ currentUser }) => {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Anusha', artist: '', album: '', duration: '', genre: 'Pop' },
    { id: 2, title: 'Singout', artist: '', album: '', duration: '', genre: 'Indie Pop' },
    { id: 3, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', genre: 'Pop' },
    { id: 4, title: 'Peaches', artist: 'Justin Bieber ft. Daniel Caesar', album: 'Justice', duration: '3:18', genre: 'R&B' },
    { id: 5, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'Sour', duration: '', genre: 'Rock' },
  ]);

  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', artist: '', album: '', duration: '', genre: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const role = currentUser?.role;

  const filteredSongs = useMemo(() => {
    return songs
      .filter((song) =>
        song.title.toLowerCase().includes(filter.toLowerCase()) ||
        (song.artist && song.artist.toLowerCase().includes(filter.toLowerCase())) ||
        (song.album && song.album.toLowerCase().includes(filter.toLowerCase()))
      )
      .sort((a, b) => (a[sortBy] || '').localeCompare(b[sortBy] || ''));
  }, [songs, filter, sortBy]);

  const groupedSongs = useMemo(() => {
    if (!groupBy) return null;
    return filteredSongs.reduce((acc, song) => {
      const key = song[groupBy] || 'Unknown';
      acc[key] = acc[key] || [];
      acc[key].push(song);
      return acc;
    }, {});
  }, [filteredSongs, groupBy]);

  const handleAddSong = () => {
    if (!newSong.title.trim()) return;
    const id = songs.length ? Math.max(...songs.map((s) => s.id)) + 1 : 1;
    setSongs([...songs, { id, ...newSong }]);
    setNewSong({ title: '', artist: '', album: '', duration: '', genre: '' });
    setShowAddModal(false);
  };

  const handleDeleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
    setDeleteConfirm(null);
  };

  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'artist', label: 'Artist' },
    { value: 'album', label: 'Album' },
    { value: 'genre', label: 'Genre' }
  ];

  const groupOptions = [
    { value: '', label: 'No Grouping' },
    { value: 'genre', label: 'By Genre' },
    { value: 'artist', label: 'By Artist' }
  ];

  const SongCard = ({ song }) => (
    <div className="bg-gray-50 p-4 mt-6 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">{song.title}</h3>
        {role === 'admin' && (
          <button
            onClick={() => setDeleteConfirm(song.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors flex-shrink-0"
            title="Delete song"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="w-12 text-gray-500">Artist:</span>
          <span className="truncate">{song.artist || 'Unknown Artist'}</span>
        </div>
        <div className="flex items-center">
          <span className="w-12 text-gray-500">Album:</span>
          <span className="truncate">{song.album || 'Unknown Album'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Duration: {song.duration || '-'}</span>
          <span className="bg-green-100 text-green-700 p-2 rounded-full font-medium">
            {song.genre || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Music Library</h1>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            {filteredSongs.length} songs
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowSortDropdown(!showSortDropdown);
                setShowGroupDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
            >
              <SortAsc className="w-4 h-4" />
              <span className="text-sm">Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${sortBy === option.value ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowGroupDropdown(!showGroupDropdown);
                setShowSortDropdown(false);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
            >
              <Grid className="w-4 h-4" />
              <span className="text-sm">Group: {groupOptions.find(opt => opt.value === groupBy)?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showGroupDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
                {groupOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setGroupBy(option.value);
                      setShowGroupDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${groupBy === option.value ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add Song Button */}
          {role === 'admin' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Song</span>
            </button>
          )}
        </div>
      </div>

      {(showSortDropdown || showGroupDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowSortDropdown(false);
            setShowGroupDropdown(false);
          }}
        />
      )}

      {filteredSongs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mx-auto text-center text-6xl mb-4 pt-10">
            <Music className="w-6 h-6 text-green-700" />
          </div>
          <p className="text-gray-600 text-lg">No songs found matching your search.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or filters.</p>
        </div>
      ) : groupBy && groupedSongs ? (
        <div className="space-y-8 mt-6">
          {Object.keys(groupedSongs).sort().map((groupKey) => (
            <div key={groupKey}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{groupKey}</h2>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                  {groupedSongs[groupKey].length} songs
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
                {groupedSongs[groupKey].map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Add New Song</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-7 mt-5">
              <div>
                <label className="block text-sm font-semibol text-black/90 mb-1">Title *</label>
                <input
                  type="text"
                  value={newSong.title}
                  onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibol text-black/90 mb-1">Artist</label>
                <input
                  type="text"
                  value={newSong.artist}
                  onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibol text-black/90 mb-1">Album</label>
                <input
                  type="text"
                  value={newSong.album}
                  onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibol text-black/90 mb-1">Duration</label>
                <input
                  type="text"
                  value={newSong.duration}
                  onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 3:18"
                />
              </div>
              <div>
                <label className="block text-sm font-semibol text-black/90 mb-1">Genre</label>
                <input
                  type="text"
                  value={newSong.genre}
                  onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddSong}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Song
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-1/2 max-w-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to permanently delete this song? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSong(deleteConfirm)}
                className="btn-red"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;
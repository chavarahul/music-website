import { useMemo, useState } from 'react';

const SongList = ({ currentUser }) => {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Anusha', artist: '', album: '', duration: '', genre: 'Pop' },
    { id: 2, title: 'Singout', artist: '', album: '', duration: '', genre: 'Indie Pop' },
    { id: 3, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', genre: 'Pop' },
    { id: 4, title: 'Peaches', artist: 'Justin Bieber ft. Daniel Caesar', album: 'Justice', duration: '3:18', genre: 'R&B' },
    { id: 5, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'Sour', duration: '', genre: '' },
  ]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('');

  const role = currentUser?.role;

  const filteredSongs = useMemo(() => {
    return songs
      .filter((song) =>
        song.title.toLowerCase().includes(filter.toLowerCase()) ||
        (song.artist && song.artist.toLowerCase().includes(filter.toLowerCase())) ||
        (song.album && song.album.toLowerCase().includes(filter.toLowerCase()))
      )
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
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

  const addSong = () => {
    const newSong = {
      id: songs.length + 1,
      title: `Song ${songs.length + 1}`,
      artist: `Artist ${Math.ceil(songs.length / 2)}`,
      album: `Album ${String.fromCharCode(88 + (songs.length % 3))}`,
      duration: '',
      genre: '',
    };
    setSongs([...songs, newSong]);
  };

  const deleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="album">Sort by Album</option>
        </select>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">No Grouping</option>
          <option value="genre">Group by Genre</option>
        </select>
        {role === 'admin' && (
          <button
            onClick={addSong}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Song
          </button>
        )}
      </div>
      <div className="overflow-y-auto max-h-[70vh] space-y-2">
        {groupBy && groupedSongs ? (
          Object.keys(groupedSongs).map((key) => (
            <div key={key} className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{key || 'Unknown'}</h2>
              <div className="grid grid-cols-1 gap-2">
                {groupedSongs[key].map((song) => (
                  <div
                    key={song.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{song.title}</div>
                      <div className="text-xs text-gray-600">{song.artist}</div>
                      <div className="text-xs text-gray-500">{song.album}</div>
                    </div>
                    <div className="text-xs text-gray-500 min-w-[60px] text-right">{song.duration}</div>
                    {role === 'admin' && (
                      <button
                        onClick={() => deleteSong(song.id)}
                        className="text-red-500 hover:text-red-700 text-xs ml-2"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : filteredSongs.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{song.title}</div>
                  <div className="text-xs text-gray-600">{song.artist}</div>
                  <div className="text-xs text-gray-500">{song.album}</div>
                </div>
                <div className="text-xs text-gray-500 min-w-[60px] text-right">{song.duration}</div>
                {role === 'admin' && (
                  <button
                    onClick={() => deleteSong(song.id)}
                    className="text-red-500 hover:text-red-700 text-xs ml-2"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-sm">No songs found matching your filter.</p>
        )}
      </div>
    </div>
  );
};

export default SongList;
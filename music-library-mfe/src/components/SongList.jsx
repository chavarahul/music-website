import React, { useMemo, useState } from 'react';
import { Songs } from '../constants/data';
import FilterControls from './FilterControls';
import SongCard from './SongCard';

const SongList = ({ currentUser }) => {
  const [songs, setSongs] = useState(Songs);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('');

  const role = currentUser?.role;

  const filteredSongs = useMemo(() => {
    return songs
      .filter((song) =>
        song.title.toLowerCase().includes(filter.toLowerCase()) ||
        song.artist.toLowerCase().includes(filter.toLowerCase()) ||
        song.album.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [songs, filter, sortBy]);

  const groupedSongs = useMemo(() => {
    if (!groupBy) return null;
    return filteredSongs.reduce((acc, song) => {
      const key = song[groupBy];
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
    };
    setSongs([...songs, newSong]);
  };

  const deleteSong = (id) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <div className="">
      <div className="mb-4 flex justify-between items-center">
        <FilterControls
          onFilterChange={setFilter}
          onSortChange={setSortBy}
          onGroupChange={setGroupBy}
        />
        {role === 'admin' && (
          <button
            onClick={addSong}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Song
          </button>
        )}
      </div>

      {groupBy && groupedSongs ? (
        Object.keys(groupedSongs).map((key) => (
          <div key={key}>
            <h2 className="text-xl font-semibold mb-2">{key}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSongs[key].map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onDelete={role === 'admin' ? deleteSong : null}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onDelete={role === 'admin' ? deleteSong : null}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;

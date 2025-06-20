import React from 'react';
import SongCard from './SongCard.jsx';

const SongGrid = ({ filteredSongs, groupedSongs, groupBy, role, deleteConfirm, setDeleteConfirm}) => {
  return (
    <>
      {filteredSongs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎵</div>
          <p className="text-gray-600 text-lg">No songs found.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or filters.</p>
        </div>
      ) : groupBy && groupedSongs ? (
        <div className="space-y-8">
          {Object.keys(groupedSongs).sort().map((groupKey) => (
            <div key={groupKey}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{groupKey}</h2>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                  {groupedSongs[groupKey].length} songs
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedSongs[groupKey].map((song) => (
                  <SongCard key={song.id} song={song} role={role} deleteConfirm={deleteConfirm} setDeleteConfirm={setDeleteConfirm} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} role={role} deleteConfirm={deleteConfirm} setDeleteConfirm={setDeleteConfirm} />
          ))}
        </div>
      )}
    </>
  );
};

export default SongGrid;
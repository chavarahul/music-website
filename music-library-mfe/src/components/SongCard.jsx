import React from 'react';
import { Trash2 } from 'lucide-react';

const SongCard = ({ song, role, setDeleteConfirm }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 border border-gray-200">
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
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            {song.genre || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
import React from 'react';
import { Trash2, User, Disc3, Clock } from 'lucide-react';

const SongCard = ({ song, role, setDeleteConfirm }) => {
  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">♪</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {song.title}
            </h3>
          </div>
        </div>
        
        {role === 'admin' && (
          <button
            onClick={() => setDeleteConfirm(song.id)}
            className="ml-4 w-8 h-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors duration-200"
            title="Delete song"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Artist</span>
            <p className="text-sm text-gray-700 truncate">{song.artist || 'Unknown Artist'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Disc3 className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Album</span>
            <p className="text-sm text-gray-700 truncate">{song.album || 'Unknown Album'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</span>
              <p className="text-sm text-gray-700">{song.duration || '-'}</p>
            </div>
          </div>
          
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            {song.genre || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
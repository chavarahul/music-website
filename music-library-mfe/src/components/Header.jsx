import React from 'react';
import {ChevronDown} from'lucide-react';

const Header = ({
  filteredSongsLength,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  groupBy,
  setGroupBy,
  sortOptions,
  groupOptions,
  showSortDropdown,
  setShowSortDropdown,
  showGroupDropdown,
  setShowGroupDropdown,
  role,
  setShowAddModal,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Music Library</h1>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          {filteredSongsLength} songs
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    sortBy === option.value ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
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
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    groupBy === option.value ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {role === 'admin' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="text-sm">Add Song</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const FilterControls = ({ onFilterChange, onSortChange, onGroupChange }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterChange = useCallback(
    debounce((value) => {
      onFilterChange(value.trim());
    }, 300),
    [onFilterChange]
  );

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
    debouncedFilterChange(value);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSortBy(value);
    onSortChange(value);
  };

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
    onGroupChange(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Filter by title, artist, or album"
        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md"
        value={filter}
        onChange={handleFilterChange}
      />
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 shadow-sm hover:shadow-md"
      >
        <option value="title">Sort by Title</option>
        <option value="artist">Sort by Artist</option>
        <option value="album">Sort by Album</option>
      </select>
      <select
        value={groupBy}
        onChange={handleGroupChange}
        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 shadow-sm hover:shadow-md"
      >
        <option value="">No Grouping</option>
        <option value="artist">Group by Artist</option>
        <option value="album">Group by Album</option>
      </select>
    </div>
  );
};

export default FilterControls;
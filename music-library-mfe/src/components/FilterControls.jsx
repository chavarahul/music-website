import React, { useState } from 'react'

const FilterControls = ({
    onFilterChange, onSortChange, onGroupChange
}) => {
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [groupBy, setGroupBy] = useState('');

    const handleFilterChange = (e) => {
        const { value } = e.target;
        setFilter(value);
        onFilterChange(value);
    }

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortBy(value);
        onSortChange(value);
    }

    const handleGroupChange = (e) => {
        setGroupBy(e.target.value);
        onGroupChange(e.target.value);
    };

    return (
        <div>
            <input
                type='text'
                placeholder='filter by title,artist , or album '
                className='border border-red-500 text-white'
                value={filter}
                onChange={handleFilterChange}
            />
            <select
                value={sortBy}
                onChange={handleSortChange}
            >
                <option value="title">Sort by Title</option>
                <option value="artist" className='text-red-400'>Sort by Artist</option>
                <option value="album">Sort by Album</option>
            </select>
            <select
                value={groupBy}
                onChange={handleGroupChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">No Grouping</option>
                <option value="artist">Group by Artist</option>
                <option value="album">Group by Album</option>
            </select>
        </div>
    )
}

export default FilterControls
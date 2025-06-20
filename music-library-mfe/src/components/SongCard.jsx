import React from 'react'

const SongCard = ({ song, onDelete }) => {
    return (
        <div className="p-4 border rounded bg-white shadow-sm hover:shadow-md">
            <h3>{song.title}</h3>
            <p>{song.album}</p>
            <p>{song.artist}</p>
            {
                onDelete && (
                    <button onClick={() => onDelete(song.id)}>
                        Delete
                    </button>
                )
            }
        </div>
    )
}

export default SongCard
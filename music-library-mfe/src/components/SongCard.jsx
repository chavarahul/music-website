const SongCard = ({ song, onDelete }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-[10px] shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900">{song.title}</h3>
      <p className="text-gray-600">{song.artist}</p>
      <p className="text-gray-600">{song.album}</p>
      {onDelete && (
        <button
          onClick={() => onDelete(song.id)}
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded-[10px] hover:bg-red-600 transition-all duration-200"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default SongCard;
import React from 'react';

const DeleteConfirmationModal = ({ deleteConfirm, setDeleteConfirm, handleDeleteSong }) => {
  return (
    deleteConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
          <p className="text-gray-600 mb-6">Are you sure you want to permanently delete this song? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteSong(deleteConfirm)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
import React, { useState } from 'react';
import { X, Music, User, Disc, Clock, Tag, AlertCircle } from 'lucide-react';

const AddSongModal = ({ showAddModal, setShowAddModal, newSong, setNewSong, handleAddSong, error, setError }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateTitle = (title) => {
    if (!title || title.trim().length === 0) return 'Title is required';
    if (title.trim().length < 2) return 'Title must be at least 2 characters';
    if (title.trim().length > 100) return 'Title must be less than 100 characters';
    return null;
  };

  const validateArtist = (artist) => {
    if (!artist || artist.trim().length === 0) return 'Artist is required';
    if (artist.trim().length < 2) return 'Artist name must be at least 2 characters';
    if (artist.trim().length > 50) return 'Artist name must be less than 50 characters';
    return null;
  };

  const validateAlbum = (album) => {
    if (!album || album.trim().length === 0) return 'Album is required';
    if (album.trim().length < 2) return 'Album name must be at least 2 characters';
    if (album.trim().length > 100) return 'Album name must be less than 100 characters';
    return null;
  };

  const validateDuration = (duration) => {
    if (!duration || duration.trim().length === 0) return 'Duration is required';
    
    // Support formats: MM:SS, M:SS, H:MM:SS
    const timeRegex = /^(?:(\d{1,2}):)?([0-5]?\d):([0-5]\d)$/;
    const simpleTimeRegex = /^([0-5]?\d):([0-5]\d)$/;
    
    if (!timeRegex.test(duration) && !simpleTimeRegex.test(duration)) {
      return 'Duration must be in format MM:SS or H:MM:SS (e.g., 3:45 or 1:23:45)';
    }
    
    // Additional validation for seconds
    const parts = duration.split(':');
    if (parts.length >= 2) {
      const seconds = parseInt(parts[parts.length - 1]);
      if (seconds >= 60) return 'Seconds must be less than 60';
    }
    
    return null;
  };

  const validateGenre = (genre) => {
    if (!genre || genre.trim().length === 0) return 'Genre is required';
    if (genre.trim().length < 2) return 'Genre must be at least 2 characters';
    if (genre.trim().length > 30) return 'Genre must be less than 30 characters';
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prev) => ({ ...prev, [name]: value }));
    
    // Clear global error
    if (error) setError('');
    
    // Real-time validation
    let fieldError = null;
    switch (name) {
      case 'title':
        fieldError = validateTitle(value);
        break;
      case 'artist':
        fieldError = validateArtist(value);
        break;
      case 'album':
        fieldError = validateAlbum(value);
        break;
      case 'duration':
        fieldError = validateDuration(value);
        break;
      case 'genre':
        fieldError = validateGenre(value);
        break;
    }
    
    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleFormSubmit = async () => {
    // Validate all fields
    const errors = {
      title: validateTitle(newSong.title),
      artist: validateArtist(newSong.artist),
      album: validateAlbum(newSong.album),
      duration: validateDuration(newSong.duration),
      genre: validateGenre(newSong.genre)
    };

    setValidationErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== null);
    
    if (hasErrors) {
      setError('Please fix the validation errors below');
      return;
    }

    setIsSubmitting(true);
    try {
      await handleAddSong();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowAddModal(false);
    setError('');
    setValidationErrors({});
  };

  // Format duration as user types
  const formatDuration = (value) => {
    // Remove any non-digit or colon characters
    const cleaned = value.replace(/[^\d:]/g, '');
    
    // Handle basic MM:SS format
    if (cleaned.length === 3 && cleaned.indexOf(':') === -1) {
      return cleaned.slice(0, 1) + ':' + cleaned.slice(1);
    }
    if (cleaned.length === 4 && cleaned.indexOf(':') === -1) {
      return cleaned.slice(0, 2) + ':' + cleaned.slice(2);
    }
    
    return cleaned;
  };

  const handleDurationChange = (e) => {
    const formatted = formatDuration(e.target.value);
    const syntheticEvent = {
      target: {
        name: 'duration',
        value: formatted
      }
    };
    handleInputChange(syntheticEvent);
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Music className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Add New Song</h2>
            </div>
            <button 
              onClick={handleClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Global Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Music className="w-4 h-4 text-green-600" />
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={newSong.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                  validationErrors.title 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="Enter song title"
              />
              {validationErrors.title && (
                <p className="text-red-600 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.title}
                </p>
              )}
            </div>

            {/* Artist Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-green-600" />
                Artist *
              </label>
              <input
                type="text"
                name="artist"
                value={newSong.artist}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                  validationErrors.artist 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="Enter artist name"
              />
              {validationErrors.artist && (
                <p className="text-red-600 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.artist}
                </p>
              )}
            </div>

            {/* Album Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Disc className="w-4 h-4 text-green-600" />
                Album *
              </label>
              <input
                type="text"
                name="album"
                value={newSong.album}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                  validationErrors.album 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="Enter album name"
              />
              {validationErrors.album && (
                <p className="text-red-600 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.album}
                </p>
              )}
            </div>

            {/* Duration Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-green-600" />
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={newSong.duration}
                onChange={handleDurationChange}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                  validationErrors.duration 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="e.g., 3:45"
                maxLength="8"
              />
              {validationErrors.duration && (
                <p className="text-red-600 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.duration}
                </p>
              )}
            </div>

            {/* Genre Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="w-4 h-4 text-green-600" />
                Genre *
              </label>
              <input
                type="text"
                name="genre"
                value={newSong.genre}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                  validationErrors.genre 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="e.g., Pop, Rock, Jazz"
              />
              {validationErrors.genre && (
                <p className="text-red-600 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.genre}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Music className="w-4 h-4" />
                  Add Song
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSongModal;
import React, { useState, useRef } from 'react';
import { Upload, Music, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function Uploads() {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: ''
  });

  // File state
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical',
    'Reggae', 'Blues', 'Folk', 'Indie', 'Alternative', 'Punk', 'Metal', 'Other'
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate file type and size
  const validateFile = (file) => {
    const validTypes = ['audio/mpeg', 'audio/mp3'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please select a valid MP3 file.');
      return false;
    }

    if (file.size > maxSize) {
      setErrorMessage('File size must be less than 50MB.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  // Handle file selection
  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      
      // Create audio preview
      const audioUrl = URL.createObjectURL(file);
      setFilePreview({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2), // Size in MB
        url: audioUrl,
        duration: null
      });

      // Get audio duration
      const audio = new Audio(audioUrl);
      audio.addEventListener('loadedmetadata', () => {
        setFilePreview(prev => ({
          ...prev,
          duration: formatDuration(audio.duration)
        }));
      });

      // Auto-fill form if possible
      const fileName = file.name.replace('.mp3', '');
      if (!formData.title) {
        setFormData(prev => ({ ...prev, title: fileName }));
      }
    }
  };

  // Format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Simulate form submission (replace with actual Axios call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setErrorMessage('Please select an MP3 file to upload.');
      return;
    }

    if (!formData.title.trim() || !formData.artist.trim()) {
      setErrorMessage('Please fill in the required fields (Title and Artist).');
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append('audio', selectedFile);
      uploadData.append('title', formData.title.trim());
      uploadData.append('artist', formData.artist.trim());
      uploadData.append('album', formData.album.trim());
      uploadData.append('genre', formData.genre);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Simulate API call (replace with actual Axios request)
      /*
      const response = await axios.post('/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      */

      // Simulate successful upload
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setUploadStatus('success');
        
        // Reset form after success
        setTimeout(() => {
          setFormData({ title: '', artist: '', album: '', genre: '' });
          setSelectedFile(null);
          setFilePreview(null);
          setUploadStatus('idle');
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      }, 2000);

    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Upload failed. Please try again.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Upload Your Music
          </h1>
          <p className="text-gray-300 text-lg">
            Share your music with the world. Upload your MP3 files and reach new listeners.
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
          
          {/* File Upload Area */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Audio File <span className="text-pink-400">*</span>
            </label>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragOver
                  ? 'border-pink-400 bg-pink-400/10'
                  : selectedFile
                  ? 'border-green-400 bg-green-400/5'
                  : 'border-gray-600 hover:border-pink-400 hover:bg-white/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp3,audio/mpeg"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              {selectedFile ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                  <div>
                    <p className="text-green-400 font-medium">File Selected Successfully</p>
                    <p className="text-gray-400 text-sm mt-1">Click to change file</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-gray-300 font-medium">
                      Drop your MP3 file here or click to browse
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Maximum file size: 50MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File Preview */}
          {filePreview && (
            <div className="mb-8 bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Music className="w-8 h-8 text-pink-400" />
                  <div>
                    <p className="font-medium text-white">{filePreview.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{filePreview.size} MB</span>
                      {filePreview.duration && (
                        <>
                          <span>•</span>
                          <span>{filePreview.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {filePreview.url && (
                <audio 
                  controls 
                  className="w-full mt-4"
                  style={{ filter: 'invert(1) hue-rotate(180deg)' }}
                >
                  <source src={filePreview.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          )}

          {/* Form Fields */}
          <div onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Song Title <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors duration-200"
                placeholder="Enter song title"
                required
              />
            </div>

            {/* Artist */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Artist <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors duration-200"
                placeholder="Enter artist name"
                required
              />
            </div>

            {/* Album */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Album
              </label>
              <input
                type="text"
                name="album"
                value={formData.album}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors duration-200"
                placeholder="Enter album name (optional)"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-colors duration-200"
              >
                <option value="">Select a genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-gray-800">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            {/* Upload Progress */}
            {uploadStatus === 'uploading' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Uploading...</span>
                  <span className="text-pink-400">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {uploadStatus === 'success' && (
              <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Upload successful! Your music has been uploaded.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploadStatus === 'uploading'}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {uploadStatus === 'uploading' ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : uploadStatus === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Upload Complete</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload Music</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Upload Tips */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upload Tips</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Ensure your MP3 file is high quality (320kbps recommended)</li>
            <li>• Fill in accurate metadata for better discoverability</li>
            <li>• Choose the most appropriate genre for your music</li>
            <li>• Make sure you own the rights to the music you're uploading</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
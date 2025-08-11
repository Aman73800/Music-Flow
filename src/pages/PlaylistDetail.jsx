import React, { useState } from 'react';
import { Play, Pause, Heart, Share, MoreHorizontal, Clock, Download } from 'lucide-react';

export default function PlaylistDetail() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // Sample playlist data
  const playlist = {
    id: 1,
    title: "Chill Vibes",
    description: "Perfect playlist for relaxing after a long day. Featuring the best indie, electronic, and acoustic tracks to help you unwind.",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
    totalDuration: "2h 34m",
    songCount: 24,
    createdBy: "MusicFlow",
    createdAt: "2024-01-15"
  };

  const songs = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Rivers",
      duration: "3:42",
      album: "Nocturnal",
      plays: 1250000
    },
    {
      id: 2,
      title: "Ocean Waves",
      artist: "Coastal Sounds",
      duration: "4:15",
      album: "Serenity",
      plays: 890000
    },
    {
      id: 3,
      title: "Urban Sunset",
      artist: "City Lights",
      duration: "3:28",
      album: "Metropolitan",
      plays: 2100000
    },
    {
      id: 4,
      title: "Forest Path",
      artist: "Nature's Call",
      duration: "5:03",
      album: "Wilderness",
      plays: 670000
    },
    {
      id: 5,
      title: "Digital Love",
      artist: "Synthwave Collective",
      duration: "4:32",
      album: "Neon Nights",
      plays: 1850000
    },
    {
      id: 6,
      title: "Coffee Shop Jazz",
      artist: "The Smooth Trio",
      duration: "3:55",
      album: "Café Sessions",
      plays: 1320000
    },
    {
      id: 7,
      title: "Mountain High",
      artist: "Alpine Echoes",
      duration: "4:18",
      album: "Elevation",
      plays: 780000
    },
    {
      id: 8,
      title: "Rainy Day Blues",
      artist: "Storm Clouds",
      duration: "3:33",
      album: "Weather Reports",
      plays: 940000
    },
    {
      id: 9,
      title: "Starlight Serenade",
      artist: "Cosmic Dreams",
      duration: "4:45",
      album: "Galaxy",
      plays: 1560000
    },
    {
      id: 10,
      title: "Golden Hour",
      artist: "Sunset Boulevard",
      duration: "3:21",
      album: "Evening Glow",
      plays: 2300000
    }
  ];

  const handlePlaySong = (songId) => {
    if (currentlyPlaying === songId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(songId);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatPlays = (plays) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M`;
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(0)}K`;
    }
    return plays.toString();
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white scroll-smooth">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-end space-y-6 lg:space-y-0 lg:space-x-8 relative z-10">
            
            {/* Playlist Cover */}
            <div className="flex-shrink-0">
              <div className="w-60 h-60 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl mx-auto lg:mx-0">
                <img
                  src={playlist.coverImage}
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Playlist Info */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-medium text-gray-300 mb-2">PLAYLIST</p>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {playlist.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                {playlist.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-gray-400 mb-8">
                <span className="font-medium text-white">{playlist.createdBy}</span>
                <span>•</span>
                <span>{playlist.songCount} songs</span>
                <span>•</span>
                <span>{playlist.totalDuration}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Play All</span>
                </button>
                
                <button
                  onClick={toggleLike}
                  className={`p-3 rounded-full transition-all duration-200 transform hover:scale-105 ${
                    isLiked ? 'bg-pink-500 text-white' : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105">
                  <Share className="w-5 h-5" />
                </button>
                
                <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-sm font-medium text-gray-400 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-2">Plays</div>
            <div className="col-span-1 flex justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          {/* Songs */}
          <div className="divide-y divide-white/5">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`group px-4 md:px-6 py-4 hover:bg-white/5 transition-all duration-200 ${
                  currentlyPlaying === song.id ? 'bg-white/10' : ''
                }`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  
                  {/* Track Number / Play Button */}
                  <div className="col-span-2 md:col-span-1 flex items-center">
                    <button
                      onClick={() => handlePlaySong(song.id)}
                      className="group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <div className="relative">
                        <span className={`text-sm text-gray-400 group-hover:hidden ${currentlyPlaying === song.id ? 'hidden' : ''}`}>
                          {index + 1}
                        </span>
                        <div className={`group-hover:block ${currentlyPlaying === song.id ? 'block' : 'hidden'}`}>
                          {currentlyPlaying === song.id ? (
                            <Pause className="w-4 h-4 text-pink-400" />
                          ) : (
                            <Play className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Song Info */}
                  <div className="col-span-8 md:col-span-5">
                    <div className="flex flex-col">
                      <h3 className={`font-medium transition-colors duration-200 ${
                        currentlyPlaying === song.id ? 'text-pink-400' : 'text-white group-hover:text-pink-300'
                      }`}>
                        {song.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{song.artist}</p>
                    </div>
                  </div>

                  {/* Album (Hidden on mobile) */}
                  <div className="hidden md:block col-span-3">
                    <p className="text-sm text-gray-400">{song.album}</p>
                  </div>

                  {/* Plays (Hidden on mobile) */}
                  <div className="hidden md:block col-span-2">
                    <p className="text-sm text-gray-400">{formatPlays(song.plays)}</p>
                  </div>

                  {/* Duration */}
                  <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center items-center space-x-2">
                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-all duration-200">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="text-sm text-gray-400">{song.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playlist Stats */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Created on {new Date(playlist.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
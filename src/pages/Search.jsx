import React, { useState, useEffect, useMemo } from 'react';
import { Search as Searchh, Play, Pause, Music, User, Disc, X, TrendingUp } from 'lucide-react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  // Sample data
  const allData = {
    songs: [
      {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Rivers",
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
        duration: "3:42",
        plays: 1250000
      },
      {
        id: 2,
        title: "Ocean Waves",
        artist: "Coastal Sounds",
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop&crop=center",
        duration: "4:15",
        plays: 890000
      },
      {
        id: 3,
        title: "Urban Sunset",
        artist: "City Lights",
        thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop&crop=center",
        duration: "3:28",
        plays: 2100000
      },
      {
        id: 4,
        title: "Digital Love",
        artist: "Synthwave Collective",
        thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&h=80&fit=crop&crop=center",
        duration: "4:32",
        plays: 1850000
      },
      {
        id: 5,
        title: "Coffee Shop Jazz",
        artist: "The Smooth Trio",
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
        duration: "3:55",
        plays: 1320000
      }
    ],
    artists: [
      {
        id: 1,
        name: "Luna Rivers",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c8e64d8a?w=80&h=80&fit=crop&crop=face",
        followers: 125000,
        verified: true
      },
      {
        id: 2,
        name: "Coastal Sounds",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        followers: 89000,
        verified: false
      },
      {
        id: 3,
        name: "City Lights",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        followers: 210000,
        verified: true
      },
      {
        id: 4,
        name: "Synthwave Collective",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        followers: 185000,
        verified: true
      }
    ],
    albums: [
      {
        id: 1,
        name: "Nocturnal",
        artist: "Luna Rivers",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center",
        year: 2024,
        tracks: 12
      },
      {
        id: 2,
        name: "Serenity",
        artist: "Coastal Sounds",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop&crop=center",
        year: 2023,
        tracks: 10
      },
      {
        id: 3,
        name: "Metropolitan",
        artist: "City Lights",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop&crop=center",
        year: 2024,
        tracks: 15
      },
      {
        id: 4,
        name: "Neon Nights",
        artist: "Synthwave Collective",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop&crop=center",
        year: 2023,
        tracks: 8
      }
    ]
  };

  const trendingSearches = [
    "Midnight Dreams", "Luna Rivers", "Electronic", "Jazz", "Indie Rock", "Chill Vibes"
  ];

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Simulate search loading
  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [debouncedQuery]);

  // Filter results based on search query
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return { songs: [], artists: [], albums: [] };
    }

    const query = debouncedQuery.toLowerCase();
    
    return {
      songs: allData.songs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query)
      ),
      artists: allData.artists.filter(artist => 
        artist.name.toLowerCase().includes(query)
      ),
      albums: allData.albums.filter(album => 
        album.name.toLowerCase().includes(query) || 
        album.artist.toLowerCase().includes(query)
      )
    };
  }, [debouncedQuery]);

  const hasResults = searchResults.songs.length > 0 || 
                   searchResults.artists.length > 0 || 
                   searchResults.albums.length > 0;

  const handlePlay = (songId) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
  };

  const handleTrendingClick = (term) => {
    setSearchQuery(term);
  };

  const formatPlays = (plays) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M plays`;
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(0)}K plays`;
    }
    return `${plays} plays`;
  };

  const formatFollowers = (followers) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M followers`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(0)}K followers`;
    }
    return `${followers} followers`;
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Search Music
          </h1>
          <p className="text-gray-300 text-lg">
            Discover songs, artists, and albums
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Searchh className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for songs, artists, or albums..."
              className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300">Searching...</p>
          </div>
        )}

        {/* No Search Query - Show Trending */}
        {!debouncedQuery && !isLoading && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-pink-400" />
                <h2 className="text-xl font-semibold text-white">Trending Searches</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrendingClick(term)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {debouncedQuery && !isLoading && (
          <div className="max-w-6xl mx-auto">
            {!hasResults ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                <p className="text-gray-400">Try searching for something else</p>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* Songs Section */}
                {searchResults.songs.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Music className="w-5 h-5 text-pink-400" />
                      <h2 className="text-xl font-semibold text-white">Songs</h2>
                      <span className="text-sm text-gray-400">({searchResults.songs.length})</span>
                    </div>
                    <div className="space-y-3">
                      {searchResults.songs.map((song) => (
                        <div
                          key={song.id}
                          className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={song.thumbnail}
                              alt={song.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <button
                              onClick={() => handlePlay(song.id)}
                              className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              {currentlyPlaying === song.id ? (
                                <Pause className="w-4 h-4 text-white" />
                              ) : (
                                <Play className="w-4 h-4 text-white" />
                              )}
                            </button>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white truncate">{song.title}</h3>
                            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="hidden sm:block">{formatPlays(song.plays)}</span>
                            <span>{song.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Artists Section */}
                {searchResults.artists.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <User className="w-5 h-5 text-pink-400" />
                      <h2 className="text-xl font-semibold text-white">Artists</h2>
                      <span className="text-sm text-gray-400">({searchResults.artists.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {searchResults.artists.map((artist) => (
                        <div
                          key={artist.id}
                          className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                          <div className="text-center">
                            <div className="relative inline-block mb-4">
                              <img
                                src={artist.avatar}
                                alt={artist.name}
                                className="w-20 h-20 rounded-full object-cover mx-auto"
                              />
                              {artist.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <h3 className="font-medium text-white mb-1 truncate">{artist.name}</h3>
                            <p className="text-sm text-gray-400 truncate">{formatFollowers(artist.followers)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Albums Section */}
                {searchResults.albums.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Disc className="w-5 h-5 text-pink-400" />
                      <h2 className="text-xl font-semibold text-white">Albums</h2>
                      <span className="text-sm text-gray-400">({searchResults.albums.length})</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {searchResults.albums.map((album) => (
                        <div
                          key={album.id}
                          className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                          <div className="text-center">
                            <div className="relative mb-4">
                              <img
                                src={album.cover}
                                alt={album.name}
                                className="w-full aspect-square rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Play className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <h3 className="font-medium text-white mb-1 truncate text-sm">{album.name}</h3>
                            <p className="text-xs text-gray-400 truncate">{album.artist}</p>
                            <p className="text-xs text-gray-500 mt-1">{album.year} • {album.tracks} tracks</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
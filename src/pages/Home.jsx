import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import LoginModal from '../components/LoginModal';


export default function Home() {
  // Sample playlist data
  const [showLogin, setShowLogin] = useState(false);

  const playlists = [
    {
      id: 1,
      title: "Chill Vibes",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      songCount: 24
    },
    {
      id: 2,
      title: "Workout Hits",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center",
      songCount: 18
    },
    {
      id: 3,
      title: "Jazz Classics",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      songCount: 32
    },
    {
      id: 4,
      title: "Indie Rock",
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center",
      songCount: 15
    },
    {
      id: 5,
      title: "Electronic Dreams",
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&crop=center",
      songCount: 27
    },
    {
      id: 6,
      title: "Acoustic Sessions",
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center",
      songCount: 21
    },
    {
      id: 7,
      title: "Hip Hop Beats",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
      songCount: 19
    },
    {
      id: 8,
      title: "Classical Relaxation",
      thumbnail: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop&crop=center",
      songCount: 36
    }
  ];

  return (

    <div className="min-h-screen  w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to MusicFlow
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover your next favorite song with our curated playlists crafted for every mood and moment
          </p>
        </div>

        {/* Curated Playlists Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
            Curated Playlists
          </h2>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">


            {playlists.map((playlist) => (
              <Link to={`/playlists/${playlist.id}`} key={playlist.id}>
                <div
                  key={playlist.id}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10"
                >
                  {/* Thumbnail Container */}
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Playlist Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-pink-300 transition-colors duration-300">
                      {playlist.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {playlist.songCount} songs
                    </p>
                  </div>

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </Link>
            ))}

          </div>
        </div>


        {/* Additional Features Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-2">Curated Quality</h3>
              <p className="text-gray-300">Hand-picked tracks from music experts</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-4">🎧</div>
              <h3 className="text-xl font-semibold mb-2">High Quality Audio</h3>
              <p className="text-gray-300">Crystal clear sound for the best experience</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Any Device</h3>
              <p className="text-gray-300">Listen anywhere, anytime, on any device</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
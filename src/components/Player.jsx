import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from 'lucide-react';

export default function Player() {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  // Sample track data
  const [currentTrack] = useState({
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Rivers",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center",
    audioUrl: "https://www.soundjay.com/misc/sounds-cash-register-01.mp3" // Placeholder audio
  });

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Update progress
  useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateTime = () => setCurrentTime(audio.currentTime);
  const updateDuration = () => setDuration(audio.duration);
  const onEnded = () => setIsPlaying(false);

  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('ended', onEnded);

  return () => {
    audio.removeEventListener('timeupdate', updateTime);
    audio.removeEventListener('loadedmetadata', updateDuration);
    audio.removeEventListener('ended', onEnded);
  };
}, []);

useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = volume;
  }
}, [volume]);

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
}, [isPlaying]);

const togglePlayPause = () => {
  setIsPlaying(!isPlaying);
};


  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 shadow-2xl z-50">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentTrack.audioUrl}
        preload="metadata"
      />

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Track Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <img
                src={currentTrack.thumbnail}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-medium truncate text-sm">
                {currentTrack.title}
              </p>
              <p className="text-gray-400 truncate text-xs">
                {currentTrack.artist}
              </p>
            </div>
            <button
              onClick={toggleLike}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isLiked ? 'text-pink-500 hover:text-pink-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Main Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1 max-w-md mx-8">
            {/* Control Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={previousTrack}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="bg-white hover:bg-gray-200 text-gray-900 rounded-full p-2 transition-all duration-200 transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              
              <button
                onClick={nextTrack}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
              >
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full relative transition-all duration-100"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>
              
              <span className="text-xs text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3 min-w-0 flex-1 justify-end">
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            <div className="w-20 hidden sm:block">
              <input
                ref={volumeRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, rgb(236, 72, 153) 0%, rgb(147, 51, 234) ${(isMuted ? 0 : volume) * 100}%, rgb(55, 65, 81) ${(isMuted ? 0 : volume) * 100}%, rgb(55, 65, 81) 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .slider:hover::-webkit-slider-thumb {
          opacity: 1;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .slider:hover::-moz-range-thumb {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
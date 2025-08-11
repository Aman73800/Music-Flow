import React, { useState } from 'react';
import { User, Music, Heart, Edit3, LogOut, Play, MoreVertical, Calendar, Settings, Bell, Shield, Palette, Volume2, Download, Globe, Eye, Trash2, Save } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('songs');
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      playlistUpdates: true,
      newFollowers: true,
      musicRecommendations: false
    },
    privacy: {
      profileVisibility: 'public',
      playlistVisibility: 'public',
      showListeningHistory: false,
      allowMessaging: true
    },
    playback: {
      audioQuality: 'high',
      autoPlay: true,
      crossfade: false,
      volume: 75,
      downloadQuality: 'medium'
    },
    appearance: {
      theme: 'dark',
      language: 'english',
      compactMode: false
    }
  });
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    joinDate: "January 2024",
    totalSongs: 24,
    totalPlaylists: 8
  };

  // Mock uploaded songs
  const uploadedSongs = [
    {
      id: 1,
      title: "Midnight Vibes",
      duration: "3:42",
      uploadDate: "2 days ago",
      plays: 1204,
      genre: "Electronic"
    },
    {
      id: 2,
      title: "Summer Breeze",
      duration: "4:15",
      uploadDate: "1 week ago",
      plays: 856,
      genre: "Indie Pop"
    },
    {
      id: 3,
      title: "Urban Nights",
      duration: "3:28",
      uploadDate: "2 weeks ago",
      plays: 2341,
      genre: "Hip Hop"
    },
    {
      id: 4,
      title: "Acoustic Dreams",
      duration: "5:03",
      uploadDate: "3 weeks ago",
      plays: 687,
      genre: "Acoustic"
    }
  ];

  // Mock saved playlists
  const savedPlaylists = [
    {
      id: 1,
      title: "Chill Vibes",
      songCount: 32,
      createdDate: "1 week ago",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=120&fit=crop"
    },
    {
      id: 2,
      title: "Workout Mix",
      songCount: 45,
      createdDate: "2 weeks ago",
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop"
    },
    {
      id: 3,
      title: "Late Night Study",
      songCount: 28,
      createdDate: "1 month ago",
      cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=120&h=120&fit=crop"
    },
    {
      id: 4,
      title: "Road Trip Essentials",
      songCount: 67,
      createdDate: "2 months ago",
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=120&fit=crop"
    }
  ];

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handlePlaySong = (songId) => {
    console.log('Playing song:', songId);
  };

  const handlePlayPlaylist = (playlistId) => {
    console.log('Playing playlist:', playlistId);
  };

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would typically send the settings to your backend
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
      // Handle account deletion
    }
  };

  const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );

  const SettingItem = ({ label, description, children }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
      <div className="flex-1">
        <div className="font-medium">{label}</div>
        {description && <div className="text-sm text-gray-400 mt-1">{description}</div>}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-purple-600' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const Select = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const Slider = ({ value, onChange, min = 0, max = 100 }) => (
    <div className="flex items-center gap-3 w-32">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #9333ea 0%, #9333ea ${value}%, #374151 ${value}%, #374151 100%)`
        }}
      />
      <span className="text-sm text-gray-400 w-8">{value}%</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white w-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white/20 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-900"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-300 text-lg mb-4">{user.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">{user.totalSongs}</div>
                  <div className="text-sm text-gray-400">Songs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">{user.totalPlaylists}</div>
                  <div className="text-sm text-gray-400">Playlists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">12.5k</div>
                  <div className="text-sm text-gray-400">Total Plays</div>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400 mb-6">
                <Calendar className="w-4 h-4" />
                <span>Joined {user.joinDate}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  onClick={handleEditProfile}
                  className="flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab('songs')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'songs'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Music className="w-4 h-4" />
              Uploaded Songs
            </button>
            <button
              onClick={() => setActiveTab('playlists')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'playlists'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              Saved Playlists
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'songs' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Your Uploaded Songs</h2>
            {uploadedSongs.map((song) => (
              <div
                key={song.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => handlePlaySong(song.id)}
                      className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors group-hover:scale-110"
                    >
                      <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{song.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{song.genre}</span>
                        <span>•</span>
                        <span>{song.duration}</span>
                        <span>•</span>
                        <span>{song.plays} plays</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 hidden sm:block">{song.uploadDate}</span>
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Saved Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200 group cursor-pointer"
                  onClick={() => handlePlayPlaylist(playlist.id)}
                >
                  <div className="relative mb-4">
                    <img
                      src={playlist.cover}
                      alt={playlist.title}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button className="absolute bottom-2 right-2 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-purple-700 transition-all duration-200 hover:scale-110">
                      <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1 truncate">{playlist.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{playlist.songCount} songs</p>
                  <p className="text-gray-500 text-xs">{playlist.createdDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            
            {/* Notifications Settings */}
            <SettingsSection title="Notifications" icon={Bell}>
              <SettingItem 
                label="Email Notifications" 
                description="Receive updates via email"
              >
                <Toggle 
                  checked={settings.notifications.emailNotifications}
                  onChange={(value) => handleSettingChange('notifications', 'emailNotifications', value)}
                />
              </SettingItem>
              <SettingItem 
                label="Push Notifications" 
                description="Get notified on your device"
              >
                <Toggle 
                  checked={settings.notifications.pushNotifications}
                  onChange={(value) => handleSettingChange('notifications', 'pushNotifications', value)}
                />
              </SettingItem>
              <SettingItem 
                label="Playlist Updates" 
                description="When someone updates shared playlists"
              >
                <Toggle 
                  checked={settings.notifications.playlistUpdates}
                  onChange={(value) => handleSettingChange('notifications', 'playlistUpdates', value)}
                />
              </SettingItem>
              <SettingItem 
                label="New Followers" 
                description="When someone follows you"
              >
                <Toggle 
                  checked={settings.notifications.newFollowers}
                  onChange={(value) => handleSettingChange('notifications', 'newFollowers', value)}
                />
              </SettingItem>
              <SettingItem 
                label="Music Recommendations" 
                description="Personalized music suggestions"
              >
                <Toggle 
                  checked={settings.notifications.musicRecommendations}
                  onChange={(value) => handleSettingChange('notifications', 'musicRecommendations', value)}
                />
              </SettingItem>
            </SettingsSection>

            {/* Privacy Settings */}
            <SettingsSection title="Privacy & Security" icon={Shield}>
              <SettingItem 
                label="Profile Visibility" 
                description="Who can see your profile"
              >
                <Select
                  value={settings.privacy.profileVisibility}
                  onChange={(value) => handleSettingChange('privacy', 'profileVisibility', value)}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'friends', label: 'Friends Only' },
                    { value: 'private', label: 'Private' }
                  ]}
                />
              </SettingItem>
              <SettingItem 
                label="Playlist Visibility" 
                description="Default visibility for new playlists"
              >
                <Select
                  value={settings.privacy.playlistVisibility}
                  onChange={(value) => handleSettingChange('privacy', 'playlistVisibility', value)}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'unlisted', label: 'Unlisted' },
                    { value: 'private', label: 'Private' }
                  ]}
                />
              </SettingItem>
              <SettingItem 
                label="Show Listening History" 
                description="Let others see what you're listening to"
              >
                <Toggle 
                  checked={settings.privacy.showListeningHistory}
                  onChange={(value) => handleSettingChange('privacy', 'showListeningHistory', value)}
                />
              </SettingItem>
              <SettingItem 
                label="Allow Messaging" 
                description="Let other users send you messages"
              >
                <Toggle 
                  checked={settings.privacy.allowMessaging}
                  onChange={(value) => handleSettingChange('privacy', 'allowMessaging', value)}
                />
              </SettingItem>
            </SettingsSection>

            {/* Playback Settings */}
            <SettingsSection title="Playback & Audio" icon={Volume2}>
              <SettingItem 
                label="Audio Quality" 
                description="Streaming quality preference"
              >
                <Select
                  value={settings.playback.audioQuality}
                  onChange={(value) => handleSettingChange('playback', 'audioQuality', value)}
                  options={[
                    { value: 'low', label: 'Low (96kbps)' },
                    { value: 'medium', label: 'Medium (160kbps)' },
                    { value: 'high', label: 'High (320kbps)' },
                    { value: 'lossless', label: 'Lossless' }
                  ]}
                />
              </SettingItem>
              <SettingItem 
                label="Auto Play" 
                description="Automatically play recommended songs"
              >
                <Toggle 
                  checked={settings.playback.autoPlay}
                  onChange={(value) => handleSettingChange('playback', 'autoPlay', value)}
                />
              </SettingItem>
              <SettingItem 
                label="Crossfade" 
                description="Smooth transitions between songs"
              >
                <Toggle 
                  checked={settings.playback.crossfade}
                  onChange={(value) => handleSettingChange('playback', 'crossfade', value)}
                />
              </SettingItem>
              <SettingItem 
                label="Master Volume" 
                description="Default volume level"
              >
                <Slider
                  value={settings.playback.volume}
                  onChange={(value) => handleSettingChange('playback', 'volume', value)}
                />
              </SettingItem>
              <SettingItem 
                label="Download Quality" 
                description="Quality for offline downloads"
              >
                <Select
                  value={settings.playback.downloadQuality}
                  onChange={(value) => handleSettingChange('playback', 'downloadQuality', value)}
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' }
                  ]}
                />
              </SettingItem>
            </SettingsSection>

            {/* Appearance Settings */}
            <SettingsSection title="Appearance & Language" icon={Palette}>
              <SettingItem 
                label="Theme" 
                description="Choose your preferred theme"
              >
                <Select
                  value={settings.appearance.theme}
                  onChange={(value) => handleSettingChange('appearance', 'theme', value)}
                  options={[
                    { value: 'dark', label: 'Dark' },
                    { value: 'light', label: 'Light' },
                    { value: 'auto', label: 'Auto' }
                  ]}
                />
              </SettingItem>
              <SettingItem 
                label="Language" 
                description="Display language"
              >
                <Select
                  value={settings.appearance.language}
                  onChange={(value) => handleSettingChange('appearance', 'language', value)}
                  options={[
                    { value: 'english', label: 'English' },
                    { value: 'spanish', label: 'Español' },
                    { value: 'french', label: 'Français' },
                    { value: 'german', label: 'Deutsch' }
                  ]}
                />
              </SettingItem>
              <SettingItem 
                label="Compact Mode" 
                description="Use a more compact interface"
              >
                <Toggle 
                  checked={settings.appearance.compactMode}
                  onChange={(value) => handleSettingChange('appearance', 'compactMode', value)}
                />
              </SettingItem>
            </SettingsSection>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleSaveSettings}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
              
              <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: 2px solid #ffffff;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: 2px solid #ffffff;
        }
      `}</style>
    </div>
  );
};

export default Profile;
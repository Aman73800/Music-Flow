import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


// Import Components
import Player from './components/Player';
import Uploads from './components/Uploads';

// Import Pages
import Home from './pages/Home';
import LoginSignupPages from './pages/LoginSignupPages';
import NotFound from './pages/NotFound';
import PlaylistDetail from './pages/PlaylistDetail';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';

function App() {

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Music player state
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      // Simulate checking for stored auth token
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('currentUser');

      if (token && user) {
        setIsAuthenticated(true);
        setCurrentUser(JSON.parse(user));
      } else {
        setCurrentPage('auth');
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);



  // Navigation handler
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Authentication handlers
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setCurrentPage('home');
    localStorage.setItem('authToken', 'mock-token-' + Date.now());
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentSong(null);
    setIsPlaying(false);
    setPlaylist([]);
    setCurrentPage('auth');
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  };

  // Music player handlers
  const handlePlaySong = (song, songPlaylist = []) => {
    setCurrentSong(song);
    setPlaylist(songPlaylist);
    setIsPlaying(true);
  };

  const handlePauseSong = () => {
    setIsPlaying(false);
  };

  const handleResumeSong = () => {
    setIsPlaying(true);
  };

  const handleNextSong = () => {
    if (playlist.length > 0 && currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentSong(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrevSong = () => {
    if (playlist.length > 0 && currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      setCurrentSong(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  // Main Layout Component for authenticated users
  const MainLayout = ({ children }) => (
    <div className="flex mt-14 h-screen bg-gray-900">

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Music Player */}
        {currentSong && (
          <Player
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlay={handleResumeSong}
            onPause={handlePauseSong}
            onNext={handleNextSong}
            onPrev={handlePrevSong}
          />
        )}
      </div>
    </div>
  );

  // Render current page content
  const renderCurrentPage = () => {
    if (!isAuthenticated) {
      return (
        <LoginSignupPages
          onLogin={handleLogin}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <MainLayout>
            <Home
              onPlaySong={handlePlaySong}
              currentUser={currentUser}
            />
          </MainLayout>
        );

      case 'search':
        return (
          <MainLayout>
            <Search
              onPlaySong={handlePlaySong}
            />
          </MainLayout>
        );

      case 'profile':
        return (
          <MainLayout>
            <Profile
              currentUser={currentUser}
              onLogout={handleLogout}
              onPlaySong={handlePlaySong}
            />
          </MainLayout>
        );

      case 'uploads':
        return (
          <MainLayout>
            <Uploads
              currentUser={currentUser}
            />
          </MainLayout>
        );

      case 'playlists':
        return (
          <MainLayout>
            <PlaylistDetail
              onPlaySong={handlePlaySong}
              onNavigate={handleNavigation}
            />
          </MainLayout>
        );

      case '404':
        return (
          <MainLayout>
            <NotFound onNavigate={handleNavigation} />
          </MainLayout>
        );

      default:
        return (
          <MainLayout>
            <Home
              onPlaySong={handlePlaySong}
              currentUser={currentUser}
            />
          </MainLayout>
        );
    }

  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        currentUser={currentUser}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />
      
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <main className="flex-1 -mt-8 ml-0 h-screen w-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    onPlaySong={handlePlaySong}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/search"
                element={<Search onPlaySong={handlePlaySong} />}
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    currentUser={currentUser}
                    onLogout={handleLogout}
                    onPlaySong={handlePlaySong}
                  />
                }
              />
              

              <Route
                path="/uploads"
                element={<Uploads currentUser={currentUser} />}
              />
              <Route
                path="/login"
                element={<LoginSignupPages currentUser={currentUser} />}
              />
              <Route
                path="/playlists/:id"
                element={
                  <PlaylistDetail
                    onPlaySong={handlePlaySong}
                    onNavigate={handleNavigation}
                  />
                }
              />
              <Route
                path="/playlists"
                element={
                  <PlaylistDetail
                    onPlaySong={handlePlaySong}
                    onNavigate={handleNavigation}
                  />
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Music Player */}
          {currentSong && (
            <Player
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={handleResumeSong}
              onPause={handlePauseSong}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
            />
          )}
        </div>
      
    </>
  );

}

export default App;
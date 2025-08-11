import React, { useState } from 'react';
import { Home, Compass, Library, User, Menu, X, Upload } from 'lucide-react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navigationLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/search', icon: Compass },
    { name: 'Library', href: '/playlists', icon: Library }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-white text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  MusicFlow
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className="group flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                    >
                      <IconComponent className="w-4 h-4 mr-2 group-hover:text-pink-400 transition-colors duration-200" />
                      <span className="font-medium">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center">
              {/* Profile Avatar */}
              <div className="relative">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  onClick={() => navigate('/profile')}>
                  <User className="h-5 w-5 text-white" />
                </button>

                {/* Online Indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full"></div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden ml-4">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-4">
                {/* Other buttons or profile */}
                <button
                  onClick={() => navigate('/search')}
                  className="p-2 rounded-full hover:bg-gray-700 transition"
                  title="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                {/* Upload button */}
                <button
                  onClick={() => navigate('/uploads')}
                  className="p-2 rounded-full hover:bg-gray-700 transition"
                  title="Search"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>
              {/* Login Button */}
              <div className="p-2 rounded-full ">
                  <button className='bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105'
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-lg border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5 mr-3 group-hover:text-pink-400 transition-colors duration-200" />
                    <span className="font-medium text-base">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
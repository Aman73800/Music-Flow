import React, { useState, useEffect } from 'react';
import { Home, Music, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const [bounce, setBounce] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);

  // Trigger bounce animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setBounce(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Generate floating musical notes
  useEffect(() => {
    const icons = [];
    for (let i = 0; i < 6; i++) {
      icons.push({
        id: i,
        delay: i * 0.5,
        size: Math.random() * 20 + 15,
        left: Math.random() * 80 + 10,
        duration: Math.random() * 3 + 4
      });
    }
    setFloatingIcons(icons);
  }, []);

  const handleGoHome = () => {
    // In a real app, this would use React Router navigation
    console.log('Navigating to home page');
    // Example: navigate('/') or window.location.href = '/'
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Floating Musical Notes Background */}
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute opacity-20 text-purple-300"
          style={{
            left: `${icon.left}%`,
            animation: `float ${icon.duration}s ease-in-out infinite`,
            animationDelay: `${icon.delay}s`,
            fontSize: `${icon.size}px`
          }}
        >
          <Music className="w-full h-full" />
        </div>
      ))}

      {/* Main Content */}
      <div className="text-center px-4 relative z-10 max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className={`mb-8 transform transition-all duration-1000 ${bounce ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}`}>
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-4 select-none">
            404
          </h1>
          
          {/* Animated Search Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Search className="w-20 h-20 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 animate-ping">
                <Search className="w-20 h-20 text-purple-600 opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Oops! We couldn't find what you're looking for.
          </p>
          <p className="text-gray-400">
            The page you're trying to reach doesn't exist or may have been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            Go to Homepage
          </button>
          
          <button
            onClick={handleGoBack}
            className="group flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-gray-500"
          >
            <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
            Go Back
          </button>
        </div>

        {/* Fun Interactive Element */}
        <div className="mt-12">
          <p className="text-gray-500 text-sm mb-4">
            While you're here, enjoy some floating music notes! 🎵
          </p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60"
                style={{ animationDelay: `${dot * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
import React, { useState, useEffect } from 'react';

export default function Settings({ currentUser, onLogout }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  const handleNotificationsToggle = () => setNotificationsEnabled(!notificationsEnabled);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Preferences</h2>

        <div className="flex items-center justify-between mb-4">
          <label htmlFor="darkMode" className="font-medium">
            Dark Mode
          </label>
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={handleDarkModeToggle}
            className="cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="font-medium">
            Enable Notifications
          </label>
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={handleNotificationsToggle}
            className="cursor-pointer"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Account</h2>
        {currentUser ? (
          <div>
            <p className="mb-2">Logged in as: <strong>{currentUser.name || currentUser.email}</strong></p>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </section>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit2, Save, X, Bookmark, History, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Developer',
    email: 'dev@devpulse.ai',
    avatar: 'DV',
    joinedAt: 'January 2024',
    bio: 'Passionate developer exploring new technologies.',
    location: 'Remote',
    website: 'https://devpulse.ai'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('devpulse_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEditedUser(parsed);
    }
  }, []);

  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem('devpulse_user', JSON.stringify(editedUser));
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Articles Read', value: 142 },
    { label: 'Bookmarks', value: 28 },
    { label: 'Searches', value: 56 },
    { label: 'Days Active', value: 45 }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gold-gradient flex items-center justify-center text-4xl font-bold text-black">
                  {user.avatar}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-dark-100 border border-dark-300 flex items-center justify-center hover:bg-dark-200 transition-colors">
                  <Edit2 className="w-4 h-4 text-gold" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Name</label>
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="w-full bg-dark-100 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Email</label>
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="w-full bg-dark-100 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Bio</label>
                      <textarea
                        value={editedUser.bio}
                        onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        className="w-full bg-dark-100 border border-dark-300 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold"
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-gold text-black rounded-lg font-medium hover:bg-gold-light transition-colors"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 bg-dark-100 text-gray-400 rounded-lg font-medium hover:bg-dark-200 transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h1 className="font-display text-3xl font-bold text-white">{user.name}</h1>
                      {saved && (
                        <span className="text-green-400 text-sm">✓ Saved</span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-4">{user.bio}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {user.email}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {user.joinedAt}
                      </span>
                      <span>{user.location}</span>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 bg-dark-100 border border-dark-300 rounded-lg text-sm text-gray-300 hover:border-gold transition-colors"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <a href="/bookmarks" className="card p-6 flex items-center space-x-4 hover:border-gold transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Bookmarks</h3>
                <p className="text-sm text-gray-500">Your saved articles</p>
              </div>
            </a>
            
            <a href="/history" className="card p-6 flex items-center space-x-4 hover:border-gold transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <History className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white">History</h3>
                <p className="text-sm text-gray-500">Recently viewed</p>
              </div>
            </a>
            
            <a href="/settings" className="card p-6 flex items-center space-x-4 hover:border-gold transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Settings</h3>
                <p className="text-sm text-gray-500">Customize your experience</p>
              </div>
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

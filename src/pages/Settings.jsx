import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Palette, Globe, Shield, Key, Save, X, Check } from 'lucide-react';
import Navbar from '../components/Navbar';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    emailAlerts: false,
    language: 'en',
    autoplay: true,
    compactView: false
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('devpulse_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('devpulse_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const settingSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        { key: 'theme', type: 'select', options: ['dark', 'light', 'system'], label: 'Theme' },
        { key: 'compactView', type: 'toggle', label: 'Compact View' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { key: 'notifications', type: 'toggle', label: 'Push Notifications' },
        { key: 'emailAlerts', type: 'toggle', label: 'Email Alerts' }
      ]
    },
    {
      title: 'Preferences',
      icon: Globe,
      settings: [
        { key: 'language', type: 'select', options: ['en', 'es', 'fr', 'de'], label: 'Language' },
        { key: 'autoplay', type: 'toggle', label: 'Autoplay Videos' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="font-display text-3xl font-bold text-white flex items-center">
                <SettingsIcon className="w-8 h-8 text-gold mr-3" />
                Settings
              </h1>
              <p className="text-gray-400 mt-1">Customize your DevPulse experience</p>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-gold-gradient text-black hover:shadow-lg hover:shadow-gold/20'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>

          {/* Settings Sections */}
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * sectionIndex }}
              className="card p-6 mb-6"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-3">
                  <section.icon className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-dark-200 last:border-0">
                    <div>
                      <label className="text-gray-300 font-medium">{setting.label}</label>
                    </div>
                    
                    {setting.type === 'toggle' ? (
                      <button
                        onClick={() => handleChange(setting.key, !settings[setting.key])}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings[setting.key] ? 'bg-gold' : 'bg-dark-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            settings[setting.key] ? 'left-7' : 'left-1'
                          }`}
                        />
                      </button>
                    ) : setting.type === 'select' ? (
                      <select
                        value={settings[setting.key]}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        className="bg-dark-100 border border-dark-300 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-gold"
                      >
                        {setting.options.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card p-6 mb-6"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-white">Account & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-dark-200">
                <div className="flex items-center">
                  <Key className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <label className="text-gray-300 font-medium">Change Password</label>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                </div>
                <button className="text-gold text-sm hover:underline">Update</button>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <label className="text-gray-300 font-medium">Two-Factor Authentication</label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="text-gold text-sm hover:underline">Enable</button>
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card p-6 border border-red-500/20"
          >
            <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
            <p className="text-gray-400 text-sm mb-4">
              These actions are irreversible. Please be certain.
            </p>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg text-sm hover:bg-red-500/10 transition-colors">
                Delete Account
              </button>
              <button className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Export Data
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  Github, 
  Wrench, 
  Bookmark, 
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [userName, setUserName] = useState('DevUser');

  useEffect(() => {
    const loadProfile = () => {
      const saved = localStorage.getItem('devpulse_profile');
      if (saved) {
        try {
          setUserName(JSON.parse(saved).displayName || 'DevUser');
        } catch (e) {
          console.error('Error parsing profile', e);
        }
      }
    };
    loadProfile();
    window.addEventListener('profileUpdate', loadProfile);
    return () => window.removeEventListener('profileUpdate', loadProfile);
  }, []);


  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Newspaper, label: 'Developer News', path: '/news' },
    { icon: Github, label: 'Trending Repos', path: '/repositories' },
    { icon: Wrench, label: 'Developer Tools', path: '/tools' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-secondary border-r border-border z-50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`flex items-center gap-3 py-8 ${isCollapsed ? 'px-4 justify-center' : 'px-6'}`}>
        <div className="w-10 h-10 bg-gold-gradient rounded-lg flex-shrink-0 flex items-center justify-center shadow-gold-glow">
          <Zap className="text-background w-6 h-6" />
        </div>
        {!isCollapsed && (
          <h1 className="text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent italic whitespace-nowrap overflow-hidden">
            DevPulse
          </h1>
        )}
      </div>

      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-border border border-white/10 rounded-full flex items-center justify-center text-text-muted hover:text-gold-primary transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <nav className={`py-4 space-y-2 ${isCollapsed ? 'px-3' : 'px-4'}`}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={isCollapsed ? item.label : ''}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center px-0' : ''}`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap overflow-hidden">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-text-muted mb-2 uppercase tracking-widest font-bold">{userName}</p>
            <p className="text-sm text-text-primary mb-3">Upgrade for advanced AI insights</p>
            <button 
              onClick={() => alert('This feature is coming soon! Stay tuned for DevPulse Pro.')}
              className="w-full py-2 bg-gold-primary/20 text-gold-primary border border-gold-primary/30 rounded-lg text-xs font-bold hover:bg-gold-primary hover:text-background transition-all"
            >
              Upgrade Now
            </button>

          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

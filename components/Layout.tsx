
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-indigo-600 hover:text-indigo-700 transition-colors">
            LUMINA<span className="text-slate-800">BLOG</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link to="/" className={`${location.pathname === '/' ? 'text-indigo-600' : 'hover:text-indigo-600'} transition-colors`}>Home</Link>
            <a href="#" className="hover:text-indigo-600 transition-colors">Archive</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            <Link to="/create" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              New Post
            </Link>
          </nav>

          <button className="md:hidden p-2 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-white text-xl font-bold mb-4">Lumina Blog</h2>
          <p className="max-w-md mx-auto mb-8 text-sm leading-relaxed">
            A minimalist space for high-quality storytelling and technological exploration, powered by generative intelligence.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">RSS</a>
          </div>
          <p className="text-xs">© 2024 Lumina Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

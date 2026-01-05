
import React, { useState, useMemo } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { INITIAL_POSTS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [posts] = useState<Post[]>(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter(post => post.category === activeCategory);
  }, [posts, activeCategory]);

  const featuredPost = posts[0];
  const recentPosts = filteredPosts.filter(p => p.id !== featuredPost.id || activeCategory !== 'All');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {activeCategory === 'All' && (
        <section className="mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase mb-6">Featured Story</h2>
          <PostCard post={featuredPost} featured={true} />
        </section>
      )}

      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.length > 0 ? (
            recentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-indigo-900 rounded-[3rem] p-12 text-center text-white mb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Lumina Weekly</h2>
          <p className="text-indigo-200 mb-8 max-w-lg mx-auto">Get the best of technology, culture, and design insights delivered directly to your inbox every Sunday morning.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-grow px-6 py-3 rounded-full bg-white/10 border border-white/20 focus:bg-white focus:text-slate-900 focus:outline-none transition-all placeholder:text-indigo-300"
            />
            <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg">
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;

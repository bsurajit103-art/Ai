
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  if (featured) {
    return (
      <Link to={`/post/${post.id}`} className="group relative block overflow-hidden rounded-3xl bg-slate-900 aspect-[16/9] md:aspect-[21/9]">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-4xl">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold mb-4 tracking-wider uppercase">
            {post.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-indigo-200 transition-colors leading-tight">
            {post.title}
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-6 line-clamp-2 max-w-2xl">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-white/20" />
            <div className="text-sm">
              <p className="text-white font-medium">{post.author.name}</p>
              <p className="text-slate-400">{post.date} · {post.readTime}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold tracking-widest uppercase shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full" />
            <span className="text-xs font-medium text-slate-700">{post.author.name}</span>
          </div>
          <span className="text-xs text-slate-400">{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';
import { INITIAL_POSTS } from '../constants';
import { generatePostSummary } from '../services/geminiService';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    const found = INITIAL_POSTS.find(p => p.id === id);
    if (found) {
      setPost(found);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleSummarize = async () => {
    if (!post || isSummarizing) return;
    setIsSummarizing(true);
    try {
      const res = await generatePostSummary(post.content);
      setSummary(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSummarizing(false);
    }
  };

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Post not found</h2>
        <Link to="/" className="text-indigo-600 font-medium">Return home</Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Header */}
      <header className="relative py-16 md:py-32 bg-slate-900">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to feed
          </Link>
          <span className="block text-indigo-400 font-bold tracking-widest uppercase text-xs mb-6">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-slate-300 text-sm">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border-2 border-white/10" />
            <div className="text-left">
              <p className="font-medium text-white">{post.author.name}</p>
              <p>{post.date} · {post.readTime} read</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 md:-mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl shadow-slate-200/50">
          {/* AI Tools Box */}
          <div className="mb-12 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-600 text-white rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 11-8-8c-.7-.7-1.3-.7-2 0l-8 8"/><path d="M21 7V3h-4"/><path d="m21 3-9 9"/><path d="M15 13 9 19l-4-4"/></svg>
                </span>
                <h3 className="font-bold text-indigo-900 uppercase text-xs tracking-wider">AI Assistant</h3>
              </div>
              <button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 transition-colors bg-white px-3 py-1.5 rounded-full border border-indigo-200 shadow-sm"
              >
                {isSummarizing ? 'Summarizing...' : 'Summarize Post'}
              </button>
            </div>
            {summary ? (
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line animate-in fade-in slide-in-from-top-4 duration-500">
                {summary}
              </div>
            ) : (
              <p className="text-indigo-400 text-xs italic">Generate a quick summary of this article using Gemini.</p>
            )}
          </div>

          <article className="prose prose-slate lg:prose-xl max-w-none">
            {post.content.split('\n\n').map((para, i) => {
              if (para.startsWith('###')) {
                return <h3 key={i} className="text-2xl font-bold mt-10 mb-6 text-slate-900">{para.replace('### ', '')}</h3>;
              }
              if (para.startsWith('- ') || para.startsWith('1. ')) {
                return (
                  <ul key={i} className="list-disc pl-5 space-y-2 my-6 text-slate-700">
                    {para.split('\n').map((item, j) => (
                      <li key={j}>{item.replace(/^(- |\d+\. )/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-slate-700 leading-relaxed mb-6 text-lg">{para}</p>;
            })}
          </article>

          <div className="mt-16 pt-12 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                  Share
                </button>
              </div>
              <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">
                Last updated {post.date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

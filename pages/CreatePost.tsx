
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateBlogPostContent, generatePostImage, suggestTitles } from '../services/geminiService';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [coverImage, setCoverImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);

  const handleSuggestTitles = async () => {
    if (!topic) return;
    const res = await suggestTitles(topic);
    setSuggestedTitles(res);
  };

  const handleGenerateContent = async () => {
    if (!topic || isGenerating) return;
    setIsGenerating(true);
    try {
      const res = await generateBlogPostContent(topic);
      setContent(res);
      if (!title && suggestedTitles.length > 0) {
        setTitle(suggestedTitles[0]);
      }
    } catch (e) {
      alert("Error generating content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!topic || isGeneratingImage) return;
    setIsGeneratingImage(true);
    try {
      const res = await generatePostImage(topic || title);
      setCoverImage(res);
    } catch (e) {
      alert("Error generating image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in the title and content.");
      return;
    }
    // In a real app, this would be an API call
    alert("Post created successfully! (Simulation)");
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Create New Story</h1>
        <p className="text-slate-600">Use our AI tools to draft, polish, and illustrate your thoughts in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Editor Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story title..."
                className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Cover Image</label>
              <div className="relative aspect-[16/9] bg-slate-100 rounded-3xl overflow-hidden border border-dashed border-slate-300 group">
                {coverImage ? (
                  <>
                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setCoverImage('')}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <p className="text-sm">Use AI or upload an image</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Content</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your masterpiece..."
                className="w-full h-96 px-6 py-6 rounded-3xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none leading-relaxed text-slate-700"
              />
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-sm font-medium focus:outline-none"
                >
                  <option>Technology</option>
                  <option>Lifestyle</option>
                  <option>Architecture</option>
                  <option>Design</option>
                  <option>Culture</option>
                </select>
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-10 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Publish Story
              </button>
            </div>
          </form>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/></svg>
              </span>
              <h3 className="font-bold text-lg">AI Powerhouse</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Post Topic / Prompt</label>
                <input 
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Rise of autonomous drones"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:bg-white focus:text-slate-900 focus:outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleSuggestTitles}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v5h5"/><path d="m7 11 5 5 5-5"/></svg>
                  Suggest Titles
                </button>
                <button 
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <span className="animate-pulse">Writing Draft...</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                      Generate Content
                    </>
                  )}
                </button>
                <button 
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-white/10 disabled:opacity-50"
                >
                  {isGeneratingImage ? (
                    <span className="animate-pulse">Creating Image...</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      Generate Image
                    </>
                  )}
                </button>
              </div>

              {suggestedTitles.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Title Ideas</p>
                  <ul className="space-y-2">
                    {suggestedTitles.map((t, idx) => (
                      <li 
                        key={idx} 
                        onClick={() => setTitle(t)}
                        className="text-xs text-slate-300 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

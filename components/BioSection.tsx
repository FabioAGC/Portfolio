import React, { useState, useCallback } from 'react';
import { Edit2, Save, Sparkles, X, Github, Linkedin, Mail } from 'lucide-react';
import { enhanceBio } from '../services/geminiService';
import { SocialLinks } from '../types';

interface BioSectionProps {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  socials: SocialLinks;
  onUpdateBio: (newBio: string) => void;
}

const BioSection: React.FC<BioSectionProps> = ({ name, title, bio, avatarUrl, socials, onUpdateBio }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBio, setCurrentBio] = useState(bio);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    onUpdateBio(currentBio);
    setIsEditing(false);
    setError(null);
  };

  const handleCancel = () => {
    setCurrentBio(bio);
    setIsEditing(false);
    setError(null);
  };

  const handleEnhance = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const enhanced = await enhanceBio(currentBio);
      setCurrentBio(enhanced);
    } catch (err) {
      setError("Could not generate AI bio. Please check API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [currentBio]);

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="md:col-span-7 flex flex-col text-left order-1 md:order-1">
             <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-12 bg-accent"></span>
                <span className="text-accent font-semibold tracking-wider uppercase text-sm">Introduction</span>
             </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light mb-8">
              {title}
            </p>

            {/* Editable Bio Area */}
            <div className="relative mb-10 group/bio w-full">
              {isEditing ? (
                <div className="bg-secondary rounded-xl p-6 border border-slate-700 shadow-xl w-full">
                  <label htmlFor="bio-editor" className="block text-sm font-medium text-slate-400 mb-2">
                    Edit your intro
                  </label>
                  <textarea
                    id="bio-editor"
                    value={currentBio}
                    onChange={(e) => setCurrentBio(e.target.value)}
                    className="w-full h-32 bg-primary border border-slate-800 rounded-lg p-4 text-slate-200 focus:ring-1 focus:ring-sky-500 focus:border-transparent outline-none resize-none transition-all font-light"
                    placeholder="Brief introduction..."
                  />
                  
                  {error && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <X size={14} /> {error}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-between items-center">
                    <button
                      onClick={handleEnhance}
                      disabled={isGenerating}
                      className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 disabled:opacity-50 transition-colors"
                    >
                      <Sparkles size={16} />
                      {isGenerating ? 'Enhancing...' : 'AI Enhance'}
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-md text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 rounded-md bg-white text-black hover:bg-slate-200 transition-colors text-sm font-semibold flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                   <p className="text-lg text-slate-300 leading-relaxed font-light border-l-4 border-slate-800 pl-6 py-1">
                    {bio || "No bio yet. Click edit to add one."}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-0 right-0 p-2 text-slate-600 hover:text-accent transition-colors opacity-0 group-hover/bio:opacity-100"
                    title="Edit Bio"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Socials - Left aligned */}
            <div className="flex items-center gap-6">
              <a 
                href={socials.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={28} strokeWidth={1.5} />
              </a>
              <a 
                href={socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} strokeWidth={1.5} />
              </a>
              <a 
                href={`mailto:${socials.email}`}
                className="text-slate-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
                aria-label="Email"
              >
                <Mail size={28} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Right Column: Photo Card */}
          <div className="md:col-span-5 relative group order-2 md:order-2">
            {/* Decorative back shapes */}
            <div className="absolute top-4 -right-4 w-full h-full bg-slate-800/50 rounded-2xl border border-white/5 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
            <div className="absolute -inset-1 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Main Image Container */}
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900 border border-slate-700 shadow-2xl">
              <img 
                src={avatarUrl} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
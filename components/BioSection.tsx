import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SocialLinks } from '../types';

interface BioSectionProps {
  name: string;
  title: string;
  about: string;
  avatarUrl: string;
  socials: SocialLinks;
}

const BioSection: React.FC<BioSectionProps> = ({ name, title, about, avatarUrl, socials }) => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Backdrop Container */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-2xl overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Content */}
            <div className="md:col-span-7 flex flex-col text-left order-1 md:order-1 font-display">
              
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{name}</span>
                </h1>
                
                {/* Socials next to name */}
                <div className="flex items-center gap-4">
                  <a 
                    href={socials.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github size={24} strokeWidth={1.5} />
                  </a>
                  <a 
                    href={socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} strokeWidth={1.5} />
                  </a>
                  <a 
                    href={`mailto:${socials.email}`} 
                    className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail size={24} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-slate-400 font-light mb-8">
                {title}
              </p>

              {/* About Area */}
              <div className="relative mb-0 w-full">
                 <div className="text-lg text-slate-300 leading-relaxed font-light border-l-4 border-slate-800 pl-6 py-1">
                  {about.split('\n\n').map((paragraph, i) => (
                    <p key={i} className={i > 0 ? 'mt-4' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
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
      </div>
    </section>
  );
};

export default BioSection;
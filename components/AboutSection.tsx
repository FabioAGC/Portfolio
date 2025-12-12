import React from 'react';
import { Instagram, Film, Gamepad2, Tv, ArrowUpRight, BookOpen, MonitorPlay } from 'lucide-react';
import { SocialLinks } from '../types';

interface AboutSectionProps {
  about: string;
  title: string;
  socials: SocialLinks;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about, title, socials }) => {
  const links = [
    { 
      name: 'Instagram', 
      url: socials.instagram, 
      icon: Instagram, 
      color: 'group-hover:text-pink-400', 
    },
    { 
      name: 'Anilist', 
      url: socials.anilist, 
      icon: Tv, 
      color: 'group-hover:text-blue-400', 
    },
    { 
      name: 'Backloggd', 
      url: socials.backloggd, 
      icon: Gamepad2, 
      color: 'group-hover:text-emerald-400', 
    },
    { 
      name: 'Letterboxd', 
      url: socials.letterboxd, 
      icon: Film, 
      color: 'group-hover:text-orange-400', 
    },
    { 
      name: 'Goodreads', 
      url: socials.goodreads, 
      icon: BookOpen, 
      color: 'group-hover:text-amber-200', 
    },
    { 
      name: 'Serializd', 
      url: socials.serializd, 
      icon: MonitorPlay, 
      color: 'group-hover:text-indigo-400', 
    }
  ].filter(link => link.url); 

  return (
    <section className="py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* About Content - Clean Typography */}
          <div className="md:col-span-7 lg:col-span-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              {title}
            </h2>
            <div className="text-slate-400 text-lg md:text-xl leading-relaxed whitespace-pre-line space-y-6 font-light">
              {about}
            </div>
          </div>

          {/* Linktree Grid - Minimalist Cards */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="h-full flex flex-col justify-between gap-5">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 rounded-xl bg-secondary border border-white/5 hover:border-white/20 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-slate-400 transition-colors ${link.color}`}>
                      <link.icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="font-medium text-slate-300 group-hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
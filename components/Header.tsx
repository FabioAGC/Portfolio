import React from 'react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { SocialLinks } from '../types';

interface HeaderProps {
  socials: SocialLinks;
}

const Header: React.FC<HeaderProps> = ({ socials }) => {
  return (
    <header className="sticky top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-accent">
          <Terminal size={24} />
          <span className="font-bold text-xl tracking-tight text-white">DevFolio</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a 
            href={socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 transition-all duration-300 transform hover:scale-110 hover:text-accent"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href={socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 transition-all duration-300 transform hover:scale-110 hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href={`mailto:${socials.email}`}
            className="text-slate-400 transition-all duration-300 transform hover:scale-110 hover:text-accent"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Terminal, Menu, X } from 'lucide-react';
import { SocialLinks } from '../types';

interface HeaderProps {
  socials: SocialLinks;
  language: 'en' | 'pt';
  setLanguage: (lang: 'en' | 'pt') => void;
  translations: {
    home: string;
    about: string;
    tech: string;
    experience: string;
    projects: string;
  };
}

const Header: React.FC<HeaderProps> = ({ socials, language, setLanguage, translations }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'tech', 'experience', 'projects'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: translations.home, href: '#home', label: translations.home },
    { name: translations.about, href: '#about', label: translations.about },
    { name: translations.tech, href: '#tech', label: translations.tech },
    { name: translations.experience, href: '#experience', label: translations.experience },
    { name: translations.projects, href: '#projects', label: translations.projects },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary/90 backdrop-blur-md border-b border-white/5 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Logo Area */}
        <a 
          href="#home" 
          className="flex items-center space-x-2 group"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-accent/50 transition-colors duration-300">
             <Terminal size={20} className="text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none text-white tracking-tight">Fabio.dev</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <div className="flex items-center bg-slate-900/50 rounded-full border border-white/5 p-1 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a 
                key={`${link.href}-${link.name}`} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`
                  relative px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 cursor-pointer
                  ${activeSection === link.href.substring(1) 
                    ? 'text-white bg-white/10 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop Actions (Language Only) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Slider */}
          <div className="flex items-center bg-slate-900/50 rounded-lg p-1 border border-white/5 relative z-50">
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all duration-300 cursor-pointer ${
                language === 'pt' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all duration-300 cursor-pointer ${
                language === 'en' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              US
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Language Toggle */}
          <div className="flex items-center bg-slate-900/50 rounded-lg p-1 border border-white/5">
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                language === 'pt' ? 'bg-white/10 text-white' : 'text-slate-500'
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                language === 'en' ? 'bg-white/10 text-white' : 'text-slate-500'
              }`}
            >
              US
            </button>
          </div>

          <button 
            type="button"
            className="p-2 text-slate-300 hover:text-white bg-slate-900/50 rounded-md border border-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-2">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-mono border border-transparent hover:border-white/5 transition-all cursor-pointer"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className="text-accent opacity-50 mr-2">&gt;</span>
              {link.label}
            </a>
          ))}
          <div className="h-px bg-white/10 my-4 mx-4"></div>
          <div className="flex justify-center gap-6 pb-4">
             <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><Github size={24}/></a>
             <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><Linkedin size={24}/></a>
             <a href={`mailto:${socials.email}`} className="text-slate-400 hover:text-white"><Mail size={24}/></a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
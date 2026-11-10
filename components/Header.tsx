import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, Translations } from '../types';

interface HeaderProps {
  name: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations['nav'];
}

const SECTION_IDS = ['about', 'tech', 'experience', 'projects', 'contact'] as const;

const Header: React.FC<HeaderProps> = ({ name, language, setLanguage, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section crossing the upper part of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );
    const home = document.getElementById('home');
    if (home) observer.observe(home);
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // Sections are re-mounted when the language changes, so observe them again.
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const links = SECTION_IDS.map((id, i) => ({
    id,
    index: String(i + 1).padStart(2, '0'),
    label: t[id],
  }));

  const languageToggle = (
    <div className="lang" role="group" aria-label={t.language}>
      {(['pt', 'en'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          className="lang__option"
          aria-pressed={language === lang}
          onClick={() => setLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <header className={`header ${isScrolled || isMenuOpen ? 'header--solid' : ''}`}>
      <div className="container header__inner">
        <a className="header__brand" href="#home" onClick={() => setIsMenuOpen(false)}>
          {name}
        </a>

        <nav className="header__nav" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={activeSection === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          {languageToggle}
          <button
            type="button"
            className="header__menu-button"
            aria-label={isMenuOpen ? t.close : t.menu}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="mobile-menu" aria-label="Mobile">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)}>
              <span>{link.index}</span>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;

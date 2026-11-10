import React, { useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import type { SharkSpec } from '../vendor/ascii-sharks';
import { SocialLinks, Translations } from '../types';
import OceanBackdrop from './OceanBackdrop';

interface HeroProps {
  name: string;
  title: string;
  avatarUrl: string;
  socials: SocialLinks;
  sharks: SharkSpec[];
  t: Translations['hero'];
}

const Hero: React.FC<HeroProps> = ({ name, title, avatarUrl, socials, sharks, t }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="home" className="hero">
      <OceanBackdrop sharks={sharks} cover="scrim" />

      <div className="container hero__content">
        <div className="hero__text">
          <p className="eyebrow hero__eyebrow">{title}</p>
          <h1 className="hero__name">{name}</h1>

          <div className="hero__actions">
            <a className="button button--solid" href="#projects">
              {t.viewProjects}
              <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a className="button" href="#contact">
              {t.contact}
            </a>
            <ul className="hero__socials">
              <li>
                <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a href={`mailto:${socials.email}`} aria-label="Email">
                  <Mail size={20} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {!imageFailed && (
          <figure className="hero__portrait">
            <img src={avatarUrl} alt={name} onError={() => setImageFailed(true)} />
          </figure>
        )}
      </div>
    </section>
  );
};

export default Hero;

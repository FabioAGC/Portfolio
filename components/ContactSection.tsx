import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SocialLinks, Translations } from '../types';
import RevealOnScroll from './RevealOnScroll';

interface ContactSectionProps {
  socials: SocialLinks;
  t: Translations['headers'];
}

const ContactSection: React.FC<ContactSectionProps> = ({ socials, t }) => {
  const links = [
    { label: 'GitHub', href: socials.github },
    { label: 'LinkedIn', href: socials.linkedin },
  ];

  return (
    <RevealOnScroll className="contact">
      <p className="contact__title">{t.contactTitle}</p>
      <p className="contact__text">{t.contactText}</p>
      <a className="contact__email" href={`mailto:${socials.email}`}>
        {socials.email}
      </a>
      <ul className="contact__links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </RevealOnScroll>
  );
};

export default ContactSection;

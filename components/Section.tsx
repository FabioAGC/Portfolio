import React from 'react';
import RevealOnScroll from './RevealOnScroll';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  children: React.ReactNode;
}

/** A numbered section: a small label, then the content at full width. */
const Section: React.FC<SectionProps> = ({ id, index, label, children }) => (
  <section id={id} className="section" aria-labelledby={`${id}-title`}>
    <div className="container">
      <RevealOnScroll>
        <h2 id={`${id}-title`} className="section__label">
          <span className="section__index">{index}</span>
          {label}
        </h2>
      </RevealOnScroll>
      {children}
    </div>
  </section>
);

export default Section;

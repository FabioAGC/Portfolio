import React from 'react';
import RevealOnScroll from './RevealOnScroll';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  children: React.ReactNode;
}

/** Editorial section: a numbered label in the left rail, content on the right. */
const Section: React.FC<SectionProps> = ({ id, index, label, children }) => (
  <section id={id} className="section" aria-labelledby={`${id}-title`}>
    <div className="container section__grid">
      <RevealOnScroll className="section__rail">
        <h2 id={`${id}-title`} className="section__label">
          <span className="section__index">{index}</span>
          {label}
        </h2>
      </RevealOnScroll>
      <div className="section__body">{children}</div>
    </div>
  </section>
);

export default Section;

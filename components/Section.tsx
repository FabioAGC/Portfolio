import React from 'react';
import type { SharkSpec } from '../vendor/ascii-sharks';
import OceanBackdrop from './OceanBackdrop';
import RevealOnScroll from './RevealOnScroll';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  sharks: SharkSpec[];
  children: React.ReactNode;
}

/** A numbered section with its own stretch of ocean behind the content. */
const Section: React.FC<SectionProps> = ({ id, index, label, sharks, children }) => (
  <section id={id} className="section" aria-labelledby={`${id}-title`}>
    <OceanBackdrop sharks={sharks} />
    <div className="container section__inner">
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

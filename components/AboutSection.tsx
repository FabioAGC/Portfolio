import React from 'react';
import RevealOnScroll from './RevealOnScroll';

interface AboutSectionProps {
  about: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const [lead, ...rest] = about.split('\n\n');

  return (
    <RevealOnScroll className="about__text">
      <p className="lead">{lead}</p>
      {rest.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </RevealOnScroll>
  );
};

export default AboutSection;

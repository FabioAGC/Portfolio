import React, { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';

interface AboutSectionProps {
  name: string;
  about: string;
  avatarUrl: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ name, about, avatarUrl }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [lead, ...rest] = about.split('\n\n');

  return (
    <div className={`about ${imageFailed ? 'about--no-image' : ''}`}>
      <RevealOnScroll className="about__text">
        <p className="lead">{lead}</p>
        {rest.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </RevealOnScroll>

      {!imageFailed && (
        <RevealOnScroll delay={120} className="about__figure">
          <figure className="portrait">
            <img src={avatarUrl} alt={name} loading="lazy" onError={() => setImageFailed(true)} />
          </figure>
        </RevealOnScroll>
      )}
    </div>
  );
};

export default AboutSection;

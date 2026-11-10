import React from 'react';
import { JobExperience } from '../types';
import RevealOnScroll from './RevealOnScroll';

interface ExperienceSectionProps {
  experience: JobExperience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => (
  <ol className="timeline">
    {experience.map((job, i) => (
      <li key={job.id}>
        <RevealOnScroll delay={i * 80} className="timeline__item">
          <p className="timeline__period">{job.period}</p>
          <div>
            <h3 className="timeline__role">{job.role}</h3>
            <p className="timeline__company">{job.company}</p>
            <p className="timeline__description">{job.description}</p>
          </div>
        </RevealOnScroll>
      </li>
    ))}
  </ol>
);

export default ExperienceSection;

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { JobExperience } from '../types';
import RevealOnScroll from './RevealOnScroll';

interface ExperienceSectionProps {
  experience: JobExperience[];
}

/** Two letters for a company: "General Mills" → "GM", "RW tech" → "RW". */
const initials = (company: string) => {
  const words = company.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  // A leading acronym stands for the company on its own.
  if (words[0] && words[0].length >= 2 && words[0] === words[0].toUpperCase()) return words[0].slice(0, 2);
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
};

/** The company's logo, or its initials when there is no logo file yet. */
const CompanyMark: React.FC<{ job: JobExperience }> = ({ job }) => {
  const [failed, setFailed] = useState(false);
  return (
    <span className="timeline__mark" aria-hidden="true">
      {job.logo && !failed ? (
        <img src={job.logo} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        initials(job.company)
      )}
    </span>
  );
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => (
  <ol className="timeline">
    {experience.map((job, i) => (
      <li key={job.id}>
        <RevealOnScroll delay={i * 80} className="timeline__item">
          <p className="timeline__period">{job.period}</p>
          <div>
            <div className="timeline__head">
              <CompanyMark job={job} />
              <div>
                <h3 className="timeline__role">{job.role}</h3>
                <p className="timeline__company">{job.company}</p>
              </div>
            </div>
            <p className="timeline__description">{job.description}</p>
            {job.highlight && (
              <div className="highlight">
                <p className="highlight__label">{job.highlight.label}</p>
                <p className="highlight__title">{job.highlight.title}</p>
                <p className="highlight__summary">{job.highlight.summary}</p>
              </div>
            )}
            {job.link && (
              <a className="text-link" href={job.link.href} target="_blank" rel="noopener noreferrer">
                {job.link.label}
                <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
              </a>
            )}
          </div>
        </RevealOnScroll>
      </li>
    ))}
  </ol>
);

export default ExperienceSection;

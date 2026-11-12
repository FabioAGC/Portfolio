import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Label for the link to the project's code. */
  codeLabel: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, codeLabel }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="project">
      <div className="project__media">
        {!project.imageUrl || imageFailed ? (
          <span className="project__placeholder" aria-hidden="true">
            {project.title}
          </span>
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <div className="project__body">
        <p className="project__index">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description}</p>
        <ul className="project__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {project.link && (
          <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">
            {codeLabel}
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;

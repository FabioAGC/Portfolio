import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
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
      </div>
    </article>
  );
};

export default ProjectCard;

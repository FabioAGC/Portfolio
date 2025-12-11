import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative bg-secondary rounded-xl border border-white/5 hover:border-white/20 overflow-hidden transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />
        {/* Hover overlay for subtle darkening only, no buttons */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-white/5 rounded-md border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
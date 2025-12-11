import React from 'react';
import { JobExperience } from '../types';
import RevealOnScroll from './RevealOnScroll';

interface ExperienceSectionProps {
  experience: JobExperience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section className="py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-white mb-16 tracking-tight text-center md:text-left">
            Experience.
          </h2>
        </RevealOnScroll>

        <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-12">
          {experience.map((job, index) => (
            <div key={job.id} className="relative pl-8 md:pl-12">
              <RevealOnScroll delay={index * 100}>
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)]"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{job.role}</h3>
                  <span className="text-sm font-mono text-slate-500 mt-1 sm:mt-0">{job.period}</span>
                </div>
                
                <div className="text-lg text-sky-400 mb-4 font-medium">{job.company}</div>
                
                <p className="text-slate-400 leading-relaxed font-light text-base md:text-lg">
                  {job.description}
                </p>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
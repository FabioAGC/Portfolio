import React from 'react';
import { SkillCategory } from '../types';
import RevealOnScroll from './RevealOnScroll';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section className="py-20 px-4 sm:px-6 relative z-10 border-t border-white/5 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-white mb-12 tracking-tight text-center md:text-left">
            Tech Stack.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skills.map((skillGroup, groupIndex) => (
            <div key={skillGroup.category} className="space-y-6">
              <RevealOnScroll delay={groupIndex * 100}>
                <h3 className="text-xl font-semibold text-slate-300 border-l-4 border-slate-700 pl-4">
                  {skillGroup.category}
                </h3>
              </RevealOnScroll>

              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, index) => (
                  <RevealOnScroll key={skill} delay={(groupIndex * 100) + (index * 50)} threshold={0.1}>
                    <div 
                      className="group relative px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg 
                               hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 cursor-default"
                    >
                      <span className="text-slate-400 group-hover:text-white font-medium text-sm tracking-wide transition-colors">
                        {skill}
                      </span>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
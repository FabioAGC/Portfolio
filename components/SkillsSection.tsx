import React from 'react';
import { SkillCategory } from '../types';
import RevealOnScroll from './RevealOnScroll';
import { 
  BarChart, Layout, Shield, TrendingUp, Brain, Cpu, Repeat, 
  Terminal, Code, Database, Globe
} from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const getSkillIcon = (skillName: string) => {
  const lower = skillName.toLowerCase();

  // 1. Hard Skills / Abstract Concepts - Map to Lucide Icons
  if (lower.includes('analysis')) return <BarChart size={16} className="text-sky-400" />;
  if (lower.includes('system design')) return <Layout size={16} className="text-pink-400" />;
  if (lower.includes('cybersecurity')) return <Shield size={16} className="text-emerald-400" />;
  if (lower.includes('kpi')) return <TrendingUp size={16} className="text-amber-400" />;
  if (lower.includes('ia') || lower === 'ai') return <Brain size={16} className="text-purple-400" />;
  if (lower.includes('machine learning')) return <Cpu size={16} className="text-rose-400" />;
  if (lower.includes('ci/cd')) return <Repeat size={16} className="text-orange-400" />;

  // 2. Tech Stack - Map to DevIcon URLs
  const slugMap: Record<string, string> = {
    'c++': 'cplusplus',
    'c': 'c',
    'c#': 'csharp',
    'html5/css3': 'html5',
    'next.js': 'nextjs',
    'node.js': 'nodejs',
    'tailwind css': 'tailwindcss',
    'express': 'express',
    'aws': 'amazonwebservices-plain-wordmark',
    'mysql': 'mysql',
    'postgresql': 'postgresql',
    'firebase': 'firebase',
    'supabase': 'supabase',
    'flutter': 'flutter',
    'react': 'react',
    'typescript': 'typescript',
    'python': 'python',
    'java': 'java',
    'php': 'php',
    'git': 'git',
    'docker': 'docker',
    'vercel': 'vercel',
    'jest': 'jest',
    'linux': 'linux',
    'sqlite': 'sqlite',
    'bash': 'bash',
    'go': 'go',
    'kotlin': 'kotlin',
    'ruby': 'ruby',
    'rust': 'rust',
    'swift': 'swift'
  };

  let slug = slugMap[lower] || lower;
  
  // Clean up standard cases that don't need mapping but need clean slugs (remove spaces/dots if not mapped)
  if (!slugMap[lower]) {
    slug = slug.replace(/\./g, '').replace(/\s+/g, '');
  }

  // Determine path structure (Devicon has inconsistencies)
  let path = `${slug}/${slug}-original.svg`;
  
  // Specific override for AWS to match Devicon file structure
  if (slug === 'amazonwebservices-plain-wordmark') {
    path = `amazonwebservices/amazonwebservices-plain-wordmark.svg`;
  }

  return (
    <img 
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`} 
      alt=""
      className="w-4 h-4 object-contain"
      onError={(e) => {
        // Fallback: If image fails to load, hide it. 
        // The text label remains visible.
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

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
                      className="group relative px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg 
                               hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 cursor-default flex items-center gap-2.5"
                    >
                      {getSkillIcon(skill)}
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
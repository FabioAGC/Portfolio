import React from 'react';
import { SkillCategory } from '../types';
import RevealOnScroll from './RevealOnScroll';
import SkillIcon from './SkillIcon';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => (
  <dl className="skills">
    {skills.map((group, i) => (
      <RevealOnScroll key={group.category} delay={i * 60} className="skills__row">
        <dt className="skills__category">{group.category}</dt>
        <dd className="skills__items">
          <ul className="chips">
            {group.items.map((skill) => (
              <li key={skill} className="chip">
                <SkillIcon name={skill} />
                {skill}
              </li>
            ))}
          </ul>
        </dd>
      </RevealOnScroll>
    ))}
  </dl>
);

export default SkillsSection;

import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PageOcean from './components/PageOcean';
import Section from './components/Section';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectCard from './components/ProjectCard';
import ContactSection from './components/ContactSection';
import RevealOnScroll from './components/RevealOnScroll';
import { CONTENT } from './content';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pt');
  const { profile, projects, translations: t } = CONTENT[language];
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  return (
    <div className="page" ref={pageRef}>
      <PageOcean pageRef={pageRef} />

      <Header name={profile.name} language={language} setLanguage={setLanguage} t={t.nav} />

      <main key={language}>
        <Hero
          name={profile.name}
          title={profile.title}
          avatarUrl={profile.avatarUrl}
          socials={profile.socials}
          t={t.hero}
        />

        <Section id="about" index="01" label={t.headers.about}>
          <AboutSection about={profile.about} />
        </Section>

        <Section id="tech" index="02" label={t.headers.tech}>
          <SkillsSection skills={profile.skills} />
        </Section>

        <Section id="experience" index="03" label={t.headers.experience}>
          <ExperienceSection experience={profile.experience} />
        </Section>

        <Section id="projects" index="04" label={t.headers.projects}>
          <div className="projects">
            {projects.map((project, i) => (
              <RevealOnScroll key={project.id} delay={(i % 3) * 80}>
                <ProjectCard project={project} index={i} />
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        <Section id="contact" index="05" label={t.headers.contact}>
          <ContactSection socials={profile.socials} t={t.headers} />
        </Section>
      </main>
    </div>
  );
};

export default App;

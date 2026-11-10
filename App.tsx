import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectCard from './components/ProjectCard';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RevealOnScroll from './components/RevealOnScroll';
import type { SharkSpec } from './vendor/ascii-sharks';
import { CONTENT } from './content';
import { Language } from './types';

// Which sharks swim behind each part of the page. Rosters are fixed for the
// life of a canvas, so they live at module scope.
const SHARKS: Record<string, SharkSpec[]> = {
  home: [
    { kind: 'classic', size: 1 },
    { kind: 'hammerhead', size: 0.82 },
    { kind: 'thresher', size: 0.7 },
    { kind: 'mako', size: 0.6 },
  ],
  about: [
    { kind: 'mako', size: 1 },
    { kind: 'nurse', size: 0.8 },
    { kind: 'zebra', size: 0.66 },
  ],
  tech: [
    { kind: 'tiger', size: 1 },
    { kind: 'classic', size: 0.8 },
    { kind: 'greathammer', size: 0.7 },
  ],
  experience: [
    { kind: 'greathammer', size: 1 },
    { kind: 'thresher', size: 0.85 },
    { kind: 'classic', size: 0.72 },
    { kind: 'nurse', size: 0.62 },
  ],
  projects: [
    { kind: 'hammerhead', size: 1 },
    { kind: 'tiger', size: 0.86 },
    { kind: 'zebra', size: 0.74 },
    { kind: 'mako', size: 0.64 },
  ],
  contact: [
    { kind: 'classic', size: 1 },
    { kind: 'thresher', size: 0.78 },
    { kind: 'hammerhead', size: 0.64 },
  ],
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pt');
  const { profile, projects, translations: t } = CONTENT[language];

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  return (
    <>
      <Header name={profile.name} language={language} setLanguage={setLanguage} t={t.nav} />

      <main>
        <Hero
          name={profile.name}
          title={profile.title}
          avatarUrl={profile.avatarUrl}
          socials={profile.socials}
          sharks={SHARKS.home}
          t={t.hero}
        />

        <Section id="about" sharks={SHARKS.about} index="01" label={t.headers.about}>
          <AboutSection about={profile.about} />
        </Section>

        <Section id="tech" sharks={SHARKS.tech} index="02" label={t.headers.tech}>
          <SkillsSection skills={profile.skills} />
        </Section>

        <Section id="experience" sharks={SHARKS.experience} index="03" label={t.headers.experience}>
          <ExperienceSection experience={profile.experience} />
        </Section>

        <Section id="projects" sharks={SHARKS.projects} index="04" label={t.headers.projects}>
          <div className="projects">
            {projects.map((project, i) => (
              <RevealOnScroll key={project.id} delay={(i % 3) * 80}>
                <ProjectCard project={project} index={i} />
              </RevealOnScroll>
            ))}
          </div>
        </Section>

        <Section id="contact" sharks={SHARKS.contact} index="05" label={t.headers.contact}>
          <ContactSection socials={profile.socials} t={t.headers} />
        </Section>
      </main>

      <Footer name={profile.name} rightsText={t.headers.footerRights} creditText={t.headers.footerCredit} />
    </>
  );
};

export default App;

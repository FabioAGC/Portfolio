import React, { useState, useEffect } from 'react';
import BioSection from './components/BioSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import Background from './components/Background';
import RevealOnScroll from './components/RevealOnScroll';
import { UserProfile, Project } from './types';

// Initial data
const INITIAL_PROFILE: UserProfile = {
  name: "Fabio Cruvinel",
  title: "Junior Software Engineer",
  bio: "With my knowledge in modern web technologies i strive to make the best and most optimal programs in my capacity , always.",
  about: `Hello! I'm Fabio, a passionate software engineer with over 5 years of experience in building scalable web applications. My journey began when I tinkered with my first HTML page in high school, and I've been hooked ever since.

  I specialize in the JavaScript ecosystem, particularly React and Node.js. I love solving complex problems and turning abstract ideas into functional, user-friendly products. Whether it's optimizing frontend performance, designing intuitive UIs, or architecting robust backend systems, I approach every challenge with curiosity and dedication.

  When I'm not coding, you can usually find me exploring new coffee shops, hiking up mountains to clear my head, or diving deep into the latest tech trends. I believe in continuous learning and often contribute to open-source projects to give back to the community that taught me so much.`,
  // Using thumbnail endpoint for better embed reliability
  avatarUrl: "https://drive.google.com/thumbnail?id=1rRG2PLLmNNBcm30P_CT8zBtD2joXsanp&sz=w1000", 
  socials: {
    github: "https://github.com/FABIOAGC",
    linkedin: "https://www.linkedin.com/in/fabiocruvinel/",
    email: "dev.fabio.cruvinel@gmail.com",
    instagram: "https://www.instagram.com/o_fabitos/",
    anilist: "https://anilist.co/user/Fabitos/",
    backloggd: "https://backloggd.com/u/Fabitos/",
    letterboxd: "https://letterboxd.com/Fabitoss/",
    goodreads: "https://www.goodreads.com/user/show/164883735-fabio-cruvinel",
    serializd: "https://www.serializd.com/user/Fabitos/profile"
  },
  skills: [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5/CSS3"]
    },
    {
      category: "Backend",
      items: ["C","C++","PHP","FLutter","Java", "Python" ,"Node.js", "Express", "PostgreSQL","MYSQL", "Firebase", "Supabase"]
    },
    {
      category: "Hard Skills",
      items: ["Data analysis", "System Design", "Cybersecurity", "KPIs" ,"IA", "Machine Learning"]
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "Docker", "AWS", "Vercel", "Jest", "CI/CD", "Linux"]
    },
  ],
  experience: [
    {
      id: 1,
      role: "Cybersecurity Researcher",
      company: "INATEL - CxSC Telecom Lab",
      period: "2023 - 2024",
      description: "Researched vulnerabilities in relational and non-relational databases in web applications (mainly PHP). Studied attacks such as SQL Injection in a Docker environment with Kali Linux"
    },
    {
      id: 2,
      role: "Automation and Data Analyst",
      company: "RW tech",
      period: "2025 - Present",
      description: "Executed data processing with python and developed automations for internal company pipelines using the N8N tool, in addition i created interactive dashboards for business data analysis and KPIs using Looker Studio."
    },
  ]
};

const SAMPLE_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Speech.AI",
    description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization using D3.js and Recharts.",
    imageUrl: "https://picsum.photos/seed/101/600/400",
    tags: ["React", "TypeScript", "D3.js", "Tailwind"],
    link: "https://example.com"
  },
  {
    id: 2,
    title: "GymTrack",
    description: "An intelligent writing assistant powered by Large Language Models to help copywriters generate creative content efficiently.",
    imageUrl: "https://picsum.photos/seed/202/600/400",
    tags: ["Next.js", "OpenAI API", "Node.js"],
    link: "https://example.com"
  },
  {
    id: 3,
    title: "EcoSense",
    description: "A collaborative task management tool with real-time updates, drag-and-drop interfaces, and team workspace organization.",
    imageUrl: "https://picsum.photos/seed/305/600/400",
    tags: ["React", "Firebase", "Redux"],
    link: "https://example.com"
  },
  {
    id: 4,
    title: "Inatel Rewards",
    description: "A collaborative task management tool with real-time updates, drag-and-drop interfaces, and team workspace organization.",
    imageUrl: "https://picsum.photos/seed/305/600/400",
    tags: ["FLutter", "Firebase"],
    link: "https://example.com"
  }
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  // Load from local storage on mount
  useEffect(() => {
    const savedBio = localStorage.getItem('user_bio');
    if (savedBio) {
      setProfile(prev => ({ ...prev, bio: savedBio }));
    }
  }, []);

  const handleUpdateBio = (newBio: string) => {
    setProfile(prev => ({ ...prev, bio: newBio }));
    localStorage.setItem('user_bio', newBio);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-200 selection:bg-slate-700 selection:text-white relative">
      <Background />
      
      <main className="relative z-10">
        <RevealOnScroll>
          <BioSection 
            name={profile.name}
            title={profile.title}
            bio={profile.bio}
            avatarUrl={profile.avatarUrl}
            socials={profile.socials}
            onUpdateBio={handleUpdateBio}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <AboutSection about={profile.about} socials={profile.socials} />
        </RevealOnScroll>

        <SkillsSection skills={profile.skills} />

        <ExperienceSection experience={profile.experience} />

        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Featured Projects.</h2>
                  <div className="h-1 w-12 bg-slate-700 rounded-full"></div>
                </div>
                <p className="text-slate-500 mt-4 md:mt-0 max-w-md text-right hidden md:block text-sm">
                  A selection of my recent work showcasing my technical skills and problem-solving abilities.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SAMPLE_PROJECTS.map((project, index) => (
                <RevealOnScroll key={project.id} delay={index * 150}>
                  <ProjectCard project={project} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default App;
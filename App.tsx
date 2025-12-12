import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BioSection from './components/BioSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import Background from './components/Background';
import RevealOnScroll from './components/RevealOnScroll';
import { UserProfile, Project } from './types';

// Constants for shared data
const SHARED_SOCIALS = {
  github: "https://github.com/FABIOAGC",
  linkedin: "https://www.linkedin.com/in/fabiocruvinel/",
  email: "dev.fabio.cruvinel@gmail.com",
  instagram: "https://www.instagram.com/o_fabitos/",
  anilist: "https://anilist.co/user/Fabitos/",
  backloggd: "https://backloggd.com/u/Fabitos/",
  letterboxd: "https://letterboxd.com/Fabitoss/",
  goodreads: "https://www.goodreads.com/user/show/164883735-fabio-cruvinel",
  serializd: "https://www.serializd.com/user/Fabitos/profile"
};

const SHARED_AVATAR = "https://drive.google.com/thumbnail?id=1rRG2PLLmNNBcm30P_CT8zBtD2joXsanp&sz=w1000";

// --- ENGLISH CONTENT ---
const DATA_EN = {
  profile: {
    name: "Fabio Cruvinel",
    title: "Junior Software Engineer",
    bio: "With my knowledge in modern web technologies i strive to make the best and most optimal programs in my capacity , always.",
    about: `Hello! I'm Fabio, a passionate software engineer with over 5 years of experience in building scalable web applications. My journey began when I tinkered with my first HTML page in high school, and I've been hooked ever since.

    I specialize in the JavaScript ecosystem, particularly React and Node.js. I love solving complex problems and turning abstract ideas into functional, user-friendly products. Whether it's optimizing frontend performance, designing intuitive UIs, or architecting robust backend systems, I approach every challenge with curiosity and dedication.

    When I'm not coding, you can usually find me exploring new coffee shops, hiking up mountains to clear my head, or diving deep into the latest tech trends. I believe in continuous learning and often contribute to open-source projects to give back to the community that taught me so much.`,
    avatarUrl: SHARED_AVATAR,
    socials: SHARED_SOCIALS,
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
        category: "DevOps & Tools",
        items: ["Git", "Docker","Postman", "AWS", "Vercel", "Jest", "CI/CD", "Linux"]
      },
      {
        category: "Skills i'm Learning",
        items: ["HFT in C++","Embedded systems","Kafka","Airflow"]
      },
      {
        category: "Hard Skills",
        items: ["Data analysis", "System Design","Network Configuration" , "Cybersecurity", "KPIs" ,"IA", "Machine Learning"]
      },
      {
        category: "Soft Skills",
        items: ["Communication", "Problem Solving", "Adaptability", "Teamwork"]
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
  },
  projects: [
    {
      id: 1,
      title: "GymTrack",
      description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization using D3.js and Recharts.",
      imageUrl: "https://picsum.photos/seed/101/600/400",
      tags: ["Next.js", "TypeScript", "SQLite", "Tailwind","Jenkins","Jest"],
      link: "https://example.com"
    },
    {
      id: 2,
      title: "Speech.AI",
      description: "An intelligent writing assistant powered by Large Language Models to help copywriters generate creative content efficiently.",
      imageUrl: "https://picsum.photos/seed/202/600/400",
      tags: ["Nest.js", "OpenAI API", "N8N","Postgres","React","Vite","Prisma"],
      link: "https://example.com"
    },
    {
      id: 3,
      title: "EcoSense",
      description: "A collaborative task management tool with real-time updates, drag-and-drop interfaces, and team workspace organization.",
      imageUrl: "https://picsum.photos/seed/305/600/400",
      tags: ["React", "Python", "TensorFlow"],
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
  ],
  translations: {
    nav: {
      home: 'Home',
      about: 'About',
      tech: 'Tech Stack',
      experience: 'Experience',
      projects: 'Projects'
    },
    headers: {
      about: 'About Me.',
      tech: 'Tech Stack.',
      experience: 'Experience.',
      projects: 'Featured Projects.',
      projectsSubtitle: 'A selection of my recent work showcasing my technical skills and problem-solving abilities.',
      footerRights: 'All rights reserved.'
    }
  }
};

// --- PORTUGUESE CONTENT ---
const DATA_PT = {
  profile: {
    name: "Fabio Cruvinel",
    title: "Engenheiro de Software Júnior",
    bio: "Com meu conhecimento em tecnologias web modernas, esforço-me para criar os melhores e mais otimizados programas dentro da minha capacidade, sempre.",
    about: `Olá! Sou o Fabio, um engenheiro de software apaixonado com mais de 5 anos de experiência na construção de aplicações web escaláveis. Minha jornada começou quando criei minha primeira página HTML no ensino médio, e desde então não parei mais.

    Especializo-me no ecossistema JavaScript, particularmente React e Node.js. Adoro resolver problemas complexos e transformar ideias abstratas em produtos funcionais e amigáveis ao usuário. Seja otimizando o desempenho do frontend, projetando interfaces intuitivas ou arquitetando sistemas backend robustos, encaro cada desafio com curiosidade e dedicação.

    Quando não estou programando, você geralmente me encontra explorando novas cafeterias, fazendo trilhas para espairecer ou mergulhando nas últimas tendências tecnológicas. Acredito no aprendizado contínuo e frequentemente contribuo para projetos open-source para retribuir à comunidade que me ensinou tanto.`,
    avatarUrl: SHARED_AVATAR,
    socials: SHARED_SOCIALS,
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
        category: "DevOps & Tools",
        items: ["Git", "Docker","Postman", "AWS", "Vercel", "Jest", "CI/CD", "Linux"]
      },
      {
        category: "Aprendendo Atualmente",
        items: ["HFT em C++","Sistemas Embarcados","Kafka","Airflow"]
      },
      {
        category: "Competências Técnicas",
        items: ["Análise de Dados", "Design de Sistemas", "Configuração de Rede", "Cibersegurança", "KPIs", "IA", "Machine Learning"]
      },
      {
        category: "Competências Comportamentais",
        items: ["Comunicação", "Resolução de Problemas", "Adaptabilidade", "Trabalho em Equipe"]
      },
    ],
    experience: [
      {
        id: 1,
        role: "Pesquisador de Cibersegurança",
        company: "INATEL - CxSC Telecom Lab",
        period: "2023 - 2024",
        description: "Pesquisei vulnerabilidades em bancos de dados relacionais e não relacionais em aplicações web (principalmente PHP). Estudei ataques como SQL Injection em ambiente Docker com Kali Linux"
      },
      {
        id: 2,
        role: "Analista de Dados e Automação",
        company: "RW tech",
        period: "2025 - Present",
        description: "Executei processamento de dados com Python e desenvolvi automações para pipelines internos da empresa usando a ferramenta N8N, além de criar dashboards interativos para análise de dados de negócios e KPIs usando Looker Studio."
      },
    ]
  },
  projects: [
    {
      id: 1,
      title: "GymTrack",
      description: "Um dashboard analítico completo para varejistas online com visualização de dados em tempo real usando D3.js e Recharts.",
      imageUrl: "https://picsum.photos/seed/101/600/400",
      tags: ["Next.js", "TypeScript", "SQLite", "Tailwind","Jenkins","Jest"],
      link: "https://example.com"
    },
    {
      id: 2,
      title: "Speech.AI",
      description: "Um assistente de escrita inteligente alimentado por LLMs para ajudar redatores a gerar conteúdo criativo de forma eficiente.",
      imageUrl: "https://picsum.photos/seed/202/600/400",
      tags: ["Nest.js", "OpenAI API", "N8N","Postgres","React","Vite","Prisma"],
      link: "https://example.com"
    },
    {
      id: 3,
      title: "EcoSense",
      description: "Uma ferramenta colaborativa de gestão de tarefas com atualizações em tempo real, interfaces drag-and-drop e organização de equipes.",
      imageUrl: "https://picsum.photos/seed/305/600/400",
      tags: ["React", "Python", "TensorFlow"],
      link: "https://example.com"
    },
    {
      id: 4,
      title: "Inatel Rewards",
      description: "Uma ferramenta colaborativa de gestão de tarefas com atualizações em tempo real, interfaces drag-and-drop e organização de equipes.",
      imageUrl: "https://picsum.photos/seed/305/600/400",
      tags: ["FLutter", "Firebase"],
      link: "https://example.com"
    }
  ],
  translations: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      tech: 'Tecnologias',
      experience: 'Experiência',
      projects: 'Projetos'
    },
    headers: {
      about: 'Sobre Mim.',
      tech: 'Stack Tecnológico.',
      experience: 'Experiência.',
      projects: 'Projetos em Destaque.',
      projectsSubtitle: 'Uma seleção dos meus trabalhos recentes demonstrando minhas habilidades técnicas e resolução de problemas.',
      footerRights: 'Todos os direitos reservados.'
    }
  }
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'pt'>('en');
  
  // Select data based on state
  const currentData = language === 'en' ? DATA_EN : DATA_PT;
  const { profile, projects, translations } = currentData;

  // Bio persistence effect (Optional: remove if you want only language switch to control bio)
  // Currently keeping it but initializing based on language is cleaner. 
  // If you want full language switch, local storage for 'user_bio' might conflict 
  // if it only stores one language version. Disabling it for this feature to work cleanly.
  /*
  useEffect(() => {
    const savedBio = localStorage.getItem('user_bio');
    if (savedBio) {
      // Logic to set bio would be complex with lang switch, skipping for now
    }
  }, []);
  */

  return (
    <div className="min-h-screen bg-transparent text-slate-200 selection:bg-slate-700 selection:text-white relative">
      <Background />
      <Header 
        socials={profile.socials} 
        language={language}
        setLanguage={setLanguage}
        translations={translations.nav}
      />
      
      <main className="relative z-10">
        <div id="home" className="scroll-mt-24">
          <RevealOnScroll>
            <BioSection 
              name={profile.name}
              title={profile.title}
              bio={profile.bio}
              avatarUrl={profile.avatarUrl}
              socials={profile.socials}
            />
          </RevealOnScroll>
        </div>

        <div id="about" className="scroll-mt-24">
          <RevealOnScroll>
            <AboutSection 
              about={profile.about} 
              title={translations.headers.about}
              socials={profile.socials} 
            />
          </RevealOnScroll>
        </div>

        <div id="tech" className="scroll-mt-24">
          <SkillsSection 
            skills={profile.skills} 
            title={translations.headers.tech}
          />
        </div>

        <div id="experience" className="scroll-mt-24">
          <ExperienceSection 
            experience={profile.experience} 
            title={translations.headers.experience}
          />
        </div>

        <section id="projects" className="py-20 px-4 sm:px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{translations.headers.projects}</h2>
                  <div className="h-1 w-12 bg-slate-700 rounded-full"></div>
                </div>
                <p className="text-slate-500 mt-4 md:mt-0 max-w-md text-right hidden md:block text-sm">
                  {translations.headers.projectsSubtitle}
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <RevealOnScroll key={project.id} delay={index * 150}>
                  <ProjectCard project={project} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer rightsText={translations.headers.footerRights} />
      </div>
    </div>
  );
};

export default App;
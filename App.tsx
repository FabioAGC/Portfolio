import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BioSection from './components/BioSection';
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

// Project Image Direct Links
const PROJECT_IMGS = {
  gymtrack: "https://drive.google.com/thumbnail?id=1d-BLyU4MZfSLyJQr9Ej6_CYnfYt8ATp1&sz=w1000",
  speechai: "https://drive.google.com/thumbnail?id=1PW90M8y_mMfsi8sds9KUciVcnYxcd9tG&sz=w1000",
  inatel_rewards: "https://drive.google.com/thumbnail?id=1CSUHmjmLTJ6SAj9l9mNcsdz9oH6Lhk9R&sz=w1000",
  ecosense: "https://drive.google.com/thumbnail?id=1VZs0_Zuubbm6Hu7PwYeMns8ppLBSsQBq&sz=w1000"
};

// --- ENGLISH CONTENT ---
const DATA_EN = {
  profile: {
    name: "Fabio Cruvinel",
    title: "Junior Software Engineer",
    about: "I hold a Bachelor's degree in Software Engineering from the National Institute of Telecommunications (INATEL), and I have hands-on experience with technologies such as 5G, networking, automation, AI, and machine learning. I've always been deeply interested in technology, and I'm currently focusing on learning low-level languages, high-frequency trading systems, and embedded programming.\n\nI’m expected to graduate in 2026, and afterward, I plan to pursue a postgraduate degree in the same field to further specialize. At the moment, I’m looking for Junior or Intern opportunities in my area of expertise so i can hone mi abilities and further expand my knowledge in real scenarios.\n\nWhen I'm not at college, you’ll probably find me gaming — a lifelong passion of mine — or reading a book, since I’ve always been fascinated by classic literature (I even considered studying philosophy at one point!).",
    avatarUrl: SHARED_AVATAR,
    socials: SHARED_SOCIALS,
    skills: [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5/CSS3"]
      },
      {
        category: "Backend",
        items: ["C","C++","PHP","FLutter","Java", "Python" ,"Node.js", "Express"]
      },
      {
        category: "DevOps & Tools",
        items: ["Git", "Docker","Postman", "AWS", "Vercel", "Jest","Excel","Power BI", "CI/CD", "Linux"]
      },
      {
        category: "Databases",
        items: ["PostgreSQL","MYSQL", "Firebase", "Supabase", "AVEVA", "SEEQ"]
      },
      {
        category: "Hard Skills",
        items: ["Data analysis", "System Design", "Network Configuration" , "Cybersecurity", "KPIs" ,"IA", "Machine Learning"]
      },
      {
        category: "Soft Skills",
        items: ["Problem Solving", "Quick Learner","Sociable" , "Good at Teamwork"]
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
        period: "2025 - 2025",
        description: "Executed data processing with python and developed automations for internal company pipelines using the N8N tool, in addition i created interactive dashboards for business data analysis and KPIs using Looker Studio."
      },
      {
        id: 3,
        role: "Supply Chain Data Analyst",
        company: "General Mills",
        period: "2026 - Present",
        description: "I worked on digital transformation projects, dealing with computer vision and systems integration, providing support for the development and maintenance of supervisory systems. I took part in industrial automation and instrumentation activities, as well as in tests, proofs of concept (POCs), and prototyping. I implemented computer vision, artificial intelligence, machine learning, and data analysis at the foundational levels of the supply chain"
      },
    ]
  },
  projects: [
    {
      id: 1,
      title: "GymTrack",
      description: "A platform for building and recommending gym workouts, featuring progress dashboards and AI-powered recommendations for personalized training routines for each member.",
      imageUrl: PROJECT_IMGS.gymtrack,
      tags: ["Next.js", "TypeScript", "SQLite", "Tailwind","Jenkins","Jest"],
      link: "https://github.com/FABIOAGC"
    },
    {
      id: 2,
      title: "Speech.AI",
      description: "An intelligent speech assistance system designed to help doctors and patients with pronunciation difficulties through personalized exercises and AI-based speech analysis.",
      imageUrl: PROJECT_IMGS.speechai,
      tags: ["Nest.js", "OpenAI API", "N8N","Postgres","React","Vite","Prisma"],
      link: "https://github.com/FABIOAGC"
    },
    {
      id: 3,
      title: "EcoSense",
      description: "EcoSense is a system that monitors all light and water sensors in smart homes and analyzes consumption using AI to ensure everything is operating correctly.",
      imageUrl: PROJECT_IMGS.ecosense,
      tags: ["React", "Python", "TensorFlow"],
      link: "https://github.com/FABIOAGC"
    },
    {
      id: 4,
      title: "Inatel Rewards",
      description:"An app designed for Inatel students to redeem prizes at the cafeteria and library based on their grades and attendance in classes and lectures.",
      imageUrl: PROJECT_IMGS.inatel_rewards,
      tags: ["FLutter", "Firebase"],
      link: "https://github.com/FABIOAGC"
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
    about: "Sou bacharel em Engenharia de Software pelo Instituto Nacional de Telecomunicações (INATEL), tenho experiencia profissional com analise de dados e automação e possuo Prática em tecnologias como 5G, redes, IA e machine learning. Sempre fui muito interressado em tecnologia e atualmente estou focado em aprender Linguagens de baixo nivel, HFT e embarcados.\n\nQuando não estou na faculdade, provavelmente eu me encontro jogando, já que essa sempre foi uma paixão minha, ou então estou lendo algum livro, pois os classicos da literatura sempre me interressaram (já ate pensei em cursar Psiquiatria ou Filosfia)",
    avatarUrl: SHARED_AVATAR,
    socials: SHARED_SOCIALS,
    skills: [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5/CSS3"]
      },
      {
        category: "Backend",
        items: ["C","C++","PHP","FLutter","Java", "Python" ,"Node.js", "Express"]
      },
      {
        category: "DevOps & Tools",
        items: ["Git", "Docker","Postman", "AWS", "Vercel", "Jest","Excel","Power BI", "CI/CD", "Linux"]
      },
      {
        category: "Banco de Dados",
        items: ["PostgreSQL","MYSQL", "Firebase", "Supabase", "AVEVA", "SEEQ"]
      },
      {
        category: "Competências Técnicas",
        items: ["Análise de Dados", "Design de Sistemas", "Configuração de Redes", "Cibersegurança", "KPIs", "IA", "Machine Learning"]
      },
      {
        category: "Competências Comportamentais",
        items: ["Resolução de Problemas", "Aprendo Rápido", "Amigavel" , "Bom em Equipes"]
      },
    ],
    experience: [
      {
        id: 1,
        role: "Pesquisador de Cibersegurança",
        company: "INATEL - CxSC Telecom Lab",
        period: "2023 - 2024",
        description: "Realizei um estudo aprofundado sobre vulnerabilidades em bancos de dados relacionais e não relacionais, com ênfase em aplicações web desenvolvidas em PHP. Durante a pesquisa, explorei e simulei ataques do tipo _SQL Injection_ e outras técnicas de exploração em um ambiente controlado com Docker e Kali Linux, analisando vetores de risco, padrões de mitigação e boas práticas de segurança. O trabalho envolveu a configuração de containers para testes isolados, análise de logs e a implementação de contramedidas para fortalecer a segurança de sistemas web."
      },
      {
        id: 2,
        role: "Analista de Dados e Automação",
        company: "RW tech",
        period: "2025 - Present",
        description: "Fui responsável pelo desenvolvimento de automações de processos internos corporativos utilizando a ferramenta n8n, integrando diferentes sistemas e reduzindo tarefas manuais de varios outros empregados reduzindo o tempo de preenchimento de planilhas em até 80%. Além disso, criei dashboards interativos e relatórios dinâmicos para análise de indicadores de desempenho e dados empresariais no Looker Studio, aprimorando a tomada de decisão com KPIs claras e promovendo uma cultura orientada a dados dentro da empresa."
      },
      {
        id: 3,
        role: "Analista de Dados de Supply Chain",
        company: "General Mills",
        period: "2026 - Presente",
        description: "Atuei em projetos de transformação digital, trabalhando com visão computacional e integração de sistemas, prestando suporte ao desenvolvimento e à manutenção de sistemas supervisórios. Participei de atividades de automação industrial e instrumentação, bem como de testes, provas de conceito (POCs) e prototipagens. Realizei a implantação de soluções de visão computacional, inteligência artificial, machine learning e análise de dados nas bases da cadeia de suprimentos"
      },
    ]
  },
  projects: [
    {
      id: 1,
      title: "GymTrack",
      description: "Plataforma de construção e recomendação de treinos de academia , com dashboards de progresso e IA para recomendação de séries para cada membro.",
      imageUrl: PROJECT_IMGS.gymtrack,
      tags: ["Next.js", "TypeScript", "SQLite", "Tailwind","Jenkins","Jest"],
      link: "https://github.com/FABIOAGC"
    },
    {
      id: 2,
      title: "Speech.AI",
      description: "Sistema inteligente de assistência à fala desenvolvido para auxiliar medicos e pacientes com dificuldades de pronúncia através de exercícios personalizados e análise de fala com IA..",
      imageUrl: PROJECT_IMGS.speechai,
      tags: ["Nest.js", "OpenAI API", "N8N","Postgres","React","Vite","Prisma"],
      link: "https://github.com/FABIOAGC"
    },
    {
      id: 3,
      title: "EcoSense",
      description: "A ecosense é um sistema que ajuda a visualizar todos os sensores de luz e agua de casas smart e analisa o consumo para saber se esta tudos nos conformes usando IA",
      imageUrl: PROJECT_IMGS.ecosense,
      tags: ["React", "Python", "TensorFlow"],
      link: "https://github.com/FABIOAGC"
    },
    {
      id: 4,
      title: "Inatel Rewards",
      description: "É um aplicativo feito para os estudantes do inatel poderem resgatar premios na cantina e na biblioteca baseado nas notas e frequencia em aulas e palestras.",
      imageUrl: PROJECT_IMGS.inatel_rewards,
      tags: ["FLutter", "Firebase"],
      link: "https://github.com/FABIOAGC"
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
  // Set default language to 'pt'
  const [language, setLanguage] = useState<'en' | 'pt'>('pt');
  
  // Select data based on state
  const currentData = language === 'en' ? DATA_EN : DATA_PT;
  const { profile, projects, translations } = currentData;

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
              about={profile.about}
              avatarUrl={profile.avatarUrl}
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
          <div className="max-w-7xl mx-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
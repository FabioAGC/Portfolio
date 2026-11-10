import { Language, SiteContent, SocialLinks } from './types';

const SOCIALS: SocialLinks = {
  github: 'https://github.com/FABIOAGC',
  linkedin: 'https://www.linkedin.com/in/fabiocruvinel/',
  email: 'dev.fabio.cruvinel@gmail.com',
  instagram: 'https://www.instagram.com/o_fabitos/',
  anilist: 'https://anilist.co/user/Fabitos/',
  backloggd: 'https://backloggd.com/u/Fabitos/',
  letterboxd: 'https://letterboxd.com/Fabitoss/',
  goodreads: 'https://www.goodreads.com/user/show/164883735-fabio-cruvinel',
  serializd: 'https://www.serializd.com/user/Fabitos/profile',
};

const AVATAR = 'https://drive.google.com/thumbnail?id=1rRG2PLLmNNBcm30P_CT8zBtD2joXsanp&sz=w1000';

const PROJECT_IMGS = {
  gymtrack: 'https://drive.google.com/thumbnail?id=1d-BLyU4MZfSLyJQr9Ej6_CYnfYt8ATp1&sz=w1000',
  speechai: 'https://drive.google.com/thumbnail?id=1PW90M8y_mMfsi8sds9KUciVcnYxcd9tG&sz=w1000',
  inatelRewards: 'https://drive.google.com/thumbnail?id=1CSUHmjmLTJ6SAj9l9mNcsdz9oH6Lhk9R&sz=w1000',
  ecosense: 'https://drive.google.com/thumbnail?id=1VZs0_Zuubbm6Hu7PwYeMns8ppLBSsQBq&sz=w1000',
};

const EN: SiteContent = {
  profile: {
    name: 'Fabio Cruvinel',
    title: 'Junior Software Engineer',
    about:
      "I hold a Bachelor's degree in Software Engineering from the National Institute of Telecommunications (INATEL), and I have hands-on experience with technologies such as 5G, networking, automation, AI, and machine learning. I've always been deeply interested in technology, and I'm currently focusing on learning low-level languages, high-frequency trading systems, and embedded programming.\n\nI'm expected to graduate in 2026, and afterward I plan to pursue a postgraduate degree in the same field to further specialize. At the moment, I'm looking for Junior or Intern opportunities in my area of expertise so I can hone my abilities and further expand my knowledge in real scenarios.\n\nWhen I'm not at college, you'll probably find me gaming — a lifelong passion of mine — or reading a book, since I've always been fascinated by classic literature (I even considered studying philosophy at one point!).",
    avatarUrl: AVATAR,
    socials: SOCIALS,
    skills: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML5/CSS3'] },
      { category: 'Backend', items: ['C', 'C++', 'PHP', 'Flutter', 'Java', 'Python', 'Node.js', 'Express'] },
      {
        category: 'DevOps & Tools',
        items: ['Git', 'Docker', 'Postman', 'AWS', 'Vercel', 'Jest', 'Excel', 'Power BI', 'CI/CD', 'Linux'],
      },
      { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'AVEVA', 'SEEQ'] },
      {
        category: 'Hard Skills',
        items: ['Data Analysis', 'System Design', 'Network Configuration', 'Cybersecurity', 'KPIs', 'AI', 'Machine Learning'],
      },
      { category: 'Soft Skills', items: ['Problem Solving', 'Quick Learner', 'Sociable', 'Good at Teamwork'] },
    ],
    experience: [
      {
        id: 3,
        role: 'Supply Chain Data Analyst',
        company: 'General Mills',
        period: '2026 — Present',
        description:
          'I worked on digital transformation projects, dealing with computer vision and systems integration, providing support for the development and maintenance of supervisory systems. I took part in industrial automation and instrumentation activities, as well as in tests, proofs of concept (POCs), and prototyping. I implemented computer vision, artificial intelligence, machine learning, and data analysis at the foundational levels of the supply chain.',
      },
      {
        id: 2,
        role: 'Automation and Data Analyst',
        company: 'RW tech',
        period: '2025',
        description:
          'Executed data processing with Python and developed automations for internal company pipelines using n8n. In addition, I created interactive dashboards for business data analysis and KPIs using Looker Studio.',
      },
      {
        id: 1,
        role: 'Cybersecurity Researcher',
        company: 'INATEL — CxSC Telecom Lab',
        period: '2023 — 2024',
        description:
          'Researched vulnerabilities in relational and non-relational databases in web applications (mainly PHP). Studied attacks such as SQL Injection in a Docker environment with Kali Linux.',
      },
    ],
  },
  projects: [
    {
      id: 1,
      title: 'GymTrack',
      description:
        'A platform for building and recommending gym workouts, featuring progress dashboards and AI-powered recommendations for personalized training routines for each member.',
      imageUrl: PROJECT_IMGS.gymtrack,
      tags: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind', 'Jenkins', 'Jest'],
      link: 'https://github.com/FABIOAGC',
    },
    {
      id: 2,
      title: 'Speech.AI',
      description:
        'An intelligent speech assistance system designed to help doctors and patients with pronunciation difficulties through personalized exercises and AI-based speech analysis.',
      imageUrl: PROJECT_IMGS.speechai,
      tags: ['Nest.js', 'OpenAI API', 'n8n', 'Postgres', 'React', 'Vite', 'Prisma'],
      link: 'https://github.com/FABIOAGC',
    },
    {
      id: 3,
      title: 'EcoSense',
      description:
        'A system that monitors all light and water sensors in smart homes and analyzes consumption using AI to ensure everything is operating correctly.',
      imageUrl: PROJECT_IMGS.ecosense,
      tags: ['React', 'Python', 'TensorFlow'],
      link: 'https://github.com/FABIOAGC',
    },
    {
      id: 4,
      title: 'Inatel Rewards',
      description:
        'An app designed for Inatel students to redeem prizes at the cafeteria and library based on their grades and attendance in classes and lectures.',
      imageUrl: PROJECT_IMGS.inatelRewards,
      tags: ['Flutter', 'Firebase'],
      link: 'https://github.com/FABIOAGC',
    },
  ],
  translations: {
    nav: {
      about: 'About',
      tech: 'Stack',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      menu: 'Open menu',
      close: 'Close menu',
      language: 'Language',
    },
    hero: {
      viewProjects: 'View projects',
      contact: 'Get in touch',
      hint: 'Move the cursor · click to stir the water',
    },
    headers: {
      about: 'About',
      tech: 'Tech stack',
      experience: 'Experience',
      projects: 'Selected projects',
      contact: 'Contact',
      contactTitle: "Let's talk.",
      contactText: 'The fastest way to reach me is by email.',
      footerRights: 'All rights reserved.',
      footerCredit: 'ASCII ocean by',
    },
  },
};

const PT: SiteContent = {
  profile: {
    name: 'Fabio Cruvinel',
    title: 'Engenheiro de Software Júnior',
    about:
      'Sou bacharel em Engenharia de Software pelo Instituto Nacional de Telecomunicações (INATEL), tenho experiência profissional com análise de dados e automação e possuo prática em tecnologias como 5G, redes, IA e machine learning. Sempre fui muito interessado em tecnologia e atualmente estou focado em aprender linguagens de baixo nível, HFT e embarcados.\n\nQuando não estou na faculdade, provavelmente estou jogando, já que essa sempre foi uma paixão minha, ou então lendo algum livro, pois os clássicos da literatura sempre me interessaram (já até pensei em cursar Psiquiatria ou Filosofia).',
    avatarUrl: AVATAR,
    socials: SOCIALS,
    skills: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML5/CSS3'] },
      { category: 'Backend', items: ['C', 'C++', 'PHP', 'Flutter', 'Java', 'Python', 'Node.js', 'Express'] },
      {
        category: 'DevOps & Ferramentas',
        items: ['Git', 'Docker', 'Postman', 'AWS', 'Vercel', 'Jest', 'Excel', 'Power BI', 'CI/CD', 'Linux'],
      },
      { category: 'Bancos de Dados', items: ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'AVEVA', 'SEEQ'] },
      {
        category: 'Competências Técnicas',
        items: ['Análise de Dados', 'Design de Sistemas', 'Configuração de Redes', 'Cibersegurança', 'KPIs', 'IA', 'Machine Learning'],
      },
      {
        category: 'Competências Comportamentais',
        items: ['Resolução de Problemas', 'Aprendizado Rápido', 'Sociável', 'Trabalho em Equipe'],
      },
    ],
    experience: [
      {
        id: 3,
        role: 'Analista de Dados de Supply Chain',
        company: 'General Mills',
        period: '2026 — Presente',
        description:
          'Atuei em projetos de transformação digital, trabalhando com visão computacional e integração de sistemas, prestando suporte ao desenvolvimento e à manutenção de sistemas supervisórios. Participei de atividades de automação industrial e instrumentação, bem como de testes, provas de conceito (POCs) e prototipagens. Realizei a implantação de soluções de visão computacional, inteligência artificial, machine learning e análise de dados nas bases da cadeia de suprimentos.',
      },
      {
        id: 2,
        role: 'Analista de Dados e Automação',
        company: 'RW tech',
        period: '2025',
        description:
          'Fui responsável pelo desenvolvimento de automações de processos internos corporativos utilizando a ferramenta n8n, integrando diferentes sistemas e reduzindo tarefas manuais de vários colaboradores, diminuindo o tempo de preenchimento de planilhas em até 80%. Além disso, criei dashboards interativos e relatórios dinâmicos para análise de indicadores de desempenho e dados empresariais no Looker Studio, aprimorando a tomada de decisão com KPIs claros e promovendo uma cultura orientada a dados dentro da empresa.',
      },
      {
        id: 1,
        role: 'Pesquisador de Cibersegurança',
        company: 'INATEL — CxSC Telecom Lab',
        period: '2023 — 2024',
        description:
          'Realizei um estudo aprofundado sobre vulnerabilidades em bancos de dados relacionais e não relacionais, com ênfase em aplicações web desenvolvidas em PHP. Durante a pesquisa, explorei e simulei ataques do tipo SQL Injection e outras técnicas de exploração em um ambiente controlado com Docker e Kali Linux, analisando vetores de risco, padrões de mitigação e boas práticas de segurança. O trabalho envolveu a configuração de containers para testes isolados, análise de logs e a implementação de contramedidas para fortalecer a segurança de sistemas web.',
      },
    ],
  },
  projects: [
    {
      id: 1,
      title: 'GymTrack',
      description:
        'Plataforma de construção e recomendação de treinos de academia, com dashboards de progresso e IA para recomendação de séries para cada membro.',
      imageUrl: PROJECT_IMGS.gymtrack,
      tags: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind', 'Jenkins', 'Jest'],
      link: 'https://github.com/FABIOAGC',
    },
    {
      id: 2,
      title: 'Speech.AI',
      description:
        'Sistema inteligente de assistência à fala desenvolvido para auxiliar médicos e pacientes com dificuldades de pronúncia através de exercícios personalizados e análise de fala com IA.',
      imageUrl: PROJECT_IMGS.speechai,
      tags: ['Nest.js', 'OpenAI API', 'n8n', 'Postgres', 'React', 'Vite', 'Prisma'],
      link: 'https://github.com/FABIOAGC',
    },
    {
      id: 3,
      title: 'EcoSense',
      description:
        'Sistema que ajuda a visualizar todos os sensores de luz e água de casas inteligentes e analisa o consumo com IA para garantir que está tudo nos conformes.',
      imageUrl: PROJECT_IMGS.ecosense,
      tags: ['React', 'Python', 'TensorFlow'],
      link: 'https://github.com/FABIOAGC',
    },
    {
      id: 4,
      title: 'Inatel Rewards',
      description:
        'Aplicativo feito para os estudantes do Inatel resgatarem prêmios na cantina e na biblioteca com base nas notas e na frequência em aulas e palestras.',
      imageUrl: PROJECT_IMGS.inatelRewards,
      tags: ['Flutter', 'Firebase'],
      link: 'https://github.com/FABIOAGC',
    },
  ],
  translations: {
    nav: {
      about: 'Sobre',
      tech: 'Stack',
      experience: 'Experiência',
      projects: 'Projetos',
      contact: 'Contato',
      menu: 'Abrir menu',
      close: 'Fechar menu',
      language: 'Idioma',
    },
    hero: {
      viewProjects: 'Ver projetos',
      contact: 'Entrar em contato',
      hint: 'Mova o cursor · clique para agitar a água',
    },
    headers: {
      about: 'Sobre',
      tech: 'Tecnologias',
      experience: 'Experiência',
      projects: 'Projetos selecionados',
      contact: 'Contato',
      contactTitle: 'Vamos conversar.',
      contactText: 'A forma mais rápida de falar comigo é por e-mail.',
      footerRights: 'Todos os direitos reservados.',
      footerCredit: 'Oceano ASCII por',
    },
  },
};

export const CONTENT: Record<Language, SiteContent> = { en: EN, pt: PT };

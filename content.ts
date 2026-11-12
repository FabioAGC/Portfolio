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

// Served from public/images; BASE_URL keeps the paths valid under any deploy base.
const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`;

const AVATAR = img('profile');

const logo = (name: string) => `${import.meta.env.BASE_URL}logos/${name}.png`;

const PROJECT_IMGS = {
  gymtrack: img('gymtrack'),
  speechai: img('speechai'),
  inatelRewards: img('inatel-rewards'),
  ecosense: img('ecosense'),
  basquiart: img('basquiart'),
  smartreserve: img('smartreserve'),
};

const EN: SiteContent = {
  profile: {
    name: 'Fabio Cruvinel',
    title: 'Software Engineer',
    tagline: 'Software engineer focused on data, automation and AI applied to industry.',
    about:
      "I hold a Bachelor's degree in Software Engineering from the National Institute of Telecommunications (INATEL), and I have hands-on experience with technologies such as 5G, networking, automation, AI, and machine learning. I've always been deeply interested in technology, and I'm currently focusing on learning low-level languages, high-frequency trading systems, and embedded programming.\n\nI graduated in 2026 and plan to pursue a postgraduate degree to specialize further. I'm currently looking for Junior or Mid-level opportunities where I can keep growing and solve real problems with data, automation and AI.\n\nWhen I'm not working, you'll probably find me gaming — a lifelong passion of mine — or reading a book, since I've always been fascinated by classic literature (I even considered studying philosophy at one point!).",
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
        category: 'AI & LLMs',
        items: ['LLMs', 'MCP', 'RAG', 'Embeddings', 'Vector Databases', 'Fine-tuning', 'LoRA', 'AI Agents', 'Prompt Engineering'],
      },
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
        logo: logo('general-mills'),
        period: '2026 — Present',
        description:
          'I worked on digital transformation projects, dealing with computer vision and systems integration, providing support for the development and maintenance of supervisory systems. I took part in industrial automation and instrumentation activities, as well as in tests, proofs of concept (POCs), and prototyping. I implemented computer vision, artificial intelligence, machine learning, and data analysis at the foundational levels of the supply chain.',
      },
      {
        id: 2,
        role: 'Automation and Data Analyst',
        company: 'RW tech',
        logo: logo('rw-tech'),
        period: '2025',
        description:
          'I was responsible for developing automations for internal business processes using n8n, integrating different systems and cutting the manual work of many colleagues, reducing the time spent filling in spreadsheets by up to 80%. I also built interactive dashboards and dynamic reports in Looker Studio to analyze performance indicators and business data, improving decision-making with clear KPIs and fostering a data-driven culture within the company.',
      },
      {
        id: 1,
        role: 'Cybersecurity Researcher',
        company: 'INATEL — CxSC Telecom Lab',
        logo: logo('cxsc'),
        period: '2023 — 2024',
        description:
          'I carried out an in-depth study of vulnerabilities in relational and non-relational databases, focusing on web applications built with PHP. During the research, I explored and simulated SQL Injection attacks and other exploitation techniques in a controlled environment with Docker and Kali Linux, analyzing risk vectors, mitigation patterns and security best practices. The work involved setting up containers for isolated testing, analyzing logs and implementing countermeasures to strengthen the security of web systems.',
      },
    ],
    education: [
      {
        id: 1,
        role: "Bachelor's in Software Engineering",
        company: 'INATEL — National Institute of Telecommunications',
        logo: logo('inatel'),
        period: '2026',
        description:
          'Thesis on vector databases. Coursework in software engineering, distributed systems, databases, operating systems and software quality.',
        link: { label: 'Thesis repository', href: 'https://github.com/FabioAGC/TCC---BDs-Vetoriais' },
      },
    ],
  },
  projects: [
    {
      id: 7,
      title: 'MCP for AVEVA MES',
      description:
        'An MCP server that connects AI assistants to AVEVA MES, so production data can be queried in natural language.',
      link: 'https://github.com/FabioAGC/MCP-MES',
      tags: ['MCP', 'AVEVA MES', 'AI'],
    },
    {
      id: 8,
      title: 'Report Checker',
      description: 'A tool that checks technical reports automatically and flags inconsistencies for review.',
      link: 'https://github.com/FabioAGC/OCR',
      tags: ['Automation', 'AI'],
    },
    {
      id: 9,
      title: 'Potato Line Computer Vision',
      description: 'A computer vision system that monitors the potato production line.',
      tags: ['Computer Vision', 'AI'],
    },
    {
      id: 1,
      title: 'GymTrack',
      description:
        'A platform for building and recommending gym workouts, featuring progress dashboards and AI-powered recommendations for personalized training routines for each member.',
      imageUrl: PROJECT_IMGS.gymtrack,
      link: 'https://github.com/FabioAGC/GymTrack',
      tags: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind', 'Jenkins', 'Jest'],
    },
    {
      id: 2,
      title: 'Speech.AI',
      description:
        'An intelligent speech assistance system designed to help doctors and patients with pronunciation difficulties through personalized exercises and AI-based speech analysis.',
      imageUrl: PROJECT_IMGS.speechai,
      imagePosition: 'center',
      link: 'https://github.com/FabioAGC/SpeechAI',
      tags: ['Nest.js', 'OpenAI API', 'n8n', 'Postgres', 'React', 'Vite', 'Prisma'],
    },
    {
      id: 3,
      title: 'EcoSense',
      description:
        'A system that monitors all light and water sensors in smart homes and analyzes consumption using AI to ensure everything is operating correctly.',
      imageUrl: PROJECT_IMGS.ecosense,
      tags: ['React', 'Python', 'TensorFlow'],
    },
    {
      id: 4,
      title: 'Inatel Rewards',
      description:
        'An app designed for Inatel students to redeem prizes at the cafeteria and library based on their grades and attendance in classes and lectures.',
      imageUrl: PROJECT_IMGS.inatelRewards,
      tags: ['Flutter', 'Firebase'],
    },
    {
      id: 5,
      title: 'BasquiArt',
      description:
        'A social network for art collectives, where artists gather in groups, share their work and interact with the community. It features category-based ratings, a personalized feed and a built-in bidding system that connects creators and collectors.',
      imageUrl: PROJECT_IMGS.basquiart,
      tags: ['JWT', 'bcrypt', 'Pytest', 'Playwright', 'Accessibility'],
    },
    {
      id: 6,
      title: 'SmartReserve',
      description:
        'A web application for managing reservations of institutional resources in schools. With enrollment-based login and a REST API, it handles rooms, labs and equipment, automatically prevents scheduling conflicts and centralizes every reservation in a single dashboard.',
      imageUrl: PROJECT_IMGS.smartreserve,
      link: 'https://github.com/FabioAGC/C14',
      tags: ['REST API', 'Jest', 'Playwright', 'Jenkins'],
    },
  ],
  translations: {
    nav: {
      about: 'About',
      tech: 'Stack',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      contact: 'Contact',
      menu: 'Open menu',
      close: 'Close menu',
      language: 'Language',
    },
    hero: {
      viewProjects: 'View projects',
      contact: 'Get in touch',
    },
    headers: {
      about: 'About',
      tech: 'Tech stack',
      experience: 'Experience',
      education: 'Education',
      projects: 'Selected projects',
      viewCode: 'View code',
      contact: 'Contact',
      contactTitle: "Let's talk.",
      contactText: 'The fastest way to reach me is by email.',
    },
  },
};

const PT: SiteContent = {
  profile: {
    name: 'Fabio Cruvinel',
    title: 'Engenheiro de Software',
    tagline: 'Engenheiro de software focado em dados, automação e IA aplicada à indústria.',
    about:
      'Sou bacharel em Engenharia de Software pelo Instituto Nacional de Telecomunicações (INATEL), tenho experiência profissional com análise de dados e automação e possuo prática em tecnologias como 5G, redes, IA e machine learning. Sempre fui muito interessado em tecnologia e atualmente estou focado em aprender linguagens de baixo nível, HFT e embarcados.\n\nConcluí a graduação em 2026 e pretendo fazer uma pós-graduação na área para me especializar ainda mais. No momento, busco oportunidades de nível Júnior ou Pleno, onde eu possa continuar crescendo e resolver problemas reais com dados, automação e IA.\n\nQuando não estou trabalhando, provavelmente estou jogando, já que essa sempre foi uma paixão minha, ou então lendo algum livro, pois os clássicos da literatura sempre me interessaram (já até pensei em cursar Psiquiatria ou Filosofia).',
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
        category: 'IA & LLMs',
        items: ['LLMs', 'MCP', 'RAG', 'Embeddings', 'Bancos Vetoriais', 'Fine-tuning', 'LoRA', 'Agentes de IA', 'Engenharia de Prompt'],
      },
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
        logo: logo('general-mills'),
        period: '2026 — Presente',
        description:
          'Atuei em projetos de transformação digital, trabalhando com visão computacional e integração de sistemas, prestando suporte ao desenvolvimento e à manutenção de sistemas supervisórios. Participei de atividades de automação industrial e instrumentação, bem como de testes, provas de conceito (POCs) e prototipagens. Realizei a implantação de soluções de visão computacional, inteligência artificial, machine learning e análise de dados nas bases da cadeia de suprimentos.',
      },
      {
        id: 2,
        role: 'Analista de Dados e Automação',
        company: 'RW tech',
        logo: logo('rw-tech'),
        period: '2025',
        description:
          'Fui responsável pelo desenvolvimento de automações de processos internos corporativos utilizando a ferramenta n8n, integrando diferentes sistemas e reduzindo tarefas manuais de vários colaboradores, diminuindo o tempo de preenchimento de planilhas em até 80%. Além disso, criei dashboards interativos e relatórios dinâmicos para análise de indicadores de desempenho e dados empresariais no Looker Studio, aprimorando a tomada de decisão com KPIs claros e promovendo uma cultura orientada a dados dentro da empresa.',
      },
      {
        id: 1,
        role: 'Pesquisador de Cibersegurança',
        company: 'INATEL — CxSC Telecom Lab',
        logo: logo('cxsc'),
        period: '2023 — 2024',
        description:
          'Realizei um estudo aprofundado sobre vulnerabilidades em bancos de dados relacionais e não relacionais, com ênfase em aplicações web desenvolvidas em PHP. Durante a pesquisa, explorei e simulei ataques do tipo SQL Injection e outras técnicas de exploração em um ambiente controlado com Docker e Kali Linux, analisando vetores de risco, padrões de mitigação e boas práticas de segurança. O trabalho envolveu a configuração de containers para testes isolados, análise de logs e a implementação de contramedidas para fortalecer a segurança de sistemas web.',
      },
    ],
    education: [
      {
        id: 1,
        role: 'Bacharelado em Engenharia de Software',
        company: 'INATEL — Instituto Nacional de Telecomunicações',
        logo: logo('inatel'),
        period: '2026',
        description:
          'TCC sobre bancos de dados vetoriais. Formação em engenharia de software, sistemas distribuídos, bancos de dados, sistemas operacionais e qualidade de software.',
        link: { label: 'Repositório do TCC', href: 'https://github.com/FabioAGC/TCC---BDs-Vetoriais' },
      },
    ],
  },
  projects: [
    {
      id: 7,
      title: 'MCP para AVEVA MES',
      description:
        'Servidor MCP que conecta assistentes de IA ao AVEVA MES, permitindo consultar dados de produção em linguagem natural.',
      link: 'https://github.com/FabioAGC/MCP-MES',
      tags: ['MCP', 'AVEVA MES', 'IA'],
    },
    {
      id: 8,
      title: 'Checador de Laudos',
      description: 'Ferramenta que confere laudos técnicos automaticamente e aponta inconsistências para revisão.',
      link: 'https://github.com/FabioAGC/OCR',
      tags: ['Automação', 'IA'],
    },
    {
      id: 9,
      title: 'Visão Computacional na Linha de Batata',
      description: 'Sistema de visão computacional que monitora a linha de produção de batata.',
      tags: ['Visão Computacional', 'IA'],
    },
    {
      id: 1,
      title: 'GymTrack',
      description:
        'Plataforma de construção e recomendação de treinos de academia, com dashboards de progresso e IA para recomendação de séries para cada membro.',
      imageUrl: PROJECT_IMGS.gymtrack,
      link: 'https://github.com/FabioAGC/GymTrack',
      tags: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind', 'Jenkins', 'Jest'],
    },
    {
      id: 2,
      title: 'Speech.AI',
      description:
        'Sistema inteligente de assistência à fala desenvolvido para auxiliar médicos e pacientes com dificuldades de pronúncia através de exercícios personalizados e análise de fala com IA.',
      imageUrl: PROJECT_IMGS.speechai,
      imagePosition: 'center',
      link: 'https://github.com/FabioAGC/SpeechAI',
      tags: ['Nest.js', 'OpenAI API', 'n8n', 'Postgres', 'React', 'Vite', 'Prisma'],
    },
    {
      id: 3,
      title: 'EcoSense',
      description:
        'Sistema que ajuda a visualizar todos os sensores de luz e água de casas inteligentes e analisa o consumo com IA para garantir que está tudo nos conformes.',
      imageUrl: PROJECT_IMGS.ecosense,
      tags: ['React', 'Python', 'TensorFlow'],
    },
    {
      id: 4,
      title: 'Inatel Rewards',
      description:
        'Aplicativo feito para os estudantes do Inatel resgatarem prêmios na cantina e na biblioteca com base nas notas e na frequência em aulas e palestras.',
      imageUrl: PROJECT_IMGS.inatelRewards,
      tags: ['Flutter', 'Firebase'],
    },
    {
      id: 5,
      title: 'BasquiArt',
      description:
        'Rede social voltada para coletivos de arte, onde artistas se reúnem em grupos, compartilham obras e interagem com a comunidade. Conta com avaliação por categorias, feed personalizado e um módulo de lances integrado que conecta criadores e colecionadores.',
      imageUrl: PROJECT_IMGS.basquiart,
      tags: ['JWT', 'bcrypt', 'Pytest', 'Playwright', 'Acessibilidade'],
    },
    {
      id: 6,
      title: 'SmartReserve',
      description:
        'Aplicação web para gerenciamento de reservas de recursos institucionais em ambientes educacionais. Com autenticação por matrícula e uma API REST, controla salas, laboratórios e equipamentos, previne conflitos de horário automaticamente e centraliza todas as reservas em um único painel.',
      imageUrl: PROJECT_IMGS.smartreserve,
      link: 'https://github.com/FabioAGC/C14',
      tags: ['API REST', 'Jest', 'Playwright', 'Jenkins'],
    },
  ],
  translations: {
    nav: {
      about: 'Sobre',
      tech: 'Stack',
      experience: 'Experiência',
      education: 'Formação',
      projects: 'Projetos',
      contact: 'Contato',
      menu: 'Abrir menu',
      close: 'Fechar menu',
      language: 'Idioma',
    },
    hero: {
      viewProjects: 'Ver projetos',
      contact: 'Entrar em contato',
    },
    headers: {
      about: 'Sobre',
      tech: 'Tecnologias',
      experience: 'Experiência',
      education: 'Formação',
      projects: 'Projetos selecionados',
      viewCode: 'Ver código',
      contact: 'Contato',
      contactTitle: 'Vamos conversar.',
      contactText: 'A forma mais rápida de falar comigo é por e-mail.',
    },
  },
};

export const CONTENT: Record<Language, SiteContent> = { en: EN, pt: PT };

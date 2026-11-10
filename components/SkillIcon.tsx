import React from 'react';
import {
  BarChart3,
  Blocks,
  Bot,
  BrainCircuit,
  Cpu,
  Database,
  DatabaseZap,
  Factory,
  Layers,
  LayoutDashboard,
  Lightbulb,
  LineChart,
  MessageCircle,
  MessagesSquare,
  Network,
  Plug,
  Repeat,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Table,
  TerminalSquare,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/** Brand logos from devicon (MIT), stored in public/icons. */
const LOGOS: Record<string, string> = {
  react: 'react',
  typescript: 'typescript',
  'next.js': 'nextjs',
  'tailwind css': 'tailwindcss',
  'html5/css3': 'html5',
  c: 'c',
  'c++': 'cplusplus',
  php: 'php',
  flutter: 'flutter',
  java: 'java',
  python: 'python',
  'node.js': 'nodejs',
  express: 'express',
  git: 'git',
  docker: 'docker',
  postman: 'postman',
  aws: 'amazonwebservices',
  vercel: 'vercel',
  jest: 'jest',
  linux: 'linux',
  postgresql: 'postgresql',
  mysql: 'mysql',
  firebase: 'firebase',
  supabase: 'supabase',
};

/** Logos drawn in black, flipped to white for the dark page. */
const DARK_LOGOS = new Set(['nextjs', 'express', 'vercel']);

/** Line icons for tools without a logo and for concepts, in English and Portuguese. */
const GLYPHS: Record<string, LucideIcon> = {
  excel: Table,
  'power bi': BarChart3,
  'ci/cd': Repeat,
  aveva: Factory,
  seeq: LineChart,

  mcp: Plug,
  rag: DatabaseZap,
  embeddings: Blocks,
  lora: Layers,
  'fine-tuning': SlidersHorizontal,
  llms: MessagesSquare,
  'prompt engineering': TerminalSquare,
  'engenharia de prompt': TerminalSquare,
  'ai agents': Bot,
  'agentes de ia': Bot,
  'vector databases': Database,
  'bancos vetoriais': Database,

  'data analysis': BarChart3,
  'análise de dados': BarChart3,
  'system design': LayoutDashboard,
  'design de sistemas': LayoutDashboard,
  'network configuration': Network,
  'configuração de redes': Network,
  cybersecurity: ShieldCheck,
  cibersegurança: ShieldCheck,
  kpis: TrendingUp,
  ai: Sparkles,
  ia: Sparkles,
  'machine learning': BrainCircuit,

  'problem solving': Lightbulb,
  'resolução de problemas': Lightbulb,
  'quick learner': Zap,
  'aprendizado rápido': Zap,
  sociable: MessageCircle,
  sociável: MessageCircle,
  'good at teamwork': Users,
  'trabalho em equipe': Users,
};

/** Logos in deep blues that need a lift to read on black. */
const DIM_LOGOS = new Set(['mysql', 'php']);

const SkillIcon: React.FC<{ name: string }> = ({ name }) => {
  const key = name.toLowerCase();
  const logo = LOGOS[key];

  if (logo) {
    return (
      <img
        className={`chip__icon ${DARK_LOGOS.has(logo) ? 'chip__icon--invert' : ''} ${DIM_LOGOS.has(logo) ? 'chip__icon--lighten' : ''}`}
        src={`${import.meta.env.BASE_URL}icons/${logo}.svg`}
        alt=""
        width={16}
        height={16}
        loading="lazy"
      />
    );
  }

  const Glyph = GLYPHS[key] ?? Cpu;
  return <Glyph className="chip__icon chip__icon--glyph" size={16} strokeWidth={1.5} aria-hidden="true" />;
};

export default SkillIcon;
